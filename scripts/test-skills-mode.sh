#!/bin/sh
set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd -P)
repo_root=$(CDPATH='' cd -- "$script_dir/.." && pwd -P)
mode_script="$script_dir/skills-mode"
fixture_root=$(mktemp -d "${TMPDIR:-/tmp}/skills-mode-test.XXXXXX")
fixture_user="$fixture_root/user"
fixture_bin="$fixture_root/bin"
fixture_log="$fixture_root/npx.log"

cleanup() {
  rm -rf -- "$fixture_root"
}

trap cleanup EXIT HUP INT TERM

mkdir -p "$fixture_user/.agents/skills" "$fixture_user/.codex/skills" "$fixture_bin"

cat > "$fixture_user/.agents/.skill-lock.json" <<'EOF'
{
  "version": 3,
  "skills": {
    "workflow": {
      "source": "JustYannicc/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/JustYannicc/skills.git"
    },
    "unrelated": {
      "source": "someone/else",
      "sourceType": "github",
      "sourceUrl": "https://github.com/someone/else.git"
    }
  }
}
EOF

mkdir -p "$fixture_user/.agents/skills/workflow"

cat > "$fixture_bin/npx" <<'EOF'
#!/bin/sh
set -eu

printf '%s\n' "$*" >> "${SKILLS_MODE_TEST_LOG:?}"
lock_file="${SKILLS_MODE_USER_ROOT:?}/.agents/.skill-lock.json"

case " $* " in
  *' skills add '*)
    mkdir -p "$SKILLS_MODE_USER_ROOT/.codex/skills/setup-system-thinking"
    printf '%s\n' '---' 'name: setup-system-thinking' 'description: test fixture' '---' \
      > "$SKILLS_MODE_USER_ROOT/.codex/skills/setup-system-thinking/SKILL.md"
    scratch_lock="$lock_file.tmp"
    jq '
      .skills["setup-system-thinking"] = {
        "source": "JustYannicc/skills",
        "sourceType": "github",
        "sourceUrl": "https://github.com/JustYannicc/skills.git"
      }
    ' "$lock_file" > "$scratch_lock"
    mv "$scratch_lock" "$lock_file"
    ;;
  *' skills remove '*)
    scratch_lock="$lock_file.tmp"
    jq 'del(.skills.workflow)' "$lock_file" > "$scratch_lock"
    mv "$scratch_lock" "$lock_file"
    rm -rf -- "$SKILLS_MODE_USER_ROOT/.agents/skills/workflow"
    ;;
esac
EOF
chmod 0755 "$fixture_bin/npx"

run_mode() {
  PATH="$fixture_bin:$PATH" \
    SKILLS_MODE_USER_ROOT="$fixture_user" \
    SKILLS_MODE_TEST_LOG="$fixture_log" \
    "$mode_script" "$@"
}

run_mode dev > "$fixture_root/dev.out"

while IFS= read -r skill_dir; do
  skill_name=${skill_dir##*/}
  target="$fixture_user/.agents/skills/$skill_name"
  [ -L "$target" ] || {
    printf 'missing development link: %s\n' "$target" >&2
    exit 1
  }
  [ "$(realpath "$target")" = "$skill_dir" ] || {
    printf 'incorrect development link: %s\n' "$target" >&2
    exit 1
  }
done <<EOF
$(find "$repo_root/skills" -mindepth 1 -maxdepth 1 -type d -exec test -f '{}/SKILL.md' ';' -print | LC_ALL=C sort)
EOF

jq -e '.skills.unrelated.source == "someone/else"' "$fixture_user/.agents/.skill-lock.json" >/dev/null
jq -e '[.skills[] | select(.source == "JustYannicc/skills")] | length == 0' \
  "$fixture_user/.agents/.skill-lock.json" >/dev/null
run_mode status > "$fixture_root/status-development.out"
grep -F -q 'Mode: development' "$fixture_root/status-development.out"

scratch_lock="$fixture_user/.agents/.skill-lock.json.tmp"
jq '
  .skills.workflow = {
    "source": "JustYannicc/skills",
    "sourceType": "github",
    "sourceUrl": "https://github.com/JustYannicc/skills.git"
  }
' "$fixture_user/.agents/.skill-lock.json" > "$scratch_lock"
mv "$scratch_lock" "$fixture_user/.agents/.skill-lock.json"

run_mode consumer > "$fixture_root/consumer.out"

[ ! -L "$fixture_user/.agents/skills/thinking-in-systems" ]
[ -f "$fixture_user/.codex/skills/setup-system-thinking/SKILL.md" ]
jq -e '
  .skills["setup-system-thinking"].source == "JustYannicc/skills"
  and ([.skills[] | select(.source == "JustYannicc/skills")] | length == 1)
  and .skills.unrelated.source == "someone/else"
' "$fixture_user/.agents/.skill-lock.json" >/dev/null
run_mode status > "$fixture_root/status-consumer.out"
grep -F -q 'Mode: consumer bootstrap' "$fixture_root/status-consumer.out"

first_command=$(sed -n '1p' "$fixture_log")
case "$first_command" in
  *'skills remove'*) ;;
  *)
    printf 'development mode did not remove the managed consumer package first\n' >&2
    exit 1
    ;;
esac

consumer_add_line=$(grep -n 'skills add JustYannicc/skills' "$fixture_log" | tail -n 1 | cut -d: -f1)
consumer_remove_line=$(grep -n 'skills remove' "$fixture_log" | tail -n 1 | cut -d: -f1)
[ "$consumer_add_line" -lt "$consumer_remove_line" ] || {
  printf 'consumer mode did not install Setup before removing the old suite\n' >&2
  exit 1
}

if grep -F -q -- "skills remove --global --agent *" "$fixture_log"; then
  printf 'skills-mode used the unsupported wildcard agent filter for removal\n' >&2
  exit 1
fi

mkdir -p "$fixture_user/.agents/skills/framing-decisions"
if run_mode dev > "$fixture_root/conflict.out" 2>&1; then
  printf 'development mode replaced an unowned conflict\n' >&2
  exit 1
fi
[ -d "$fixture_user/.agents/skills/framing-decisions" ]

printf '%s\n' 'skills-mode tests passed'
