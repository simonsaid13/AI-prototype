---
name: figma-mcp-transition
description: >-
  Checks a Figma screen against this project's theme files and existing
  components before building a page or element. Use when the user pastes a
  Figma link, grabs a screen, or asks to design a new page, screen, or
  element from Figma. Reuses matching components, colors, and font styles,
  creates missing ones, and reports every naming or value conflict between
  the code design system and Figma.
---

# Figma to code

Run this before writing any screen or element that comes from Figma. Read the files below in this project. Do not reuse token maps from other projects.

Use the Figma Console connection (Desktop Bridge) only. If it is disconnected, stop and say so. Do not switch to another Figma connection unless the user says to.

## Where the system lives

Read these every time. Do not trust an earlier chat.

| What | File |
|---|---|
| Colors | `src/theme/colors.ts` — `palette`, `lightColors`, `darkColors` |
| Fonts | `src/theme/typography.ts` — `typography` |
| Spacing and corners | `src/theme/spacing.ts` — `spacing`, `radius` |
| Theme hook | `src/theme/index.ts` — `useTheme()` |
| Parts | `src/components/ui/` and the rest of `src/components/` |
| Part list | `src/components/ui/index.ts` |

Current parts: `AppText`, `Button`, `IconButton`, `TextField`, `Screen`. Treat that list as a hint. The folders are the source of truth.

Screens go in `src/app/`. New reusable parts go in `src/components/ui/` and must be exported from `src/components/ui/index.ts`.

## Check, then build

1. Open the Figma frame. Turn a link id like `1-6814` into `1:6814`.
2. List what is on the screen: parts, colors (hex), font styles (size, weight, line height), spacing, corner radius.
3. Compare each one to the files above.
4. Show the report below.
5. If any row is a conflict, stop and wait. Do not build those pieces yet.
6. If nothing conflicts, reuse matches and create what is missing, then build.

## How to decide

**Same part, same job.** Use the existing component. Add a variant only when the existing one cannot show the Figma state.

**Color.** Match the hex, ignoring letter case. A match in `palette` or in `lightColors` / `darkColors` counts as existing.

**Font.** Match size, weight, and line height against `typography`. Family only matters when both sides set one.

**Spacing and corners.** Match the number against `spacing` and `radius`.

**Missing.** It is new only when no existing part, color, or font style matches. Then create it. Do not invent a second copy of something that already matches.

When you create a color, add the hex to `palette` and a role name on both `lightColors` and `darkColors`. When you create a font style, add it to `typography`. Screens must use `useTheme()`, `AppText`, and the parts. Do not paste a hex or a loose font size into a screen when a token exists.

## Conflicts — always tell the user

A conflict is any of these:

- Same color or same font values, but the Figma name and the code name differ.
- Same name, but the values differ.
- Close but not the same (a few pixels off, or a nearby hex). This is not a match.

Say it in plain language. Recommend one side, then wait.

Default recommendation when the values are the same and only the names differ: keep the name already in the code. The app already uses it. Tell the user they can switch the code to the Figma name if the design name should win.

Do not rename, overwrite, or add a twin until the user picks.

## Report

Use this shape every time, including when the lists are empty.

```
Design check

Reuse
- [what on the screen] → [name already in the code]

Create
- [what is missing] → new [part or style] named [name]

Conflict
- [what on the screen]: Figma calls it "[figma name]", code calls it "[code name]". Same [color or font]. Keep the code name, unless you want the Figma name instead.
```

Leave a section out only when it has nothing to say. Never leave out a conflict.
