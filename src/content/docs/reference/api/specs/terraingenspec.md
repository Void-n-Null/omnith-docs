---
title: TerrainGenSpec
description: "Terrain generation parameters. Controls noise-based world generation including grid dimensions, mountain distribution, and spawn clearing. Type key: \"terrainGe"
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Terrain generation parameters. Controls noise-based world generation including grid dimensions, mountain distribution, and spawn clearing. Type key: "terrainGen"

## Fields

| Name | Description |
|---|---|
| `Seed` | [World](/reference/api/runtime/world/) seed for deterministic generation. |
| `Width` | Grid width in tiles. |
| `Height` | Grid height in tiles. |
| `TileSize` | Tile size in pixels. |
| `MountainFrequency` | Perlin noise frequency for mountain generation. |
| `MountainOctaves` | Fractal octaves for mountain noise. |
| `MountainThreshold` | Noise value above this becomes a mountain tile. |
| `GrassFrequency` | Perlin noise frequency for grass color variation. |
| `SpawnClearRadius` | Radius around map center kept clear of mountains for spawning. |

