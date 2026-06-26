export class AgentRouter {
  public route(command: string): string {
    const normalized = command.toLowerCase();
    
    // Heuristic routing for Phase 7
    if (normalized.includes('test') || normalized.includes('qa')) return 'qa_tester';
    if (normalized.includes('review') || normalized.includes('audit code')) return 'code_reviewer';
    if (normalized.includes('deploy') || normalized.includes('docker') || normalized.includes('ci/cd')) return 'devops_engineer';
    if (normalized.includes('security') || normalized.includes('hack')) return 'security_auditor';
    if (normalized.includes('design') && normalized.includes('system')) return 'system_architect';
    if (normalized.includes('design') && (normalized.includes('ui') || normalized.includes('ux'))) return 'ux_designer';
    if (normalized.includes('data') || normalized.includes('model') || normalized.includes('machine learning')) return 'data_scientist';
    if (normalized.includes('sql') || normalized.includes('database')) return 'database_admin';
    if (normalized.includes('email') || normalized.includes('draft') || normalized.includes('copy')) return 'copywriter';
    if (normalized.includes('market') || normalized.includes('seo')) return 'marketing_specialist';
    if (normalized.includes('sprint') || normalized.includes('jira')) return 'product_manager';
    if (normalized.includes('business')) return 'business_analyst';
    
    // Default to software engineer
    return 'software_engineer';
  }
}
