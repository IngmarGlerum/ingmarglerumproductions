import { Fragment, useEffect, useState } from 'react';
import { fetchEmbedInfo, type EmbedInfo } from '../embed';
import type { Release, Role, Section } from '../content';
import type { Player } from '../App';

export default function ReleaseSection({ section, player }: { section: Section; player: Player }) {
  const [filter, setFilter] = useState<Role | 'All'>('All');

  const roles = Array.from(new Set(section.items.flatMap((i) => i.roles ?? [])));
  const items = filter === 'All' ? section.items : section.items.filter((i) => i.roles?.includes(filter));

  return (
    <section className="section container" id={section.id}>
      <h2 className="section__title">
        {section.title.split('/').map((part, i) => (
          <Fragment key={part}>
            {i > 0 && (
              <>
                /<wbr />
              </>
            )}
            {part}
          </Fragment>
        ))}
      </h2>

      {section.filter && roles.length > 0 && (
        <div className="filters" role="group" aria-label="Filter op rol">
          {(['All', ...roles] as const).map((r) => (
            <button
              key={r}
              className={`filter${filter === r ? ' is-active' : ''}`}
              aria-pressed={filter === r}
              onClick={() => setFilter(r)}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <ul className="grid">
        {items.map((item) => (
          <ReleaseCard key={item.embed ?? item.audio ?? item.link ?? item.title} item={item} player={player} />
        ))}
      </ul>
    </section>
  );
}

// Haalt titel/hoes op uit de embed-link als die niet in content.ts staan.
function useEmbedInfo(item: Release): EmbedInfo {
  const [info, setInfo] = useState<EmbedInfo>({});
  const needsInfo = !!item.embed && (!item.title || !item.cover);

  useEffect(() => {
    if (!needsInfo || !item.embed) return;
    let active = true;
    void fetchEmbedInfo(item.embed).then((i) => active && setInfo(i));
    return () => {
      active = false;
    };
  }, [needsInfo, item.embed]);

  return info;
}

function ReleaseCard({ item: raw, player }: { item: Release; player: Player }) {
  const info = useEmbedInfo(raw);
  const item = {
    ...raw,
    title: raw.title ?? info.title ?? '',
    artist: raw.artist ?? info.artist,
    cover: raw.cover ?? info.cover,
  };
  const name = item.title || 'deze release';
  const isCurrent = !!item.audio && player.current === item.audio;
  const isPlaying = isCurrent && player.playing;

  const onClick = () => {
    if (item.audio) player.toggle(item.audio);
    else if (item.embed) player.openEmbed(item.embed, name);
    else if (item.link) window.open(item.link, '_blank', 'noopener');
  };
  const clickable = !!(item.audio || item.embed || item.link);

  const cover = (
    <div className="card__cover">
      {item.cover ? (
        <img src={item.cover} alt={[item.title, item.artist].filter(Boolean).join(' – ')} loading="lazy" />
      ) : (
        <div className="card__placeholder" aria-hidden="true">
          {item.title}
        </div>
      )}
      {clickable && (
        <span className={`card__action${isPlaying ? ' is-visible' : ''}`} aria-hidden="true">
          {item.audio ? (isPlaying ? <PauseIcon /> : <PlayIcon />) : item.embed ? <PlayIcon /> : <ArrowIcon />}
        </span>
      )}
      {isCurrent && (
        <span className="card__progress" style={{ transform: `scaleX(${player.progress})` }} />
      )}
    </div>
  );

  const label = item.audio
    ? `${isPlaying ? 'Pauzeer' : 'Speel'} ${name}`
    : item.embed
      ? `Beluister ${name}`
      : `Open ${name}`;

  return (
    <li className="card">
      {clickable ? (
        <button className="card__button" onClick={onClick} aria-label={label}>
          {cover}
        </button>
      ) : (
        cover
      )}
      {item.title && <h3 className="card__title">{item.title}</h3>}
      {(item.artist || item.year) && (
        <p className="card__artist">
          {item.artist}
          {item.year && (item.artist ? ` (${item.year})` : item.year)}
        </p>
      )}
      {item.credit && <p className="card__credit">{item.credit}</p>}
    </li>
  );
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
