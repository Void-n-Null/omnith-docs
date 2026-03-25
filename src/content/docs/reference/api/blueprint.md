---
title: Blueprint
description: "A template for spawning entities. Defines which components to attach and how to initialize them. Applied once at spawn time."
---

`Omnith.Ecs`

A template for spawning entities. Defines which components to attach and how to initialize them. Applied once at spawn time.

## Methods

| Name | Description |
|---|---|
| `Add``1` | Add a component with a static default value. |
| `Add``1` | Add a component with a dynamic resolver that runs at spawn time. |
| `AddResolver` | Add a pre-built resolver. Used by ComponentFactoryRegistry and data-driven composition. |
| `Extends` | Inherit all components from a parent blueprint. Child can override. |
| `Apply` | Apply all resolvers to an entity. Called by World.Spawn. |

