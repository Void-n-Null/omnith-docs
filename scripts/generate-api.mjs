#!/usr/bin/env node
/**
 * Parses sdk/omnith.xml and generates Starlight-compatible markdown
 * API reference pages. Run with: bun run generate-api
 *
 * Filters out Godot source-gen noise (MethodName, PropertyName, etc.)
 * and focuses on the public modding API.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { parseStringPromise } from 'xml2js';

const SDK_XML = process.argv[2] || join(dirname(import.meta.dirname), '..', 'omnith', 'sdk', 'omnith.xml');
const OUT_DIR = join(dirname(import.meta.dirname), 'src', 'content', 'docs', 'reference', 'api');

// Namespaces we care about for the modding API
const INCLUDED_NAMESPACES = [
  'Omnith.Data',
  'Omnith.Ecs',
  'Omnith.Sim',
  'Omnith',
];

// Types/patterns to skip (Godot source-gen, internal, benchmarks)
const SKIP_PATTERNS = [
  /\.MethodName$/,
  /\.PropertyName$/,
  /\.SignalName$/,
  /GetGodotMethodList/,
  /InvokeGodotClassMethod/,
  /HasGodotClassMethod/,
  /GetGodotPropertyList/,
  /SetGodotProperty/,
  /GetGodotProperty/,
  /SaveGodotObjectData/,
  /LoadGodotObjectData/,
  /Benchmark/,
  /Demo$/,
  /Test$/,
  /Probe$/,
  /^Omnith\.Main$/,
  /^Omnith\.CameraController/,
  /^Omnith\.CombinedBenchmark/,
  /^Omnith\.RenderPipelineBenchmark/,
  /^Omnith\.StaticBenchmark/,
  /^Omnith\.SpecDebug/,
  /^Omnith\.SpecSpawnTest/,
  /^Omnith\.OmnithRuntime/,
  /^Omnith\.Render\./,
];

function shouldSkip(name) {
  return SKIP_PATTERNS.some(p => p.test(name));
}

function getNamespace(fullName) {
  const lastDot = fullName.lastIndexOf('.');
  return lastDot > 0 ? fullName.substring(0, lastDot) : '';
}

function getShortName(fullName) {
  const lastDot = fullName.lastIndexOf('.');
  return lastDot > 0 ? fullName.substring(lastDot + 1) : fullName;
}

// Parse member name like "T:Omnith.Data.EntitySpec" or "P:Omnith.Data.EntitySpec.Sprite"
function parseMemberName(raw) {
  const kind = raw[0]; // T=type, P=property, M=method, F=field
  const name = raw.substring(2);
  return { kind, name };
}

function cleanSummary(summary) {
  if (!summary) return '';
  const text = typeof summary === 'string' ? summary : summary._;
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .replace(/<see cref="[TPM]:([^"]+)"\s*\/>/g, (_, ref) => `\`${getShortName(ref)}\``)
    .replace(/<paramref name="([^"]+)"\s*\/>/g, '`$1`')
    .replace(/<c>([^<]+)<\/c>/g, '`$1`')
    .replace(/<para\s*\/>/g, '\n\n')
    .replace(/<\/?para>/g, '\n\n')
    .trim();
}

async function main() {
  if (!existsSync(SDK_XML)) {
    console.error(`SDK XML not found: ${SDK_XML}`);
    console.error('Build omnith first: dotnet build');
    process.exit(1);
  }

  const xml = readFileSync(SDK_XML, 'utf-8');
  const parsed = await parseStringPromise(xml);
  const members = parsed.doc.members[0].member || [];

  // Group members by type
  const types = new Map(); // fullTypeName -> { summary, properties, methods, fields }

  for (const member of members) {
    const { kind, name } = parseMemberName(member.$.name);
    if (shouldSkip(name)) continue;

    const ns = getNamespace(name);
    if (!INCLUDED_NAMESPACES.some(inc => ns === inc || ns.startsWith(inc + '.'))) continue;

    const summary = cleanSummary(member.summary?.[0]);

    if (kind === 'T') {
      if (!types.has(name)) {
        types.set(name, { summary, properties: [], methods: [], fields: [] });
      } else {
        types.get(name).summary = summary;
      }
    } else {
      // Find parent type
      let parentType;
      if (kind === 'P' || kind === 'F') {
        parentType = getNamespace(name);
      } else if (kind === 'M') {
        // Method names have parens: M:Ns.Type.Method(params)
        const withoutParams = name.replace(/\(.*\)$/, '');
        parentType = getNamespace(withoutParams);
      }

      if (!parentType) continue;
      if (shouldSkip(parentType)) continue;
      if (!types.has(parentType)) {
        types.set(parentType, { summary: '', properties: [], methods: [], fields: [] });
      }

      const entry = types.get(parentType);
      const shortName = kind === 'M'
        ? getShortName(name.replace(/\(.*\)$/, ''))
        : getShortName(name);

      // Skip constructors and operator overloads for cleaner output
      if (shortName === '#ctor' || shortName.startsWith('op_')) continue;

      const item = { name: shortName, summary, fullName: name };

      if (kind === 'P') entry.properties.push(item);
      else if (kind === 'M') entry.methods.push(item);
      else if (kind === 'F') entry.fields.push(item);
    }
  }

  // Generate markdown files grouped by category
  mkdirSync(OUT_DIR, { recursive: true });

  const categories = {
    'Omnith.Data': { label: 'Data Layer', slug: 'data' },
    'Omnith.Ecs': { label: 'ECS', slug: 'ecs' },
    'Omnith.Sim': { label: 'Simulation', slug: 'sim' },
    'Omnith': { label: 'Core', slug: 'core' },
  };

  const generatedPages = [];

  for (const [fullName, type] of types) {
    const ns = getNamespace(fullName);
    const shortName = getShortName(fullName);

    // Skip nested types and types with no useful content
    if (shortName.includes('+')) continue;
    if (!type.summary && type.properties.length === 0 && type.methods.length === 0) continue;

    const slug = shortName.toLowerCase().replace(/[<>`,]/g, '');
    const fileName = `${slug}.md`;

    let md = `---\ntitle: ${shortName}\ndescription: "${type.summary.replace(/"/g, '\\"').substring(0, 160)}"\n---\n\n`;

    // Namespace badge
    md += `\`${ns}\`\n\n`;

    if (type.summary) {
      md += `${type.summary}\n\n`;
    }

    // Properties
    const props = type.properties.filter(p => p.summary);
    if (props.length > 0) {
      md += `## Properties\n\n`;
      md += `| Name | Description |\n|---|---|\n`;
      for (const p of props) {
        md += `| \`${p.name}\` | ${p.summary.replace(/\n/g, ' ')} |\n`;
      }
      md += '\n';
    }

    // Methods
    const methods = type.methods.filter(m => m.summary);
    if (methods.length > 0) {
      md += `## Methods\n\n`;
      md += `| Name | Description |\n|---|---|\n`;
      for (const m of methods) {
        md += `| \`${m.name}\` | ${m.summary.replace(/\n/g, ' ')} |\n`;
      }
      md += '\n';
    }

    // Fields (for structs/enums)
    const fields = type.fields.filter(f => f.summary && !f.name.startsWith('_'));
    if (fields.length > 0) {
      md += `## Fields\n\n`;
      md += `| Name | Description |\n|---|---|\n`;
      for (const f of fields) {
        md += `| \`${f.name}\` | ${f.summary.replace(/\n/g, ' ')} |\n`;
      }
      md += '\n';
    }

    writeFileSync(join(OUT_DIR, fileName), md);
    generatedPages.push({ shortName, slug, ns, fileName });
    console.log(`  ${shortName} (${ns})`);
  }

  // Generate index page
  let indexMd = `---\ntitle: API Reference\ndescription: Auto-generated from XML doc comments in omnith.dll\n---\n\n`;
  indexMd += `Generated from \`sdk/omnith.xml\`. Rebuild with \`bun run generate-api\`.\n\n`;

  // Group by namespace
  const byNs = new Map();
  for (const page of generatedPages) {
    if (!byNs.has(page.ns)) byNs.set(page.ns, []);
    byNs.get(page.ns).push(page);
  }

  for (const [ns, pages] of byNs) {
    const cat = categories[ns];
    indexMd += `## ${cat?.label || ns}\n\n`;
    for (const page of pages.sort((a, b) => a.shortName.localeCompare(b.shortName))) {
      indexMd += `- [\`${page.shortName}\`](/reference/api/${page.slug}/)\n`;
    }
    indexMd += '\n';
  }

  writeFileSync(join(OUT_DIR, '..', 'api-index.md'), indexMd);
  console.log(`\nGenerated ${generatedPages.length} API pages + index`);
}

main().catch(console.error);
