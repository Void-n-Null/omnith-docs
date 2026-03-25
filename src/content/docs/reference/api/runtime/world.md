---
title: World
description: "The ECS world. Owns all entities, archetypes, and component data. Entry point for creating entities, adding/removing components, and querying."
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

The ECS world. Owns all entities, archetypes, and component data. Entry point for creating entities, adding/removing components, and querying.

## Methods

| Name | Description |
|---|---|
| `Spawn` | Spawn a bare entity with no components. |
| `Spawn` | Spawn an entity from a blueprint. |
| `Spawn` | Spawn an entity from a blueprint with a specific RNG. |
| `Add``1` | Add a component to an entity. Moves it to a new archetype. |
| `Remove``1` | Remove a component from an entity. Moves it to a new archetype. |
| `Get``1` | Get a reference to an entity's component. [Entity](/reference/api/runtime/entity/) must have the component. |
| `TryGet``1` | Try to get a reference to an entity's component. Returns false if the entity is dead or lacks the component. |
| `Has``1` | Check if an entity has a specific component. |
| `Each``1` | Iterate all entities with the given component, providing a ref to the component. |
| `Each``2` | Iterate all entities with both components. |
| `Each``3` | Iterate all entities with three components. |
| `ParallelEach``2` | Parallel iteration over all entities with two components. Callback receives raw component refs only (no [Entity](/reference/api/runtime/entity/) handle). Safe for systems where each entity's update is independent. Splits work across 8 threads within each archetype table. |
| `ParallelEach``3` | Parallel iteration over all entities with three components. |
| `ForMatchingArchetypes` | Iterate matching archetypes and report their entity count. Used by the render bridge to pre-count before packing. |
| `ParallelPackColumns``2` | Pack columns in parallel across threads. Gives direct column access so the caller can write to a buffer without going through entity lookups. Calls the callback with (column1, column2, startRow, endRow, globalOffset) for each chunk of each matching archetype. |

