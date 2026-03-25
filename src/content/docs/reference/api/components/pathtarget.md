---
title: PathTarget
description: "Where this entity wants to pathfind to."
sidebar:
  badge:
    text: Component
---

`Omnith.Ecs`

Where this entity wants to pathfind to.

## Properties

| Name | Description |
|---|---|
| `ToVec` | Get as Vec2Int for grid math. |

## Methods

| Name | Description |
|---|---|
| `SetFrom` | Set from a Vec2Int. |

## Fields

| Name | Description |
|---|---|
| `Version` | Incremented when target changes. Pathfinding system uses this to know when to recompute. |

