---
title: ECS Reference
description: World, Entity, components, and blueprints.
---

## World

The world owns all entities and their component data.

```csharp
var world = new World();

// Spawn
Entity e = world.Spawn();
Entity e = world.Spawn(blueprint);
Entity e = world.Spawn(blueprint, rng);

// Components
world.Add(entity, new Position { X = 10, Y = 20 });
ref Position p = ref world.Get<Position>(entity);
bool has = world.Has<Position>(entity);

// Queries
world.Each<Position>((Entity e, ref Position p) => { ... });
world.Each<Position, Velocity>((Entity e, ref Position p, ref Velocity v) => { ... });

// Info
int count = world.EntityCount;
int archetypes = world.ArchetypeCount;
```

## Entity

An 8-byte generational handle. Lightweight value type.

```csharp
Entity e = world.Spawn();
e.IsValid    // true if non-null
e.Index      // storage index
Entity.Null  // sentinel value, always invalid
```

Entities are compared by value (index + generation). A recycled index with a different generation is a different entity.

## Components

Plain C# structs. No interfaces, no base classes.

```csharp
public struct Position { public float X, Y; }
public struct Velocity { public float X, Y; }
public struct Health { public int Current, Max; }
```

Each component type gets a unique int ID via `ComponentMeta<T>.Id`, assigned at first access.

## Blueprint

A template for spawning entities with a predefined set of components.

```csharp
var bp = new Blueprint("my-entity")
    .Add(new Position { X = 0, Y = 0 })
    .Add(new Health { Current = 100, Max = 100 })
    .Add<Velocity>(rng => new Velocity
    {
        X = (float)rng.NextDouble() * 2 - 1,
        Y = (float)rng.NextDouble() * 2 - 1,
    });

// Spawn from blueprint
Entity e = world.Spawn(bp);

// Inheritance
var child = new Blueprint("child")
    .Add(new Health { Current = 50, Max = 50 })
    .Extends(parent);  // inherits parent components, child overrides
```

Blueprints are generated automatically from `EntitySpec` at load time. You rarely build them by hand.

## IComponentResolver

Interface for providing component values at spawn time. Used by the data-driven component system.

```csharp
public interface IComponentResolver
{
    int ComponentId { get; }
    void Apply(World world, Entity entity, Random rng);
}
```

Built-in implementations:
- `StaticResolver<T>` -- always applies the same value
- `DynamicResolver<T>` -- calls a function with an RNG each time
