# Distribution & Installation Strategy

To ensure a frictionless onboarding experience, the system is designed so that any user can clone the repository and run a single script to gain global access to the CLI on their machine.

## 1. Setup Scripts
We will provide two unified entry points at the root of the repository:
*   `setup.sh` (for macOS / Linux)
*   `setup.ps1` (for Windows PowerShell)

## 2. Installation Flow
When the user executes the setup script, the following sequence occurs automatically:

1.  **Prerequisite Validation:** 
    *   The script checks for required runtimes (e.g., Node.js for Pi CLI, Python, or Rust/Cargo if compiling local binaries).
    *   If a runtime is missing, it either auto-installs it (using tools like `nvm` or `winget`) or gracefully prompts the user with installation instructions.
2.  **Core Framework Installation:**
    *   Installs the base **Pi CLI** globally (e.g., `npm install -g pi-cli` or `curl ... | bash`).
3.  **Local Dependency Resolution:**
    *   Executes dependency installs for our custom MCPs, personas, and memory modules (e.g., `npm install`, `pip install -r requirements.txt`).
4.  **Global Path Registration:**
    *   **macOS/Linux (`setup.sh`):** Creates a symbolic link for our custom CLI wrapper in a globally accessible path. 
        *   *Example:* `ln -s $(pwd)/bin/cli-entrypoint /usr/local/bin/swiss`
    *   **Windows (`setup.ps1`):** Adds the repository's `/bin` directory to the user's `PATH` environment variable, or creates a `.cmd` wrapper inside an existing `PATH` directory.
5.  **Pi Extension Linking:**
    *   Registers our local repository's personas and knowledge graph tools as active skills/extensions within the global Pi CLI environment.
    *   *Example:* `pi extension link .`
6.  **Configuration Initialization:**
    *   Generates a default global configuration file (e.g., `~/.swissrc` or `~/.config/customCLI/config.json`) to store user preferences, API keys, and the path to the local SQLite database used by our Adaptive Memory OS.

## 3. The User Experience
The entire distribution model boils down to three steps for the end-user:

```bash
# 1. Download
git clone https://github.com/yourusername/customCLI.git
cd customCLI

# 2. Install
./setup.sh  # or .\setup.ps1 on Windows

# 3. Use globally
swiss "Initialize a new Next.js project and set up my memory OS"
```

## 4. Updates & Maintenance
Because the global command (`swiss`) is merely a symlink to the cloned repository, users can pull the latest updates natively via Git:
```bash
cd /path/to/customCLI
git pull
./setup.sh --update
```
