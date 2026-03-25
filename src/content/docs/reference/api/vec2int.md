---
title: Vec2Int
description: "2D integer vector. Used for grid coordinates, tile offsets, and directions. 8 bytes, immutable, value equality. Matches Godot's Y-down screen space: North is (0"
---

`Omnith.Ecs`

2D integer vector. Used for grid coordinates, tile offsets, and directions. 8 bytes, immutable, value equality. Matches Godot's Y-down screen space: North is (0, -1), South is (0, 1).

## Methods

| Name | Description |
|---|---|
| `ToKey` | Convert to a flat array index: Y * width + X. |
| `FromKey` | Convert a flat array index back to grid coordinates. |
| `ManhattanDistance` | Manhattan distance (4-directional step count). |
| `ChebyshevDistance` | Chebyshev distance (8-directional step count, "king moves"). |

