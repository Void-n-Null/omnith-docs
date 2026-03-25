---
title: Introduction
description: What Omnith is and how modding works.
---

Omnith is a moddable game engine built on Godot 4 with a custom Entity Component System (ECS). Everything in the game -- entities, terrain generation, world configuration -- is defined through `.data` files that mods can add to, patch, or replace.

## Architecture

The engine has three layers:

1. **Data layer** -- Specs (configuration templates) loaded from `.data` files. Defines *what* things are.
2. **ECS layer** -- Entities, components (plain structs), and systems that run each frame. The runtime simulation.
3. **Render layer** -- Godot-backed sprite rendering with batching and culling.

Mods interact primarily with the first two layers.

## What can a mod do?

**Without any C# code:**
- Add new entities with any combination of existing components
- Patch existing entities (change stats, add components, remove components)
- Override world configuration (map size, agent count, terrain parameters)
- Define inheritance hierarchies (`extends`) for entity templates

**With C# code:**
- Define new component structs (new data types for entities)
- Register component factories (custom parsing logic for `.data` files)
- Register systems (per-frame logic that operates on entities)
- Hook into the mod lifecycle (startup, initialization, shutdown)

## Mod loading

Mods live in the `mods/` directory. Each mod has:
- A `mod.data` manifest declaring its ID, dependencies, and load order
- Optional `Specs/` directory with `.data` files
- Optional C# assembly (`.dll`) for custom behavior

Mods load in dependency order. A mod's `.data` files are processed after its dependencies, so patches always apply on top of the specs they reference.

## ID namespacing

Every spec has a namespaced ID like `core:cassidy` or `rainbow:sparkle`. The prefix before the `:` is the mod's ID. When writing `.data` files, you can omit the prefix for specs in the same mod:

```json
{ "id": "cassidy" }           // becomes "core:cassidy" in core's files
{ "extends": "mobile" }       // becomes "extends": "core:mobile"
{ "agentSpec": "cassidy" }    // auto-qualified on [SpecId] fields
```

To reference another mod's spec, use the full qualified ID:

```json
{ "extends": "core:mobile" }  // explicit cross-mod reference
```
