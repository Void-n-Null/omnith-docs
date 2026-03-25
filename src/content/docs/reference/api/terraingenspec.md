---
title: TerrainGenSpec
description: "Terrain generation parameters. Controls noise-based world generation: scale, thresholds, spawn clearing, and layer configuration. Auto-registered as \"terrainGe"
---

`Omnith.Data`

Terrain generation parameters. Controls noise-based world generation: scale, thresholds, spawn clearing, and layer configuration. Auto-registered as "terrainGen" in .data files.

## Properties

| Name | Description |
|---|---|
| `Seed` | World seed for deterministic generation. |
| `Width` | Grid width in tiles. |
| `Height` | Grid height in tiles. |
| `TileSize` | Tile size in pixels. |
| `MountainFrequency` | Perlin noise frequency for mountain generation. |
| `MountainOctaves` | Fractal octaves for mountain noise. |
| `MountainThreshold` | Noise value above this becomes a mountain tile. |
| `GrassFrequency` | Perlin noise frequency for grass color variation. |
| `SpawnClearRadius` | Radius around map center kept clear of mountains for spawning. |

