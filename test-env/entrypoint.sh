#!/bin/sh
set -eu

if [ -f /run/codex-auth.json ]; then
  cp /run/codex-auth.json "$CODEX_HOME/auth.json"
  chmod 0600 "$CODEX_HOME/auth.json"
fi

if [ ! -f "$CODEX_HOME/config.toml" ]; then
  printf '%s\n' '[skills.bundled]' 'enabled = false' > "$CODEX_HOME/config.toml"
fi

printf '%s\n' \
  'Isolated Codex console' \
  '  workspace: /workspace' \
  '  skills:    /workspace/.agents/skills' \
  '  bundled skills: disabled' \
  '' \
  "Type 'codex' to start."

exec /bin/bash --login
