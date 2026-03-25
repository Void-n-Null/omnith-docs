---
title: Sprite
description: "Visual data for rendering. Batched by (ResourceHandle, Layer)."
---

`Omnith.Ecs`

Visual data for rendering. Batched by (ResourceHandle, Layer).

## Fields

| Name | Description |
|---|---|
| `ResourceHandle` | Resource handle from ResourceRegistry. Entities with the same handle share a draw call. |
| `R` | Tint color. White = no tint. |
| `G` | Tint color. White = no tint. |
| `B` | Tint color. White = no tint. |
| `A` | Tint color. White = no tint. |
| `Width` | Render size in pixels. |
| `Height` | Render size in pixels. |
| `Layer` | Render layer. Lower = further back. 0=ground, 10=default, 20=effects, 30=clouds, etc. |
| `AnchorY` | Vertical anchor offset. 0 = centered, 0.5 = bottom-anchored (feet at position). The sprite is shifted up by AnchorY * Height pixels. |

