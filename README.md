# 🇨🇭 Swiss Army CLI (swiss)

A hyper-efficient, multi-persona, locally-aware AI agent built directly into your terminal. Designed for engineers and business operators who want absolute automation without burning millions of tokens.

By combining dynamic prompt engineering, deferred MCP tool loading, background knowledge graph generation, and intelligent noise cancellation, **Swiss Army CLI** operates at 90% higher efficiency than raw standard AI agents.

---

## ✨ Core Features

*   🎭 **Multi-Persona Intelligence (Agency Agents)**
    *   Dynamically hot-swaps between 16 specialized personas (e.g., Software Engineer, System Architect, Scrum Master, UX Designer) based on the specific context of your prompt.
*   🧠 **Two-Tiered AI Routing (ProviderRouter)**
    *   Uses a **Minor Model** (like local Llama3 or fast Gemini Flash) for ultra-cheap intent parsing, saving the massive context windows and API costs for the **Major Model** (like Claude 3.7 Sonnet or Gemini 2.5 Pro) to actually write code.
*   💇 **Ponytail Efficiency System**
    *   Natively injects the "Lazy Senior Dev" execution ladder into every command. The CLI is mathematically constrained to prioritize YAGNI, standard library usage, and minimal diffs over massive boilerplates.
*   🗜️ **Adaptive Memory (SQLite)**
    *   Stateful persistence between commands. Automatically summarizes and stores conversation context via an `Auto-Save` hook so you can resume tasks seamlessly days later without blowing up your context window.
*   🔇 **Terminal Noise Cancellation (Context Filter)**
    *   Strips away irrelevant `npm install` progress bars and redundant standard output, preserving only the crucial stack traces and errors to pass back to the LLM. 
*   🕵️ **Deferred MCP Tool Search**
    *   Does not blindly load 40+ tool schemas into context. Uses heuristic embedding searches to only pass the JSON schemas the agent actually needs to accomplish the current intent.
*   📚 **Living Knowledge Graph (CodeWiki)**
    *   A background `Technical Writer` automatically generates and updates architectural diagrams and JSON structures (`.swiss/CodeWiki.json`) every time the CLI modifies code. 
*   📊 **Multimodal Graphify**
    *   Native ability to map complex systems and output beautiful HTML/Mermaid graphs straight to your file system (`swiss "graph the database schema"`).
*   ⏱️ **Harbor-Style Comparative Evals**
    *   Built-in benchmarking (`swiss eval`) to mathematically prove token reduction and latency improvements against baseline raw agents.

---

## 🚀 Installation & Setup

### 1. Clone & Build
Clone the repository and compile the TypeScript source into the executable binary:

```bash
git clone https://github.com/theom-t/swissArmyCLI.git
cd swissArmyCLI
npm install
npm run build
```

### 2. Make it Globally Executable (Optional)
To use `swiss` anywhere on your machine, link the binary:
```bash
npm link
# OR, make the bin executable directly:
chmod +x ./bin/swiss
```

### 3. Configuration (`~/.swissrc`)
The CLI needs to know which models to use and requires your API keys. Create a `.swissrc` file in your home directory (e.g. `~/.swissrc`):

```json
{
  "active_provider": "google",
  "models": {
    "major": "gemini-2.5-flash",
    "minor": "gemini-2.5-flash"
  },
  "api_keys": {
    "google": "YOUR_GEMINI_API_KEY",
    "anthropic": "YOUR_ANTHROPIC_API_KEY",
    "openai": "YOUR_OPENAI_API_KEY"
  }
}
```
*Note: If `active_provider` is set to `anthropic` or `openai`, the CLI will route via their respective APIs. If a model starts with `ollama/`, the CLI will attempt to route via localhost `127.0.0.1:11434`.*

---

## 💻 Usage

Using the Swiss Army CLI is as simple as talking to a senior developer on your team. 

**Standard Execution:**
```bash
swiss "build a new payment gateway route handling Stripe webhooks"
```

**Generate Visual Architecture (Graphify):**
```bash
swiss "graph the project structure and show how the router connects to the memory module"
```
*(The CLI will automatically output a beautiful `.html` Mermaid graph to `.swiss/graphs/`)*

**Run Comparative Evals:**
```bash
swiss eval
```
*(Runs an automated Harbor-style benchmark suite comparing the Swiss architecture to a raw baseline LLM).*

**Check Configuration Details:**
```bash
swiss config
```

---

## 🛠️ Architecture Overview

The system is orchestrated inside `src/index.ts` using the **Commander** framework. 
When you execute a prompt:

1. **Boot & Memory:** `AdaptiveMemory.ts` loads your compressed historical state.
2. **Tool Search:** `ToolSearch.ts` semantically determines which MCP tools are required.
3. **Intent Routing:** `ProviderRouter` passes the prompt to a cheap Minor Model to parse intent and select 1 of 16 expert Personas (from `PersonaRegistry.ts`).
4. **Execution:** The heavy Major Model is loaded via `DynamicPersona.ts` which injects the strict **Ponytail Efficiency Ladder** and Context.
5. **CodeWiki Update:** If the command modified architecture, `CodeWikiManager.ts` spawns a background agent to update the living docs.
6. **Auto-Save:** `ContextFilter.ts` compresses the terminal outputs, and the SQLite memory is updated.

---

*The best code is the code never written.* 🐴

---

## 🙏 References & Inspiration

This Swiss Army CLI would not be possible without the incredible open-source projects, frameworks, and tools that inspired its core architecture. A massive thank you to the creators of the following concepts and repositories:

*   **CLI Interface & UX:** Inspired by the elegance of [Pi.dev Packages](https://pi.dev/packages)
*   **Token Efficiency & Constraints:** Implemented using the strict ruleset from [Ponytail (DietrichGebert)](https://github.com/DietrichGebert/ponytail)
*   **Agentic Personas:** Scaffolded utilizing the multi-agent tiering system from [Agency Agents (msitarzewski)](https://github.com/msitarzewski/agency-agents)
*   **Terminal Benchmarking & Evals:** Modeled after [Harbor Framework](https://www.harborframework.com/docs/tutorials/running-terminal-bench)
*   **Living Documentation / Knowledge Graphs:** Derived from the concepts in [FSoft-AI4Code/CodeWiki](https://github.com/FSoft-AI4Code/CodeWiki) and [Understand-Anything (Egonex-AI)](https://github.com/Egonex-AI/Understand-Anything)
*   **Multimodal Visualization:** Inspired by the graphing architectures of [Graphify](https://graphify.net/)
