---
title: EntityRecord
description: "Per-slot bookkeeping in the entity record array. When alive: ArchetypeId and Row point to where the entity's component data lives. When dead: ArchetypeId is -1 "
---

`Omnith.Ecs`

Per-slot bookkeeping in the entity record array. When alive: ArchetypeId and Row point to where the entity's component data lives. When dead: ArchetypeId is -1 and Row stores the next free slot index (embedded free list).

## Fields

| Name | Description |
|---|---|
| `ArchetypeId` | Which archetype this entity belongs to. -1 if dead. |
| `Row` | Row within the archetype's column arrays. When dead, stores the next free index. |
| `Generation` | Current generation. Incremented on each recycle. |

