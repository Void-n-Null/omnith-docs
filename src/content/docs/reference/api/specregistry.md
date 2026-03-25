---
title: SpecRegistry
description: "Central registry for all loaded specs. Generic access by type. One inner dictionary per spec type, created on first registration. Spec type keys for .data files"
---

`Omnith.Data`

Central registry for all loaded specs. Generic access by type. One inner dictionary per spec type, created on first registration. Spec type keys for .data files are auto-discovered via reflection: any non-abstract class ending in "Spec" that inherits from Spec gets registered with the "Spec" suffix stripped and lowercased. EntitySpec → "entity", NeedsSpec → "needs" Usage: registry.Get<EntitySpec>("human") registry.All<EntitySpec>() registry.TryGet<EntitySpec>("frost-nymph", out var spec)

## Methods

| Name | Description |
|---|---|
| `DiscoverSpecTypes` | Scan an assembly for Spec subclasses and register them. Class name minus "Spec", lowercased, becomes the type key. Safe to call multiple times (idempotent, later calls overwrite). Call this after loading mod assemblies so mod spec types are found. |
| `DiscoverAllSpecTypes` | Scan all currently loaded assemblies for spec types. Useful after mod DLLs are loaded. |
| `RegisterType``1` | Register a spec type manually. For edge cases where the naming convention doesn't fit. |
| `Register` | Register a loaded spec into the registry. |
| `Get``1` | Get a spec by type and ID. Throws if not found. |
| `TryGet``1` | Try to get a spec by type and ID. |
| `All``1` | Get all specs of a given type. |
| `AllConcrete``1` | Get all non-abstract specs of a given type. |
| `AllOfType` | Get all specs of a given runtime Type (non-generic, for reference resolution). |
| `Count``1` | Number of specs registered for a given type. |
| `ResolveType` | Resolve the C# Type for a spec type string from a .data file. |
| `ResolveInheritance` | Resolve inheritance: for each spec with Extends, merge fields and component resolvers from parents. Supports multi-extends (mixin composition). Parents are merged in order; later parents override earlier ones on conflict. Child's own values always win over parents. |
| `MergeOnto` | Merge a patch spec onto an existing target. Delegates to so subclasses can customize merge semantics (e.g. dictionary entry-level merge). |
| `MergeFromParent` | Inherit fields from a parent spec into a child. Delegates to so subclasses can customize inheritance semantics. |

