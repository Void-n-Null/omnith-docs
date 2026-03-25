---
title: Specs
description: Data-driven templates that define what things are.
---

A **spec** is a named, inheritable template loaded from `.data` files. Specs define *what* something is -- an entity's components, a world's parameters, terrain generation settings. They are loaded once at startup and are immutable at runtime.

## Spec types

The engine has several built-in spec types:

| Type key | C# class | Purpose |
|---|---|---|
| `entity` | `EntitySpec` | Spawnable entities with components |
| `world` | `WorldSpec` | World configuration (terrain gen, agent count) |
| `terrainGen` | `TerrainGenSpec` | Terrain generation parameters |
| `needs` | `NeedsSpec` | Needs profiles (hunger, rest, social rates) |

The type key is derived from the class name: strip `Spec`, lowercase. `EntitySpec` becomes `entity`, `TerrainGenSpec` becomes `terrainGen`.

Mods can register custom spec types via `ModContext.RegisterSpecType<T>()`.

## Defining a spec

Every `.data` file is a JSON array of spec objects. Each object must have `type` and `id`:

```json
[
  {
    "type": "entity",
    "id": "goblin",
    "sprite": {
      "resource": "sprites/goblin.png",
      "width": 14,
      "height": 20,
      "layer": 10,
      "anchorY": 0.75
    },
    "components": {
      "movement": { "moveSpeed": 0.04 }
    }
  }
]
```

## ID namespacing

Spec IDs are automatically qualified with the mod's ID:

- `"id": "goblin"` in a mod with ID `mymod` becomes `"mymod:goblin"`
- `"id": "core:cassidy"` is already qualified and left as-is

This applies to `id`, `extends`, and any string property marked with `[SpecId]`.

## Abstract specs

Specs with `"abstract": true` are templates only. They're used for inheritance but never produce anything directly:

```json
{
  "type": "entity",
  "id": "mobile",
  "abstract": true,
  "components": {
    "movement": { "moveSpeed": 0.05 }
  }
}
```

## Patching existing specs

To modify a spec from another mod, use its fully qualified ID:

```json
{
  "type": "entity",
  "id": "core:cassidy",
  "components": {
    "movement": { "moveSpeed": 0.01 }
  }
}
```

Since `core:cassidy` already exists, the engine merges your changes on top. Non-default fields override, components are merged additively (same ID replaces, new IDs are added).

## Replacing a spec entirely

If you need to completely redefine a spec (not merge), use the `replace` flag:

```json
{
  "type": "entity",
  "id": "core:cassidy",
  "replace": true,
  "extends": "some-other-base",
  "sprite": { ... },
  "components": { ... }
}
```

This throws away the existing definition and uses yours instead. No merging, no inherited state from the original.
