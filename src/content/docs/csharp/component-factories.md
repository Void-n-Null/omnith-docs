---
title: Component Factories
description: Custom parsing for components in .data files.
---

Component factories control how JSON in a `.data` file's `components` block is turned into ECS component data. Most components don't need a factory -- [auto-resolve](/data/components/#auto-resolve) handles simple structs automatically.

## When to use a factory

- The component needs **validation** beyond what JSON deserialization provides
- One data key should create **multiple** components (e.g. `"movement"` adds both `PathFollower` and `PathTarget`)
- Each entity should get a **randomized** value (dynamic factory with RNG)
- The JSON structure doesn't match the struct layout

## Factory types

### Static factory

Parses JSON into a fixed component value. Every entity gets the same data.

```csharp
ctx.ComponentFactories.Register<Health>("health", json => new Health
{
    Current = json.GetProperty("current").GetInt32(),
    Max = json.GetProperty("max").GetInt32(),
});
```

### Dynamic factory

Returns a function that takes an RNG. Each entity gets a different value.

```csharp
ctx.ComponentFactories.RegisterDynamic<Rainbow>("rainbow", json =>
{
    float cps = json.GetProperty("changesPerSecond").GetSingle();
    return rng => new Rainbow
    {
        ChangesPerSecond = cps,
        Timer = (float)rng.NextDouble() * (1.0f / cps),
    };
});
```

### Raw factory

Returns an `IComponentResolver` directly. Maximum flexibility for complex setups.

```csharp
ctx.ComponentFactories.RegisterRaw("movement", json =>
{
    float speed = json.GetProperty("moveSpeed").GetSingle();
    return new MovementResolver(speed);
});
```

Where `MovementResolver` implements `IComponentResolver` and adds multiple components:

```csharp
private class MovementResolver : IComponentResolver
{
    private readonly float _speed;
    public int ComponentId => ComponentMeta<PathFollower>.Id;

    public MovementResolver(float speed) => _speed = speed;

    public void Apply(World world, Entity entity, Random rng)
    {
        world.Add(entity, new PathFollower
        {
            MoveSpeed = _speed * (0.8f + (float)rng.NextDouble() * 0.4f),
        });
        world.Add(entity, new PathTarget { Version = 0 });
    }
}
```

## Registration timing

Factories must be registered in `OnRegister` -- before `.data` files are loaded. If a factory isn't registered when the loader encounters its key, auto-resolve is attempted as a fallback.
