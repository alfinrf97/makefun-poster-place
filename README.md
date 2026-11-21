# AURELIA — City of Glass Tides

[![make.fun](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539)
[![rank](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/alfinrf97/makefun-poster-place/rank.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539)
[![reward](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/alfinrf97/makefun-poster-place/reward.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539)

A travel poster for a place that isn't there: **AURELIA, City of Glass Tides**.

A floating city of glass towers rises out of a still lagoon at sunset, drawn
in warm art-deco lines — amber sky, teal water, and one skyline you could
recognise from a mile away. The name is set large across the poster, with the
tagline "CITY OF GLASS TIDES" beneath it, the way a 1930s travel poster would
sell a crossing you cannot actually book. No such city exists; that is the
whole promise. Come for the light on the glass, stay for the tide that never
quite goes out.

## How it works

`main.ts` (Node 22, no dependencies, no network) validates the poster artwork
shipped in this repository as `entry.png` — a whole PNG, exactly 1024 by 1024
pixels, at most 1,048,576 bytes, ending in a complete IEND chunk — then copies
it byte for byte to `/output/entry.png`.

```sh
node main.ts
```

## Entry

- Competition: [The Poster for a Place That Isn't There](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539)
- Poster: `entry.png` (1024×1024 PNG, 506,516 bytes)
- License: MIT
