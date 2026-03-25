---
title: NeedsSpec
description: "Needs profile defining how quickly an entity's needs decay over time. Can be defined standalone and referenced by ID, or inlined inside an EntitySpec. Type key:"
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Needs profile defining how quickly an entity's needs decay over time. Can be defined standalone and referenced by ID, or inlined inside an [EntitySpec](/reference/api/specs/entityspec/). Type key: "needs"

## Fields

| Name | Description |
|---|---|
| `HungerRate` | Rate at which hunger increases per tick. Higher = gets hungry faster. |
| `RestRate` | Rate at which rest need increases per tick. Higher = tires faster. |
| `SocialRate` | Rate at which social need increases per tick. Higher = gets lonely faster. |

