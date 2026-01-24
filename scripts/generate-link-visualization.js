#!/usr/bin/env node

/**
 * Generates an interactive HTML visualization of the link structure.
 */

const fs = require('fs');
const path = require('path');

const analysisPath = path.join(__dirname, '../link-analysis.json');
const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));

const navigationPath = path.join(__dirname, '../app/utils/navigation.ts');
const navigationContent = fs.readFileSync(navigationPath, 'utf-8');

const arrayStart = navigationContent.indexOf('export const docPages: DocPage[] = [');
let bracketCount = 0;
let arrayEnd = arrayStart;
for (let i = arrayStart + 'export const docPages: DocPage[] = ['.length; i < navigationContent.length; i++) {
  if (navigationContent[i] === '[') bracketCount++;
  if (navigationContent[i] === ']') {
    if (bracketCount === 0) {
      arrayEnd = i;
      break;
    }
    bracketCount--;
  }
}

const arrayContent = navigationContent.substring(
  arrayStart + 'export const docPages: DocPage[] = ['.length,
  arrayEnd
);

const docPages = [];
const entryRegex = /\{\s*path:\s*'([^']+)',\s*mdFile:\s*'([^']+)',\s*title:\s*'([^']+)',\s*section:\s*'([^']+)'\s*\}/g;

let match;
while ((match = entryRegex.exec(arrayContent)) !== null) {
  docPages.push({
    path: match[1],
    mdFile: match[2],
    title: match[3],
    section: match[4],
  });
}

// Section colors
const sectionColors = {
  fundamentals: '#3b82f6',    // blue
  history: '#8b5cf6',          // purple
  bitcoin: '#ef4444',           // red
  mining: '#f59e0b',            // amber
  wallets: '#10b981',           // green
  lightning: '#06b6d4',         // cyan
  development: '#ec4899',      // pink
  controversies: '#f97316',     // orange
  glossary: '#6b7280',          // gray
};

const nodes = [];
const edges = [];
const nodeMap = new Map();

docPages.forEach((page, index) => {
  const nodeId = page.path;
  const section = page.section;
  const color = sectionColors[section] || '#6b7280';

  const incomingCount = analysis.mostLinked.find(m => m.path === page.path)?.count || 0;

  const size = Math.max(20, Math.min(50, 20 + incomingCount * 3));
  
  nodes.push({
    id: nodeId,
    label: page.title.length > 30 ? page.title.substring(0, 30) + '...' : page.title,
    title: `${page.title}\n${page.path}\nSection: ${section}\nIncoming links: ${incomingCount}`,
    color: {
      background: color,
      border: color,
      highlight: { background: color, border: color },
    },
    size: size,
    font: { size: 12 },
    shape: 'box',
  });
  
  nodeMap.set(nodeId, { page, incomingCount });
});

// Edges from markdown links
const docsDir = path.join(__dirname, '../app/docs');
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const edgesMap = new Map();

function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const markdownFiles = findMarkdownFiles(docsDir);
const mdFileToPage = new Map();
docPages.forEach(page => {
  mdFileToPage.set(page.mdFile, page);
});

markdownFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(path.join(__dirname, '../app/docs'), filePath);
  
  const page = Array.from(mdFileToPage.values()).find(
    p => p.mdFile === `app/docs/${relativePath.replace(/\\/g, '/')}`
  );
  
  if (!page) return;
  
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const [, , linkUrl] = match;
    
    if (linkUrl.startsWith('/docs/') && !linkUrl.startsWith('/docs/glossary#')) {
      const targetPath = linkUrl.split('#')[0];

      if (nodeMap.has(targetPath) && page.path !== targetPath) {
        const edgeKey = `${page.path}->${targetPath}`;
        if (!edgesMap.has(edgeKey)) {
          edgesMap.set(edgeKey, {
            from: page.path,
            to: targetPath,
            arrows: 'to',
            color: { color: '#94a3b8', opacity: 0.6 },
            width: 1,
          });
        }
      }
    }
  }
});

edges.push(...Array.from(edgesMap.values()));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation Link Structure Visualization</title>
  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      overflow: hidden;
    }
    
    #header {
      background: #1e293b;
      padding: 1rem 2rem;
      border-bottom: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #f1f5f9;
    }
    
    #stats {
      display: flex;
      gap: 2rem;
      font-size: 0.875rem;
      color: #94a3b8;
    }
    
    #controls {
      background: #1e293b;
      padding: 1rem 2rem;
      border-bottom: 1px solid #334155;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .control-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    label {
      font-size: 0.875rem;
      color: #cbd5e1;
    }
    
    select, button {
      background: #334155;
      color: #e2e8f0;
      border: 1px solid #475569;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      cursor: pointer;
    }
    
    select:hover, button:hover {
      background: #475569;
    }
    
    button {
      background: #3b82f6;
      border-color: #3b82f6;
    }
    
    button:hover {
      background: #2563eb;
    }
    
    #network {
      width: 100vw;
      height: calc(100vh - 140px);
      background: #0f172a;
    }
    
    #legend {
      position: absolute;
      top: 120px;
      right: 20px;
      background: rgba(30, 41, 59, 0.95);
      border: 1px solid #334155;
      border-radius: 0.5rem;
      padding: 1rem;
      font-size: 0.75rem;
      max-width: 200px;
      z-index: 100;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 2px;
    }
    
    #info {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(30, 41, 59, 0.95);
      border: 1px solid #334155;
      border-radius: 0.5rem;
      padding: 1rem;
      font-size: 0.875rem;
      max-width: 300px;
      display: none;
    }
    
    #info.visible {
      display: block;
    }
  </style>
</head>
<body>
  <div id="header">
    <h1>📚 Documentation Link Structure</h1>
    <div id="stats">
      <span>📄 ${analysis.statistics.totalPages} pages</span>
      <span>🔗 ${analysis.statistics.totalLinks} links</span>
      <span>✅ ${analysis.statistics.totalLinks - analysis.statistics.brokenLinks} valid</span>
    </div>
  </div>
  
  <div id="controls">
    <div class="control-group">
      <label for="layout">Layout:</label>
      <select id="layout">
        <option value="hierarchical">Hierarchical</option>
        <option value="force">Force-Directed</option>
        <option value="circular">Circular</option>
      </select>
    </div>
    
    <div class="control-group">
      <label for="section">Filter Section:</label>
      <select id="section">
        <option value="all">All Sections</option>
        <option value="fundamentals">Fundamentals</option>
        <option value="history">History</option>
        <option value="bitcoin">Bitcoin Protocol</option>
        <option value="mining">Mining</option>
        <option value="wallets">Wallets</option>
        <option value="lightning">Lightning</option>
        <option value="development">Development</option>
        <option value="controversies">Controversies</option>
        <option value="glossary">Glossary</option>
      </select>
    </div>
    
    <button onclick="resetView()">Reset View</button>
    <button onclick="fitNetwork()">Fit to Screen</button>
  </div>
  
  <div id="legend">
    <div style="font-weight: 600; margin-bottom: 0.75rem; color: #f1f5f9;">Sections</div>
    ${Object.entries(sectionColors).map(([section, color]) => `
      <div class="legend-item">
        <div class="legend-color" style="background: ${color};"></div>
        <span>${section.charAt(0).toUpperCase() + section.slice(1)}</span>
      </div>
    `).join('')}
  </div>
  
  <div id="network"></div>
  <div id="info"></div>
  
  <script>
    const nodes = ${JSON.stringify(nodes)};
    const edges = ${JSON.stringify(edges)};
    const sectionColors = ${JSON.stringify(sectionColors)};
    
    let allNodes = nodes;
    let allEdges = edges;
    let filteredNodes = nodes;
    let filteredEdges = edges;
    
    const container = document.getElementById('network');
    const data = {
      nodes: new vis.DataSet(filteredNodes),
      edges: new vis.DataSet(filteredEdges),
    };
    
    const options = {
      nodes: {
        shape: 'box',
        font: {
          size: 12,
          color: '#ffffff',
        },
        borderWidth: 2,
        shadow: true,
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.8,
          },
        },
        smooth: {
          type: 'continuous',
          roundness: 0.5,
        },
        color: {
          color: '#94a3b8',
          opacity: 0.6,
        },
        width: 1,
      },
      physics: {
        enabled: true,
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 200,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09,
        },
        solver: 'hierarchicalRepulsion',
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed',
          levelSeparation: 150,
          nodeSpacing: 200,
        },
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        zoomView: true,
        dragView: true,
      },
    };
    
    const network = new vis.Network(container, data, options);

    document.getElementById('layout').addEventListener('change', (e) => {
      const layout = e.target.value;
      if (layout === 'hierarchical') {
        options.layout.hierarchical.enabled = true;
        options.physics.solver = 'hierarchicalRepulsion';
      } else if (layout === 'force') {
        options.layout.hierarchical.enabled = false;
        options.physics.solver = 'forceAtlas2Based';
        options.physics.forceAtlas2Based = {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 200,
          springConstant: 0.08,
        };
      } else if (layout === 'circular') {
        options.layout.hierarchical.enabled = false;
        options.physics.solver = 'circular';
      }
      network.setOptions(options);
    });
    
    const pageDataMap = ${JSON.stringify(docPages.reduce((acc, p) => { acc[p.path] = p; return acc; }, {}))};

    document.getElementById('section').addEventListener('change', (e) => {
      const section = e.target.value;
      if (section === 'all') {
        filteredNodes = allNodes;
        filteredEdges = allEdges.filter(edge =>
          allNodes.find(n => n.id === edge.from) && allNodes.find(n => n.id === edge.to)
        );
      } else {
        const sectionNodes = allNodes.filter(node => {
          const pageData = pageDataMap[node.id];
          return pageData && pageData.section === section;
        });

        const sectionNodeIds = new Set(sectionNodes.map(n => n.id));
        filteredNodes = sectionNodes;
        filteredEdges = allEdges.filter(edge =>
          sectionNodeIds.has(edge.from) && sectionNodeIds.has(edge.to)
        );
      }
      
      data.nodes.clear();
      data.edges.clear();
      data.nodes.add(filteredNodes);
      data.edges.add(filteredEdges);
    });

    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = allNodes.find(n => n.id === nodeId);
        if (node) {
          const pageData = pageDataMap[nodeId];
          const info = document.getElementById('info');
          const incomingCount = pageData ? (${JSON.stringify(analysis.mostLinked)}.find(m => m.path === nodeId)?.count || 0) : 0;
          info.innerHTML = \`
            <div style="font-weight: 600; margin-bottom: 0.5rem; color: #f1f5f9;">\${node.label}</div>
            <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.5rem;">\${nodeId}</div>
            <div style="color: #cbd5e1; font-size: 0.75rem; margin-bottom: 0.5rem;">Section: \${pageData ? pageData.section : 'unknown'}</div>
            <div style="color: #cbd5e1; font-size: 0.75rem; margin-bottom: 0.75rem;">Incoming links: \${incomingCount}</div>
            <div style="color: #3b82f6; cursor: pointer; text-decoration: underline;">Click to open page</div>
          \`;
          info.classList.add('visible');
          info.onclick = () => window.open(nodeId, '_blank');
        }
      } else {
        document.getElementById('info').classList.remove('visible');
      }
    });

    function resetView() {
      network.fit({
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
    }

    function fitNetwork() {
      network.fit({
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
    }

    setTimeout(() => {
      network.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      });
    }, 500);
  </script>
</body>
</html>`;

// Output to public/data
const outputPath = path.join(__dirname, '../public/data/link-visualization.html');
fs.writeFileSync(outputPath, html);
console.log(`✅ Visualization generated: ${outputPath}`);
console.log(`   Accessible at: https://bplusplus.info/data/link-visualization.html`);
console.log(`   Or open it locally in your browser!`);
