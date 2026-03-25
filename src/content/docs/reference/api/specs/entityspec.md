---
title: EntitySpec
description: "Defines a spawnable entity. Provides sprite configuration as a typed field; all other behavior comes from the \"components\" block in .data files, which attache"
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Defines a spawnable entity. Provides sprite configuration as a typed field; all other behavior comes from the "components" block in .data files, which attaches any combination of ECS components without needing C# subclasses. [Components](/data/components/) merge additively during inheritance. Use "removeComponents" to strip inherited components by name. Type key: "entity"

## Fields

| Name | Description |
|---|---|
| `Sprite` | [Sprite](/reference/api/components/sprite/) rendering configuration (texture, size, layer, anchor). Null if the entity has no visual. |

