---
title: ModManifest
description: "Metadata from a mod's mod.data file."
sidebar:
  badge:
    text: Runtim
---

`Omnith.Data`

Metadata from a mod's mod.data file.

## Properties

| Name | Description |
|---|---|
| `LoadOrder` | Manual load order hint (lower = earlier). Used as a tiebreaker when topological sort has no opinion. Default 100; core uses 0. |
| `Dependencies` | Hard dependencies. These mod IDs MUST be present and loaded before this mod. If any are missing, the mod fails to load with an error. |
| `LoadAfter` | Soft ordering: this mod should load AFTER these mods if they are present. Not an error if they're missing -- only enforced when both are active. |
| `LoadBefore` | Soft ordering: this mod should load BEFORE these mods if they are present. Not an error if they're missing -- only enforced when both are active. |
| `Incompatible` | Mods that are incompatible with this one. If any are active, the loader reports an error. |
| `RootPath` | Absolute or res:// path to the mod's root directory. Set by the loader. |

