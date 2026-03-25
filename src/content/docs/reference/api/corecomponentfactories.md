---
title: CoreComponentFactories
description: "Registers core engine component factories. Called once at startup. Each factory maps a string key to a parser that reads JSON config and produces an IComponentR"
---

`Omnith.Data`

Registers core engine component factories. Called once at startup. Each factory maps a string key to a parser that reads JSON config and produces an IComponentResolver. Mods register their own factories in OnRegister() via ModContext.

