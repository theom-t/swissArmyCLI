export class ContextFilter {
  private noisePatterns: RegExp[] = [
    /^\s*\[?(info|debug)\]?/i,
    /downloading.*?http/i,
    /downloading.*?\.\.\./i,
    /downloading.*?from registry/i,
    /extracting.*?\.\.\./i,
    /^\s*\[[0-9=]+>.*\]\s*[0-9]+%/i, // Progress bars
    /ok\s*$/i,
    /passing\s*$/i,
    /success/i,
    /^\s*fetched.*?in.*?[ms|s]/i,
    /added \d+ packages/i
  ];

  private errorPatterns: RegExp[] = [
    /error/i,
    /fail/i,
    /err!/i,
    /exception/i,
    /traceback/i,
    /warn/i,
    /conflict/i
  ];

  public stripNoise(rawLogs: string): string {
    const lines = rawLogs.split('\n');
    const filteredLines: string[] = [];

    for (const line of lines) {
      if (line.trim() === '') continue;

      let isError = false;
      for (const ep of this.errorPatterns) {
        if (ep.test(line)) {
          isError = true;
          break;
        }
      }

      if (isError) {
        filteredLines.push(line);
        continue;
      }

      let isNoise = false;
      for (const np of this.noisePatterns) {
        if (np.test(line)) {
          isNoise = true;
          break;
        }
      }

      if (!isNoise) {
        // Keep it if it's not explicitly noisy
        filteredLines.push(line);
      }
    }

    return filteredLines.join('\n');
  }
}
