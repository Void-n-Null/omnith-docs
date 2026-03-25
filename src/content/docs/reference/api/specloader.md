---
title: SpecLoader
description: "Loads .data files (JSONC arrays of specs) and resolves spec references. For each field on a spec type: - If the type inherits from Spec and the JSON value is a "
---

`Omnith.Data`

Loads .data files (JSONC arrays of specs) and resolves spec references. For each field on a spec type: - If the type inherits from Spec and the JSON value is a string: lookup by ID - If the type inherits from Spec and the JSON value is an object: deserialize, auto-assign ID as "parentId.fieldName", register, and assign - Otherwise: deserialize directly Uses SpecTypeCache for cached reflection (reflected once per type, not per instance).

## Methods

| Name | Description |
|---|---|
| `LoadDirectory` | Load all .data files from a directory. |
| `LoadFile` | Load a single .data file. |
| `LoadFromMod` | Load specs from a mod's Specs/ directory. |
| `LoadAll` | Load specs from all mods, then resolve inheritance and references. |
| `DeserializeSpec` | Deserialize a JSON element into a Spec. Handles spec-reference fields: string -> deferred (resolved after all specs loaded) object -> inline spec, auto-ID'd and registered immediately |
| `DeserializeInlineSpec` | Deserialize an inline spec object where the type is inferred from the field, not from a "type" key in the JSON. |
| `ResolveAllReferences` | Resolve all deferred spec references after loading is complete. |
| `QualifyId` | Qualify an ID with the current mod prefix if it doesn't already contain one. "cassidy" → "core:cassidy" (when loading core) "core:cassidy" → "core:cassidy" (already qualified, untouched) |

