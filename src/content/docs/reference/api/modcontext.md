---
title: ModContext
description: "Everything a mod needs access to. Passed to every lifecycle method. Mods should never need to reach outside this context."
---

`Omnith.Data`

Everything a mod needs access to. Passed to every lifecycle method. Mods should never need to reach outside this context.

## Methods

| Name | Description |
|---|---|
| `RegisterSystem` | Register a system. Shorthand for Systems.Register(). |
| `RegisterComponentFactory``1` | Register a component factory so .data files can use it in "components" blocks. |
| `RegisterSpecType``1` | Register a custom spec type key manually. Usually not needed -- spec types are auto-discovered by naming convention (FooSpec → "foo"). Use this only if your class name doesn't follow the convention. |

