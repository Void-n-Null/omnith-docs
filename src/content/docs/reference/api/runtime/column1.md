---
title: Column`1
description: "Strongly-typed contiguous storage for a single component type. Backed by a T[] array. Append is amortized O(1), swap-remove is O(1)."
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

Strongly-typed contiguous storage for a single component type. Backed by a T[] array. Append is amortized O(1), swap-remove is O(1).

## Methods

| Name | Description |
|---|---|
| `Get` | Get a reference to the component at the given row. |
| `AsSpan` | Read-only span over the live elements. |
| `Append` | Append a value and return its index. |

