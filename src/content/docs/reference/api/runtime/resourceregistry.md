---
title: ResourceRegistry
description: "Manages game resources (sprites, audio, etc.) loaded from mod Resource/ directories. Each resource gets a stable int handle for fast runtime lookups. Resolution"
sidebar:
  badge:
    text: Runtim
---

`Omnith.Data`

Manages game resources (sprites, audio, etc.) loaded from mod Resource/ directories. Each resource gets a stable int handle for fast runtime lookups. Resolution rules: "human.png" -> search current mod first, then core "core:human.png" -> explicit mod prefix, no ambiguity "frost-expansion:ice-golem.png" -> specific mod resource Later mods override earlier mods for the same unqualified path.

## Methods

| Name | Description |
|---|---|
| `LoadFromMod` | Scan a mod's Resources/ directory and register all files found. Subdirectory names become categories (sprites, audio, etc.). |
| `Resolve` | Resolve a resource reference string to a handle. Supports "human.png", "sprites/human.png", "core:sprites/human.png". Returns -1 if not found. |
| `Get` | Get a resource entry by handle. |
| `GetPath` | Get the Godot resource path for a handle (for loading textures, audio, etc.). |
| `GetCategory` | Get all handles in a category. |

