---
title: SystemRunner
description: "Manages registered systems: sorts by order, tracks per-system tick accumulators, calls Register for event subscriptions, and ticks each system on schedule."
---

`Omnith.Ecs`

Manages registered systems: sorts by order, tracks per-system tick accumulators, calls Register for event subscriptions, and ticks each system on schedule.

## Properties

| Name | Description |
|---|---|
| `Count` | Number of registered systems. |

## Methods

| Name | Description |
|---|---|
| `Register` | Add a system to the runner. Calls system.Init() for post-construction setup. |
| `Unregister` | Unregister a system by name. |
| `Get` | Get a system by name. Returns null if not found. |
| `SetEnabled` | Enable or disable a system by name. |
| `TickAll` | Tick all systems. Each system executes when its accumulated time meets its TickRate. Systems with TickRate = EVENT_ONLY (-1) are skipped entirely. |
| `PrintAll` | Print all registered systems and their status. |

