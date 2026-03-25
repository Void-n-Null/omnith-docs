---
title: OmnithMod
description: "Base class for mod entry points. Modders subclass this and override the lifecycle methods they care about. The engine discovers subclasses in loaded mod assembl"
sidebar:
  badge:
    text: Runtim
---

`Omnith.Data`

Base class for mod entry points. Modders subclass this and override the lifecycle methods they care about. The engine discovers subclasses in loaded mod assemblies and calls them at the right time. Lifecycle order: 1. OnRegister - register spec types, resource types 2. OnSpecsLoaded - all specs loaded, modify or cross-reference them 3. OnInitialize - world exists, register systems, spawn initial entities 4. OnWorldReady - world is populated and ready to play 5. OnTick - called every frame (use sparingly, prefer systems) 6. OnShutdown - cleanup before exit

## Properties

| Name | Description |
|---|---|
| `Manifest` | The mod's manifest. Set by the engine before any lifecycle method is called. |

## Methods

| Name | Description |
|---|---|
| `OnRegister` | Called first. Register custom spec types, resource categories, or anything that needs to exist before data loading begins. |
| `OnSpecsLoaded` | Called after all .data files are loaded and inheritance is resolved. Use this to read specs, validate cross-references, or modify specs before the world is created. |
| `OnInitialize` | Called after the world is created but before gameplay starts. Register systems, create blueprints, spawn initial entities. This is the primary entry point for most mods. |
| `OnWorldReady` | Called after the world is fully populated and ready to play. All systems are registered, all entities are spawned. |
| `OnTick` | Called every frame. Prefer registering an [ISystem](/reference/api/runtime/isystem/) instead -- this exists for mods that need to hook into the frame loop outside of the ECS (UI, input handling, etc). |
| `OnShutdown` | Called on game exit or when the mod is unloaded. Clean up any external resources. |

