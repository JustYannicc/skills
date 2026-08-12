#!/bin/sh
set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH='' cd -- "$script_dir/.." && pwd)
environment_dir=${CODEX_CONSOLE_ENVIRONMENT:-"$script_dir/environment"}
skills_dir="$repo_root/skills"
host_uid=$(id -u)
image=${CODEX_CONSOLE_IMAGE:-"local/codex-console:0.147.0-$host_uid"}
auth_file=${CODEX_CONSOLE_AUTH_FILE:-"${CODEX_HOME:-$HOME/.codex}/auth.json"}
auth_snapshot_dir=''

cleanup() {
  if [ -n "$auth_snapshot_dir" ] && [ -d "$auth_snapshot_dir" ]; then
    rm -f -- "$auth_snapshot_dir/auth.json"
    rmdir -- "$auth_snapshot_dir"
  fi
}

trap cleanup EXIT HUP INT TERM

[ "$host_uid" -ne 0 ] || {
  printf '%s\n' 'Run this launcher as your normal user, not root.' >&2
  exit 77
}

mkdir -p "$environment_dir/workspace"
environment_dir=$(realpath "$environment_dir")
workspace_dir=$(realpath "$environment_dir/workspace")
skills_dir=$(realpath "$skills_dir")

case "$repo_root/" in
  "$workspace_dir/"*)
    printf 'Workspace cannot contain the repository: %s\n' "$workspace_dir" >&2
    exit 78
    ;;
esac

[ -d "$skills_dir" ] || {
  printf 'Skills directory not found: %s\n' "$skills_dir" >&2
  exit 66
}

[ -f "$auth_file" ] || {
  printf 'Codex auth file not found: %s\n' "$auth_file" >&2
  exit 67
}

command -v docker >/dev/null 2>&1 || {
  printf '%s\n' 'Docker is required.' >&2
  exit 69
}

command -v jq >/dev/null 2>&1 || {
  printf '%s\n' 'jq is required.' >&2
  exit 69
}

docker info >/dev/null 2>&1 || {
  printf '%s\n' 'Docker daemon is unavailable.' >&2
  exit 69
}

docker build \
  --quiet \
  --build-arg "USER_ID=$host_uid" \
  --tag "$image" \
  "$script_dir" >/dev/null

umask 077
auth_snapshot_dir=$(mktemp -d "${TMPDIR:-/tmp}/codex-console-auth.XXXXXX")

jq --exit-status '
  if .auth_mode != "chatgpt"
    or (.tokens.access_token | type) != "string"
    or (.tokens.access_token | length) == 0
    or (.tokens.account_id | type) != "string"
    or (.tokens.account_id | length) == 0
  then
    error("host auth.json does not contain usable ChatGPT OAuth tokens")
  else
    {
      auth_mode: "chatgptAuthTokens",
      OPENAI_API_KEY: null,
      tokens: {
        id_token: .tokens.access_token,
        access_token: .tokens.access_token,
        refresh_token: "",
        account_id: .tokens.account_id
      },
      last_refresh: (now | todateiso8601)
    }
  end
' "$auth_file" > "$auth_snapshot_dir/auth.json"

docker run --rm --interactive --tty \
  --hostname codex-sandbox \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --pids-limit 512 \
  --mount "type=bind,source=$workspace_dir,target=/workspace" \
  --mount "type=bind,source=$skills_dir,target=/workspace/.agents/skills,readonly" \
  --mount "type=bind,source=$auth_snapshot_dir/auth.json,target=/run/codex-auth.json,readonly" \
  "$image"
