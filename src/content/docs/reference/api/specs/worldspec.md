---
title: WorldSpec
description: "Top-level world configuration. Points to the specs that define how the world is generated and populated. Auto-registered as \"world\" in .data files."
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Top-level world configuration. Points to the specs that define how the world is generated and populated. Auto-registered as "world" in .data files.

## Properties

| Name | Description |
|---|---|
| `TerrainGen` | ID of the TerrainGenSpec to use for terrain generation. |
| `AgentCount` | Number of initial agents to spawn. |
| `AgentSpec` | Entity spec ID to spawn as agents. |

