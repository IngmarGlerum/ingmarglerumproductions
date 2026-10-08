// Zet een gewone deellink om naar een embed-URL. Onbekende links blijven ongewijzigd.
export function toEmbedUrl(link: string): string {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return link;
  }
  const host = url.hostname.replace(/^www\./, '');

  if (host === 'open.spotify.com' && !url.pathname.startsWith('/embed/')) {
    const path = url.pathname.replace(/^\/intl-[a-z]+/, '');
    return `https://open.spotify.com/embed${path}?theme=0`;
  }
  if (host === 'youtu.be') {
    return `https://www.youtube.com/embed/${url.pathname.slice(1)}?autoplay=1`;
  }
  if ((host === 'youtube.com' || host === 'm.youtube.com') && url.searchParams.get('v')) {
    return `https://www.youtube.com/embed/${url.searchParams.get('v')}?autoplay=1`;
  }
  if (host === 'soundcloud.com') {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23ece8de&auto_play=true&visual=true&show_comments=false`;
  }
  if (host === 'w.soundcloud.com') {
    url.searchParams.set('auto_play', 'true');
    return url.toString();
  }
  return link;
}

export type EmbedKind = 'spotify' | 'soundcloud' | 'video';

export function embedKind(link: string): EmbedKind {
  if (/spotify\.com/.test(link)) return 'spotify';
  if (/soundcloud\.com/.test(link)) return 'soundcloud';
  return 'video';
}

export interface EmbedInfo {
  title?: string;
  artist?: string;
  cover?: string;
}

// Titel en hoes ophalen via de openbare oEmbed-diensten van Spotify en SoundCloud.
// Gebeurt in de browser van de bezoeker; resultaten worden per pagina-bezoek bewaard.
const cache = new Map<string, Promise<EmbedInfo>>();

export function fetchEmbedInfo(link: string): Promise<EmbedInfo> {
  let pending = cache.get(link);
  if (!pending) {
    pending = loadEmbedInfo(link).catch(() => ({}));
    cache.set(link, pending);
  }
  return pending;
}

async function loadEmbedInfo(link: string): Promise<EmbedInfo> {
  const kind = embedKind(link);
  if (kind === 'video') return {};

  const endpoint =
    kind === 'spotify'
      ? `https://open.spotify.com/oembed?url=${encodeURIComponent(link)}`
      : `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(soundcloudPermalink(link))}`;

  const res = await fetch(endpoint);
  if (!res.ok) return {};
  const data = (await res.json()) as { title?: string; author_name?: string; thumbnail_url?: string };

  let title = data.title;
  let artist = kind === 'soundcloud' ? data.author_name : undefined;
  // SoundCloud geeft "Titel by Artiest" terug.
  if (kind === 'soundcloud' && title && artist && title.endsWith(` by ${artist}`)) {
    title = title.slice(0, -` by ${artist}`.length);
  }
  // SoundCloud-hoesjes zijn standaard klein; vraag de grote variant.
  const cover = data.thumbnail_url?.replace(/-large\./, '-t500x500.');
  if (!title) artist = undefined;
  return { title, artist, cover };
}

// Een w.soundcloud.com/player-link bevat de echte track-URL in de `url`-parameter.
function soundcloudPermalink(link: string): string {
  try {
    const url = new URL(link);
    if (url.hostname === 'w.soundcloud.com') return url.searchParams.get('url') ?? link;
  } catch {
    // ongeldige URL: gebruik de link zoals hij is
  }
  return link;
}
