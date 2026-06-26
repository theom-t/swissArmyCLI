import { describe, it, expect, beforeEach } from 'vitest';
import { ContextFilter } from '../src/filter/ContextFilter';

describe('ContextFilter (OMNI-style)', () => {
  let filter: ContextFilter;

  beforeEach(() => {
    filter = new ContextFilter();
  });

  it('should strip out progress bars and noise', () => {
    const raw = `[INFO] Starting build...
Downloading https://registry.npmjs.org/chalk... [100%]
Extracting tarball...
[===================>] 100%
npm ERR! ERESOLVE unable to resolve dependency tree
added 145 packages in 10s`;
    
    const cleaned = filter.stripNoise(raw);
    
    expect(cleaned).not.toContain('Downloading');
    expect(cleaned).not.toContain('Extracting');
    expect(cleaned).not.toContain('100%');
    expect(cleaned).toContain('npm ERR! ERESOLVE');
  });

  it('should reduce a 10,000 line noisy log to just the errors', () => {
    const noisyLines = [];
    for (let i = 0; i < 9999; i++) {
      noisyLines.push(`Downloading package-${i} from registry... [OK]`);
    }
    noisyLines.push('npm ERR! code EACCES');
    noisyLines.push('npm ERR! syscall symlink');

    const rawLogs = noisyLines.join('\n');
    
    // Total lines is 10,001
    expect(rawLogs.split('\n').length).toBe(10001);

    const cleaned = filter.stripNoise(rawLogs);
    const cleanedLines = cleaned.split('\n');
    
    // We expect a massive reduction in size
    expect(cleanedLines.length).toBeLessThan(10);
    expect(cleaned).toContain('npm ERR! code EACCES');
    expect(cleaned).toContain('npm ERR! syscall symlink');
    expect(cleaned).not.toContain('Downloading');
  });
});
