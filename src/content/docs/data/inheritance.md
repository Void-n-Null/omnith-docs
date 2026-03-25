---
title: Inheritance
description: How specs inherit from parent templates.
---

Specs support mixin inheritance via the `extends` field. A child spec inherits all fields and components from its parents, then applies its own values on top.

## Single inheritance

```json
{
  "type": "entity",
  "id": "cassidy",
  "extends": "mobile",
  "sprite": { ... },
  "components": {
    "movement": { "moveSpeed": 0.03 }
  }
}
```

Cassidy inherits everything from `mobile`. The `movement` component overrides `mobile`'s version (same component ID replaces). The `sprite` field is cassidy's own.

## Multi-extends (mixins)

```json
{
  "type": "entity",
  "id": "human",
  "extends": ["living", "mobile", "destructible"]
}
```

Parents are merged left to right. If `living` and `mobile` both define the same component, `mobile`'s version wins (last parent takes priority for conflicts). The child's own values always win over any parent.

## Inheritance rules

### Flat fields (strings, numbers, bools)

- **Child has a non-default value**: child wins, parent ignored
- **Child has default/empty value**: parent's value is inherited

### Components

- **Same component ID**: child's version wins, parent's is not inherited
- **New component on parent**: added to child
- **Component in `removeComponents`**: not inherited, even if parent defines it

## Abstract parents

Use `"abstract": true` for specs that are templates only:

```json
{
  "type": "entity",
  "id": "mobile",
  "abstract": true,
  "components": {
    "movement": { "moveSpeed": 0.05 }
  }
}
```

Abstract specs are never spawned directly. They exist purely as inheritance targets.

## Cross-mod inheritance

A mod can extend specs from other mods using qualified IDs:

```json
{
  "type": "entity",
  "id": "fast-cassidy",
  "extends": "core:cassidy",
  "components": {
    "movement": { "moveSpeed": 0.1 }
  }
}
```

This creates a new spec `mymod:fast-cassidy` that inherits from `core:cassidy` and overrides movement speed.
