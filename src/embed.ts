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
    return `https://open.spotify.com/embed${path}`;
  }
  if (host === 'youtu.be') {
    return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
  }
  if ((host === 'youtube.com' || host === 'm.youtube.com') && url.searchParams.get('v')) {
    return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
  }
  if (host === 'soundcloud.com') {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23e9e4d8&auto_play=true&visual=true`;
  }
  return link;
}

export function embedIsTall(link: string): boolean {
  return !/spotify\.com/.test(link);
}
