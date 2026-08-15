#!/bin/sh
set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH='' cd -- "$script_dir/.." && pwd)
mode=${1:-dev}
environment_base=${CODEX_CONSOLE_ENVIRONMENT:-"$script_dir/environment"}
skills_dir="$repo_root/skills"
host_uid=$(id -u)
image=${CODEX_CONSOLE_IMAGE:-"local/codex-console:0.147.0-$host_uid"}
auth_file=${CODEX_CONSOLE_AUTH_FILE:-"${CODEX_HOME:-$HOME/.codex}/auth.json"}
auth_snapshot_dir=''

[ "$#" -le 1 ] || {
  printf '%s\n' 'Usage: test-env/open.sh [dev|consumer]' >&2
  exit 64
}

case "$mode" in
  dev)
    environment_dir="$environment_base"
    ;;
  consumer)
    environment_dir="$environment_base/consumer"
    ;;
  -h | --help)
    printf '%s\n' \
      'Usage: test-env/open.sh [dev|consumer]' \
      '' \
      '  dev       Mount the active repository skills read-only.' \
      '  consumer  Start without repository skills and persist global installs.'
    exit 0
    ;;
  *)
    printf 'Unknown mode: %s\n' "$mode" >&2
    exit 64
    ;;
esac

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

if [ "$mode" = dev ]; then
  docker run --rm --interactive --tty \
    --hostname codex-sandbox \
    --cap-drop ALL \
    --security-opt no-new-privileges \
    --pids-limit 512 \
    --env "CODEX_CONSOLE_MODE=$mode" \
    --mount "type=bind,source=$workspace_dir,target=/workspace" \
    --mount "type=bind,source=$skills_dir,target=/workspace/.agents/skills,readonly" \
    --mount "type=bind,source=$auth_snapshot_dir/auth.json,target=/run/codex-auth.json,readonly" \
    "$image"
else
  consumer_agents_dir="$environment_dir/home/.agents"
  consumer_codex_skills_dir="$environment_dir/home/.codex/skills"
  consumer_system_thinking_dir="$environment_dir/home/.config/system-thinking"
  consumer_codex_agents_file="$environment_dir/home/.codex/AGENTS.md"
  mkdir -p \
    "$consumer_agents_dir" \
    "$consumer_codex_skills_dir" \
    "$consumer_system_thinking_dir" \
    "$(dirname -- "$consumer_codex_agents_file")"
  touch "$consumer_codex_agents_file"

  docker run --rm --interactive --tty \
    --hostname codex-sandbox \
    --cap-drop ALL \
    --security-opt no-new-privileges \
    --pids-limit 512 \
    --env "CODEX_CONSOLE_MODE=$mode" \
    --mount "type=bind,source=$workspace_dir,target=/workspace" \
    --mount "type=bind,source=$consumer_agents_dir,target=/home/codex/.agents" \
    --mount "type=bind,source=$consumer_codex_skills_dir,target=/home/codex/.codex/skills" \
    --mount "type=bind,source=$consumer_system_thinking_dir,target=/home/codex/.config/system-thinking" \
    --mount "type=bind,source=$consumer_codex_agents_file,target=/home/codex/.codex/AGENTS.md" \
    --mount "type=bind,source=$auth_snapshot_dir/auth.json,target=/run/codex-auth.json,readonly" \
    "$image"
fi
