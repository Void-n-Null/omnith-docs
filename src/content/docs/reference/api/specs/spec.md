---
title: Spec
description: "Base class for all data specifications (definitions). A Spec is a named, inheritable template loaded from .data files. Specs define WHAT something is. They live"
sidebar:
  badge:
    text: Spec
---

`Omnith.Data`

Base class for all data specifications (definitions). A Spec is a named, inheritable template loaded from .data files. Specs define WHAT something is. They live in registries and are loaded once at startup. They are not ECS entities -- they're the configuration data that systems and blueprints consume. The spec type key used in .data files (the "type" field) is derived automatically from the class name: strip "Spec", lowercase. EntitySpec → "entity" NeedsSpec → "needs" Supports mixin inheritance via extends (single string or array): "extends": "humanoid" "extends": ["living", "mobile", "destructible"]

## Properties

| Name | Description |
|---|---|
| `Id` | Unique identifier. Used for lookup, inheritance, and cross-references. |
| `Extends` | Parent spec IDs to inherit from. Supports single string or array in JSON. Parsed by SpecLoader -- stored as a list internally. |
| `Abstract` | If true, this spec is a template only and won't produce anything directly. |
| `Replace` | If true, this spec definition completely replaces any existing spec with the same ID instead of merging. Used by mods that need to redefine a spec from scratch (new extends, new components, everything). Parsed by SpecLoader; checked by SpecRegistry.Register(). |

## Methods

| Name | Description |
|---|---|
| `MergeFrom` | Merge a patch onto this spec (mod overriding the same ID). Non-default fields on override this spec's values. Override in subclasses for custom merge semantics (e.g. dictionary entry-level merge, additive list merge). |
| `InheritFrom` | Inherit fields from a parent spec (extends keyword). Only fills fields on this spec that are still at their default/empty value. Override in subclasses for custom inheritance semantics. |
| `ReflectionMerge` | Reflection-based field merge used by the default MergeFrom/InheritFrom. Skips properties declared on itself (Id, Extends, Abstract). |
| `IsDefaultOrEmpty` | Returns true if is null, a default value type, or an empty array. Used by to detect unset fields. |

