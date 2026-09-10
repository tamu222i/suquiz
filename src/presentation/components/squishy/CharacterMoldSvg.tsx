import React from 'react'

interface CharacterMoldSvgProps {
  moldId: string
  gradId: string
  deformation: number
  baseColor: string
}

export const CharacterMoldSvg: React.FC<CharacterMoldSvgProps> = ({
  moldId,
  gradId,
  deformation,
}) => {
  switch (moldId) {
    // ==========================================
    // --- ジブリアニメ (Ghibli) ---
    // ==========================================
    case 'ghibli_totoro':
      return (
        <g id="ghibli-totoro">
          {/* Totoro Pointed Ears */}
          <path d="M 55 50 C 45 10 65 0 70 42 Z" fill={`url(#${gradId})`} />
          <path d="M 145 50 C 155 10 135 0 130 42 Z" fill={`url(#${gradId})`} />
          {/* Inner Ear Highlights */}
          <path d="M 58 45 C 50 18 63 12 67 40 Z" fill="#cbd5e1" opacity="0.6" />
          <path d="M 142 45 C 150 18 137 12 133 40 Z" fill="#cbd5e1" opacity="0.6" />

          {/* Large Pear Shaped Grey Body */}
          <path
            d="M 100 40 C 160 40 185 85 185 140 C 185 185 150 196 100 196 C 50 196 15 185 15 140 C 15 85 40 40 100 40 Z"
            fill={`url(#${gradId})`}
          />

          {/* Big White Fluffy Belly */}
          <ellipse cx="100" cy="138" rx="58" ry="46" fill="#f8fafc" />

          {/* Belly Grey Crescent / Chevron Markings (お腹の模様 ^ ^ ^) */}
          <g fill="#475569" stroke="#475569" strokeWidth="1.5">
            <path d="M 80 115 C 80 112 85 108 90 115 C 85 112 80 115 80 115 Z" />
            <path d="M 100 112 C 100 109 105 105 110 112 C 105 109 100 112 100 112 Z" />
            <path d="M 120 115 C 120 112 125 108 130 115 C 125 112 120 115 120 115 Z" />

            <path d="M 72 128 C 72 125 77 121 82 128 C 77 125 72 128 72 128 Z" />
            <path d="M 91 126 C 91 123 96 119 101 126 C 96 123 91 126 91 126 Z" />
            <path d="M 110 126 C 110 123 115 119 120 126 C 115 123 110 126 110 126 Z" />
            <path d="M 128 128 C 128 125 133 121 138 128 C 133 125 128 128 128 128 Z" />
          </g>

          {/* Round Wide Eyes with Tiny Black Pupil */}
          <circle cx="68" cy="82" r="10" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <circle cx="68" cy="82" r="3.5" fill="#0f172a" />
          <circle cx="70" cy="80" r="1.2" fill="#ffffff" />

          <circle cx="132" cy="82" r="10" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <circle cx="132" cy="82" r="3.5" fill="#0f172a" />
          <circle cx="134" cy="80" r="1.2" fill="#ffffff" />

          {/* Cute Black Triangle Nose */}
          <polygon points="100,82 94,77 106,77" fill="#1e293b" />

          {/* Whiskers (ヒゲ) */}
          <line x1="30" y1="82" x2="52" y2="84" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="92" x2="52" y2="92" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="102" x2="52" y2="98" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

          <line x1="170" y1="82" x2="148" y2="84" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="172" y1="92" x2="148" y2="92" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="170" y1="102" x2="148" y2="98" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

          {/* Gentle Smile or Open Gaping Mouth when squished */}
          {deformation > 0.3 ? (
            <ellipse cx="100" cy="98" rx="20" ry="12" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          ) : (
            <path d="M 90 94 Q 100 100 110 94" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Green Umbrella Leaf on Head */}
          <path d="M 85 36 C 85 24 115 24 115 36 C 115 42 85 42 85 36 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          <line x1="100" y1="36" x2="105" y2="22" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        </g>
      )

    case 'ghibli_kurosuke':
      return (
        <g id="ghibli-kurosuke">
          {/* Spiky Fluffy Black Charcoal Silhouette */}
          <path
            d="M 100 25 L 115 42 L 138 32 L 142 50 L 165 48 L 160 68 L 180 78 L 168 95 L 185 110 L 168 125 L 180 142 L 160 150 L 165 170 L 142 168 L 138 185 L 118 175 L 100 190 L 82 175 L 62 185 L 58 168 L 35 170 L 40 150 L 20 142 L 32 125 L 15 110 L 32 95 L 20 78 L 40 68 L 35 48 L 58 50 L 62 32 L 85 42 Z"
            fill="#1e1e24"
          />
          <circle cx="100" cy="110" r="70" fill={`url(#${gradId})`} />

          {/* Huge White Googly Eyes */}
          <ellipse cx="78" cy="98" rx="18" ry="22" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
          <ellipse cx="122" cy="98" rx="18" ry="22" fill="#ffffff" stroke="#09090b" strokeWidth="2" />

          {/* Big Black Pupils */}
          <circle cx="80" cy="98" r="8" fill="#09090b" />
          <circle cx="83" cy="94" r="3" fill="#ffffff" />

          <circle cx="120" cy="98" r="8" fill="#09090b" />
          <circle cx="123" cy="94" r="3" fill="#ffffff" />

          {/* Clutching Star Candies (こんぺいとう) */}
          <g transform="translate(100, 145)">
            <polygon points="0,-12 3,-3 12,-3 5,3 8,12 0,6 -8,12 -5,3 -12,-3 -3,-3" fill="#f43f5e" />
            <polygon points="18,-6 20,0 26,0 21,4 23,10 18,6 13,10 15,4 10,0 16,0" fill="#3b82f6" />
            <polygon points="-18,-6 -16,0 -10,0 -15,4 -13,10 -18,6 -23,10 -21,4 -26,0 -20,0" fill="#eab308" />
          </g>
        </g>
      )

    case 'ghibli_calcifer':
      return (
        <g id="ghibli-calcifer">
          {/* Flame Base Logs (暖炉の薪) */}
          <rect x="40" y="165" width="120" height="22" rx="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <line x1="60" y1="172" x2="140" y2="172" stroke="#451a03" strokeWidth="1.5" />
          <rect x="55" y="152" width="90" height="18" rx="8" fill="#92400e" stroke="#451a03" strokeWidth="2" />

          {/* Dancing Fiery Silhouette (炎の悪魔) */}
          <path
            d="M 100 20 C 130 50 165 65 168 110 C 172 150 145 168 100 168 C 55 168 28 150 32 110 C 35 65 70 50 100 20 Z"
            fill={`url(#${gradId})`}
          />
          {/* Internal Glowing Core Flame */}
          <path
            d="M 100 55 C 120 75 145 88 145 125 C 145 155 125 162 100 162 C 75 162 55 155 55 125 C 55 88 80 75 100 55 Z"
            fill="#facc15"
            opacity="0.85"
          />

          {/* Big Impish Eyes */}
          <ellipse cx="75" cy="100" rx="14" ry="18" fill="#ffffff" stroke="#7c2d12" strokeWidth="2" />
          <circle cx="78" cy="98" r="7" fill="#7c2d12" />
          <circle cx="80" cy="95" r="2.5" fill="#ffffff" />

          <ellipse cx="125" cy="100" rx="14" ry="18" fill="#ffffff" stroke="#7c2d12" strokeWidth="2" />
          <circle cx="122" cy="98" r="7" fill="#7c2d12" />
          <circle cx="124" cy="95" r="2.5" fill="#ffffff" />

          {/* Expressive Open Mouth with little tooth */}
          <path d="M 82 128 Q 100 152 118 128 Z" fill="#991b1b" stroke="#7c2d12" strokeWidth="2" />
          <rect x="96" y="128" width="8" height="6" rx="2" fill="#ffffff" />

          {/* Little Flame Horns / Wisps on top */}
          <path d="M 98 25 Q 115 5 120 30 Q 108 20 98 25 Z" fill="#ea580c" />
          <path d="M 90 28 Q 75 10 70 32 Q 82 22 90 28 Z" fill="#ea580c" />
        </g>
      )

    case 'ghibli_kaonashi':
      return (
        <g id="ghibli-kaonashi">
          {/* Translucent Soft Black Body Silhouette */}
          <path
            d="M 100 25 C 145 25 170 70 170 140 C 170 185 140 196 100 196 C 60 196 30 185 30 140 C 30 70 55 25 100 25 Z"
            fill="#18181b"
          />
          {/* White Oval Noh Mask */}
          <ellipse cx="100" cy="92" rx="42" ry="56" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />

          {/* Purple Markings above and below eyes */}
          <polygon points="76,55 84,55 80,68" fill="#7c3aed" />
          <polygon points="124,55 116,55 120,68" fill="#7c3aed" />

          <polygon points="76,120 84,120 80,105" fill="#7c3aed" />
          <polygon points="124,120 116,120 120,105" fill="#7c3aed" />

          {/* Serene Narrow Eyes */}
          <ellipse cx="78" cy="85" rx="9" ry="5" fill="#09090b" />
          <ellipse cx="122" cy="85" rx="9" ry="5" fill="#09090b" />

          {/* Quiet Straight Mouth */}
          <ellipse cx="100" cy="122" rx="10" ry="4" fill="#09090b" />

          {/* Tiny Hands offering gold nuggets */}
          <ellipse cx="65" cy="155" rx="10" ry="7" fill="#27272a" />
          <ellipse cx="135" cy="155" rx="10" ry="7" fill="#27272a" />
          <circle cx="100" cy="155" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="92" cy="157" r="5" fill="#facc15" />
          <circle cx="108" cy="157" r="5" fill="#facc15" />
        </g>
      )

    case 'ghibli_catbus':
      return (
        <g id="ghibli-catbus">
          {/* Main Bus Cat Body */}
          <rect x="25" y="45" width="150" height="110" rx="40" fill={`url(#${gradId})`} />

          {/* Glowing Rat Headlights on Roof */}
          <ellipse cx="50" cy="35" rx="10" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="46" cy="34" r="2" fill="#ef4444" />
          <ellipse cx="150" cy="35" rx="10" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="154" cy="34" r="2" fill="#ef4444" />

          {/* Destination Board (行先表示板) */}
          <rect x="75" y="28" width="50" height="18" rx="4" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />
          <text x="100" y="41" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">七国山</text>

          {/* Cat Ears */}
          <polygon points="35,50 20,18 55,42" fill={`url(#${gradId})`} />
          <polygon points="35,46 25,26 50,40" fill="#fbcfe8" />
          <polygon points="165,50 180,18 145,42" fill={`url(#${gradId})`} />
          <polygon points="165,46 175,26 150,40" fill="#fbcfe8" />

          {/* Cat Face: Huge Grin Mouth with Many Teeth */}
          <path d="M 50 100 Q 100 135 150 100 Q 100 115 50 100 Z" fill="#ffffff" stroke="#713f12" strokeWidth="2" />
          <line x1="70" y1="104" x2="70" y2="114" stroke="#713f12" strokeWidth="1.5" />
          <line x1="90" y1="106" x2="90" y2="118" stroke="#713f12" strokeWidth="1.5" />
          <line x1="110" y1="106" x2="110" y2="118" stroke="#713f12" strokeWidth="1.5" />
          <line x1="130" y1="104" x2="130" y2="114" stroke="#713f12" strokeWidth="1.5" />

          {/* Glowing Big Yellow Eyes */}
          <ellipse cx="68" cy="80" rx="14" ry="12" fill="#fef08a" stroke="#713f12" strokeWidth="2" />
          <ellipse cx="68" cy="80" rx="4" ry="9" fill="#0f172a" />
          <ellipse cx="132" cy="80" rx="14" ry="12" fill="#fef08a" stroke="#713f12" strokeWidth="2" />
          <ellipse cx="132" cy="80" rx="4" ry="9" fill="#0f172a" />

          {/* Whiskers */}
          <line x1="30" y1="88" x2="52" y2="88" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />
          <line x1="170" y1="88" x2="148" y2="88" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />

          {/* Multi-Paws on bottom (12本の足) */}
          {[40, 65, 90, 115, 140, 160].map((px, i) => (
            <ellipse key={i} cx={px} cy="158" rx="8" ry="6" fill="#d97706" />
          ))}
        </g>
      )

    // ==========================================
    // --- ディズニープリンセス (Disney Princess) ---
    // ==========================================
    case 'princess_cinderella':
      return (
        <g id="princess-cinderella">
          {/* Princess Blonde Bun Hair & Headband */}
          <circle cx="100" cy="45" r="32" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M 75 42 Q 100 30 125 42" stroke="#60a5fa" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Silver Tiara */}
          <polygon points="90,30 95,20 100,26 105,20 110,30" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="100" cy="24" r="2.5" fill="#38bdf8" />

          {/* Face */}
          <circle cx="100" cy="82" r="32" fill="#fef3c7" />
          {/* Fluffy Blonde Bangs */}
          <path d="M 70 70 Q 100 60 130 70 Q 100 78 70 70 Z" fill="#fde047" />

          {/* Elegant Blue Ballgown Body */}
          <path
            d="M 78 105 L 45 190 C 70 196 130 196 155 190 L 122 105 Z"
            fill={`url(#${gradId})`}
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          {/* Puffy Cloud-like Shoulder Sleeves */}
          <circle cx="65" cy="115" r="16" fill="#bfdbfe" opacity="0.9" />
          <circle cx="135" cy="115" r="16" fill="#bfdbfe" opacity="0.9" />

          {/* Cute Eyes & Smile */}
          <ellipse cx="88" cy="82" rx="4.5" ry="6" fill="#1e3a8a" />
          <circle cx="89" cy="80" r="1.8" fill="#ffffff" />
          <ellipse cx="112" cy="82" rx="4.5" ry="6" fill="#1e3a8a" />
          <circle cx="113" cy="80" r="1.8" fill="#ffffff" />

          <circle cx="80" cy="90" r="5" fill="#fbcfe8" opacity="0.8" />
          <circle cx="120" cy="90" r="5" fill="#fbcfe8" opacity="0.8" />
          <path d="M 94 94 Q 100 99 106 94" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Sparkles on dress (ガラスの靴のきらめき) */}
          <text x="94" y="155" fontSize="16" fill="#ffffff">✨</text>
          <text x="65" y="175" fontSize="12" fill="#ffffff">✨</text>
          <text x="125" y="175" fontSize="12" fill="#ffffff">✨</text>
        </g>
      )

    case 'princess_belle':
      return (
        <g id="princess-belle">
          {/* Brown Brunette Bun Hair with Yellow Ribbon */}
          <circle cx="100" cy="45" r="32" fill="#78350f" />
          <path d="M 80 42 Q 100 32 120 42" stroke="#facc15" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Face */}
          <circle cx="100" cy="82" r="32" fill="#fef3c7" />
          <path d="M 68 70 Q 100 58 132 70 Q 100 80 68 70 Z" fill="#78350f" />

          {/* Golden Yellow Ballgown (黄金のドレス) */}
          <path
            d="M 80 106 L 40 192 C 70 198 130 198 160 192 L 120 106 Z"
            fill={`url(#${gradId})`}
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          {/* Off-Shoulder Swag Drapes */}
          <path d="M 60 115 Q 100 135 140 115" stroke="#fef08a" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* Big Hazel Eyes */}
          <ellipse cx="88" cy="82" rx="4.5" ry="6" fill="#854d0e" />
          <circle cx="89" cy="80" r="1.8" fill="#ffffff" />
          <ellipse cx="112" cy="82" rx="4.5" ry="6" fill="#854d0e" />
          <circle cx="113" cy="80" r="1.8" fill="#ffffff" />

          <circle cx="78" cy="90" r="5" fill="#fda4af" opacity="0.8" />
          <circle cx="122" cy="90" r="5" fill="#fda4af" opacity="0.8" />
          <path d="M 94 94 Q 100 99 106 94" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Holding Enchanted Red Rose (魔法の赤い薔薇) */}
          <g transform="translate(100, 155)">
            <ellipse cx="0" cy="0" rx="10" ry="12" fill="#dc2626" />
            <circle cx="-2" cy="-2" r="4" fill="#991b1b" />
            <path d="M 0 12 L 0 25" stroke="#15803d" strokeWidth="2.5" />
            <path d="M 0 18 Q 8 16 6 22" stroke="#15803d" strokeWidth="2" fill="#22c55e" />
          </g>
        </g>
      )

    case 'princess_ariel':
      return (
        <g id="princess-ariel">
          {/* Voluminous Crimson Red Hair (豊かな赤髪) */}
          <path
            d="M 100 30 C 40 30 30 90 35 140 C 45 155 70 145 70 120 C 70 70 130 70 130 120 C 130 145 155 155 165 140 C 170 90 160 30 100 30 Z"
            fill="#dc2626"
          />
          {/* Big Purple Starfish / Flower Hair Accessory */}
          <polygon points="135,50 140,42 145,50 155,52 146,58 150,66 140,60 132,66 135,58 126,52" fill="#a855f7" />

          {/* Cute Face */}
          <circle cx="100" cy="82" r="30" fill="#fef3c7" />

          {/* Purple Seashell Bra Top (紫の貝殻) */}
          <ellipse cx="82" cy="118" rx="14" ry="11" fill="#9333ea" stroke="#7e22ce" strokeWidth="1.5" />
          <ellipse cx="118" cy="118" rx="14" ry="11" fill="#9333ea" stroke="#7e22ce" strokeWidth="1.5" />

          {/* Emerald Green Mermaid Tail (エメラルドの尾ひれ) */}
          <path
            d="M 75 130 C 70 160 90 175 100 185 C 110 175 130 160 125 130 Z"
            fill={`url(#${gradId})`}
            stroke="#0d9488"
            strokeWidth="1.5"
          />
          {/* Tail Fin */}
          <polygon points="100,182 70,200 95,190 100,195 105,190 130,200" fill="#14b8a6" />

          {/* Sea-blue Eyes */}
          <ellipse cx="88" cy="80" rx="4.5" ry="6" fill="#0284c7" />
          <circle cx="89" cy="78" r="1.8" fill="#ffffff" />
          <ellipse cx="112" cy="80" rx="4.5" ry="6" fill="#0284c7" />
          <circle cx="113" cy="78" r="1.8" fill="#ffffff" />

          <circle cx="78" cy="90" r="5" fill="#fda4af" opacity="0.8" />
          <circle cx="122" cy="90" r="5" fill="#fda4af" opacity="0.8" />
          <path d="M 94 94 Q 100 99 106 94" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'princess_elsa':
      return (
        <g id="princess-elsa">
          {/* Platinum Blonde French Braid (プラチナブロンドの三つ編み) */}
          <circle cx="100" cy="50" r="32" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 125 70 C 145 90 140 130 130 155" stroke="#f1f5f9" strokeWidth="16" fill="none" strokeLinecap="round" />

          {/* Ice Crystal Crown (氷雪のティアラ) */}
          <polygon points="85,32 92,16 100,24 108,16 115,32" fill="#38bdf8" opacity="0.9" />
          <circle cx="100" cy="20" r="2.5" fill="#ffffff" />

          {/* Face */}
          <circle cx="100" cy="82" r="30" fill="#fff1f2" />

          {/* Shimmering Ice Gown Body (透き通る氷のドレス) */}
          <path
            d="M 80 108 L 45 192 C 70 198 130 198 155 192 L 120 108 Z"
            fill={`url(#${gradId})`}
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          {/* Snowflake Sheer Cape (雪の結晶マント) */}
          <path d="M 50 115 Q 100 130 150 115" stroke="#e0f2fe" strokeWidth="6" fill="none" opacity="0.8" />

          {/* Icy Blue Royal Eyes */}
          <ellipse cx="88" cy="80" rx="4.5" ry="6" fill="#0284c7" />
          <circle cx="89" cy="78" r="1.8" fill="#ffffff" />
          <ellipse cx="112" cy="80" rx="4.5" ry="6" fill="#0284c7" />
          <circle cx="113" cy="78" r="1.8" fill="#ffffff" />

          <circle cx="80" cy="90" r="5" fill="#f472b6" opacity="0.6" />
          <circle cx="120" cy="90" r="5" fill="#f472b6" opacity="0.6" />
          <path d="M 94 94 Q 100 99 106 94" stroke="#db2777" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Snowflakes flying */}
          <text x="92" y="155" fontSize="18" fill="#ffffff">❄️</text>
          <text x="62" y="170" fontSize="12" fill="#ffffff">❄️</text>
          <text x="126" y="170" fontSize="12" fill="#ffffff">❄️</text>
        </g>
      )

    case 'princess_rapunzel':
      return (
        <g id="princess-rapunzel">
          {/* Extra-Long Golden Braided Hair wrapping around (長い黄金の三つ編み) */}
          <circle cx="100" cy="48" r="32" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M 70 70 C 40 100 45 150 70 185 C 95 200 135 195 150 170" stroke="#fde047" strokeWidth="18" fill="none" strokeLinecap="round" />

          {/* Colorful Little Flowers in Hair (髪の花飾り) */}
          <circle cx="60" cy="90" r="4" fill="#ec4899" />
          <circle cx="48" cy="120" r="4" fill="#a855f7" />
          <circle cx="58" cy="150" r="4" fill="#38bdf8" />
          <circle cx="80" cy="185" r="4" fill="#ec4899" />
          <circle cx="120" cy="190" r="4" fill="#f59e0b" />

          {/* Face */}
          <circle cx="100" cy="80" r="30" fill="#fef3c7" />

          {/* Lavender Corset Dress (ラベンダーのコルセットドレス) */}
          <path
            d="M 82 106 L 55 185 C 75 192 125 192 145 185 L 118 106 Z"
            fill={`url(#${gradId})`}
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          {/* Pink Ribbon Corset Lacing */}
          <line x1="94" y1="120" x2="106" y2="130" stroke="#ec4899" strokeWidth="2" />
          <line x1="106" y1="120" x2="94" y2="130" stroke="#ec4899" strokeWidth="2" />
          <line x1="94" y1="135" x2="106" y2="145" stroke="#ec4899" strokeWidth="2" />
          <line x1="106" y1="135" x2="94" y2="145" stroke="#ec4899" strokeWidth="2" />

          {/* Emerald Bright Eyes */}
          <ellipse cx="88" cy="78" rx="4.5" ry="6" fill="#059669" />
          <circle cx="89" cy="76" r="1.8" fill="#ffffff" />
          <ellipse cx="112" cy="78" rx="4.5" ry="6" fill="#059669" />
          <circle cx="113" cy="76" r="1.8" fill="#ffffff" />

          <circle cx="80" cy="88" r="5" fill="#fda4af" opacity="0.8" />
          <circle cx="120" cy="88" r="5" fill="#fda4af" opacity="0.8" />
          <path d="M 94 92 Q 100 97 106 92" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )

    // ==========================================
    // --- プリキュア (Precure) ---
    // ==========================================
    case 'precure_heart':
      return (
        <g id="precure-heart">
          {/* Golden Angel Wings (黄金の天使の羽) */}
          <path d="M 50 80 C 15 50 10 110 55 125 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
          <path d="M 150 80 C 185 50 190 110 145 125 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />

          {/* Main Big Heart Compact (キュアハートコンパクト) */}
          <path
            d="M 100 175 C 20 115 40 45 100 85 C 160 45 180 115 100 175 Z"
            fill={`url(#${gradId})`}
            stroke="#ec4899"
            strokeWidth="3"
          />

          {/* Sparkling Inner Heart Gem (中心のジュエル) */}
          <path
            d="M 100 152 C 45 108 60 62 100 92 C 140 62 155 108 100 152 Z"
            fill="#f43f5e"
            opacity="0.9"
          />

          {/* Center Golden Star Emblem */}
          <polygon points="100,105 103,114 112,114 105,119 108,128 100,123 92,128 95,119 88,114 97,114" fill="#fde047" />

          {/* Shiny Lens Glare */}
          <ellipse cx="80" cy="85" rx="8" ry="4" fill="#ffffff" opacity="0.8" transform="rotate(-30 80 85)" />

          {/* Big Cute Pink Ribbon Bow on top */}
          <g transform="translate(100, 50)">
            <polygon points="0,0 -30,-15 -25,15" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
            <polygon points="0,0 30,-15 25,15" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="8" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
        </g>
      )

    case 'precure_fairy':
      return (
        <g id="precure-fairy">
          {/* Fluffy Rabbit/Bear Fairy Mascot */}
          {/* Big Floppy Ears with Hearts */}
          <ellipse cx="60" cy="45" rx="18" ry="32" fill={`url(#${gradId})`} transform="rotate(-20 60 45)" />
          <ellipse cx="60" cy="45" rx="9" ry="20" fill="#fbcfe8" transform="rotate(-20 60 45)" />

          <ellipse cx="140" cy="45" rx="18" ry="32" fill={`url(#${gradId})`} transform="rotate(20 140 45)" />
          <ellipse cx="140" cy="45" rx="9" ry="20" fill="#fbcfe8" transform="rotate(20 140 45)" />

          {/* Tiny Angel Wings */}
          <ellipse cx="38" cy="115" rx="14" ry="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(-25 38 115)" />
          <ellipse cx="162" cy="115" rx="14" ry="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(25 162 115)" />

          {/* Round Plump Body */}
          <circle cx="100" cy="115" r="72" fill={`url(#${gradId})`} />

          {/* Heart Antenna on forehead */}
          <path d="M 100 45 Q 100 25 100 20" stroke="#f472b6" strokeWidth="3" />
          <path d="M 100 18 C 95 10 90 12 100 25 C 110 12 105 10 100 18 Z" fill="#ec4899" />

          {/* Huge Anime Sparkling Eyes (きらきら瞳) */}
          <ellipse cx="72" cy="102" rx="14" ry="18" fill="#0f172a" />
          <ellipse cx="72" cy="108" rx="10" ry="8" fill="#3b82f6" />
          <circle cx="68" cy="96" r="6" fill="#ffffff" />
          <circle cx="76" cy="112" r="3" fill="#ffffff" />

          <ellipse cx="128" cy="102" rx="14" ry="18" fill="#0f172a" />
          <ellipse cx="128" cy="108" rx="10" ry="8" fill="#3b82f6" />
          <circle cx="124" cy="96" r="6" fill="#ffffff" />
          <circle cx="132" cy="112" r="3" fill="#ffffff" />

          {/* Rosy Cheeks */}
          <circle cx="56" cy="118" r="9" fill="#fda4af" opacity="0.9" />
          <circle cx="144" cy="118" r="9" fill="#fda4af" opacity="0.9" />

          {/* Tiny Cat-like Mouth "〜モフ！" */}
          <path d="M 92 120 Q 96 126 100 120 Q 104 126 108 120" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'precure_ribbon':
      return (
        <g id="precure-ribbon">
          {/* Magic Wand Handle (ステッキの持ち手) */}
          <rect x="92" y="70" width="16" height="120" rx="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="100" cy="180" r="14" fill="#ec4899" stroke="#be185d" strokeWidth="2" />

          {/* Giant Pink Miracle Ribbon Bow */}
          <path
            d="M 100 70 C 60 20 20 70 85 85 Z"
            fill={`url(#${gradId})`}
            stroke="#db2777"
            strokeWidth="2"
          />
          <path
            d="M 100 70 C 140 20 180 70 115 85 Z"
            fill={`url(#${gradId})`}
            stroke="#db2777"
            strokeWidth="2"
          />

          {/* Center Magic Star Crystal */}
          <circle cx="100" cy="70" r="18" fill="#f43f5e" stroke="#fde047" strokeWidth="3" />
          <polygon points="100,56 104,66 114,66 106,72 109,82 100,76 91,82 94,72 86,66 96,66" fill="#fde047" />

          {/* Wand Crown / Wings */}
          <path d="M 80 40 Q 100 25 120 40" stroke="#fde047" strokeWidth="4" fill="none" />

          {/* Magic Sparkle particles */}
          <text x="50" y="55" fontSize="16" fill="#facc15">✨</text>
          <text x="135" y="55" fontSize="16" fill="#facc15">✨</text>
          <text x="70" y="145" fontSize="14" fill="#ec4899">💖</text>
        </g>
      )

    // ==========================================
    // --- パウ・パトロール (PAW Patrol) ---
    // ==========================================
    case 'paw_chase':
      return (
        <g id="paw-chase">
          {/* German Shepherd Dog Ears (ピンと立った耳) */}
          <polygon points="50,65 30,10 80,45" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="52,60 38,22 75,46" fill="#fed7aa" />

          <polygon points="150,65 170,10 120,45" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="148,60 162,22 125,46" fill="#fed7aa" />

          {/* Pup Head (茶色の顔) */}
          <circle cx="100" cy="115" r="75" fill={`url(#${gradId})`} />

          {/* Police Visor Cap (青いポリス帽) */}
          <path d="M 50 68 C 50 35 150 35 150 68 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
          <ellipse cx="100" cy="68" rx="60" ry="12" fill="#1e293b" />
          {/* Yellow Police Badge with Paw/Star */}
          <polygon points="100,38 92,48 94,60 100,65 106,60 108,48" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <polygon points="100,44 102,48 106,48 103,51 104,55 100,53 96,55 97,51 94,48 98,48" fill="#1e3a8a" />

          {/* Tan Muzzle Area (口元の明るいベージュ) */}
          <ellipse cx="100" cy="132" rx="36" ry="25" fill="#fed7aa" />

          {/* Confident Dark Brown Eyes */}
          <ellipse cx="74" cy="98" rx="9" ry="12" fill="#451a03" />
          <circle cx="72" cy="94" r="4" fill="#ffffff" />
          <ellipse cx="126" cy="98" rx="9" ry="12" fill="#451a03" />
          <circle cx="124" cy="94" r="4" fill="#ffffff" />

          {/* Black Dog Nose */}
          <polygon points="100,128 90,118 110,118" fill="#0f172a" />

          {/* Friendly Dog Smile */}
          <path d="M 88 135 Q 100 145 112 135" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Police Collar with Star Badge on bottom */}
          <rect x="65" y="175" width="70" height="12" rx="4" fill="#1d4ed8" />
          <circle cx="100" cy="182" r="7" fill="#facc15" />
        </g>
      )

    case 'paw_marshall':
      return (
        <g id="paw-marshall">
          {/* Dalmatian Floppy Ears with Black Spots */}
          <ellipse cx="40" cy="95" rx="18" ry="35" fill="#f8fafc" stroke="#334155" strokeWidth="2" transform="rotate(15 40 95)" />
          <circle cx="38" cy="85" r="7" fill="#0f172a" />
          <circle cx="44" cy="115" r="6" fill="#0f172a" />

          <ellipse cx="160" cy="95" rx="18" ry="35" fill="#f8fafc" stroke="#334155" strokeWidth="2" transform="rotate(-15 160 95)" />
          <circle cx="162" cy="85" r="7" fill="#0f172a" />
          <circle cx="156" cy="115" r="6" fill="#0f172a" />

          {/* White Pup Head */}
          <circle cx="100" cy="115" r="72" fill={`url(#${gradId})`} />
          <circle cx="140" cy="100" r="8" fill="#0f172a" />

          {/* Red Firefighter Helmet (赤い消防ヘルメット) */}
          <path d="M 45 68 C 45 28 155 28 155 68 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <ellipse cx="100" cy="68" rx="64" ry="12" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          {/* Fire Badge with Flame */}
          <polygon points="100,34 90,45 92,58 100,64 108,58 110,45" fill="#facc15" stroke="#b45309" strokeWidth="1" />
          <path d="M 100 44 C 104 48 106 54 100 58 C 94 54 96 48 100 44 Z" fill="#dc2626" />

          {/* Cheerful Blue Eyes */}
          <ellipse cx="75" cy="98" rx="9" ry="12" fill="#0284c7" />
          <circle cx="73" cy="94" r="4" fill="#ffffff" />
          <ellipse cx="125" cy="98" rx="9" ry="12" fill="#0284c7" />
          <circle cx="123" cy="94" r="4" fill="#ffffff" />

          {/* Black Dog Nose */}
          <polygon points="100,126 90,116 110,116" fill="#0f172a" />

          {/* Big Grinning Smile with Pink Tongue Out */}
          <path d="M 85 132 Q 100 152 115 132 Z" fill="#0f172a" />
          <ellipse cx="100" cy="144" rx="8" ry="6" fill="#f43f5e" />
        </g>
      )

    case 'paw_skye':
      return (
        <g id="paw-skye">
          {/* Cockapoo Fluffy Floppy Golden Ears */}
          <path
            d="M 50 55 C 20 60 15 110 35 140 C 45 150 60 130 55 90 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          <path
            d="M 150 55 C 180 60 185 110 165 140 C 155 150 140 130 145 90 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="1.5"
          />

          {/* Round Golden Dog Head */}
          <circle cx="100" cy="115" r="72" fill={`url(#${gradId})`} />

          {/* Pink Flight Goggles on Forehead (ピンクのフライトゴーグル) */}
          <rect x="52" y="55" width="96" height="24" rx="10" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
          <circle cx="75" cy="67" r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          <circle cx="125" cy="67" r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

          {/* Big Warm Magenta/Brown Eyes with Eyelashes */}
          <ellipse cx="74" cy="100" rx="9" ry="12" fill="#854d0e" />
          <circle cx="72" cy="96" r="4" fill="#ffffff" />
          <path d="M 66 90 L 62 86" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 72 88 L 72 84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

          <ellipse cx="126" cy="100" rx="9" ry="12" fill="#854d0e" />
          <circle cx="124" cy="96" r="4" fill="#ffffff" />
          <path d="M 134 90 L 138 86" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 128 88 L 128 84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

          {/* Brown Nose */}
          <polygon points="100,126 92,118 108,118" fill="#451a03" />

          {/* Cheerful Smile */}
          <path d="M 88 132 Q 100 142 112 132" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'paw_badge':
      return (
        <g id="paw-badge">
          {/* Metallic Crest Shield (パウ・パトロールのシールドエンブレム) */}
          <path
            d="M 100 20 L 165 42 L 165 125 C 165 165 100 195 100 195 C 100 195 35 165 35 125 L 35 42 Z"
            fill={`url(#${gradId})`}
            stroke="#94a3b8"
            strokeWidth="4"
          />
          {/* Inner Blue Shield Layer */}
          <path
            d="M 100 32 L 152 50 L 152 120 C 152 152 100 180 100 180 C 100 180 48 152 48 120 L 48 50 Z"
            fill="#1d4ed8"
          />

          {/* Big 3D White Paw Print (肉球) */}
          {/* Main Big Pad */}
          <ellipse cx="100" cy="120" rx="26" ry="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* 4 Toe Pads */}
          <ellipse cx="68" cy="85" rx="10" ry="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(-25 68 85)" />
          <ellipse cx="90" cy="74" rx="10" ry="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(-8 90 74)" />
          <ellipse cx="110" cy="74" rx="10" ry="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(8 110 74)" />
          <ellipse cx="132" cy="85" rx="10" ry="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(25 132 85)" />
        </g>
      )

    // ==========================================
    // --- マリオ (Mario) ---
    // ==========================================
    case 'mario_mushroom':
      return (
        <g id="mario-mushroom">
          {/* Beige Stem Body (キノコの軸) */}
          <ellipse cx="100" cy="148" rx="48" ry="38" fill="#fef3c7" stroke="#0f172a" strokeWidth="3" />

          {/* Two Classic Mario Oval Eyes */}
          <ellipse cx="85" cy="146" rx="5" ry="14" fill="#0f172a" />
          <ellipse cx="115" cy="146" rx="5" ry="14" fill="#0f172a" />

          {/* Big Domed Red Mushroom Cap (赤いカサ) */}
          <path
            d="M 25 125 C 20 40 180 40 175 125 C 160 135 40 135 25 125 Z"
            fill={`url(#${gradId})`}
            stroke="#0f172a"
            strokeWidth="3.5"
          />

          {/* Big White Polka Dots (白水玉模様) */}
          {/* Center Front Spot */}
          <ellipse cx="100" cy="85" rx="24" ry="26" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
          {/* Left Cutoff Spot */}
          <path d="M 25 90 C 40 70 45 110 32 124 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
          {/* Right Cutoff Spot */}
          <path d="M 175 90 C 160 70 155 110 168 124 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
          {/* Top Cutoff Spot */}
          <path d="M 85 45 C 100 38 115 45 100 52 Z" fill="#f8fafc" />
        </g>
      )

    case 'mario_star':
      return (
        <g id="mario-star">
          {/* Invincible Super Star (無敵スーパースター) */}
          <polygon
            points="100,18 126,72 186,76 140,116 155,175 100,144 45,175 60,116 14,76 74,72"
            fill={`url(#${gradId})`}
            stroke="#ca8a04"
            strokeWidth="3.5"
          />
          {/* Inner Glow Border */}
          <polygon
            points="100,28 123,74 175,77 135,112 148,162 100,136 52,162 65,112 25,77 77,74"
            fill="#fef08a"
            opacity="0.4"
          />

          {/* Classic Mario Star Vertical Oval Eyes */}
          <ellipse cx="88" cy="95" rx="5" ry="15" fill="#0f172a" />
          <circle cx="88" cy="88" r="2.5" fill="#ffffff" />
          <ellipse cx="112" cy="95" rx="5" ry="15" fill="#0f172a" />
          <circle cx="112" cy="88" r="2.5" fill="#ffffff" />

          {/* Star Sparkle reflections */}
          <circle cx="100" cy="40" r="4" fill="#ffffff" opacity="0.8" />
        </g>
      )

    case 'mario_block':
      return (
        <g id="mario-block">
          {/* Yellow Beveled Question Mark Block (ハテナブロック) */}
          <rect x="25" y="25" width="150" height="150" rx="18" fill={`url(#${gradId})`} stroke="#b45309" strokeWidth="4" />
          <rect x="35" y="35" width="130" height="130" rx="12" fill="#eab308" stroke="#78350f" strokeWidth="2.5" />

          {/* 4 Corner Screws / Rivets */}
          <circle cx="46" cy="46" r="5" fill="#78350f" />
          <circle cx="154" cy="46" r="5" fill="#78350f" />
          <circle cx="46" cy="154" r="5" fill="#78350f" />
          <circle cx="154" cy="154" r="5" fill="#78350f" />

          {/* Big White Embossed "?" Mark */}
          <g transform="translate(100, 100)">
            <path
              d="M -22 -35 C -22 -55 22 -55 22 -35 C 22 -18 2 -12 2 2 L -6 2 C -6 -18 12 -22 12 -35 C 12 -46 -12 -46 -12 -35 Z"
              fill="#ffffff"
              stroke="#78350f"
              strokeWidth="3.5"
            />
            {/* Question mark dot */}
            <rect x="-6" y="14" width="12" height="12" rx="3" fill="#ffffff" stroke="#78350f" strokeWidth="3.5" />
          </g>
        </g>
      )

    case 'mario_cap':
      return (
        <g id="mario-cap">
          {/* Mario's Red Newsboy Cap & Famous Bushy Mustache */}
          {/* Big Puffy Red Cap */}
          <path
            d="M 30 90 C 20 30 180 30 170 90 C 185 105 15 105 30 90 Z"
            fill={`url(#${gradId})`}
            stroke="#991b1b"
            strokeWidth="3"
          />
          {/* Cap Visor / Brim */}
          <ellipse cx="100" cy="98" rx="80" ry="16" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />

          {/* White Circular "M" Emblem */}
          <circle cx="100" cy="58" r="22" fill="#ffffff" stroke="#991b1b" strokeWidth="2" />
          <path
            d="M 88 68 L 88 48 L 95 59 L 100 59 L 105 48 L 105 68 L 100 68 L 100 56 L 96 63 L 94 63 L 90 56 L 90 68 Z"
            fill="#dc2626"
          />

          {/* Big Round Big Nose */}
          <circle cx="100" cy="115" r="20" fill="#fed7aa" stroke="#78350f" strokeWidth="2" />

          {/* Famous Curled Black Mustache (立派なくるりんヒゲ) */}
          <path
            d="M 100 120 C 80 115 55 125 50 145 C 65 145 78 135 100 135 C 122 135 135 145 150 145 C 145 125 120 115 100 120 Z"
            fill="#18181b"
            stroke="#09090b"
            strokeWidth="2.5"
          />
        </g>
      )

    default:
      return null
  }
}
