---
title: SpecIdAttribute
description: "Marks a string property as a spec ID reference. During loading, SpecLoader auto-qualifies the value with the current mod's ID if it doesn't already contain a ':"
---

`Omnith.Data`

Marks a string property as a spec ID reference. During loading, SpecLoader auto-qualifies the value with the current mod's ID if it doesn't already contain a ':'. Usage: [SpecId] public string AgentSpec { get; set; } = "cassidy"; In core's .data file: "agentSpec": "cassidy" → resolved to "core:cassidy" Cross-mod reference: "agentSpec": "mymod:goblin" → left as-is

