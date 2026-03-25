---
title: Spec
description: "Base class for all data specifications. A spec is a named template loaded from .data files at startup. Specs are immutable configuration -- they define what som"
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Base class for all data specifications. A spec is a named template loaded from .data files at startup. [Specs](/data/specs/) are immutable configuration -- they define what something is, not runtime state. The type key in .data files is derived from the class name by stripping "Spec" and lowercasing ([EntitySpec](/reference/api/specs/entityspec/) = "entity", [TerrainGenSpec](/reference/api/specs/terraingenspec/) = "terrainGen"). [Specs](/data/specs/) support single or multi-parent inheritance via the extends field, mod patching (same ID = merge), and full replacement via the replace flag.

## Fields

| Name | Description |
|---|---|
| `Id` | Unique identifier, automatically qualified with the mod's namespace (e.g. "core:goblin"). |
| `Extends` | Parent spec IDs to inherit from. Accepts a single string or JSON array. Child fields override parent fields; components merge additively. |
| `Abstract` | If true, this spec is a template only and cannot be spawned or used directly. Exists solely as an inheritance target. |
| `Replace` | If true, completely replaces any existing spec with the same ID instead of merging onto it. Used when a mod needs to redefine a spec from scratch. |

