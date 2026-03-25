---
title: Log
description: "Static log router. Defaults to Console output so non-Godot contexts (tests, CLI tools) work out of the box. Call once at engine startup to redirect to GD.Print/"
sidebar:
  badge:
    text: Runtim
---

`Omnith`

Static log router. Defaults to Console output so non-Godot contexts (tests, CLI tools) work out of the box. Call once at engine startup to redirect to GD.Print/GD.PrintErr. All non-Node code should use this instead of GD.Print directly.

## Methods

| Name | Description |
|---|---|
| `Info` | Informational message. |
| `Warn` | Warning -- something unusual but not fatal. |
| `Error` | Error -- something is broken. |
| `UseGodot` | Switch to Godot logging backend. Call once in OmnithRuntime._Ready() or equivalent. After this, Info/Warn/Error route to GD.Print, GD.PushWarning, and GD.PrintErr respectively. |

