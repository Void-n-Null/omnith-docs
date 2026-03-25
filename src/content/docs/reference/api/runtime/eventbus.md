---
title: EventBus
description: "Synchronous typed event bus. Publish fires all subscribers immediately. Events are structs. Handlers run on the thread that published. Usage: bus.Subscribe<Clic"
sidebar:
  badge:
    text: Runtim
---

`Omnith.Ecs`

Synchronous typed event bus. Publish fires all subscribers immediately. Events are structs. Handlers run on the thread that published. Usage: bus.Subscribe<ClickEvent>(e => HandleClick(e)); bus.Publish(new ClickEvent { X = 10, Y = 20 });

## Methods

| Name | Description |
|---|---|
| `Subscribe``1` | Subscribe to an event type. Handler runs immediately on publish. |
| `Unsubscribe``1` | Unsubscribe a specific handler. |
| `Publish``1` | Publish an event. All subscribers fire immediately, synchronously. |
| `Clear``1` | Remove all subscribers for a given event type. |
| `ClearAll` | Remove all subscribers for all event types. |

