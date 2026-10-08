// Alle tekst en releases van de site staan in dit bestand.
//
// Afbeeldingen en audio: zet ze in `public/media/covers/` en `public/media/audio/`
// en verwijs ernaar zonder `public/`, bijv. `cover: 'media/covers/mijn-song.jpg'`.
//
// Per release kies je wat er gebeurt bij een klik (allemaal optioneel):
//   audio – mp3 die op de site zelf afspeelt (play-knop op de afbeelding)
//   embed – Spotify / YouTube / SoundCloud-link; opent een speler in een pop-up.
//           Bij Spotify en SoundCloud worden titel en hoes automatisch opgehaald als je
//           `title` of `cover` leeg laat.
//   link  – gewone link die in een nieuw tabblad opent (bijv. een smartlink)

export type Role = 'Writer' | 'Producer' | 'Engineer' | 'Mixing' | 'Mastering' | 'Composer';

export interface Release {
  /** Mag leeg blijven bij een Spotify/SoundCloud-embed: dan komt de titel uit de link. */
  title?: string;
  artist?: string;
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
    items: [],
  },
  {
    id: 'credits',
    title: 'Credits',
    filter: true,
    items: [
      { embed: 'https://open.spotify.com/track/1iNr1wnUt930etnJxDXulY' },
      { embed: 'https://open.spotify.com/track/08ncFg8AmlisWAI8jJ0RFF' },
      { embed: 'https://open.spotify.com/album/2OCMaXOlsAwRt5WJLTLjmy' },
    ],
  },
  {
    id: 'songs',
    title: 'Songs',
    items: [
      {
        title: 'Step By Step',
        artist: 'Ingmar Glerum',
        embed: 'https://soundcloud.com/ingmarglerum/ingmar-glerum-step-by-step-mastered-28-10-isrc',
      },
      {
        title: 'Wake Up',
        artist: 'Ingmar Glerum',
        embed: 'https://soundcloud.com/ingmarglerum/wake-up-mix-pt11-v21-mastered-25-11-1644',
      },
      {
        title: 'Straight Forward',
        artist: 'Ingmar Glerum',
        embed: 'https://soundcloud.com/ingmarglerum/straight-forward-mix-24-mastered-25-11',
      },
    ],
  },
];

// Secties zonder releases worden (ook in het menu) verborgen.
export const visibleSections = sections.filter((s) => s.items.length > 0);
