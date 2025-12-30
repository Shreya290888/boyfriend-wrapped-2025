import React, { useMemo, useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Button = ({ children, onClick, variant = 'primary', className = '' }) => (
  <button
    onClick={onClick}
    className={`hand px-5 py-3 rounded-xl transition-all duration-300 shadow-soft border active:scale-[0.98] ${
      variant === 'primary'
        ? 'bg-cream/90 text-ink border-white/20 hover:bg-cream'
        : 'bg-white/10 text-cream border-white/20 hover:bg-white/20'
    } ${className}`}
  >
    {children}
  </button>
)

const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="min-h-dvh app-bg flex items-center justify-center p-4"
  >
    <div className="w-full max-w-4xl">
      {children}
    </div>
  </motion.main>
)

// Handmade doodles overlay (subtle hearts/stars around)
const Doodles = () => {
  const items = useMemo(() => ([
    { cls: 'heart', left: '6%', top: '10%', size: 22, rot: -8 },
    { cls: 'star', right: '8%', top: '16%', size: 18, rot: 12 },
    { cls: 'heart', left: '10%', bottom: '12%', size: 18, rot: 8 },
    { cls: 'star', right: '12%', bottom: '10%', size: 20, rot: -10 },
  ]), [])
  return (
    <div className="doodles" aria-hidden>
      {items.map((d, i) => (
        <span key={i}
          className={`doodle ${d.cls}`}
          style={{
            position: 'absolute',
            left: d.left,
            right: d.right,
            top: d.top,
            bottom: d.bottom,
            transform: `rotate(${d.rot}deg)`,
            fontSize: d.size,
          }}
        >{d.cls === 'heart' ? '♥' : '✶'}</span>
      ))}
    </div>
  )
}

const Landing = ({ onContinue }) => (
  <Page>
    <div className="relative card px-8 py-12 md:px-14 md:py-16 text-center animate-breathe tilt-1">
      <div className="tape top-left" />
      <div className="tape top-right" />
      <h1 className="hand text-4xl md:text-5xl mb-3">Boyfriend Wrapped 2025</h1>
      <p className="text-cream/80 hand text-lg md:text-xl mb-8">
        made with love by cute smart intelligent and loving Girlfriend
      </p>
      <Button onClick={onContinue}>open softly</Button>
    </div>
  </Page>
)

const WarningModal = ({ open, onYes, onNoTry }) => {
  const [shake, setShake] = useState(false)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14 }}
            className={`card relative w-full max-w-md px-6 py-8 ${shake ? 'animate-wiggle' : ''}`}
            onAnimationEnd={() => setShake(false)}
          >
            <div className="hand text-2xl mb-4">Open this only if you are my boyfriend 🥺</div>
            <p className="text-cream/80 mb-8 hand">
              Otherwise please leave before emotions happen.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <Button variant="ghost" onClick={() => { setShake(true); onNoTry?.() }}>No</Button>
              <Button onClick={onYes}>Yes, I’m your boyfriend</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const StartScreen = ({ onStart }) => (
  <Page>
    <div className="relative card px-10 py-12 md:px-14 md:py-16 text-center tilt-2">
      <div className="tape top-left" />
      <div className="tape top-right" />
      <p className="hand text-2xl md:text-3xl mb-8">Let’s start Boyfriend Wrapped 2025</p>
      <Button onClick={onStart}>okay</Button>
    </div>
  </Page>
)

const LoadingScreen = ({ onDone }) => {
  const messages = useMemo(() => [
    'reading old texts…',
    'counting i love you…',
    'measuring patience…',
    'remembering fights and hugs…',
    'finding screenshots and smiles…'
  ], [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const rot = setInterval(() => setIndex(i => (i + 1) % messages.length), 1200)
    const done = setTimeout(onDone, 6200)
    return () => { clearInterval(rot); clearTimeout(done) }
  }, [messages, onDone])

  return (
    <Page>
      <div className="relative card px-10 py-16 md:px-14 md:py-18 text-center tilt-1">
        <div className="tape top-left" />
        <div className="tape top-right" />
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5 }}
          className="hand text-2xl"
        >
          {messages[index]}
        </motion.div>
        <div className="mt-6 flex items-center justify-center gap-1 opacity-70">
          <span className="w-2 h-2 bg-cream/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-cream/60 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
          <span className="w-2 h-2 bg-cream/50 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
        </div>
      </div>
    </Page>
  )
}

const Section = ({ title, children }) => (
  <div className="relative card p-6 md:p-8 tilt-1 max-h-[70vh] overflow-visible">
    <div className="tape top-left" />
    <div className="tape top-right" />
    <div className="hand text-2xl md:text-3xl mb-4">{title}</div>
    <div className="space-y-2 text-cream/90 hand text-xl max-h-[52vh] overflow-y-auto pr-2">{children}</div>
  </div>
)

const StatsScreen = ({ onNext }) => {
  const items = [
    {
      title: 'Survival & Effort',
      lines: [
        'Total days survived with me: 365+',
        'Times you said “I love you”: countless',
        'Arguments won by you: most',
        'Roasted me: brutally but okay',
        'Handled my anger: expert level',
      ]
    },
    {
      title: 'Love Language',
      lines: [
        'Kisses: very much (through screen), face-to-face very less',
        'Hugs: very less',
        'Good morning texts: medium',
      ]
    },
    {
      title: 'Communication Wrapped',
      lines: [
        'Longest call duration: 6+ hours',
        'Most used emoji: 😁 🙌🏻 💋 🤍 🧿 🌚',
        'Most said phrases: “I love youuuu”, “achhha chl sorrryyyy mottteyyyy”',
        'Most used words: mottteyyyy • mottuuuu • sorryyyyy',
      ]
    },
    {
      title: 'Personality Breakdown',
      lines: [
        '80% kutttaaa',
        '15% gaddha',
        '5% hawasi / tharki / kamina',
      ]
    },
    {
      title: 'Mood Tracker',
      lines: [
        'Happy with you',
        'Missing you',
        'Loving you',
        'Feeling safe with you',
      ]
    },
    {
      title: 'Red Flags vs Green Flags',
      lines: [
        'Red flags:',
        '• doesn’t give enough kisses and hugs',
        '• doesn’t let me eat ice cream and waffles',
        '• roasts me more',
        '• doesn’t let me roast him',
        'Green flags:',
        '• cares about me a lot',
        '• says sorry every time',
        '• loves me',
        '• understands me',
        '• helps me understand things',
        '• happy with me every time',
      ]
    },
  ]

  const [current, setCurrent] = useState(0)

  const isLast = current >= items.length - 1

  const next = () => {
    if (isLast) {
      onNext()
    } else {
      setCurrent((c) => c + 1)
    }
  }

  const sec = items[current]

  return (
    <Page>
      <div className="space-y-4">
        <motion.div
          key={sec.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
        >
          <Section title={sec.title}>
            {sec.lines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </Section>
        </motion.div>
        <div className="pt-2 flex justify-between items-center">
          <div className="hand text-sm text-cream/70">{current + 1} / {items.length}</div>
          <Button onClick={next}>{isLast ? 'next page →' : 'next →'}</Button>
        </div>
      </div>
    </Page>
  )
}

const Memories = ({ onNext }) => (
  <Page>
    <div className="space-y-4">
      <Section title="Firsts & Memories">
        <div>First “I love you”: 18 July</div>
        <div>First sorry: don’t remember (but of course by you)</div>
        <div>First kiss: 27 July</div>
        <div>First date: movie date, 27 July</div>
        <div>First confession: 26 April (by me)</div>
      </Section>
      <div className="pt-2 flex justify-end">
        <Button onClick={onNext}>turn the page →</Button>
      </div>
    </div>
  </Page>
)

const Timeline = ({ onNext }) => (
  <Page>
    <div className="space-y-4">
      <Section title="Relationship Timeline">
        <div>January: talking stage</div>
        <div>April: first confession</div>
        <div>June: situationship</div>
        <div>July: finally together</div>
        <div>Aug–Nov: love, fights, learning</div>
        <div>December: happily together</div>
      </Section>
      <div className="pt-2 flex justify-end">
        <Button onClick={onNext}>final page →</Button>
      </div>
    </div>
  </Page>
)

const FinalScreen = () => {
  const onSave = () => {
    window.print()
  }
  const onShare = async () => {
    const shareData = {
      title: 'Boyfriend Wrapped 2025',
      text: 'This was Boyfriend Wrapped 2025. Let’s make 2026 bigger, together.',
      url: window.location.href
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url)
      alert('Link copied to clipboard!')
    }
  }

  const confettiPieces = useMemo(() => {
    const colors = ['#ffb3c1', '#ffd6a5', '#caffbf', '#9bf6ff', '#bdb2ff', '#fffffc']
    return Array.from({ length: 40 }).map((_, i) => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
      color: colors[i % colors.length],
      rotate: Math.random() * 360
    }))
  }, [])

  // Fireworks particles
  const fireworks = useMemo(() => {
    const colors = ['#ffb3c1', '#ffd6a5', '#caffbf', '#9bf6ff', '#bdb2ff', '#fff']
    return Array.from({ length: 28 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 60 + 10,
      delay: Math.random() * 2.2,
      color: colors[i % colors.length],
    }))
  }, [])

  // Typed letter effect for the final message
  const message = `thank youuuu motteyyy for being there for me at every point ,
my safest place, my comfort, my home away from home.
This was Boyfriend Wrapped 2025.
Let’s make 2026 bigger, and memories together .
I Loveeeeeeeeeeeeee Youhhhhhhhhhhhhhh So Muchhhhhhhhhhhhhhhhhhhh Mottteyyyyyyyyyyyyyyyyyyyy.`
  const [typed, setTyped] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(message.slice(0, i))
      if (i >= message.length) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [message])

  return (
    <Page>
      <div className="relative card px-8 py-12 md:px-12 md:py-16 text-center tilt-2 overflow-hidden max-h-[80vh] overflow-y-auto">
        <div className="tape top-left" />
        <div className="tape top-right" />
        <div className="fireworks" aria-hidden>
          {fireworks.map((f, idx) => (
            <span
              key={idx}
              className="firework"
              style={{
                left: f.left + 'vw',
                top: f.top + 'vh',
                backgroundColor: f.color,
                animationDelay: f.delay + 's',
              }}
            />
          ))}
        </div>
        <div className="confetti" aria-hidden>
          {confettiPieces.map((p, idx) => (
            <span
              key={idx}
              className="confetti-piece"
              style={{
                left: p.left + 'vw',
                width: p.size + 'px',
                height: (p.size * 0.5) + 'px',
                backgroundColor: p.color,
                borderRadius: '2px',
                animationDuration: p.duration + 's',
                animationDelay: p.delay + 's',
                transform: `rotate(${p.rotate}deg)`
              }}
            />
          ))}
        </div>
        <div className="hand text-2xl md:text-3xl whitespace-pre-line mb-8 min-h-[8rem]">
{typed}
        </div>
        <div className="hand text-3xl md:text-4xl mb-6">🎉 Happy New Year 2026 🎉</div>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={onSave}>save this memory</Button>
          <Button variant="ghost" onClick={onShare}>share this moment</Button>
        </div>
      </div>
    </Page>
  )
}

// Floating heart cursor layer
const HeartLayer = () => {
  const layerRef = useRef(null)
  useEffect(() => {
    const colors = ['#ffb3c1', '#ffd6a5', '#caffbf', '#9bf6ff']
    const onClick = (e) => {
      const el = document.createElement('span')
      el.className = 'heart-pop'
      el.textContent = '❤'
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      el.style.color = colors[Math.floor(Math.random() * colors.length)]
      el.style.fontSize = (14 + Math.random() * 10) + 'px'
      layerRef.current.appendChild(el)
      setTimeout(() => el.remove(), 1600)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
  return <div className="heart-layer" ref={layerRef} aria-hidden />
}

// Love counter widget with localStorage
const LoveCounter = () => {
  const [count, setCount] = useState(() => {
    const v = Number(localStorage.getItem('love_count') || '0')
    return Number.isFinite(v) ? v : 0
  })
  useEffect(() => {
    localStorage.setItem('love_count', String(count))
  }, [count])
  return (
    <div className="love-counter px-3 py-2 flex items-center gap-3">
      <span className="hand">i love you: {count}</span>
      <Button onClick={() => setCount(c => c + 1)} className="!px-3 !py-2">+
      </Button>
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0)
  const [warningOpen, setWarningOpen] = useState(false)

  return (
    <div>
      <Doodles />
      <WarningModal
        open={warningOpen}
        onYes={() => { setWarningOpen(false); setStep(2) }}
        onNoTry={() => { /* playful shake already handled */ }}
      />

      <AnimatePresence mode="sync">
        {step === 0 && (
          <Landing key="landing" onContinue={() => setWarningOpen(true)} />
        )}
        {step === 2 && (
          <StartScreen key="start" onStart={() => setStep(3)} />
        )}
        {step === 3 && (
          <LoadingScreen key="loading" onDone={() => setStep(4)} />
        )}
        {step === 4 && (
          <StatsScreen key="stats" onNext={() => setStep(5)} />
        )}
        {step === 5 && (
          <Memories key="memories" onNext={() => setStep(6)} />
        )}
        {step === 6 && (
          <Timeline key="timeline" onNext={() => setStep(7)} />
        )}
        {step === 7 && (
          <FinalScreen key="final" />
        )}
      </AnimatePresence>
      <HeartLayer />
      <LoveCounter />
    </div>
  )
}
