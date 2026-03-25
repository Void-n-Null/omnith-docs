#!/usr/bin/env node
/**
 * Parses sdk/omnith.xml and generates categorized Starlight API reference
 * pages. Only surfaces types that matter to mod authors and engine users:
 * Specs, Systems, Stores, and key Runtime types.
 *
 * Run: bun run generate-api
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { parseStringPromise } from 'xml2js';

const OMNITH_ROOT = process.argv[2] || join(dirname(import.meta.dirname), '..', 'omnith');
const SDK_XML = join(OMNITH_ROOT, 'sdk', 'omnith.xml');
const SRC_DIR = join(OMNITH_ROOT, 'src');
const OUT_DIR = join(dirname(import.meta.dirname), 'src', 'content', 'docs', 'reference', 'api');

// ── Source scanning: detect class hierarchies ─────────────────────

function scanSourceFiles(dir) {
  const results = { specs: new Set(), systems: new Set(), stores: new Set() };
  walkDir(dir, filePath => {
    if (!filePath.endsWith('.cs')) return;
    const content = readFileSync(filePath, 'utf-8');

    // Match "class Foo : Spec" or "class Foo : ISystem" etc.
    for (const match of content.matchAll(/class\s+(\w+)\s*(?:<[^>]+>)?\s*:\s*([^{\n]+)/g)) {
      const className = match[1];
      const bases = match[2];
      if (bases.includes(': Spec') || bases.match(/\bSpec\b/)) results.specs.add(className);
      if (bases.includes('ISystem')) results.systems.add(className);
    }

    // Stores: classes that use Store<T> internally or have [OmnithStore]
    if (content.includes('[OmnithStore]') || content.match(/class\s+\w+Store\b/)) {
      for (const match of content.matchAll(/class\s+(\w+Store)\b/g)) {
        if (match[1] !== 'EntityStore') // internal, skip
          results.stores.add(match[1]);
      }
    }
  });
  // Also add the Spec base class itself
  results.specs.add('Spec');
  return results;
}

function walkDir(dir, callback) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, callback);
    else callback(full);
  }
}

// ── Key runtime types mod authors actually need ───────────────────

const RUNTIME_TYPES = new Set([
  'World', 'Entity', 'Blueprint', 'EventBus', 'ServicePool',
  'IComponentResolver', 'StaticResolver`1', 'DynamicResolver`1',
  'ComponentMeta', 'ComponentMeta`1', 'Store`1', 'SpawnTable',
  'ISystem', 'SystemRunner', 'IColumn', 'Column`1',
  'OmnithMod', 'ModContext', 'ModManifest',
  'ComponentFactoryRegistry', 'SpecRegistry', 'ResourceRegistry',
  'SpecLoader', 'SpecIdAttribute', 'Log',
]);

// ── Component structs (always useful to document) ─────────────────

const COMPONENT_STRUCTS = new Set([
  'Position', 'Velocity', 'Sprite', 'Health', 'GridPosition',
  'PathTarget', 'PathFollower', 'SpecRef',
]);

// ── Godot noise / internal types to always skip ───────────────────

const SKIP_PATTERNS = [
  /\.MethodName$/, /\.PropertyName$/, /\.SignalName$/,
  /GetGodotMethodList/, /InvokeGodotClassMethod/, /HasGodotClassMethod/,
  /GetGodotPropertyList/, /SetGodotProperty/, /GetGodotProperty/,
  /SaveGodotObjectData/, /LoadGodotObjectData/,
  /Benchmark/, /Demo$/, /Test$/, /Probe$/,
  /^Omnith\.Main$/, /^Omnith\.CameraController/,
  /^Omnith\.CombinedBenchmark/, /^Omnith\.RenderPipelineBenchmark/,
  /^Omnith\.StaticBenchmark/, /^Omnith\.SpecDebug/, /^Omnith\.SpecSpawnTest/,
  /^Omnith\.OmnithRuntime/, /^Omnith\.Render\./,
];

function shouldSkip(name) {
  return SKIP_PATTERNS.some(p => p.test(name));
}

function getNamespace(name) {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.substring(0, i) : '';
}

function getShortName(name) {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.substring(i + 1) : name;
}

function parseMemberName(raw) {
  return { kind: raw[0], name: raw.substring(2) };
}

function cleanSummary(summary) {
  if (!summary) return '';
  const text = typeof summary === 'string' ? summary : summary._;
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .replace(/<see cref="[TPM]:([^"]+)"\s*\/>/g, (_, r) => `\`${getShortName(r)}\``)
    .replace(/<paramref name="([^"]+)"\s*\/>/g, '`$1`')
    .replace(/<c>([^<]+)<\/c>/g, '`$1`')
    .replace(/<para\s*\/>/g, '\n\n')
    .replace(/<\/?para>/g, '\n\n')
    .trim();
}

// ── Categorize a type ─────────────────────────────────────────────

function categorize(shortName, sourceInfo) {
  if (sourceInfo.specs.has(shortName)) return 'specs';
  if (sourceInfo.systems.has(shortName)) return 'systems';
  if (sourceInfo.stores.has(shortName)) return 'stores';
  if (RUNTIME_TYPES.has(shortName)) return 'runtime';
  if (COMPONENT_STRUCTS.has(shortName)) return 'components';
  return null; // skip
}

const CATEGORY_META = {
  specs:      { label: 'Specs',      order: 1, description: 'Data-driven templates loaded from .data files' },
  systems:    { label: 'Systems',    order: 2, description: 'Per-frame logic that operates on entities' },
  stores:     { label: 'Stores',     order: 3, description: 'External data storage outside the ECS' },
  components: { label: 'Components', order: 4, description: 'ECS component structs attached to entities' },
  runtime:    { label: 'Runtime',    order: 5, description: 'Core engine types for modding and ECS' },
};

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(SDK_XML)) {
    console.error(`SDK XML not found: ${SDK_XML}`);
    process.exit(1);
  }

  console.log('Scanning source for class hierarchies...');
  const sourceInfo = scanSourceFiles(SRC_DIR);
  console.log(`  ${sourceInfo.specs.size} specs, ${sourceInfo.systems.size} systems, ${sourceInfo.stores.size} stores`);

  const xml = readFileSync(SDK_XML, 'utf-8');
  const parsed = await parseStringPromise(xml);
  const members = parsed.doc.members[0].member || [];

  // Group members by type
  const types = new Map();

  for (const member of members) {
    const { kind, name } = parseMemberName(member.$.name);
    if (shouldSkip(name)) continue;

    const summary = cleanSummary(member.summary?.[0]);

    if (kind === 'T') {
      const short = getShortName(name);
      if (!types.has(name)) {
        types.set(name, { shortName: short, ns: getNamespace(name), summary, properties: [], methods: [], fields: [] });
      } else {
        types.get(name).summary = summary;
      }
    } else {
      let parentType;
      if (kind === 'P' || kind === 'F') {
        parentType = getNamespace(name);
      } else if (kind === 'M') {
        parentType = getNamespace(name.replace(/\(.*\)$/, ''));
      }
      if (!parentType || shouldSkip(parentType) || !types.has(parentType)) continue;

      const entry = types.get(parentType);
      const shortName = kind === 'M'
        ? getShortName(name.replace(/\(.*\)$/, ''))
        : getShortName(name);

      if (shortName === '#ctor' || shortName.startsWith('op_')) continue;

      const item = { name: shortName, summary };
      if (kind === 'P') entry.properties.push(item);
      else if (kind === 'M') entry.methods.push(item);
      else if (kind === 'F') entry.fields.push(item);
    }
  }

  // Categorize and generate
  const categorized = new Map(); // category -> [pages]
  for (const cat of Object.keys(CATEGORY_META)) categorized.set(cat, []);

  for (const [fullName, type] of types) {
    const cat = categorize(type.shortName, sourceInfo);
    if (!cat) continue;
    if (!type.summary && type.properties.length === 0 && type.methods.length === 0 && type.fields.length === 0) continue;

    categorized.get(cat).push({ fullName, ...type });
  }

  // Write pages per category
  let totalPages = 0;
  for (const [cat, pages] of categorized) {
    if (pages.length === 0) continue;
    const catDir = join(OUT_DIR, cat);
    mkdirSync(catDir, { recursive: true });

    const meta = CATEGORY_META[cat];

    for (const page of pages) {
      const slug = page.shortName.toLowerCase().replace(/[<>`,]/g, '');
      let md = `---\ntitle: ${page.shortName}\ndescription: "${page.summary.replace(/"/g, '\\"').substring(0, 160)}"\nsidebar:\n  badge:\n    text: ${meta.label.slice(0, -1)}\n---\n\n`;

      md += `\`${page.ns}\`\n\n`;
      if (page.summary) md += `${page.summary}\n\n`;

      const props = page.properties.filter(p => p.summary);
      if (props.length > 0) {
        md += `## Properties\n\n| Name | Description |\n|---|---|\n`;
        for (const p of props) md += `| \`${p.name}\` | ${p.summary.replace(/\n/g, ' ')} |\n`;
        md += '\n';
      }

      const methods = page.methods.filter(m => m.summary);
      if (methods.length > 0) {
        md += `## Methods\n\n| Name | Description |\n|---|---|\n`;
        for (const m of methods) md += `| \`${m.name}\` | ${m.summary.replace(/\n/g, ' ')} |\n`;
        md += '\n';
      }

      const fields = page.fields.filter(f => f.summary && !f.name.startsWith('_'));
      if (fields.length > 0) {
        md += `## Fields\n\n| Name | Description |\n|---|---|\n`;
        for (const f of fields) md += `| \`${f.name}\` | ${f.summary.replace(/\n/g, ' ')} |\n`;
        md += '\n';
      }

      writeFileSync(join(catDir, `${slug}.md`), md);
      totalPages++;
      console.log(`  [${meta.label}] ${page.shortName}`);
    }
  }

  // Write index page
  let indexMd = `---\ntitle: API Reference\ndescription: Auto-generated from XML doc comments in omnith.dll\n---\n\nGenerated from \`sdk/omnith.xml\`. Rebuild with \`bun run generate-api\`.\n\n`;

  for (const [cat, pages] of categorized) {
    if (pages.length === 0) continue;
    const meta = CATEGORY_META[cat];
    indexMd += `## ${meta.label}\n\n${meta.description}\n\n`;
    for (const page of pages.sort((a, b) => a.shortName.localeCompare(b.shortName))) {
      const slug = page.shortName.toLowerCase().replace(/[<>`,]/g, '');
      indexMd += `- [\`${page.shortName}\`](/reference/api/${cat}/${slug}/) -- ${page.summary.split('.')[0]}.\n`;
    }
    indexMd += '\n';
  }

  writeFileSync(join(OUT_DIR, '..', 'api-index.md'), indexMd);
  console.log(`\nGenerated ${totalPages} API pages + index`);
}

main().catch(console.error);
