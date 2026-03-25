---
title: CellGrid
description: "Pure grid geometry. Handles dimensions, bounds checking, coordinate conversion, and neighbor queries. No tile data, no rendering, no game logic. Concrete grid t"
---

`Omnith.Sim`

Pure grid geometry. Handles dimensions, bounds checking, coordinate conversion, and neighbor queries. No tile data, no rendering, no game logic. Concrete grid types (Terrain, danger maps, weather grids) own a CellGrid for their spatial operations.

## Methods

| Name | Description |
|---|---|
| `InBounds` | Check if a grid position is within bounds. |
| `ToKey` | Convert grid position to flat array index. |
| `FromKey` | Convert flat array index to grid position. |
| `ToWorldCenter` | Convert grid position to world-space pixel center. |
| `FromWorld` | Convert world-space pixel position to grid position (truncating). |
| `GetNeighbors4` | Get all in-bounds 4-directional neighbors. Does NOT filter by walkability -- that's the responsibility of the concrete grid type (Terrain, etc.). |

