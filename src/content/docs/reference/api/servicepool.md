---
title: ServicePool
description: "Internal composition root for the Omnith runtime. Resolves the full dependency graph of stores and systems at startup via constructor injection. Never exposed t"
---

`Omnith.Ecs`

Internal composition root for the Omnith runtime. Resolves the full dependency graph of stores and systems at startup via constructor injection. Never exposed to systems, stores, or mods. OmnithRuntime is the only caller. Two registration paths: Provide<T>(instance) — pre-constructed objects (World, EventBus, TerrainData, etc.) DiscoverAndResolve() — scans assemblies for [OmnithStore] and [OmnithSystem], topologically sorts, and constructs via reflection. After resolution the pool freezes. No further registration is accepted.

## Properties

| Name | Description |
|---|---|
| `IsFrozen` | Whether the pool has been resolved and frozen. |
| `Count` | Number of registered services. |

## Methods

| Name | Description |
|---|---|
| `Provide``1` | Register a pre-constructed instance. The pool stores it by the generic type parameter T, not by instance.GetType(). |
| `Provide` | Non-generic Provide for runtime types (used by mod drain). |
| `DiscoverAndResolve` | Scan assemblies for [OmnithStore] and [OmnithSystem] types, then resolve the full dependency graph. |
| `Discover` | Scan assemblies for attributed types without resolving. Call Resolve() separately to construct them. |
| `Resolve` | Topologically resolve all pending stores then systems. After this call the pool is frozen. |
| `Validate` | Dry-run: verify the dependency graph is resolvable without constructing anything. Returns a list of errors (empty = valid). |
| `Get``1` | Get a resolved service. Only called by OmnithRuntime. |
| `TryGet``1` | Try to get a resolved service. |
| `GetAll``1` | Get all resolved instances of types that implement T. |

