# Changes after the unattended build

## 2026-09-27 (Claude, Eddie review)
- Header background made solid: at 94% opacity, scrolling content showed through the header.
- Step margin rings: added `max-width: none`, because the global `svg { max-width: 100% }` squashed the 56px ring into its 40px marker, so it did not circle the number.
- Step markers: `z-index: 2`, so the violet margin rule no longer runs through the step number.
