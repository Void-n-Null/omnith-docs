---
title: ISystem
description: "A named, ordered, rate-limited system that operates on the ECS world. Systems can be tick-based, event-driven, or both. Dependencies are injected via constructo"
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

A named, ordered, rate-limited system that operates on the ECS world. [Systems](/csharp/systems/) can be tick-based, event-driven, or both. Dependencies are injected via constructor (resolved by [ServicePool](/reference/api/runtime/servicepool/)). Name, Order, and TickRate are read from the [OmnithSystem] attribute. [Systems](/csharp/systems/) only need to implement Enabled, Register(), and Tick().

## Properties

| Name | Description |
|---|---|
| `Name` | Unique name, convention: "modId:systemName". Default: read from [OmnithSystem] attribute, fallback to class name. |
| `Order` | Execution order. Lower = runs first. Default: read from [OmnithSystem] attribute, fallback to 0. |
| `Enabled` | Can be toggled at runtime. |
| `TickRate` | Seconds between ticks. 0 = every frame. -1 = no tick (pure event-driven). Default: read from [OmnithSystem] attribute, fallback to 0 (every frame). |

## Methods

| Name | Description |
|---|---|
| `Init` | Called once after construction. Subscribe to events, build caches, do any one-time setup here. Dependencies are already available via constructor injection and the world is fully built. Default implementation does nothing. |
| `Tick` | Called on tick schedule. Delta is time since last tick. Default implementation does nothing (for pure event-driven systems). |

## Fields

| Name | Description |
|---|---|
| `EVERY_FRAME` | Tick every frame. |

