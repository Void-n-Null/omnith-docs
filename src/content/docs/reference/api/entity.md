---
title: Entity
description: "A handle to an entity in the world. 8 bytes: 32-bit index + 32-bit generation. The generation prevents stale handles from silently accessing recycled slots. Ind"
---

`Omnith.Ecs`

A handle to an entity in the world. 8 bytes: 32-bit index + 32-bit generation. The generation prevents stale handles from silently accessing recycled slots. Index 0 is reserved as the null entity.

## Properties

| Name | Description |
|---|---|
| `Index` | Slot index in the entity record array. |
| `Generation` | Incremented each time a slot is recycled. Stale handles have a mismatched generation. |
| `IsValid` | True if this handle points to a valid slot (index != 0). |

## Fields

| Name | Description |
|---|---|
| `Null` | The null entity. Index 0, never assigned to a real entity. |

