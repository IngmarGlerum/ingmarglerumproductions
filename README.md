# ingmarglerumproductions

Portfoliosite van Ingmar Glerum – Producer, Engineer, Songwriter. Vite + React + TypeScript.

## Starten

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # productiebuild in dist/
```

## Inhoud aanpassen

Alle tekst en releases staan in **`src/content.ts`**:

- `site` – naam, rollen, genres, (optionele) cijfers en contactlinks
- `sections` – de drie rasters: *Scores/Commercial*, *Credits* (met filter op rol) en *Songs*

Bestanden zet je in `public/media/`:

```
public/media/covers/   ← afbeeldingen (vierkant, ±1000×1000 px, jpg/webp)
public/media/audio/    ← mp3's
```

Voorbeeld van een release:

```ts
{
  title: 'Song titel',
  artist: 'Artiest',
  year: 2025,
  credit: 'Co-written, produced & mixed',
  roles: ['Writer', 'Producer', 'Mixing'],   // voor de filterknoppen bij Credits
  cover: 'media/covers/artiest-song.jpg',
  // kies één van deze voor de klik op de afbeelding:
  audio: 'media/audio/artiest-song.mp3',      // speelt af op de site
  embed: 'https://open.spotify.com/track/…',  // Spotify/YouTube/SoundCloud in een pop-up
  link: 'https://…',                          // opent in een nieuw tabblad
}
```
