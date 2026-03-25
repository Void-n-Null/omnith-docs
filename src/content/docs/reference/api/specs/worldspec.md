---
title: WorldSpec
description: "World configuration. Controls which terrain generator to use, how many entities to spawn, and what to spawn them as. Type key: \"world\""
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

World configuration. Controls which terrain generator to use, how many entities to spawn, and what to spawn them as. Type key: "world"

## Fields

| Name | Description |
|---|---|
| `TerrainGen` | TerrainGenSpec ID to use for terrain generation. Auto-qualified with the current mod's namespace. |
| `AgentCount` | Number of entities to spawn at world creation. |
| `AgentSpec` | EntitySpec ID to spawn as the initial population. Auto-qualified with the current mod's namespace. |

