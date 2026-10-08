import { useEffect, useRef, useState } from 'react';
import { visibleSections as sections, site } from './content';
import Header from './components/Header';
import Hero from './components/Hero';
import ReleaseSection from './components/ReleaseSection';
import Contact from './components/Contact';
import EmbedModal from './components/EmbedModal';

const YEAR = new Date().getFullYear();

export interface Player {
  current: string | null;
  playing: boolean;
  progress: number;
  toggle: (src: string) => void;
  openEmbed: (link: string, title: string) => void;
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [embed, setEmbed] = useState<{ link: string; title: string } | null>(null);

  const toggle = (src: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current === src) {
      if (audio.paused) void audio.play();
      else audio.pause();
      return;
    }
    audio.src = src;
    setCurrent(src);
    setProgress(0);
    void audio.play();
  };

  const openEmbed = (link: string, title: string) => {
    audioRef.current?.pause();
    setEmbed({ link, title });
  };

  useEffect(() => {
    document.title = `${site.name} · ${site.roles.join(', ')}`;
  }, []);

  const player: Player = { current, playing, progress, toggle, openEmbed };

  return (
    <>
      <Header />
      <main>
        <Hero />
        {sections.map((s) => (
          <ReleaseSection key={s.id} section={s} player={player} />
        ))}
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>
            © {YEAR} {site.name}
          </span>
          {site.contact.location && <span>{site.contact.location}</span>}
        </div>
      </footer>

      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
      />
      {embed && <EmbedModal {...embed} onClose={() => setEmbed(null)} />}
    </>
  );
}
