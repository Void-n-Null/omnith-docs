---
title: OmnithSystemAttribute
description: "Marks a class as an auto-discovered system. The ServicePool will find these via assembly scanning, construct them by resolving constructor parameters, and regis"
---

`Omnith.Ecs`

Marks a class as an auto-discovered system. The ServicePool will find these via assembly scanning, construct them by resolving constructor parameters, and register them with the SystemRunner. Systems are resolved after all stores. A system may depend on stores and Provide'd services.

## Properties

| Name | Description |
|---|---|
| `Name` | System name. Convention: "modId:systemName". If null, derived from the class name (strip "System" suffix, lowercase, prefix "core:"). |
| `Order` | Execution order. Lower = runs first. |
| `TickRate` | Seconds between ticks. 0 = every frame. -1 = event-only. |

