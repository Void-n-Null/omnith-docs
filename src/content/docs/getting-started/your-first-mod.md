---
title: Your First Mod
description: Create a data-only mod that patches an existing entity.
---

This walkthrough creates a mod that slows down Cassidy's movement speed. No C# required.

## 1. Create the mod directory

```
mods/
  slow-cassidy/
    mod.data
    Specs/
      patch.data
```

## 2. Write the manifest

**`mod.data`**
```json
{
  "id": "slow-cassidy",
  "name": "Slow Cassidy",
  "version": "1.0.0",
  "description": "Makes Cassidy walk slower.",
  "load_order": 100,
  "dependencies": ["core"],
  "load_after": ["core"]
}
```

- `id` -- unique identifier, used as the namespace prefix for this mod's specs
- `dependencies` -- mods that must be present (load fails if missing)
- `load_after` -- ordering hint (your `.data` files process after these mods)

## 3. Patch the entity

**`Specs/patch.data`**
```json
[
  {
    "type": "entity",
    "id": "core:cassidy",
    "components": {
      "movement": { "moveSpeed": 0.01 }
    }
  }
]
```

By using `"id": "core:cassidy"` (a fully qualified ID pointing to core's spec), the engine merges this on top of the existing cassidy definition. The `movement` component's `moveSpeed` is overridden to `0.01`. Everything else (sprite, other components) stays unchanged.

## 4. Launch the game

Place your `slow-cassidy/` folder in `mods/` and start the game. The log should show:

```
[SpecRegistry] Merged spec 'core:cassidy' (mod patch applied)
```

Cassidy now moves at `0.01` speed instead of the default `0.03`.

## What just happened?

1. The engine discovered your mod via `mod.data`
2. It loaded `Specs/patch.data` after core (because of `load_after`)
3. The spec `core:cassidy` already existed from core's files
4. Your spec had the same ID, so `EntitySpec.MergeFrom()` ran
5. The `movement` component resolver was replaced with your slower version
6. All other fields and components were untouched

This is the fundamental pattern: **same ID = merge, new ID = create**.
