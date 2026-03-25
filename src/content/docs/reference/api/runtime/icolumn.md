---
title: IColumn
description: "Type-erased interface for component columns so archetypes can hold mixed types."
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

Type-erased interface for component columns so archetypes can hold mixed types.

## Methods

| Name | Description |
|---|---|
| `Append` | Append default-initialized element, return the index. |
| `CopyTo` | Copy element at srcIndex into the end of another column. |
| `SwapRemove` | Swap element at index with the last element, then shrink by one. |
| `CloneEmpty` | Create an empty column of the same component type. |

