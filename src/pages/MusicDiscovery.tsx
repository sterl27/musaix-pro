import AppShell from '../components/AppShell'

const tracks = [
  { title: 'Neon Circuit', artist: 'Studio Session', duration: '4:22', bpm: 128, key: 'Am' },
  { title: 'Deep Resonance', artist: 'Spatial Mix', duration: '5:01', bpm: 120, key: 'Dm' },
  { title: 'Frequency Drift', artist: 'Ambient Series', duration: '6:14', bpm: 95, key: 'F' },
  { title: 'Harmonic Core', artist: 'Production Cut', duration: '3:47', bpm: 140, key: 'C' },
  { title: 'Signal Bloom', artist: 'Live Capture', duration: '4:55', bpm: 110, key: 'Em' },
]

const dailyMixes = [
  { name: 'Daily Mix 1', desc: 'Electronic & Ambient', tracks: 24 },
  { name: 'Daily Mix 2', desc: 'Production Stems', tracks: 18 },
  { name: 'Daily Mix 3', desc: 'Spatial Soundscapes', tracks: 31 },
]

export default function MusicDiscovery() {
  return (
    <AppShell title="Music Discovery">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Music Discovery</h1>
        <p className="text-on-surface-variant font-body-lg">Explore and curate audio content across your entire library.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
        {dailyMixes.map((mix) => (
          <div key={mix.name} className="bento-card rounded-lg p-stack-md cursor-pointer">
            <div className="h-32 bg-gradient-to-br from-brand-coral/20 to-surface-container-highest rounded mb-stack-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-coral text-5xl">album</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white">{mix.name}</h3>
            <p className="text-on-surface-variant text-sm">{mix.desc}</p>
            <p className="font-mono-data text-mono-data text-outline mt-2">{mix.tracks} tracks</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-label-caps text-label-caps text-outline">RECENT TRACKS</h3>
          <button className="text-brand-coral font-label-caps text-label-caps hover:opacity-80 transition-opacity">VIEW ALL</button>
        </div>
        <div className="space-y-2">
          {tracks.map((track, i) => (
            <div key={track.title} className="flex items-center gap-4 p-3 rounded hover:bg-surface-container-high transition-colors group cursor-pointer">
              <span className="w-8 text-center font-mono-data text-mono-data text-outline group-hover:hidden">{i + 1}</span>
              <button className="w-8 hidden group-hover:flex items-center justify-center" aria-label="Play">
                <span className="material-symbols-outlined accent-coral text-xl">play_circle</span>
              </button>
              <div className="flex-1">
                <p className="text-on-surface text-sm font-medium">{track.title}</p>
                <p className="text-outline text-xs">{track.artist}</p>
              </div>
              <span className="font-mono-data text-mono-data text-outline hidden sm:block">{track.bpm} BPM</span>
              <span className="font-mono-data text-mono-data text-outline hidden md:block">{track.key}</span>
              <span className="font-mono-data text-mono-data text-on-surface-variant">{track.duration}</span>
              <button className="text-outline hover:accent-coral transition-colors opacity-0 group-hover:opacity-100" aria-label="More">
                <span className="material-symbols-outlined text-sm">more_vert</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
