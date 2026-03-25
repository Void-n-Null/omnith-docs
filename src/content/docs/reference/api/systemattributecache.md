---
title: SystemAttributeCache
description: "Caches [OmnithSystem] attribute lookups by type so we don't hit reflection on every property access. The attribute on a type never changes, so this is safe to c"
---

`Omnith.Ecs`

Caches [OmnithSystem] attribute lookups by type so we don't hit reflection on every property access. The attribute on a type never changes, so this is safe to cache forever.

## Methods

| Name | Description |
|---|---|
| `DefaultName` | Strip "System" suffix, lowercase, prefix "core:". |

