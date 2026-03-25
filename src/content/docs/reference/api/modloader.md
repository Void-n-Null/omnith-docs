---
title: ModLoader
description: "Discovers mods from core/ and mods/ directories, sorts by load order, and orchestrates loading of specs and resources."
---

`Omnith.Data`

Discovers mods from core/ and mods/ directories, sorts by load order, and orchestrates loading of specs and resources.

## Methods

| Name | Description |
|---|---|
| `DiscoverMods` | Discover and sort all mods. Does NOT load specs or resources -- the runtime controls that ordering to support mod lifecycle hooks. |
| `LoadModAssemblies` | Load DLL assemblies from each mod's Assemblies/ folder. Uses the same AssemblyLoadContext as the main game to avoid type duplication (critical for shared interfaces like OmnithMod). Returns all discovered OmnithMod instances. |

