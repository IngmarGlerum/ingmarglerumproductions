// Alle tekst en releases van de site staan in dit bestand.
//
// Afbeeldingen en audio: zet ze in `public/media/covers/` en `public/media/audio/`
// en verwijs ernaar zonder `public/`, bijv. `cover: 'media/covers/mijn-song.jpg'`.
//
// Per release kies je wat er gebeurt bij een klik (allemaal optioneel):
//   audio – mp3 die op de site zelf afspeelt (play-knop op de afbeelding)
//   embed – Spotify / YouTube / SoundCloud-link; opent een speler in een pop-up
//   link  – gewone link die in een nieuw tabblad opent (bijv. een smartlink)

export type Role = 'Writer' | 'Producer' | 'Engineer' | 'Mixing' | 'Mastering' | 'Composer';

export interface Release {
  title: string;
  artist: string;
  year?: number;
  /** Korte omschrijving van je rol, bijv. "Co-written, produced & mixed". */
  credit?: string;
  /** Gebruikt voor de filterknoppen bij Credits. */
  roles?: Role[];
  cover?: string;
  audio?: string;
  embed?: string;
  link?: string;
}

export interface Section {
  id: string;
  title: string;
  /** Toont filterknoppen op rol boven het raster. */
  filter?: boolean;
  items: Release[];
}

export const site = {
  name: 'Ingmar Glerum',
  roles: ['Producer', 'Engineer', 'Songwriter'],
  genres: ['Pop', 'Funk', 'Modern styles', 'Scores'],

  // Cijfers onder de genres. Laat de lijst leeg om het blok te verbergen.
  stats: [] as { value: string; label: string }[],

  contact: {
    heading: "Let's make something.",
    text: 'Available for sessions, production and mix work.',
    location: '',
    // Laat een link leeg ('') om het icoon te verbergen.
    links: {
      instagram: '',
      spotify: '',
      linktree: '',
      email: '',
      linkedin: '',
    },
  },
};

export const sections: Section[] = [
  {
    id: 'scores',
    title: 'Scores/Commercial',
    items: [
      { title: 'Voorbeeld score', artist: 'Klant of film', year: 2025, credit: 'Composed & produced' },
    ],
  },
  {
    id: 'credits',
    title: 'Credits',
    filter: true,
    items: [
      {
        title: 'Voorbeeld credit',
        artist: 'Artiest',
        year: 2025,
        credit: 'Produced & mixed',
        roles: ['Producer', 'Mixing'],
      },
      {
        title: 'Nog een credit',
        artist: 'Artiest',
        year: 2024,
        credit: 'Engineered',
        roles: ['Engineer'],
      },
    ],
  },
  {
    id: 'songs',
    title: 'Songs',
    items: [
      { title: 'Voorbeeld song', artist: 'Ingmar Glerum', year: 2025, credit: 'Written & produced' },
    ],
  },
];
