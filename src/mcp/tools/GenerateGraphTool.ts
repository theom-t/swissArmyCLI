import * as fs from 'fs';
import * as path from 'path';

export class GenerateGraphTool {
  public execute(title: string, mermaidMarkup: string): string {
    const outDir = path.join(process.cwd(), '.swiss', 'graphs');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    const filepath = path.join(outDir, filename);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'dark' });
  </script>
</head>
<body style="background-color: #1a1a1a; color: white; display: flex; justify-content: center; padding: 50px;">
  <div class="mermaid">
    ${mermaidMarkup}
  </div>
</body>
</html>
    `;

    fs.writeFileSync(filepath, htmlContent);
    return `Graph successfully generated and saved to ${filepath}`;
  }
}
