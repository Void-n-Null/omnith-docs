---
title: EntitySpec
description: "Base spec for any spawnable entity. The universal fields that every thing in the world might need: visual representation and spatial presence. Domain-specific c"
---

`Omnith.Data`

Base spec for any spawnable entity. The universal fields that every thing in the world might need: visual representation and spatial presence. Domain-specific components (movement, body, needs, AI) are NOT fields on this class. They're declared in the "components" block of .data files and resolved via the ComponentFactoryRegistry at load time. This keeps EntitySpec small and allows any entity to have any combination of components without C# subclassing. Auto-registered as "entity" in .data files.

## Properties

| Name | Description |
|---|---|
| `RemoveComponents` | Int component IDs to strip after inheritance or mod-patch merge. Populated by SpecLoader from the "removeComponents" string array in .data files, resolved to int IDs via ComponentFactoryRegistry. Get-only so reflection merge skips it (same pattern as ComponentResolvers). |

## Methods

| Name | Description |
|---|---|
| `MergeFrom` | Patch merge: reflection-merge flat fields, then merge component resolvers additively (new component IDs added, same ID overridden), then apply any removals specified by the patch. |
| `InheritFrom` | Inheritance merge: reflection-merge flat fields, then inherit parent component resolvers that the child doesn't already define and hasn't explicitly removed. |
| `ToBlueprint` | Build a Blueprint from this spec. Adds universal components (SpecRef, Sprite, Position, GridPosition) then drains all data-driven component resolvers from the "components" block. |

