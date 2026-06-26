import { describe, it, expect, beforeEach } from 'vitest';
import { ToolSearch } from '../src/mcp/ToolSearch';

describe('ToolSearch', () => {
  let search: ToolSearch;

  beforeEach(() => {
    search = new ToolSearch();
  });

  it('should find read_file schema for database schema intent', () => {
    const schemas = search.searchTools('read the database schema');
    expect(schemas.length).toBe(1);
    expect(schemas[0].name).toBe('read_file');
  });

  it('should find draft_email schema for email intent', () => {
    const schemas = search.searchTools('draft an email to the client');
    expect(schemas.length).toBe(1);
    expect(schemas[0].name).toBe('draft_email');
  });

  it('should return multiple tools if intent is broad', () => {
    const schemas = search.searchTools('read the schema and write code');
    expect(schemas.length).toBe(2);
    const names = schemas.map(s => s.name);
    expect(names).toContain('read_file');
    expect(names).toContain('write_file');
  });
});
