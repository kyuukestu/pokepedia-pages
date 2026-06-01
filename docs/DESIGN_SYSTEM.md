# Pokémon Sandbox RP — Wiki Design System
*Version 1.0*

---

## 1. Philosophy

This wiki is a living world document — part rulebook, part lore bible, part adventure guide. The visual language should feel like a **Field Guide crossed with a Game Manual**: structured enough to be trustworthy, playful enough to feel like an adventure. Every page should feel like it belongs to the same world.

**Three principles:**
1. **Clarity first** — Players come here to find answers. Information hierarchy matters more than decoration.
2. **Consistent structure, flexible content** — The same layout patterns adapt to wildly different content types.
3. **Color carries meaning** — Colors are never decorative; they signal content type.

---

## 2. Color System

### Semantic Color Map

| Color | Vuetify Token | Role | Use for |
|---|---|---|---|
| **Pokéball Red** | `red-darken-2` / `red-accent-2` | Rules & Warnings | Moderation, consequences, must-read rules |
| **Route Green** | `green-darken-2` / `green-accent-2` | World & Lore | Setting, locations, story arcs, world info |
| **Trainer Blue** | `blue-darken-2` / `cyan-accent-2` | Meta & System | Introduction, how-to, site mechanics |
| **Gold** | `amber-darken-2` / `amber-accent-2` | Events & Special | Featured events, announcements, spotlights |
| **Neutral** | `grey-darken-1` / `grey-lighten-2` | Structure | Dividers, borders, secondary text |

### Rules
- Every top-level wiki section has an **assigned semantic color** that never changes.
- Section icons always use the section's color — they are the visual anchor.
- Never assign a color purely for decoration. If a new page doesn't fit a category, discuss before assigning.

---

## 3. Typography

| Use | Style | Notes |
|---|---|---|
| Page title | `text-h3 font-weight-bold` | Hero only |
| Section heading | `text-h4 font-weight-bold` | Inside card headers |
| Sub-heading | `text-h6 font-weight-medium` | Inside card body |
| Body text | `text-body-1` | Line height 1.8 via `.lh-lg` |
| Captions & labels | `text-body-2` | Feature card descriptions, small print |
| Callout label | `text-overline font-weight-bold` | Callout component label field |

---

## 4. Component Library

### 4a. WikiCard (Section Container)

Every major section of a page lives inside a `WikiCard`. This is the primary layout unit.

**Structure:**
```
WikiCard
├── CardHeader (icon + title + optional badge)
├── v-divider
└── CardBody (slot for content)
```

**Props:**
- `title` — section heading text
- `icon` — mdi icon string
- `color` — semantic color key (`'blue'` | `'green'` | `'red'` | `'amber'`)
- `badge` (optional) — small label shown in header (e.g. "New", "Updated")

**Usage:**
```vue
<WikiCard title="Introduction" icon="mdi-information-outline" color="blue">
  <!-- content here -->
</WikiCard>
```

---

### 4b. WikiCallout (Informational Block)

Replaces the misuse of `v-alert` for labeled informational content. Use this for facts, notes, tips, timelines, and context — things that supplement body text without implying urgency.

**Structure:**
```
WikiCallout
├── Left accent bar (semantic color)
├── Label (overline, muted)
└── Content (body text or slot)
```

**Props:**
- `label` — short uppercase label (e.g. "Timeline", "Note", "Tip")
- `color` — semantic color (matches section)
- `icon` (optional) — decorative icon

**When to use:** Background info, timeline facts, helpful tips, "did you know" content.

**When NOT to use:** Actual warnings or rule violations — use `WikiAlert` for those.

---

### 4c. WikiAlert (Warning / Rule Block)

Reserved exclusively for content that requires player attention — moderation consequences, hard rules, critical warnings. This is the only component that may use `v-alert` semantics internally.

**Types:**
- `warning` — orange — things to be mindful of
- `error` — red — consequences of rule-breaking, removals
- `info` — blue — one-time important clarifications only

**Rule:** Maximum **one** WikiAlert per section. If you need more, restructure the content.

---

### 4d. FeatureGrid (Activity / Option Cards)

Three-column grid of icon + title + description cards. Use to present parallel options or activities a player can pursue.

**Structure per card:**
```
FeatureCard
├── Icon (48px, semantic color)
├── Title (text-h6)
└── Description (text-body-2)
```

**Props:**
- `items` — array of `{ icon, title, description, color? }`
- `cols` — default 3, can be 2 or 4

**Usage:**
```vue
<FeatureGrid :items="activities" />
```

---

### 4e. RuleList (Expandable Rule Items)

Replaces the flat icon-only list. Each rule now has an icon, a title, and an expandable description. Powered by the `useSandboxRules` store.

**Structure per item:**
```
RuleItem
├── Icon (semantic color)
├── Title
├── Expand toggle
└── [Expanded] Description text
```

**Rule objects in store should include:**
```ts
{
  icon: string,       // mdi icon
  color: string,      // semantic color
  title: string,      // short rule title
  description: string // explanation of the rule
}
```

---

### 4f. WikiHero (Page Header)

Replaces `SandboxHeader.vue`. A full-width hero with a background pattern, page title, and subtitle. Optional carousel slot for images (see TODO in original).

**Props:**
- `title` — main heading
- `subtitle` — tagline
- `icon` — large display icon
- `pattern` (optional) — background pattern variant: `'pokeball'` | `'grid'` | `'dots'`

---

## 5. Page Layout Rules

### Standard Page Template

```
<WikiHero />
<v-container max-width="1200">
  <WikiCard /> × N   ← one card per major section
</v-container>
```

### Content Inside Cards

| Content type | Component |
|---|---|
| Introductory paragraph | Plain `text-body-1` prose |
| Labeled fact or context | `WikiCallout` |
| Urgent warning or rule | `WikiAlert` (max 1 per card) |
| Parallel options / activities | `FeatureGrid` |
| Sequential or listed rules | `RuleList` |
| Inline emphasis | `v-chip` (use sparingly, max 2–3 per paragraph) |

---

## 6. Alert vs Callout — Decision Tree

```
Is this something a player MUST know to avoid consequences?
├── Yes → WikiAlert (warning or error type)
└── No → Is this a helpful fact/tip/timeline note?
    ├── Yes → WikiCallout
    └── No → Inline prose
```

---

## 7. Section Color Assignments

| Page / Section | Color |
|---|---|
| Introduction | Blue (Trainer Blue) |
| Setting / World | Green (Route Green) |
| Rules | Red (Pokéball Red) |
| Events / Announcements | Amber (Gold) |
| Ranger Path | Green |
| Contest / Showcase | Amber |
| Gym Battles | Red |

New sections must be assigned a color before going live. Color changes require discussion.

---

## 8. Do / Don't

| Do | Don't |
|---|---|
| Use `WikiCallout` for timeline, tips, lore | Use `v-alert` for non-urgent info |
| Keep one semantic color per section | Mix colors within a section |
| Use store-driven data for lists | Hardcode rule text in templates |
| Write rule descriptions in the store | Show rules as title-only |
| Use `FeatureGrid` for parallel options | Stack inline cards with inconsistent layout |
| One `WikiAlert` max per card | Stack 3 alerts in a single section |
| Let icon carry semantic meaning | Rely on color alone for meaning |

---

*This document should be updated whenever new component patterns are introduced. Treat it as the source of truth for all wiki pages.*
