---
title: OmnithStoreAttribute
description: "Marks a class as an auto-discovered store (external data container). The ServicePool will find these via assembly scanning and construct them by resolving const"
---

`Omnith.Ecs`

Marks a class as an auto-discovered store (external data container). The ServicePool will find these via assembly scanning and construct them by resolving constructor parameters from the pool. Stores are resolved before systems. A store may depend on other stores or on Provide'd services, but should not depend on systems.

