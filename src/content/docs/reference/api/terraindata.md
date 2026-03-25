---
title: TerrainData
description: "Pure data layer for the tile grid. No Godot, no rendering, no Node references. Owns tile data, walkability, occupancy, and generation helpers. Testable without "
---

`Omnith.Sim`

Pure data layer for the tile grid. No Godot, no rendering, no Node references. Owns tile data, walkability, occupancy, and generation helpers. Testable without Godot. Rendering is handled by RenderBridge via RegisterTerrain() which reads from this to build reactive MultiMesh batches.

## Properties

| Name | Description |
|---|---|
| `RenderDirty` | Set when tile data changes. Rendering wrapper checks this to know when to rebuild. |
| `Tiles` | Direct access to the tile array for rendering. Read-only usage expected. |

## Methods

| Name | Description |
|---|---|
| `GetWalkableNeighbors` | Get walkable 4-directional neighbors. |

