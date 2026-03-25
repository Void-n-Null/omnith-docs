---
title: Systems
description: Per-frame logic that operates on entities.
---

A system is a class that implements `ISystem` and runs every frame (or at a fixed rate). Systems query the world for entities with specific components and act on them.

## ISystem interface

```csharp
public interface ISystem
{
    string Name { get; }
    int Order { get; }
    bool Enabled { get; set; }
    float TickRate { get; }

    void Tick(World world, float delta);

    const float EVERY_FRAME = 0f;
}
```

| Property | Description |
|---|---|
| `Name` | Unique identifier, usually `"modid:system-name"` |
| `Order` | Execution order. Lower numbers run first. |
| `Enabled` | Toggle on/off at runtime. |
| `TickRate` | Seconds between ticks. `0` = every frame. |

## Writing a system

```csharp
public class RainbowSystem : ISystem
{
    public string Name => "rainbow:color-cycle";
    public int Order => 200;
    public bool Enabled { get; set; } = true;
    public float TickRate => ISystem.EVERY_FRAME;

    private readonly Random _rng = new();

    public void Tick(World world, float delta)
    {
        world.Each<Rainbow, Sprite>((Entity e, ref Rainbow r, ref Sprite s) =>
        {
            r.Timer += delta;
            if (r.Timer >= 1.0f / r.ChangesPerSecond)
            {
                r.Timer = 0;
                s.R = (float)_rng.NextDouble();
                s.G = (float)_rng.NextDouble();
                s.B = (float)_rng.NextDouble();
            }
        });
    }
}
```

## Registering a system

In your mod's `OnInitialize`:

```csharp
public override void OnInitialize(ModContext ctx)
{
    ctx.RegisterSystem(new RainbowSystem());
}
```

## Querying entities

`World.Each` iterates all entities that have **all** specified component types:

```csharp
// One component
world.Each<Position>((Entity e, ref Position p) => { ... });

// Two components
world.Each<Position, Velocity>((Entity e, ref Position p, ref Velocity v) => { ... });

// Three components
world.Each<Position, Velocity, Health>((Entity e, ref Position p, ref Velocity v, ref Health h) => { ... });
```

Components are passed by `ref` so modifications are written back to the entity automatically.
