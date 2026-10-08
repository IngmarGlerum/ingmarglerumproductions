import { useState } from 'react';
import { sections, site } from '../content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [...sections.map((s) => ({ href: `#${s.id}`, label: s.title })), { href: '#contact', label: 'Contact' }];

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={() => setOpen(false)}>
          {site.name}
        </a>
        <button
          className={`header__burger${open ? ' is-open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav className={`header__nav${open ? ' is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
