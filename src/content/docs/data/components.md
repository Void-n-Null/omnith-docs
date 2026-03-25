---
title: Components
description: Data-driven component composition for entities.
---

Components are plain C# structs attached to entities. In `.data` files, they're declared in the `components` block of an entity spec:

```json
{
  "type": "entity",
  "id": "goblin",
  "components": {
    "movement": { "moveSpeed": 0.04 },
    "health": { "current": 50, "max": 50 }
  }
}
```

## Auto-resolve

If no factory is registered for a component key, the engine auto-resolves by struct name convention:

1. Convert the key to PascalCase: `"health"` becomes `Health`
2. Scan loaded assemblies for a struct named `Health`
3. Deserialize the JSON block into it via `System.Text.Json`

This means a mod can define a new component struct in C# and use it in `.data` files with zero registration:

```csharp
// In your mod's C# code
public struct Flammable
{
    public float IgniteChance;
    public float BurnDuration;
}
```

```json
// In your .data file -- "flammable" auto-resolves to the Flammable struct
{
  "type": "entity",
  "id": "wooden-house",
  "components": {
    "flammable": { "igniteChance": 0.8, "burnDuration": 5.0 }
  }
}
```

## Manual factories

For complex components that need custom parsing (multiple components from one key, RNG-based values, validation), register a factory:

```csharp
// Static: parse JSON into a fixed value
ctx.ComponentFactories.Register<Health>("health", json => new Health
{
    Current = json.GetProperty("current").GetInt32(),
    Max = json.GetProperty("max").GetInt32(),
});

// Dynamic: each entity gets a different value
ctx.ComponentFactories.RegisterDynamic<Health>("health", json =>
{
    int max = json.GetProperty("max").GetInt32();
    return rng => new Health { Current = rng.Next(1, max), Max = max };
});

// Raw: full control, returns an IComponentResolver directly
ctx.ComponentFactories.RegisterRaw("movement", json =>
{
    float speed = json.GetProperty("moveSpeed").GetSingle();
    return new MovementResolver(speed);
});
```

Manual factories always take priority over auto-resolve.

## Removing components

Use `removeComponents` to strip inherited components by name:

```json
{
  "type": "entity",
  "id": "ghost",
  "extends": "humanoid",
  "removeComponents": ["needs", "body"],
  "components": {
    "ethereal": { "passThrough": true }
  }
}
```

This inherits everything from `humanoid`, drops `needs` and `body`, and adds `ethereal`. The additive `components` block works exactly as before.

`removeComponents` also works in mod patches:

```json
{
  "type": "entity",
  "id": "core:cassidy",
  "removeComponents": ["rainbow"]
}
```

This strips the `rainbow` component from cassidy without affecting anything else.
