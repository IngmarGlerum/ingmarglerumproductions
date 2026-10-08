import type { ReactNode } from 'react';
import { site } from '../content';

const icons: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.12.3.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.23 1.33.37.22.49.7.26 1.07Zm.1-2.83C14.7 8.94 9.38 8.76 6.3 9.7a.94.94 0 1 1-.54-1.8c3.53-1.07 9.4-.86 13.1 1.33a.94.94 0 0 1-.96 1.62Z" />
    </svg>
  ),
  linktree: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 22V9M5 7l7 6 7-6M6 13l6 5 6-5M12 9V2" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
    </svg>
  ),
};

export default function Contact() {
  const { heading, text, links } = site.contact;
  const entries = Object.entries(links).filter(([, url]) => url);

  return (
    <section className="contact container" id="contact">
      <h2 className="contact__heading">{heading}</h2>
      <p className="contact__text">{text}</p>
      {entries.length > 0 && (
        <ul className="contact__links">
          {entries.map(([key, url]) => {
            const href = key === 'email' && !url.startsWith('mailto:') ? `mailto:${url}` : url;
            return (
              <li key={key}>
                <a href={href} target={key === 'email' ? undefined : '_blank'} rel="noopener noreferrer">
                  {icons[key]}
                  <span>{key}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
