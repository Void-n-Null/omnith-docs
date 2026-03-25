---
title: Store`1
description: "Generic side-table for variable-length or reference-type data that doesn't fit in ECS struct components. Items are stored by integer handle so components can re"
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

Generic side-table for variable-length or reference-type data that doesn't fit in ECS struct components. Items are stored by integer handle so components can reference them cheaply. Handles are recycled via a free queue. Freed items can optionally be pooled and reused (e.g., clearing a List instead of allocating a new one), controlled by the reset callback. Usage: var paths = new Store<List<(int,int)>>(list => list.Clear()); int id = paths.Add(myPath); // store, get handle var path = paths.Get(id); // retrieve by handle paths.Free(id); // release handle, pool the list var reused = paths.Rent(); // get a pooled list (or null)

## Properties

| Name | Description |
|---|---|
| `ActiveCount` | Number of currently occupied slots. |
| `PooledCount` | Number of pooled items available for reuse via Rent(). |

## Methods

| Name | Description |
|---|---|
| `Add` | Store an item and return its handle. |
| `Get` | Get an item by handle. Returns null if freed or invalid. |
| `Free` | Release a handle for reuse. If a reset callback was provided, the item is reset and pooled for Rent(). Otherwise it's GC'd. |
| `Rent` | Get a pooled item for reuse, or null if the pool is empty. The item has already been reset. Caller must Add() it back to get a handle after populating it. |

