---
title: PathFollower
description: "Pathfinding state. References a path in the external PathStore."
sidebar:
  badge:
    text: Component
---

`Omnith.Ecs`

Pathfinding state. References a path in the external PathStore.

## Fields

| Name | Description |
|---|---|
| `PathId` | Index into PathStore. -1 = no path. |
| `StepIndex` | Current step along the path. |
| `ComputedVersion` | Last PathTarget.Version we computed for. If stale, recompute. |
| `MoveTimer` | Movement cooldown timer. |
| `MoveSpeed` | Seconds per tile movement. |
| `IsMoving` | True when we've reserved the next tile and are interpolating toward it. |
| `WaitTicks` | Ticks spent waiting for a blocked tile. Triggers recompute after threshold. |

