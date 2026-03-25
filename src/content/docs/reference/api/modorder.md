---
title: ModOrder
description: "Persisted user mod order. Saved to user://mod_order.data. Contains the list of active mod IDs in the user's chosen order. If the file doesn't exist, the loader "
---

`Omnith.Data`

Persisted user mod order. Saved to user://mod_order.data. Contains the list of active mod IDs in the user's chosen order. If the file doesn't exist, the loader auto-generates it via topological sort.

## Properties

| Name | Description |
|---|---|
| `ActiveMods` | Ordered list of active mod IDs. |

## Methods

| Name | Description |
|---|---|
| `Load` | Load the mod order file. Returns null if it doesn't exist. |
| `Save` | Save the current mod order to disk. |
| `FromManifests` | Create a mod order from a sorted list of manifests. |

