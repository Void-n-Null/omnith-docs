---
title: Mod Structure
description: Files and directories that make up a mod.
---

## Directory layout

```
mods/
  my-mod/
    mod.data              # Required: manifest
    Specs/                # Optional: .data files with spec definitions
      entities.data
      world.data
    Resources/            # Optional: textures, audio, etc.
      sprites/
        goblin.png
    Assemblies/           # Optional: compiled C# DLL
      my-mod.dll
    my-mod.csproj         # Optional: C# project (not shipped, for building)
    MyMod.cs              # Optional: C# source
```

Only `mod.data` is required. A mod can be data-only, code-only, or both.

## mod.data manifest

```json
{
  "id": "my-mod",
  "name": "My Mod",
  "version": "1.0.0",
  "description": "A short description of what this mod does.",
  "load_order": 100,
  "dependencies": ["core"],
  "load_after": ["core"]
}
```

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique identifier. Used as the namespace prefix for all specs in this mod. |
| `name` | Yes | Human-readable display name. |
| `version` | Yes | Semver version string. |
| `description` | No | Short description shown in mod lists. |
| `load_order` | No | Numeric hint for ordering mods. Lower numbers load first. Default: 100. |
| `dependencies` | No | Array of mod IDs that must be present. Load fails if any are missing. |
| `load_after` | No | Array of mod IDs to load before this mod. |

## .data files

All `.data` files in the `Specs/` directory are loaded automatically. Each file is a JSON array of spec objects:

```json
[
  { "type": "entity", "id": "goblin", ... },
  { "type": "entity", "id": "goblin-chief", "extends": "goblin", ... }
]
```

The JSON parser supports comments (`//`) and trailing commas.

## C# assembly

If your mod needs custom behavior (new component types, systems, factories), create a .NET 8 class library that references the engine SDK:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <OutputPath>Assemblies</OutputPath>
    <AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="omnith">
      <HintPath>../../sdk/omnith.dll</HintPath>
      <Private>false</Private>
    </Reference>
    <Reference Include="GodotSharp">
      <HintPath>../../sdk/GodotSharp.dll</HintPath>
      <Private>false</Private>
    </Reference>
  </ItemGroup>
</Project>
```

Build with `dotnet build` and the DLL lands in `Assemblies/`. The engine auto-discovers any class that extends `OmnithMod` in loaded assemblies.
