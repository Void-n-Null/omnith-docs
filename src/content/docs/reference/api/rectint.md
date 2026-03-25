---
title: RectInt
description: "Integer rectangle defined by two Vec2Int corners (inclusive). Used for grid bounds, regions, spatial queries, and tile iteration."
---

`Omnith.Ecs`

Integer rectangle defined by two Vec2Int corners (inclusive). Used for grid bounds, regions, spatial queries, and tile iteration.

## Methods

| Name | Description |
|---|---|
| `Contains` | Check if a point is within the rectangle (inclusive). |
| `Clamp` | Clamp a point to within the rectangle bounds. |
| `ForEach` | Iterate all cells in the rectangle via callback. Zero allocation. |
| `GetCells` | Return all cells as a materialized list. Allocates Width * Height elements. Use when you need to store or pass a snapshot. For iteration prefer ForEach or foreach. |
| `GetEnumerator` | Struct enumerator for zero-allocation foreach: foreach (var cell in rect) { ... } |
| `FromSize` | Create a rectangle from an origin + size. |
| `FromSize` | Create a rectangle from raw origin + size values. |

