# Evaluation System

To ensure our custom CLI system remains highly efficient and capable across terminal-based tasks, we will be utilizing **Terminal-Bench** (powered by the **Harbor** framework). 

## Why Terminal-Bench?
Terminal-Bench 2.0 provides an industry-standard way to evaluate the performance of agents on terminal-based tasks. By incorporating it, we can rigorously track our token efficiency, execution accuracy, and speed over time.

## Harbor Integration
Harbor serves as the official harness for running Terminal-Bench. We will integrate it into our CI/CD and local testing workflows to keep the system accountable.

### Basic Setup
To run tests against our system, Docker must be installed and running. An example evaluation run using Harbor looks like:
```bash
harbor run -d terminal-bench/terminal-bench-2 -a our_custom_cli
```

### Advanced Evaluation (Cloud Execution)
For scalable evaluations (e.g. running multiple tasks in parallel), Harbor supports Daytona environments:
```bash
export DAYTONA_API_KEY="<your-daytona-api-key>"
export ANTHROPIC_API_KEY="<your-anthropic-api-key>"
harbor run \
  -d terminal-bench/terminal-bench-2 \
  -m anthropic/claude-haiku-4-5 \
  -a our_custom_cli \
  --env daytona \
  -n 32
```
