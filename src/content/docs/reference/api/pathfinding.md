---
title: Pathfinding
description: "A* pathfinding on a 2D grid. Manhattan heuristic, 4-directional. Supports occupancy-aware mode: occupied tiles within a radius of the entity are treated as bloc"
---

`Omnith.Sim`

A* pathfinding on a 2D grid. Manhattan heuristic, 4-directional. Supports occupancy-aware mode: occupied tiles within a radius of the entity are treated as blocked. Falls back to ignoring occupants if no path is found. Performance: uses flat arrays with a generation counter instead of Dictionary for gScore and cameFrom. Every lookup is a direct array index (O(1) with no hashing). The generation trick provides instant "clearing" between calls -- just increment the counter.

## Methods

| Name | Description |
|---|---|
| `FindPath` | Find a path, treating nearby occupied tiles as blocked. If no path is found, retries ignoring all occupants. |
| `FindPath` | Find a path ignoring all occupants. Original behavior. |

## Fields

| Name | Description |
|---|---|
| `OccupancyRadius` | Radius around the entity's start position where occupied tiles count as blocked. |
| `MaxNodes` | Maximum nodes to explore before giving up. Prevents runaway searches on large grids. |

