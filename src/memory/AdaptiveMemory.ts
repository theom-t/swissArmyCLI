import Database from 'better-sqlite3';
import * as path from 'path';
import * as os from 'os';

export class AdaptiveMemory {
  private db: Database.Database;

  constructor(dbName: string = '.swiss_memory.db') {
    const dbPath = path.join(os.homedir(), dbName);
    this.db = new Database(dbPath);
    this.initSchema();
  }

  private initSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        summary TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rule TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public autoSave(summary: string) {
    const stmt = this.db.prepare('INSERT INTO sessions (summary) VALUES (?)');
    stmt.run(summary);
  }

  public injectSessionSummary(): string | null {
    const stmt = this.db.prepare('SELECT summary FROM sessions ORDER BY id DESC LIMIT 1');
    const row = stmt.get() as { summary: string } | undefined;
    return row ? row.summary : null;
  }

  public rememberRule(rule: string) {
    const stmt = this.db.prepare('INSERT INTO rules (rule) VALUES (?)');
    stmt.run(rule);
  }

  public async compressSession(minorModelRouter: any, rawLogs: string): Promise<string> {
    // In production, this would call the Minor Model via providerRouter to summarize the rawLogs
    // For Phase 4 verification, we mock the compression.
    return `[Compressed State]: User was working on task. Last context size: ${rawLogs.length} chars.`;
  }
}
