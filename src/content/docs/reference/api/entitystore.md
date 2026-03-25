---
title: EntityStore
description: "Manages entity creation, destruction, and slot recycling. The free list is embedded directly in the record array -- dead slots chain to the next free slot via t"
---

`Omnith.Ecs`

Manages entity creation, destruction, and slot recycling. The free list is embedded directly in the record array -- dead slots chain to the next free slot via their Row field, avoiding a separate allocation.

## Properties

| Name | Description |
|---|---|
| `AliveCount` | Total number of alive entities. |

## Methods

| Name | Description |
|---|---|
| `Create` | Create a new entity. Reuses a dead slot if available, otherwise appends. |
| `Destroy` | Destroy an entity. Its slot is added to the free list for recycling. |
| `IsAlive` | Check if an entity handle is still alive (correct generation, valid slot). |
| `GetRecord` | Get a reference to an entity's record. Caller must verify IsAlive first. |
| `GetRecordByIndex` | Get a reference to an entity's record by raw index. Used internally when we only have the index (e.g. from the archetype's entity list during swap-remove fixup). |

