---
title: ModDependencyResolver
description: "Validates mod dependencies and produces a topologically sorted load order. Rules: - dependencies: MUST be present. Missing = error, mod won't load. - load_after"
---

`Omnith.Data`

Validates mod dependencies and produces a topologically sorted load order. Rules: - dependencies: MUST be present. Missing = error, mod won't load. - load_after: Soft edge. If both mods are active, enforce order. Missing target = ignore. - load_before: Inverse soft edge (becomes load_after on the target). Missing target = ignore. - incompatible: If both active, emit error. - Cycles are detected and reported as errors. - When topological sort has multiple valid orderings, LoadOrder (int) breaks ties.

## Methods

| Name | Description |
|---|---|
| `Resolve` | Validate and topologically sort a set of discovered mods. Returns a ModLoadResult with the sorted list and any issues found. |
| `ValidateOrder` | Validate a user-specified mod order against dependency constraints. Returns issues for any ordering violations (doesn't re-sort, just checks). |

