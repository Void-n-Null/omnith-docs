---
title: API Reference
description: Auto-generated from XML doc comments in omnith.dll
---

Generated from `sdk/omnith.xml`. Rebuild with `bun run generate-api`.

## Specs

Data-driven templates loaded from .data files

- [`EntitySpec`](/reference/api/specs/entityspec/) -- Defines a spawnable entity.
- [`NeedsSpec`](/reference/api/specs/needsspec/) -- Needs profile defining how quickly an entity's needs decay over time.
- [`Spec`](/reference/api/specs/spec/) -- Base class for all data specifications.
- [`TerrainGenSpec`](/reference/api/specs/terraingenspec/) -- Terrain generation parameters.
- [`WorldSpec`](/reference/api/specs/worldspec/) -- World configuration.

## Systems

Per-frame logic that operates on entities

- [`BounceSystem`](/reference/api/systems/bouncesystem/) -- Reverses velocity when entities hit screen edges.
- [`GodCursorSystem`](/reference/api/systems/godcursorsystem/) -- Handles god-mode cursor input.
- [`MovementSystem`](/reference/api/systems/movementsystem/) -- Applies velocity to position.
- [`PathfindingSystem`](/reference/api/systems/pathfindingsystem/) -- Computes A* paths when an entity's PathTarget changes.
- [`PathMovementSystem`](/reference/api/systems/pathmovementsystem/) -- Moves entities along computed paths.

## Stores

External data storage outside the ECS

- [`PathStore`](/reference/api/stores/pathstore/) -- External storage for computed paths.

## Components

ECS component structs attached to entities

- [`GridPosition`](/reference/api/components/gridposition/) -- Tile-space position on the grid.
- [`PathFollower`](/reference/api/components/pathfollower/) -- Pathfinding state.
- [`PathTarget`](/reference/api/components/pathtarget/) -- Where this entity wants to pathfind to.
- [`Position`](/reference/api/components/position/) -- 2D position in world space (pixels).
- [`SpecRef`](/reference/api/components/specref/) -- Back-reference to the spec this entity was spawned from.
- [`Sprite`](/reference/api/components/sprite/) -- Visual data for rendering.
- [`Velocity`](/reference/api/components/velocity/) -- 2D velocity in units per second.

## Runtime

Core engine types for modding and ECS

- [`Blueprint`](/reference/api/runtime/blueprint/) -- A template for spawning entities.
- [`Column`1`](/reference/api/runtime/column1/) -- Strongly-typed contiguous storage for a single component type.
- [`ComponentFactoryRegistry`](/reference/api/runtime/componentfactoryregistry/) -- Maps string keys to component resolver factories.
- [`ComponentMeta`](/reference/api/runtime/componentmeta/) -- Assigns a unique integer ID to each component type at runtime.
- [`ComponentMeta`1`](/reference/api/runtime/componentmeta1/) -- Static generic type that holds the ID for component type T.
- [`DynamicResolver`1`](/reference/api/runtime/dynamicresolver1/) -- Dynamic resolver: calls a function with an RNG to produce the value.
- [`Entity`](/reference/api/runtime/entity/) -- A handle to an entity in the world.
- [`EventBus`](/reference/api/runtime/eventbus/) -- Synchronous typed event bus.
- [`IColumn`](/reference/api/runtime/icolumn/) -- Type-erased interface for component columns so archetypes can hold mixed types.
- [`IComponentResolver`](/reference/api/runtime/icomponentresolver/) -- Resolver that provides a component value at spawn time.
- [`ISystem`](/reference/api/runtime/isystem/) -- A named, ordered, rate-limited system that operates on the ECS world.
- [`Log`](/reference/api/runtime/log/) -- Static log router.
- [`ModContext`](/reference/api/runtime/modcontext/) -- Everything a mod needs access to.
- [`ModManifest`](/reference/api/runtime/modmanifest/) -- Metadata from a mod's mod.
- [`OmnithMod`](/reference/api/runtime/omnithmod/) -- Base class for mod entry points.
- [`ResourceRegistry`](/reference/api/runtime/resourceregistry/) -- Manages game resources (sprites, audio, etc.
- [`ServicePool`](/reference/api/runtime/servicepool/) -- Internal composition root for the Omnith runtime.
- [`SpawnTable`](/reference/api/runtime/spawntable/) -- Weighted random selection of blueprints.
- [`SpecIdAttribute`](/reference/api/runtime/specidattribute/) -- Marks a string property as a spec ID reference.
- [`SpecLoader`](/reference/api/runtime/specloader/) -- Loads .
- [`SpecRegistry`](/reference/api/runtime/specregistry/) -- Central registry for all loaded specs.
- [`StaticResolver`1`](/reference/api/runtime/staticresolver1/) -- Static resolver: always applies the same value.
- [`Store`1`](/reference/api/runtime/store1/) -- Generic side-table for variable-length or reference-type data that doesn't fit in ECS struct components.
- [`SystemRunner`](/reference/api/runtime/systemrunner/) -- Manages registered systems: sorts by order, tracks per-system tick accumulators, calls Register for event subscriptions, and ticks each system on schedule.
- [`World`](/reference/api/runtime/world/) -- The ECS world.

