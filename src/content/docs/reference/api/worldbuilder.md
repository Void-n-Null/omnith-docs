---
title: WorldBuilder
description: "Builds the game world from specs and resources. Called by the runtime during setup. Not a system, not a mod -- this is the base game's world construction logic."
---

`Omnith.Sim`

Builds the game world from specs and resources. Called by the runtime during setup. Not a system, not a mod -- this is the base game's world construction logic. Reads WorldSpec ("core:default") for top-level config, then resolves the referenced TerrainGenSpec for terrain generation parameters. All previously-hardcoded values (grid size, noise, thresholds) are now data-driven from .data files.

## Methods

| Name | Description |
|---|---|
| `Build` | Build terrain and spawn initial entities from the world spec. |

