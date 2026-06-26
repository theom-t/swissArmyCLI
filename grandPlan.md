# Grand Plan & Phase Rollout

This document outlines the phased implementation plan ("sprints") for building our custom Swiss Army Knife CLI. Every phase includes a specific verification protocol to guarantee stability and prevent regressions.

---

## Industry Standard Testing & CI/CD Strategy
To ensure changes never break the system as it scales, the project will strictly adhere to:
1. **Unit Testing:** `Vitest` (or `Jest`) for ultra-fast, isolated testing of core logic (e.g., Context Filter regexes, Router logic).
2. **Integration Testing:** Mocking LLM endpoints to test the entire CLI flow without burning API tokens.
3. **Automated CI/CD:** GitHub Actions to run tests, linting (`ESLint`/`Prettier`), and build checks on every commit.
4. **Agentic Benchmarking:** Running Harbor/Terminal-Bench evaluations in CI to ensure our efficiency optimizations (token counts) don't accidentally degrade over time.

---

## Phase 1: Foundation & Repository Setup (Sprint 1)
**Goal:** Establish the raw scaffolding and development environment.
*   Scaffold standard directory structure (`src/`, `tests/`, `bin/`, `scripts/`, `docs/`).
*   Initialize `package.json` and TypeScript configuration (`tsconfig.json`).
*   Initialize Git repository and link to the user's remote Git account.
*   Set up testing frameworks (Vitest, ESLint, Prettier).
*   **Verification:** Run `npm run test` and see a passing dummy test. Run `git status` to verify a clean working tree tracking the remote repo.

## Phase 2: Pi CLI Framework & Entry Point (Sprint 2)
**Goal:** Build the raw CLI wrapper and connect it to Pi CLI routing.
*   Set up the `bin/` entry point and argument parser.
*   Integrate the Pi CLI base framework.
*   Build the base `AgentRouter` to catch commands.
*   **Verification:** Execute `swiss "hello"` in the terminal. The CLI should boot, parse the command, and output a standard debug response without crashing.

## Phase 3: Provider Router & Model Tiering (Sprint 3)
**Goal:** Implement the Major/Minor model architecture.
*   Build the `ProviderRouter` supporting Ollama (local REST) and Cloud (Anthropic/OpenAI).
*   Parse `~/.swissrc` configuration for API keys and active models.
*   **Verification:** Run the CLI with a mocked local Ollama endpoint; verify the network request goes to `127.0.0.1:11434`. Switch config to Anthropic; verify the network request goes to `api.anthropic.com`.

## Phase 4: Adaptive Memory OS (SQLite) (Sprint 4)
**Goal:** Implement cross-session "save and resume".
*   Initialize the local SQLite database schema.
*   Implement the **Auto-Save** exit hook (Minor Model compression).
*   Implement the **Resume** startup hook (Session Injection).
*   **Verification:** Run a command and manually terminate the CLI. Query the local SQLite DB to verify a compressed state was saved. Restart the CLI and verify the startup prompt contains the previous state.

## Phase 5: Context Filter & Noise Cancellation (Sprint 5)
**Goal:** Build the OMNI-style terminal output interceptor.
*   Build the stream interceptor that captures raw tool outputs.
*   Implement logic to strip out progress bars, standard "OK" logs, and retain only errors/stack traces.
*   **Verification:** Feed a mock 10,000-line `npm install` log into the filter. Verify the output passed to the test runner is < 200 lines and contains the mocked dependency error.

## Phase 6: Deferred Tool Search & MCP (Sprint 6)
**Goal:** Minimize context window bloat by only loading tools when needed.
*   Build the `ToolSearch` component utilizing lightweight embeddings.
*   Register our core MCP tools (repo reader, file writer, etc.).
*   **Verification:** Provide a prompt asking to "read the database schema." Verify the embedding search correctly selects the `read_file` JSON schema without loading the schemas for unrelated tools (like `draft_email`).

## Phase 7: Business Logic & Full Automation (Sprint 7)
**Goal:** Build out the actual Personas (Engineering vs. Business).
*   Implement specialized agents.
*   Connect the Repository Knowledge Graph (CodeWiki) logic to the Engineering Persona.
*   **Verification:** Run complex end-to-end tasks (e.g., "Analyze the routing folder and document it") and use Harbor to benchmark token efficiency against a baseline.
