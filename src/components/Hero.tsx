import { site } from '../content';

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <h1 className="hero__name">{site.name}</h1>
      <p className="hero__roles">{site.roles.join(' · ')}</p>
      <ul className="pills">
        {site.genres.map((g) => (
          <li key={g} className="pill">
            {g}
          </li>
        ))}
      </ul>
      {site.stats.length > 0 && (
        <dl className="stats">
          {site.stats.map((s) => (
            <div key={s.label} className="stats__item">
              <dt className="stats__value">{s.value}</dt>
              <dd className="stats__label">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
