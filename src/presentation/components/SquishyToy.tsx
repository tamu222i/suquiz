import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { Squishy } from '../../domain/squishy/model/Squishy'
import type { IAsmrSoundPlayer } from '../../infrastructure/sound/WebAudioAsmrPlayer'
import { calculateSquishDeformationProgress } from './squishyPhysics'
import { CharacterMoldSvg } from './squishy/CharacterMoldSvg'
import { CharacterPropsSvg } from './squishy/CharacterPropsSvg'

interface SquishyToyProps {
  squishy: Squishy
  soundPlayer: IAsmrSoundPlayer
  interactive?: boolean
  size?: number
  onSquished?: (force: number) => void
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  text: string
  opacity: number
  scale: number
}

export const SquishyToy: React.FC<SquishyToyProps> = ({
  squishy,
  soundPlayer,
  interactive = true,
  size = 240,
  onSquished,
}) => {
  const [deformation, setDeformation] = useState(0)
  const [isPressing, setIsPressing] = useState(false)
  const [pressPoint, setPressPoint] = useState({ x: 0.5, y: 0.5 })
  const [particles, setParticles] = useState<Particle[]>([])

  const targetForceRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const containerRef = useRef<HTMLDivElement>(null)
  const particleIdCounter = useRef(0)

  // Trigger ASMR Sound & Particles
  const triggerAsmr = useCallback(
    (force: number, clientX: number, clientY: number) => {
      const result = squishy.press(force)
      soundPlayer.playSquish(result.soundTrigger)
      onSquished?.(force)

      // Generate ASMR visual particles
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const px = clientX - rect.left
        const py = clientY - rect.top

        let particleText = '✨'
        const soundType = result.soundTrigger.soundType
        const recipe = squishy.secretRecipe

        if (recipe?.category === 'kimetsu') {
          particleText = recipe.id === 'kimetsu_zenitsu' ? '⚡' : recipe.id === 'kimetsu_nezuko' ? '🌸' : '🔥'
        } else if (recipe?.category === 'chiikawa') {
          particleText = recipe.id === 'chiikawa_teary' ? '🥺' : recipe.id === 'chiikawa_hachiware' ? '✨' : '⭐'
        } else if (recipe?.category === 'sumikko') {
          particleText = recipe.id === 'sumikko_ebifurai' ? '🍤' : recipe.id === 'sumikko_tokage' ? '🦕' : '🐻‍❄️'
        } else if (recipe?.category === 'ghibli') {
          particleText = recipe.id === 'ghibli_calcifer' ? '🔥' : recipe.id === 'ghibli_kaonashi' ? '🪙' : recipe.id === 'ghibli_kurosuke' ? '🖤' : recipe.id === 'ghibli_catbus' ? '🚌' : '🍃'
        } else if (recipe?.category === 'disney_princess') {
          particleText = recipe.id === 'princess_cinderella' ? '👠' : recipe.id === 'princess_belle' ? '🌹' : recipe.id === 'princess_ariel' ? '🧜‍♀️' : recipe.id === 'princess_elsa' ? '❄️' : '🌸'
        } else if (recipe?.category === 'precure') {
          particleText = recipe.id === 'precure_fairy' ? '🐰' : recipe.id === 'precure_ribbon' ? '🎀' : '💖'
        } else if (recipe?.category === 'paw_patrol') {
          particleText = recipe.id === 'paw_marshall' ? '🚒' : recipe.id === 'paw_skye' ? '🛩️' : '🐾'
        } else if (recipe?.category === 'mario') {
          particleText = recipe.id === 'mario_mushroom' ? '🍄' : recipe.id === 'mario_star' ? '⭐' : recipe.id === 'mario_block' ? '❓' : '🧢'
        } else if (soundType === 'coin_1up') particleText = '🪙'
        else if (soundType === 'magic_wand') particleText = '🪄'
        else if (soundType === 'forest_rustle') particleText = '🍃'
        else if (soundType === 'puppy_bark') particleText = '🐕'
        else if (soundType === 'fire_crackle') particleText = '🔥'
        else if (soundType === 'bubble_pop') particleText = '🫧'
        else if (soundType === 'ice_sparkle') particleText = '❄️'
        else if (soundType === 'ocean_wave') particleText = '🌊'
        else if (soundType === 'music_box') particleText = '🎵'
        else if (soundType === 'suction_pop') particleText = '🎈'
        else if (soundType === 'crunch_beads') particleText = '🥣'
        else if (soundType === 'popping_candy') particleText = '💥'
        else if (soundType === 'air_slow') particleText = '💨'
        else if (soundType === 'slime_gel') particleText = '💧'
        else if (soundType === 'squeak_toy') particleText = '🐥'
        else if (soundType === 'soda_fizz') particleText = '🫧'
        else if (soundType === 'mochi_dango') particleText = '🍡'
        else if (soundType === 'caramel_crust') particleText = '🍮'
        else if (soundType === 'bell_charm') particleText = '🔔'
        else if (soundType === 'cat_purr') particleText = '🐾'

        const newParticles: Particle[] = []
        const count = Math.max(2, result.soundTrigger.crackleCount || 3)
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 30 + Math.random() * 60
          newParticles.push({
            id: ++particleIdCounter.current,
            x: px,
            y: py,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 20,
            text: particleText,
            opacity: 1.0,
            scale: 0.8 + Math.random() * 0.5,
          })
        }
        setParticles((prev) => [...prev.slice(-15), ...newParticles])
      }
    },
    [squishy, soundPlayer, onSquished]
  )

  // Physics animation loop (Deformation & Slow Rising)
  useEffect(() => {
    let animId: number

    const updatePhysics = (time: number) => {
      const dt = Math.min(0.1, (time - lastTimeRef.current) / 1000)
      lastTimeRef.current = time

      setDeformation((prev) => {
        const next = calculateSquishDeformationProgress(
          prev,
          targetForceRef.current,
          dt,
          squishy.tactileProperty.softness,
          squishy.tactileProperty.slowRisingRate
        )
        return next
      })

      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            opacity: p.opacity - dt * 1.5,
          }))
          .filter((p) => p.opacity > 0)
      )

      animId = requestAnimationFrame(updatePhysics)
    }

    lastTimeRef.current = performance.now()
    animId = requestAnimationFrame(updatePhysics)

    return () => cancelAnimationFrame(animId)
  }, [squishy])

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return
    e.preventDefault()
    setIsPressing(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setPressPoint({ x: relX, y: relY })

    targetForceRef.current = 0.85
    triggerAsmr(0.85, e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive || !isPressing) return
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setPressPoint({ x: relX, y: relY })

    if (Math.random() < 0.1) {
      triggerAsmr(0.6, e.clientX, e.clientY)
    }
  }

  const handlePointerUp = () => {
    if (!interactive) return
    setIsPressing(false)
    targetForceRef.current = 0

    const result = squishy.press(deformation)
    soundPlayer.playRelease(result.soundTrigger)
  }

  // Visual appearance styles
  const colorDeco = squishy.decorations.find((d) => d.type === 'color')
  const baseColor = colorDeco?.colorCode ?? squishy.baseMaterial.defaultColor

  // Sauce decoration
  const sauceDeco = squishy.decorations.find((d) => d.type === 'sauce')
  // Topping decoration
  const toppingDecos = squishy.decorations.filter((d) => d.type === 'topping')
  // Prop decorations
  const hasBamboo = squishy.decorations.some((d) => d.id === 'prop_bamboo')
  const hasFuroshiki = squishy.decorations.some((d) => d.id === 'prop_furoshiki')
  const hasTearyEyes = squishy.decorations.some((d) => d.id === 'prop_teary_eyes')

  // Deformation transform calculation
  const scaleY = 1.0 - deformation * 0.38
  const scaleX = 1.0 + deformation * 0.25
  const offsetY = deformation * 18
  const shadowScale = 1.0 + deformation * 0.35
  const shadowOpacity = 0.3 + deformation * 0.3

  // Mold identifier
  const moldId = squishy.mold?.id ?? 'melon_pan'
  const gradId = `squishy-grad-${squishy.id.value.replace(/[^a-zA-Z0-9_-]/g, '_')}`

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none cursor-pointer touch-none"
      style={{ width: size, height: size + 40 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Secret Recipe Badge if discovered */}
      {squishy.secretRecipe && (
        <div className="absolute top-0 z-20 px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r from-pink-500 to-rose-500 animate-bounce">
          {squishy.secretRecipe.icon} {squishy.secretRecipe.name}
        </div>
      )}

      {/* Dynamic Floor Shadow */}
      <div
        className="absolute bottom-4 w-4/5 h-8 bg-neutral-900 rounded-full filter blur-md transition-opacity pointer-events-none"
        style={{
          transform: `scale(${shadowScale})`,
          opacity: shadowOpacity,
        }}
      />

      {/* Main Squishy Container */}
      <div
        className="relative transition-transform duration-75 ease-out"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          transform: `translateY(${offsetY}px) scale(${scaleX}, ${scaleY})`,
          transformOrigin: `${pressPoint.x * 100}% ${pressPoint.y * 100}%`,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-lg overflow-visible"
        >
          <defs>
            {/* Shading Radial Gradient for puffy 3D feel */}
            <radialGradient id={gradId} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="55%" stopColor={baseColor} />
              <stop offset="100%" stopColor={baseColor} style={{ filter: 'brightness(0.72)' }} />
            </radialGradient>

            {/* Checkered pattern for Demon Slayer (市松模様) */}
            <pattern id="ichimatsu-pat" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="15" height="15" fill="#15803d" />
              <rect x="15" width="15" height="15" fill="#18181b" />
              <rect y="15" width="15" height="15" fill="#18181b" />
              <rect x="15" y="15" width="15" height="15" fill="#15803d" />
            </pattern>

            {/* Triangular scale pattern for Zenitsu */}
            <pattern id="triangle-pat" width="24" height="24" patternUnits="userSpaceOnUse">
              <polygon points="12,2 22,20 2,20" fill="#facc15" />
              <polygon points="0,2 10,20 0,20" fill="#fb923c" opacity="0.8" />
            </pattern>

            {/* Polka dot pattern for Furoshiki */}
            <pattern id="polka-pat" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="#f472b6" />
              <circle cx="8" cy="8" r="3.5" fill="#ffffff" />
            </pattern>

            {/* Indent Dent Shadow when pressed */}
            <radialGradient id="press-dent" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.38" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* New Character Molds (Ghibli, Disney Princess, Precure, PAW Patrol, Mario) */}
          <CharacterMoldSvg
            moldId={moldId}
            gradId={gradId}
            deformation={deformation}
            baseColor={baseColor}
          />

          {/* 1. MOLD: 鬼滅風 市松模様のおにぎりパン (Demon Slayer Tanjiro) */}
          {moldId === 'ichimatsu_onigiri' ? (
            <g>
              {/* Rounded Triangle Bread Body */}
              <path
                d="M 100 25 C 150 35 180 145 155 175 C 130 190 70 190 45 175 C 20 145 50 35 100 25 Z"
                fill={`url(#${gradId})`}
              />
              {/* Checkered Haori Pattern Lower Layer */}
              <path
                d="M 40 120 C 70 115 130 115 160 120 C 170 150 150 180 100 185 C 50 180 30 150 40 120 Z"
                fill="url(#ichimatsu-pat)"
              />
              {/* Tanjiro Forehead Scar (額のあざ) */}
              <path
                d="M 68 55 Q 60 45 65 35 Q 75 42 72 55 Q 70 65 68 55 Z"
                fill="#991b1b"
                opacity="0.95"
              />
              {/* Eyes */}
              <ellipse cx="70" cy="85" rx="7" ry="10" fill="#7f1d1d" />
              <circle cx="68" cy="82" r="3" fill="#ffffff" />
              <ellipse cx="130" cy="85" rx="7" ry="10" fill="#7f1d1d" />
              <circle cx="128" cy="82" r="3" fill="#ffffff" />
              {/* Determined gentle eyebrows */}
              <path d="M 58 70 Q 72 73 80 67" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 142 70 Q 128 73 120 67" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Cute smiling mouth */}
              <path d="M 92 105 Q 100 112 108 105" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : moldId === 'asanoha_bunny' ? (
            /* 2. MOLD: 鬼滅風 麻の葉竹筒うさぎ (Demon Slayer Nezuko) */
            <g>
              {/* Bunny Long Ears */}
              <ellipse cx="65" cy="40" rx="14" ry="40" fill={`url(#${gradId})`} transform="rotate(-15 65 40)" />
              <ellipse cx="65" cy="40" rx="7" ry="26" fill="#fb7185" transform="rotate(-15 65 40)" />
              <ellipse cx="135" cy="40" rx="14" ry="40" fill={`url(#${gradId})`} transform="rotate(15 135 40)" />
              <ellipse cx="135" cy="40" rx="7" ry="26" fill="#fb7185" transform="rotate(15 135 40)" />
              {/* Round Body */}
              <circle cx="100" cy="115" r="75" fill={`url(#${gradId})`} />
              {/* Pink Cute Big Eyes */}
              <ellipse cx="68" cy="98" rx="10" ry="14" fill="#ec4899" />
              <circle cx="66" cy="93" r="5" fill="#ffffff" />
              <circle cx="70" cy="103" r="2.5" fill="#ffffff" />
              <ellipse cx="132" cy="98" rx="10" ry="14" fill="#ec4899" />
              <circle cx="130" cy="93" r="5" fill="#ffffff" />
              <circle cx="134" cy="103" r="2.5" fill="#ffffff" />
              {/* Bamboo Muzzle Gag (竹筒) */}
              <g id="bamboo-gag">
                {/* Red tying ribbons */}
                <line x1="50" y1="126" x2="150" y2="126" stroke="#dc2626" strokeWidth="4" />
                {/* Green Bamboo tube */}
                <rect x="68" y="116" width="64" height="20" rx="10" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
                <line x1="88" y1="116" x2="88" y2="136" stroke="#14532d" strokeWidth="2" />
                <line x1="112" y1="116" x2="112" y2="136" stroke="#14532d" strokeWidth="2" />
              </g>
              {/* Pink Cheeks */}
              <circle cx="55" cy="112" r="8" fill="#fda4af" opacity="0.8" />
              <circle cx="145" cy="112" r="8" fill="#fda4af" opacity="0.8" />
            </g>
          ) : moldId === 'zenitsu_sparrow' ? (
            /* 3. MOLD: 鬼滅風 雷鳴の三角スズメ (Demon Slayer Zenitsu) */
            <g>
              {/* Body */}
              <circle cx="100" cy="115" r="78" fill={`url(#${gradId})`} />
              {/* Triangle Scale Haori Pattern */}
              <path
                d="M 30 115 C 30 160 70 190 100 190 C 130 190 170 160 170 115 Z"
                fill="url(#triangle-pat)"
              />
              {/* Sparrow Chuntaro on head */}
              <ellipse cx="100" cy="38" rx="16" ry="14" fill="#78350f" />
              <circle cx="100" cy="24" r="10" fill="#78350f" />
              <polygon points="100,28 106,30 100,32" fill="#ea580c" />
              <circle cx="97" cy="22" r="1.5" fill="#ffffff" />
              {/* Comical Worried Eyes */}
              <path d="M 62 90 Q 75 102 85 92" stroke="#18181b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 138 90 Q 125 102 115 92" stroke="#18181b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="73" cy="98" r="5" fill="#18181b" />
              <circle cx="127" cy="98" r="5" fill="#18181b" />
              {/* Tear Drops when pressed */}
              {deformation > 0.1 && (
                <>
                  <text x="45" y="105" fontSize="16">💧</text>
                  <text x="140" y="105" fontSize="16">💧</text>
                </>
              )}
              {/* Wobbly mouth */}
              <path d="M 90 120 Q 95 126 100 120 Q 105 114 110 120" stroke="#18181b" strokeWidth="3" fill="none" />
            </g>
          ) : moldId === 'sumikko_polar' ? (
            /* 4. MOLD: すみっコ風 恥ずかしがり屋しろくま (Sumikko Shirokuma) */
            <g>
              {/* Cute Round Bear Ears */}
              <circle cx="50" cy="55" r="22" fill={`url(#${gradId})`} />
              <circle cx="50" cy="55" r="12" fill="#fed7aa" opacity="0.8" />
              <circle cx="150" cy="55" r="22" fill={`url(#${gradId})`} />
              <circle cx="150" cy="55" r="12" fill="#fed7aa" opacity="0.8" />
              {/* Plump Pear Shape Body */}
              <path
                d="M 100 45 C 150 45 175 90 175 140 C 175 185 140 195 100 195 C 60 195 25 185 25 140 C 25 90 50 45 100 45 Z"
                fill={`url(#${gradId})`}
              />
              {/* Tiny Dot Eyes & Nose */}
              <circle cx="78" cy="98" r="4.5" fill="#374151" />
              <circle cx="122" cy="98" r="4.5" fill="#374151" />
              <ellipse cx="100" cy="108" rx="4" ry="3" fill="#374151" />
              {/* Shy Blushing Cheeks (deepens on squish!) */}
              <ellipse
                cx="66"
                cy="110"
                rx="10"
                ry="6"
                fill="#f43f5e"
                opacity={0.4 + deformation * 0.55}
              />
              <ellipse
                cx="134"
                cy="110"
                rx="10"
                ry="6"
                fill="#f43f5e"
                opacity={0.4 + deformation * 0.55}
              />
              {/* Furoshiki bundle held tight */}
              <g transform="translate(65, 130)">
                <ellipse cx="35" cy="30" rx="36" ry="24" fill="url(#polka-pat)" stroke="#db2777" strokeWidth="1.5" />
                <polygon points="35,10 25,2 45,2" fill="#ec4899" />
              </g>
            </g>
          ) : moldId === 'sumikko_lizard' ? (
            /* 5. MOLD: すみっコ風 まんまる水色とかげ (Sumikko Tokage) */
            <g>
              {/* Back Dorsal Plates (Dino fins) */}
              <circle cx="160" cy="80" r="10" fill="#38bdf8" />
              <circle cx="170" cy="110" r="12" fill="#38bdf8" />
              <circle cx="165" cy="140" r="10" fill="#38bdf8" />
              {/* Soft Aqua Body */}
              <path
                d="M 100 45 C 150 45 170 90 170 140 C 170 185 140 192 100 192 C 60 192 30 185 30 140 C 30 90 50 45 100 45 Z"
                fill={`url(#${gradId})`}
              />
              {/* Cream Tummy */}
              <ellipse cx="100" cy="148" rx="45" ry="36" fill="#fef9c3" opacity="0.9" />
              {/* Gentle Innocent Eyes */}
              <circle cx="75" cy="95" r="4.5" fill="#1e293b" />
              <circle cx="125" cy="95" r="4.5" fill="#1e293b" />
              {/* Soft smile */}
              <path d="M 94 108 Q 100 114 106 108" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          ) : moldId === 'fried_shrimp' ? (
            /* 6. MOLD: すみっコ風 エビフライのしっぽ (Sumikko Ebifurai no Shippo) */
            <g>
              {/* Red Tail Fins with Ribbon */}
              <polygon points="100,50 80,15 95,45" fill="#ef4444" />
              <polygon points="100,50 120,15 105,45" fill="#ef4444" />
              {/* Ribbon Bow */}
              <circle cx="100" cy="46" r="5" fill="#f43f5e" />
              {/* Golden Breaded Body */}
              <path
                d="M 100 50 C 155 55 165 110 160 155 C 150 190 120 195 100 195 C 80 195 50 190 40 155 C 35 110 45 55 100 50 Z"
                fill={`url(#${gradId})`}
              />
              {/* Crumb details */}
              {[
                [65, 80], [135, 85], [55, 120], [145, 125], [75, 160], [125, 165]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#b45309" opacity="0.5" />
              ))}
              {/* Shy Eyes */}
              <circle cx="80" cy="115" r="4" fill="#451a03" />
              <circle cx="120" cy="115" r="4" fill="#451a03" />
              <ellipse cx="72" cy="123" rx="6" ry="4" fill="#fda4af" opacity="0.8" />
              <ellipse cx="128" cy="123" rx="6" ry="4" fill="#fda4af" opacity="0.8" />
            </g>
          ) : moldId === 'chiikawa_teary' ? (
            /* 7. MOLD: ちいかわ風 泣き虫白いくま (Chiikawa style) */
            <g>
              {/* Round Ears */}
              <circle cx="52" cy="48" r="18" fill={`url(#${gradId})`} />
              <circle cx="52" cy="48" r="9" fill="#fbcfe8" opacity="0.7" />
              <circle cx="148" cy="48" r="18" fill={`url(#${gradId})`} />
              <circle cx="148" cy="48" r="9" fill="#fbcfe8" opacity="0.7" />
              {/* Plump Pure White Head */}
              <circle cx="100" cy="110" r="82" fill={`url(#${gradId})`} />
              {/* Huge Glistening Watery Eyes */}
              <ellipse cx="68" cy="98" rx="14" ry="18" fill="#18181b" />
              <circle cx="63" cy="90" r="6.5" fill="#ffffff" />
              <circle cx="73" cy="106" r="3.5" fill="#ffffff" />
              <circle cx="60" cy="104" r="2" fill="#ffffff" />

              <ellipse cx="132" cy="98" rx="14" ry="18" fill="#18181b" />
              <circle cx="127" cy="90" r="6.5" fill="#ffffff" />
              <circle cx="137" cy="106" r="3.5" fill="#ffffff" />
              <circle cx="124" cy="104" r="2" fill="#ffffff" />

              {/* Blushing cheeks */}
              <ellipse cx="52" cy="118" rx="12" ry="7" fill="#fda4af" opacity="0.85" />
              <ellipse cx="148" cy="118" rx="12" ry="7" fill="#fda4af" opacity="0.85" />

              {/* Tear puddles bubbling when squished! */}
              {deformation > 0.05 && (
                <g className="animate-pulse">
                  <ellipse cx="64" cy="114" rx="8" ry="4" fill="#38bdf8" opacity="0.8" />
                  <ellipse cx="136" cy="114" rx="8" ry="4" fill="#38bdf8" opacity="0.8" />
                  <path d="M 60 115 Q 55 125 57 132" stroke="#38bdf8" strokeWidth="3" fill="none" />
                  <path d="M 140 115 Q 145 125 143 132" stroke="#38bdf8" strokeWidth="3" fill="none" />
                </g>
              )}

              {/* Cute Wobbly Open Mouth */}
              <ellipse cx="100" cy="116" rx="5" ry="3" fill="#18181b" />
              <path d="M 94 122 Q 100 128 106 122" stroke="#18181b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          ) : moldId === 'hachiware_cat' ? (
            /* 8. MOLD: ちいかわ風 元気な青いハチワレねこ (Hachiware) */
            <g>
              {/* Pointy Cat Ears */}
              <polygon points="35,65 25,18 78,45" fill="#38bdf8" />
              <polygon points="165,65 175,18 122,45" fill="#38bdf8" />
              {/* Main Head */}
              <circle cx="100" cy="110" r="82" fill={`url(#${gradId})`} />
              {/* Signature Blue Hachiware Forehead Cap (八の字) */}
              <path
                d="M 30 95 C 45 45 80 32 100 65 C 120 32 155 45 170 95 C 175 75 160 30 100 30 C 40 30 25 75 30 95 Z"
                fill="#38bdf8"
              />
              {/* Bright Sparkling Anime Eyes */}
              <ellipse cx="68" cy="100" rx="12" ry="16" fill="#18181b" />
              <circle cx="64" cy="94" r="5" fill="#ffffff" />
              <circle cx="72" cy="106" r="3" fill="#ffffff" />
              <ellipse cx="132" cy="100" rx="12" ry="16" fill="#18181b" />
              <circle cx="128" cy="94" r="5" fill="#ffffff" />
              <circle cx="136" cy="106" r="3" fill="#ffffff" />
              {/* Cheerful Pink Cheeks */}
              <ellipse cx="52" cy="116" rx="10" ry="6" fill="#f472b6" opacity="0.8" />
              <ellipse cx="148" cy="116" rx="10" ry="6" fill="#f472b6" opacity="0.8" />
              {/* Big Enthusiastic Open Smile */}
              <path d="M 90 114 Q 100 128 110 114 Z" fill="#ef4444" stroke="#18181b" strokeWidth="2.5" />
            </g>
          ) : moldId === 'usagi_rabbit' ? (
            /* 9. MOLD: ちいかわ風 ハイテンションうさぎ (Usagi) */
            <g>
              {/* Long Perked Rabbit Ears */}
              <ellipse cx="70" cy="25" rx="12" ry="40" fill={`url(#${gradId})`} transform="rotate(-10 70 25)" />
              <ellipse cx="70" cy="25" rx="6" ry="26" fill="#fed7aa" transform="rotate(-10 70 25)" />
              <ellipse cx="130" cy="25" rx="12" ry="40" fill={`url(#${gradId})`} transform="rotate(10 130 25)" />
              <ellipse cx="130" cy="25" rx="6" ry="26" fill="#fed7aa" transform="rotate(10 130 25)" />
              {/* Round Body */}
              <circle cx="100" cy="115" r="78" fill={`url(#${gradId})`} />
              {/* Eyes */}
              <ellipse cx="72" cy="100" rx="9" ry="12" fill="#18181b" />
              <circle cx="69" cy="96" r="4" fill="#ffffff" />
              <ellipse cx="128" cy="100" rx="9" ry="12" fill="#18181b" />
              <circle cx="125" cy="96" r="4" fill="#ffffff" />
              {/* Rosy Cheeks */}
              <ellipse cx="56" cy="114" rx="10" ry="6" fill="#fda4af" opacity="0.9" />
              <ellipse cx="144" cy="114" rx="10" ry="6" fill="#fda4af" opacity="0.9" />
              {/* Wide Shouting Mouth "ヤハ！" */}
              <ellipse cx="100" cy="120" rx="12" ry="14" fill="#ef4444" stroke="#18181b" strokeWidth="2.5" />
              <path d="M 94 128 Q 100 120 106 128" fill="#ffffff" />
            </g>
          ) : moldId === 'fluffy_donut' ? (
            /* 10. MOLD: ふんわりドーナツ (Donut) */
            <g>
              <circle cx="100" cy="100" r="85" fill={`url(#${gradId})`} />
              {/* Center Donut Hole */}
              <circle cx="100" cy="100" r="30" fill="#f8fafc" />
              {/* Glaze */}
              <path
                d="M 50 70 Q 75 50 100 50 Q 125 50 150 70 Q 165 95 155 125 Q 130 150 100 150 Q 70 150 45 125 Q 35 95 50 70 Z"
                fill="#ec4899"
                opacity="0.85"
              />
              <circle cx="100" cy="100" r="30" fill="#f8fafc" />
            </g>
          ) : moldId === 'cat_bun' ? (
            <g>
              {/* Cat Ears */}
              <polygon points="45,65 25,15 80,40" fill={`url(#${gradId})`} />
              <polygon points="155,65 175,15 120,40" fill={`url(#${gradId})`} />
              <polygon points="45,60 35,25 75,45" fill="#fbcfe8" opacity="0.8" />
              <polygon points="155,60 165,25 125,45" fill="#fbcfe8" opacity="0.8" />
              {/* Cat Round Body */}
              <circle cx="100" cy="110" r="85" fill={`url(#${gradId})`} />
              {/* Face */}
              <circle cx="70" cy="105" r="7" fill="#374151" />
              <circle cx="130" cy="105" r="7" fill="#374151" />
              <ellipse cx="60" cy="120" rx="10" ry="6" fill="#fda4af" opacity="0.8" />
              <ellipse cx="140" cy="120" rx="10" ry="6" fill="#fda4af" opacity="0.8" />
              {/* Cute Cat Mouth */}
              <path d="M 90 120 Q 95 127 100 120 Q 105 127 110 120" stroke="#374151" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ) : moldId === 'shiba_toast' ? (
            <g>
              {/* Toast Crust */}
              <rect x="25" y="25" width="150" height="150" rx="40" fill="#b45309" />
              <rect x="35" y="35" width="130" height="130" rx="30" fill={`url(#${gradId})`} />
              <polygon points="45,45 30,10 75,30" fill="#d97706" />
              <polygon points="155,45 170,10 125,30" fill="#d97706" />
              <circle cx="75" cy="95" r="6" fill="#1f2937" />
              <circle cx="125" cy="95" r="6" fill="#1f2937" />
              <ellipse cx="100" cy="110" rx="18" ry="12" fill="#ffffff" />
              <ellipse cx="100" cy="106" rx="6" ry="4" fill="#1f2937" />
              <circle cx="75" cy="80" r="4" fill="#ffffff" />
              <circle cx="125" cy="80" r="4" fill="#ffffff" />
            </g>
          ) : moldId === 'bear_cake' ? (
            <g>
              <circle cx="45" cy="45" r="30" fill={`url(#${gradId})`} />
              <circle cx="155" cy="45" r="30" fill={`url(#${gradId})`} />
              <circle cx="45" cy="45" r="16" fill="#fde68a" opacity="0.9" />
              <circle cx="155" cy="45" r="16" fill="#fde68a" opacity="0.9" />
              <circle cx="100" cy="110" r="82" fill={`url(#${gradId})`} />
              <ellipse cx="100" cy="120" rx="26" ry="20" fill="#fef08a" />
              <ellipse cx="100" cy="112" rx="8" ry="5" fill="#451a03" />
              <circle cx="75" cy="95" r="6" fill="#451a03" />
              <circle cx="125" cy="95" r="6" fill="#451a03" />
            </g>
          ) : moldId === 'strawberry' ? (
            <g>
              <path
                d="M 100 185 C 40 160 25 100 35 60 C 45 35 80 35 100 45 C 120 35 155 35 165 60 C 175 100 160 160 100 185 Z"
                fill={`url(#${gradId})`}
              />
              <path
                d="M 100 45 L 85 10 L 95 38 L 65 20 L 85 45 L 100 45 L 115 45 L 135 20 L 105 38 L 115 10 Z"
                fill="#22c55e"
              />
              {[
                [70, 75], [100, 70], [130, 75],
                [55, 105], [85, 105], [115, 105], [145, 105],
                [70, 135], [100, 135], [130, 135],
                [85, 160], [115, 160],
              ].map(([sx, sy], idx) => (
                <ellipse key={idx} cx={sx} cy={sy} rx="3" ry="5" fill="#fef08a" opacity="0.9" />
              ))}
            </g>
          ) : moldId.startsWith('ghibli_') || moldId.startsWith('princess_') || moldId.startsWith('precure_') || moldId.startsWith('paw_') || moldId.startsWith('mario_') ? (
            null
          ) : (
            // Default: Melon Pan (メロンパン)
            <g>
              <circle cx="100" cy="100" r="85" fill={`url(#${gradId})`} />
              <path
                d="M 40 65 Q 100 85 160 65 M 30 100 Q 100 120 170 100 M 40 135 Q 100 155 160 135
                   M 65 40 Q 85 100 65 160 M 100 30 Q 120 100 100 170 M 135 40 Q 155 100 135 160"
                stroke="#d97706"
                strokeWidth="4"
                strokeOpacity="0.4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="80" cy="70" r="3" fill="#ffffff" opacity="0.8" />
              <circle cx="120" cy="75" r="3" fill="#ffffff" opacity="0.8" />
              <circle cx="95" cy="115" r="3" fill="#ffffff" opacity="0.8" />
              <circle cx="135" cy="120" r="3" fill="#ffffff" opacity="0.8" />
            </g>
          )}

          {/* Bamboo Gag decoration if applied on other molds */}
          {hasBamboo && moldId !== 'asanoha_bunny' && (
            <g transform="translate(0, -10)">
              <line x1="50" y1="126" x2="150" y2="126" stroke="#dc2626" strokeWidth="4" />
              <rect x="68" y="116" width="64" height="20" rx="10" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
              <line x1="88" y1="116" x2="88" y2="136" stroke="#14532d" strokeWidth="2" />
              <line x1="112" y1="116" x2="112" y2="136" stroke="#14532d" strokeWidth="2" />
            </g>
          )}

          {/* Furoshiki bundle if applied on other molds */}
          {hasFuroshiki && moldId !== 'sumikko_polar' && (
            <g transform="translate(65, 125)">
              <ellipse cx="35" cy="30" rx="36" ry="24" fill="url(#polka-pat)" stroke="#db2777" strokeWidth="1.5" />
              <polygon points="35,10 25,2 45,2" fill="#ec4899" />
            </g>
          )}

          {/* Teary eyes if applied on other molds */}
          {hasTearyEyes && moldId !== 'chiikawa_teary' && (
            <g>
              <circle cx="70" cy="85" r="4" fill="#38bdf8" opacity="0.9" />
              <circle cx="130" cy="85" r="4" fill="#38bdf8" opacity="0.9" />
              <ellipse cx="55" cy="115" rx="10" ry="6" fill="#fda4af" opacity="0.8" />
              <ellipse cx="145" cy="115" rx="10" ry="6" fill="#fda4af" opacity="0.8" />
            </g>
          )}

          {/* Character Props & Toppings */}
          <CharacterPropsSvg decorations={squishy.decorations} moldId={moldId} />

          {/* Sauce Layer */}
          {sauceDeco && (
            <path
              d="M 45 75 Q 70 95 100 80 Q 130 65 155 85 Q 145 110 130 95 Q 100 115 70 100 Q 55 115 45 75 Z"
              fill={sauceDeco.colorCode || '#e11d48'}
              opacity="0.85"
            />
          )}

          {/* Toppings (Sprinkles / Glitter / Gold leaf) */}
          {toppingDecos.map((deco) =>
            deco.id === 'topping_sprinkles' ? (
              <g key={deco.id}>
                {[
                  { cx: 75, cy: 65, color: '#ec4899', rot: 25 },
                  { cx: 120, cy: 60, color: '#3b82f6', rot: -30 },
                  { cx: 90, cy: 95, color: '#eab308', rot: 15 },
                  { cx: 135, cy: 105, color: '#10b981', rot: -45 },
                  { cx: 65, cy: 125, color: '#8b5cf6', rot: 40 },
                  { cx: 110, cy: 135, color: '#ef4444', rot: 10 },
                ].map((s, i) => (
                  <rect
                    key={i}
                    x={s.cx - 6}
                    y={s.cy - 3}
                    width="12"
                    height="6"
                    rx="3"
                    fill={s.color}
                    transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}
                  />
                ))}
              </g>
            ) : deco.id === 'topping_glitter' ? (
              <g key={deco.id}>
                {[
                  [65, 65], [130, 70], [80, 110], [125, 120], [95, 140]
                ].map(([gx, gy], i) => (
                  <text key={i} x={gx} y={gy} fontSize="14" fill="#ffffff" opacity="0.9">✨</text>
                ))}
              </g>
            ) : deco.id === 'topping_gold_leaf' ? (
              <g key={deco.id}>
                {[
                  [60, 60], [140, 65], [75, 115], [125, 130], [100, 150]
                ].map(([gx, gy], i) => (
                  <text key={i} x={gx} y={gy} fontSize="14" fill="#facc15" opacity="0.95">🌟</text>
                ))}
              </g>
            ) : null
          )}

          {/* Finger Dent Overlay */}
          {deformation > 0.05 && (
            <ellipse
              cx={pressPoint.x * 200}
              cy={pressPoint.y * 200}
              rx={35 * (0.8 + deformation * 0.4)}
              ry={28 * (0.8 + deformation * 0.4)}
              fill="url(#press-dent)"
            />
          )}
        </svg>
      </div>

      {/* ASMR Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none select-none font-bold text-lg"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) scale(${p.scale})`,
            opacity: p.opacity,
            transition: 'opacity 0.05s linear',
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Pressure & Recovery Status Indicator */}
      <div className="mt-2 text-xs font-medium text-neutral-600 flex items-center gap-1">
        {deformation > 0.02 ? (
          <span className="text-rose-500 font-bold animate-pulse">
            むぎゅ度: {Math.round(deformation * 100)}%
            {squishy.tactileProperty.slowRisingRate > 0.7 && ' (じわ〜っと復元中...)'}
          </span>
        ) : (
          <span className="text-neutral-500">👆 クリック／長押しでぷにぷに＆ASMR！</span>
        )}
      </div>
    </div>
  )
}
