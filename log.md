# Change Log

This file must be updated with every significant change to the project.

## [2026-06-26]
*   Project initialized.
*   Created `GEMINI.md` to establish baseline coding rules.
*   Created `ARCHITECTURE.md` to document future design decisions.
*   Created `log.md` to track major changes.
*   Conducted feasibility research based on `SourceIdeas.txt` and documented findings in `FEASIBILITY.md`.
*   Drafted initial system architecture in `ARCHITECTURE.md` utilizing Mermaid diagrams.
*   Created `USER_FLOW.md` outlining the interaction between the user, routing system, and specialized agents.
*   Created `CLASS_DIAGRAM.md` outlining the proposed foundational object structure.
*   Researched Harbor / Terminal-Bench and created `EVALUATIONS.md` to document our testing and efficiency validation strategy. Updated `ARCHITECTURE.md` to reflect the evaluation loop.
*   Evaluated `Pi CLI` (`pi.dev`) and confirmed it is highly feasible to build our entire system as extensions/skills on top of it. Updated `FEASIBILITY.md` and `ARCHITECTURE.md` accordingly.
*   Researched token and memory context efficiency (GitHub Copilot caching, OMNI noise-canceling, and GitHub Agentic Workflows token audits) and created `EFFICIENCY_STRATEGY.md`.
*   Designed the installation and distribution flow using `setup.sh` and `setup.ps1` and documented it in `DISTRIBUTION.md`.
*   Formalized the "Major / Minor" model tiering architecture to allow mixing local Ollama models with cloud providers in `ARCHITECTURE.md`.
*   Integrated "Auto-Save and Resume" lifecycle via Minor Model compression into `USER_FLOW.md`, `CLASS_DIAGRAM.md`, and `EFFICIENCY_STRATEGY.md`.
*   Created `grandPlan.md` outlining the 7-phase implementation strategy, sprint breakdowns, and verification/testing loops.
