---
title: PathStore
description: "External storage for computed paths. Paths are variable-length lists that don't belong in ECS struct components. Entities reference paths by integer ID via thei"
sidebar:
  badge:
    text: Store
---

`Omnith.Sim`

External storage for computed paths. Paths are variable-length lists that don't belong in ECS struct components. Entities reference paths by integer ID via their [PathFollower](/reference/api/components/pathfollower/) component. Built on Store<T> with list pooling: freed paths are cleared and recycled instead of being abandoned to GC.

## Methods

| Name | Description |
|---|---|
| `Store` | Store a path and return its ID. |
| `Get` | Get a path by ID. Returns null if freed or invalid. |
| `Free` | Release a path ID for reuse. The list is cleared and pooled. |
| `Rent` | Get a pooled (cleared) path list for reuse, or a new one if the pool is empty. Use this instead of `new List` when building paths to avoid allocation. |

