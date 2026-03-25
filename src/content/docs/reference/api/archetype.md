---
title: Archetype
description: "Storage for all entities that share the same set of components. Each component type gets a dense column array. All columns and the entity list are parallel -- r"
---

`Omnith.Ecs`

Storage for all entities that share the same set of components. Each component type gets a dense column array. All columns and the entity list are parallel -- row N across all arrays belongs to the same entity.

## Properties

| Name | Description |
|---|---|
| `EntitySpan` | Span over the live entity indices. Avoids List indexer bounds checks in hot loops. Valid until the next structural change to this archetype. |
| `EntityIds` | Read-only access to all entity indices in this archetype. |

## Methods

| Name | Description |
|---|---|
| `HasComponent` | Does this archetype store the given component type? |
| `GetColumn``1` | Get the strongly-typed column for a component. Caller must know the archetype has it. |
| `GetColumn` | Get the type-erased column by component ID. |
| `GetEntity` | The entity at a given row. |
| `AddEntity` | Add an entity to this archetype. Appends to all columns. Returns the row index where the entity was placed. |
| `Set``1` | Set a component value at a specific row. The archetype must contain this component type. |
| `Get``1` | Get a reference to a component at a specific row. |
| `RemoveEntity` | Remove an entity from this archetype without moving it anywhere (for despawn). Returns the entity index that was swapped into the vacated row, or 0 if none. |
| `MoveEntity` | Move an entity out of this archetype into another. Copies all shared component data, swap-removes from this archetype. Returns (new row in destination, entity index that was swapped into the vacated row, or 0 if none). |

## Fields

| Name | Description |
|---|---|
| `AddEdges` | Cached graph edges: componentId -> archetype to move to when adding that component. |
| `RemoveEdges` | Cached graph edges: componentId -> archetype to move to when removing that component. |

