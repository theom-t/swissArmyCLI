# Token & Memory Context Efficiency Strategy

To achieve extreme token efficiency and long-term memory for our custom CLI system, we will adopt the following strategies based on industry best practices (GitHub Copilot, OMNI, and GitHub Agentic Workflows).

## 1. Context Minimization (Noise Canceling)
*   **OMNI-Style Output Filtering**: We will implement a fast proxy layer (similar to `fajarhide/omni`) that intercepts terminal tool outputs and strips out noise (e.g., successful tests, build logs, progress bars). We will only feed the LLM the actual errors, stack traces, and relevant data. This can reduce token usage by up to 90%.
*   **Pre-agentic Data Gathering**: Instead of paying the LLM to spend reasoning turns fetching data (like reading PR diffs or workspace status via MCP tools), we will execute deterministic scripts *before* the agent starts and inject only the compressed results. 

## 2. On-Demand Context (Tool Search)
*   **Deferred Tool Loading**: As used by GitHub Copilot, we will not send the full JSON parameter schema of every available tool in the system prompt. Instead, we will pass a lightweight catalog (name/description) and use client-side embedding search (`tool_search`) to fetch the heavy JSON schemas only when the agent explicitly needs to use that tool.
*   **Pruning Unused Tools**: We will aggressively prune unused MCP tools from the agent's context, as carrying 40+ tool definitions adds massive token overhead per request.

## 3. Caching & Transport Optimization
*   **Extended Prompt Caching**: We will configure API requests to use extended prompt cache retention (e.g., `prompt_cache_retention: "24h"`) for long-lived sessions, ensuring the prefix (system prompt, core tools) remains warm and significantly cheaper to process.
*   **WebSocket Connections**: For sequential, long-lived agentic loops, we will use persistent WebSocket connections to the inference provider rather than making repeated HTTP requests. This heavily reduces latency and continuation overhead.

## 4. Adaptive Long-Term Memory
*   **Persistent Knowledge Store**: We will build an "Adaptive Memory OS" using a local SQLite backend (aligning with our CodeWiki/Understand-Anything concepts). The agent will save project-specific rules, architectural decisions, and goals (`omni goal`, `omni remember`).
*   **Session Continuity (Auto-Save & Resume)**: 
    *   **Auto-Save**: On exit or periodically, the Minor Model continuously compresses the last block of interactions into a tiny ~150-token state file (e.g., active files, current goal, recent errors) and auto-saves it to the SQLite database.
    *   **Resume**: When a session restarts, this compressed summary is automatically injected. This provides instant "save and resume" capabilities, preventing AI "amnesia" and saving thousands of tokens that would otherwise be spent re-explaining the project or loading uncompressed chat logs.

**Conclusion:** 
By combining these strategies, our CLI will ensure we only pay the LLM for high-value reasoning, completely eliminating the token waste associated with reading raw logs, parsing massive tool schemas, or repeatedly re-learning project context.
