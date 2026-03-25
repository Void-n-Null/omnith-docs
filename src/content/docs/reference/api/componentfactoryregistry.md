---
title: ComponentFactoryRegistry
description: "Maps string keys to component resolver factories. Two resolution paths: 1. Manual factory: registered via Register/RegisterDynamic/RegisterRaw. Use for complex "
---

`Omnith.Data`

Maps string keys to component resolver factories. Two resolution paths: 1. Manual factory: registered via Register/RegisterDynamic/RegisterRaw. Use for complex cases (multiple components, RNG, custom validation). 2. Auto-resolve: if no manual factory exists, scans loaded assemblies for a struct whose name matches the PascalCase of the key (e.g., "flammable" → Flammable). Deserializes the JSON block into it via System.Text.Json. Zero boilerplate for simple components. Manual factories always take priority over auto-resolve.

## Properties

| Name | Description |
|---|---|
| `RegisteredKeys` | All manually registered component keys. |

## Methods

| Name | Description |
|---|---|
| `Register``1` | Register a factory that parses JSON into a static component value. |
| `RegisterDynamic``1` | Register a factory that parses JSON into a dynamic (RNG-based) component factory. |
| `RegisterRaw` | Register a factory that returns a pre-built resolver directly. Maximum flexibility for complex component setups. |
| `TryCreate` | Try to create a resolver from a component key + JSON data. |
| `ResolveComponentId` | Resolve a component string key to its int ComponentId. Returns null if the key has never been created via TryCreate and can't be found via struct name lookup. |
| `HasFactory` | Check if a component key has a manual factory registered. |
| `TryAutoResolve` | Attempt to find a struct component by name convention and deserialize the JSON block into it. Returns null if the struct isn't found or deserialization fails. Convention: key "flammable" → struct named "Flammable" (PascalCase). The struct must be a value type to be a valid ECS component. |
| `BuildStructCache` | Build a lookup from lowercase struct names to their Types. Scans all loaded assemblies for value types (structs) that could be ECS components. |

