FROM node:22-bookworm-slim

ARG CODEX_VERSION=0.147.0
ARG USER_ID=1000

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        bash \
        build-essential \
        ca-certificates \
        curl \
        git \
        jq \
        less \
        openssh-client \
        python3 \
        python3-pip \
        ripgrep \
    && npm install --global "@openai/codex@${CODEX_VERSION}" \
    && if ! getent passwd "$USER_ID" >/dev/null; then \
         useradd --uid "$USER_ID" --gid node --create-home codex; \
       fi \
    && mkdir -p /home/codex/.codex /workspace/.agents \
    && chown -R "$USER_ID":node /home/codex /workspace \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV HOME=/home/codex
ENV CODEX_HOME=/home/codex/.codex
ENV SHELL=/bin/bash

COPY entrypoint.sh /usr/local/bin/codex-console-entrypoint

RUN chmod 0755 /usr/local/bin/codex-console-entrypoint

USER ${USER_ID}:1000
WORKDIR /workspace

ENTRYPOINT ["codex-console-entrypoint"]
