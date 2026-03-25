---
title: Mod Lifecycle
description: The OmnithMod class and when each method is called.
---

To add custom C# behavior, create a class that extends `OmnithMod`. The engine discovers it automatically from your assembly.

```csharp
using Omnith.Data;

public class MyMod : OmnithMod
{
    public override void OnRegister(ModContext ctx) { }
    public override void OnSpecsLoaded(ModContext ctx) { }
    public override void OnInitialize(ModContext ctx) { }
    public override void OnWorldReady(ModContext ctx) { }
    public override void OnTick(ModContext ctx, float delta) { }
    public override void OnShutdown(ModContext ctx) { }
}
```

All methods are optional. Override only what you need.

## Lifecycle order

| Phase | Method | When | Use for |
|---|---|---|---|
| 1 | `OnRegister` | Before data loading | Register component factories, custom spec types |
| 2 | `OnSpecsLoaded` | After all `.data` files loaded | Read/validate specs, cross-reference checks |
| 3 | `OnInitialize` | After world created | Register systems, spawn entities |
| 4 | `OnWorldReady` | World fully populated | Post-setup logic, UI initialization |
| 5 | `OnTick` | Every frame | Avoid if possible -- use systems instead |
| 6 | `OnShutdown` | Game exit | Cleanup external resources |

## ModContext

Every lifecycle method receives a `ModContext` with access to engine services:

```csharp
public class ModContext
{
    public SpecRegistry Specs { get; }
    public ResourceRegistry Resources { get; }
    public SystemRunner Systems { get; }
    public World World { get; }
    public ComponentFactoryRegistry ComponentFactories { get; }

    // Convenience methods
    public void RegisterSystem(ISystem system);
    public void RegisterComponentFactory<T>(string key, Func<JsonElement, T> parser);
    public void RegisterSpecType<T>(string typeKey);
}
```

## Example: Rainbow Mod

```csharp
public class RainbowOmnithMod : OmnithMod
{
    public override void OnRegister(ModContext ctx)
    {
        // Register a dynamic factory that gives each entity
        // a random timer offset so they don't flash in sync
        ctx.ComponentFactories.RegisterDynamic<Rainbow>("rainbow", json =>
        {
            float cps = json.TryGetProperty("changesPerSecond", out var v)
                ? v.GetSingle() : 2.0f;
            return rng => new Rainbow
            {
                ChangesPerSecond = cps,
                Timer = (float)rng.NextDouble() * (1.0f / cps),
            };
        });
    }

    public override void OnInitialize(ModContext ctx)
    {
        ctx.RegisterSystem(new RainbowSystem());
    }
}
```
