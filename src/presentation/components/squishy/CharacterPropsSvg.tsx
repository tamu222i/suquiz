import React from 'react'
import type { Decoration } from '../../../domain/squishy/model/CraftMaterials'

interface CharacterPropsSvgProps {
  decorations: ReadonlyArray<Decoration>
  moldId: string
}

export const CharacterPropsSvg: React.FC<CharacterPropsSvgProps> = ({
  decorations,
  moldId,
}) => {
  const decoIds = new Set(decorations.map((d) => d.id))

  return (
    <g id="character-props-and-toppings">
      {/* 1. どんぐり＆頭のせ葉っぱ (Ghibli Totoro Leaf) */}
      {decoIds.has('prop_donguri_leaf') && moldId !== 'ghibli_totoro' && (
        <g id="prop-donguri-leaf" transform="translate(100, 30)">
          {/* Green Raindrop Leaf */}
          <path d="M -20 0 C -20 -18 20 -18 20 0 C 20 8 -20 8 -20 0 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="8" y2="-18" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Cute Acorn */}
          <ellipse cx="-16" cy="6" rx="5" ry="6" fill="#92400e" />
          <path d="M -20 2 Q -16 -2 -12 2 Z" fill="#451a03" />
        </g>
      )}

      {/* 2. カルシファーの燃える薪 (Calcifer Wood) */}
      {decoIds.has('prop_calcifer_wood') && moldId !== 'ghibli_calcifer' && (
        <g id="prop-calcifer-wood" transform="translate(100, 175)">
          <rect x="-55" y="-6" width="110" height="18" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <line x1="-35" y1="2" x2="35" y2="2" stroke="#451a03" strokeWidth="1.5" />
        </g>
      )}

      {/* 3. カオナシの差し出す砂金 (Kaonashi Gold) */}
      {decoIds.has('prop_kaonashi_gold') && moldId !== 'ghibli_kaonashi' && (
        <g id="prop-kaonashi-gold" transform="translate(100, 155)">
          <circle cx="0" cy="0" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="-10" cy="3" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="10" cy="3" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <text x="-4" y="4" fontSize="11" fill="#713f12">✨</text>
        </g>
      )}

      {/* 4. きらめくプリンセスティアラ (Princess Tiara) */}
      {decoIds.has('prop_tiara') && moldId !== 'princess_cinderella' && (
        <g id="prop-tiara" transform="translate(100, 32)">
          <polygon points="-22,8 -14,-6 0,2 14,-6 22,8" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="0" cy="-2" r="3" fill="#38bdf8" />
          <circle cx="-14" cy="-3" r="2" fill="#ec4899" />
          <circle cx="14" cy="-3" r="2" fill="#ec4899" />
        </g>
      )}

      {/* 5. ガラスの靴チャーム (Glass Slipper Charm) */}
      {decoIds.has('prop_glass_slipper') && (
        <g id="prop-glass-slipper" transform="translate(145, 150)">
          <path d="M -12 10 L -4 10 L 10 2 L 6 -6 L 0 4 L -12 4 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" opacity="0.9" />
          <text x="-6" y="-8" fontSize="13">✨</text>
        </g>
      )}

      {/* 6. ガラスドームの赤い魔法薔薇 (Enchanted Rose) */}
      {decoIds.has('prop_enchanted_rose') && moldId !== 'princess_belle' && (
        <g id="prop-enchanted-rose" transform="translate(145, 140)">
          <ellipse cx="0" cy="18" rx="14" ry="4" fill="#ca8a04" />
          <path d="M -12 18 C -12 -12 12 -12 12 18 Z" fill="#e0f2fe" opacity="0.45" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="0" cy="2" r="6" fill="#dc2626" />
          <path d="M 0 6 L 0 16" stroke="#16a34a" strokeWidth="2" />
        </g>
      )}

      {/* 7. 胸のキュアハートジュエル (Cure Heart Gem) */}
      {decoIds.has('prop_cure_heart_gem') && moldId !== 'precure_heart' && (
        <g id="prop-cure-heart-gem" transform="translate(100, 145)">
          <path d="M 0 12 C -18 0 -12 -14 0 -4 C 12 -14 18 0 0 12 Z" fill="#ec4899" stroke="#fde047" strokeWidth="2" />
          <circle cx="0" cy="2" r="3" fill="#fde047" />
        </g>
      )}

      {/* 8. ミラクルビッグリボン (Miracle Big Ribbon Bow) */}
      {decoIds.has('prop_cure_ribbon_bow') && moldId !== 'precure_ribbon' && (
        <g id="prop-cure-ribbon-bow" transform="translate(100, 36)">
          <polygon points="0,0 -32,-16 -26,14" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
          <polygon points="0,0 32,-16 26,14" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="7" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
        </g>
      )}

      {/* 9. チェイスのポリスハット (PAW Police Hat) */}
      {decoIds.has('prop_paw_police_hat') && moldId !== 'paw_chase' && (
        <g id="prop-paw-police-hat" transform="translate(100, 42)">
          <path d="M -35 15 C -35 -12 35 -12 35 15 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5" />
          <ellipse cx="0" cy="15" rx="42" ry="7" fill="#1e293b" />
          <circle cx="0" cy="2" r="4" fill="#facc15" />
        </g>
      )}

      {/* 10. マーシャルの消防ヘルメット (PAW Fire Helmet) */}
      {decoIds.has('prop_paw_fire_helmet') && moldId !== 'paw_marshall' && (
        <g id="prop-paw-fire-helmet" transform="translate(100, 42)">
          <path d="M -38 15 C -38 -15 38 -15 38 15 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <ellipse cx="0" cy="15" rx="45" ry="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#facc15" />
        </g>
      )}

      {/* 11. ヒゲ＆Mマークエンブレム (Mario Mustache & M Logo) */}
      {decoIds.has('prop_mario_mustache') && moldId !== 'mario_cap' && (
        <g id="prop-mario-mustache" transform="translate(100, 130)">
          {/* Curled Mustache */}
          <path
            d="M 0 0 C -16 -4 -30 2 -35 14 C -22 14 -12 8 0 8 C 12 8 22 14 35 14 C 30 2 16 -4 0 0 Z"
            fill="#18181b"
          />
          {/* M Badge on chest */}
          <circle cx="0" cy="28" r="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">M</text>
        </g>
      )}

      {/* --- トッピング (新トッピング対応) --- */}
      {/* こんぺいとう星屑シュガー */}
      {decoIds.has('topping_star_candies') && (
        <g id="topping-star-candies">
          {[
            { cx: 68, cy: 75, col: '#f43f5e' },
            { cx: 132, cy: 70, col: '#3b82f6' },
            { cx: 80, cy: 125, col: '#eab308' },
            { cx: 125, cy: 130, col: '#10b981' },
            { cx: 100, cy: 155, col: '#a855f7' },
          ].map((st, i) => (
            <polygon
              key={i}
              points={`${st.cx},${st.cy - 7} ${st.cx + 2},${st.cy - 2} ${st.cx + 7},${st.cy - 2} ${st.cx + 3},${st.cy + 2} ${st.cx + 5},${st.cy + 7} ${st.cx},${st.cy + 4} ${st.cx - 5},${st.cy + 7} ${st.cx - 3},${st.cy + 2} ${st.cx - 7},${st.cy - 2} ${st.cx - 2},${st.cy - 2}`}
              fill={st.col}
            />
          ))}
        </g>
      )}

      {/* プリンセス花びらフレーク */}
      {decoIds.has('topping_flower_petals') && (
        <g id="topping-flower-petals">
          {[
            [60, 65], [138, 68], [75, 115], [128, 122], [98, 142]
          ].map(([fx, fy], i) => (
            <ellipse key={i} cx={fx} cy={fy} rx="6" ry="3.5" fill="#f472b6" opacity="0.85" transform={`rotate(${i * 35} ${fx} ${fy})`} />
          ))}
        </g>
      )}

      {/* マーメイドシェルパール */}
      {decoIds.has('topping_pearls') && (
        <g id="topping-pearls">
          {[
            [65, 80], [135, 82], [82, 132], [120, 138], [100, 95]
          ].map(([px, py], i) => (
            <g key={i}>
              <circle cx={px} cy={py} r="5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
              <circle cx={px - 1.5} cy={py - 1.5} r="1.5" fill="#ffffff" />
            </g>
          ))}
        </g>
      )}

      {/* 氷雪のミニスノーフレーク */}
      {decoIds.has('topping_snowflakes') && (
        <g id="topping-snowflakes">
          {[
            [62, 70], [136, 75], [78, 120], [124, 126], [100, 150]
          ].map(([sx, sy], i) => (
            <text key={i} x={sx} y={sy} fontSize="14" fill="#bae6fd" opacity="0.95">❄️</text>
          ))}
        </g>
      )}

      {/* ミニ肉球シュガークッキー */}
      {decoIds.has('topping_paw_prints') && (
        <g id="topping-paw-prints">
          {[
            [70, 75], [130, 78], [75, 128], [125, 132]
          ].map(([px, py], i) => (
            <text key={i} x={px} y={py} fontSize="14" fill="#f472b6" opacity="0.9">🐾</text>
          ))}
        </g>
      )}
    </g>
  )
}
