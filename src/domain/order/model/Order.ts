import { OrderId } from './OrderId'
import type { SoundType } from '../../squishy/model/SoundProfile'

export type OrderStatus = 'pending' | 'completed' | 'failed'

export interface OrderRequirement {
  customerName: string
  avatarEmoji?: string
  dialogue: string
  targetMoldId: string
  preferredSoundType?: SoundType
  minSoftness?: number
  minSlowRisingRate?: number
  requiredDecorationIds?: string[]
  rewardCoins: number
}

export interface OrderProps {
  id?: OrderId
  requirement: OrderRequirement
  status?: OrderStatus
  finalScore?: number
}

export class Order {
  readonly id: OrderId
  readonly requirement: OrderRequirement
  private _status: OrderStatus
  private _finalScore?: number

  constructor(props: OrderProps) {
    this.id = props.id ?? new OrderId()
    this.requirement = props.requirement
    this._status = props.status ?? 'pending'
    this._finalScore = props.finalScore
  }

  get status(): OrderStatus {
    return this._status
  }

  get finalScore(): number | undefined {
    return this._finalScore
  }

  complete(score: number): void {
    if (this._status !== 'pending') {
      throw new Error(`Cannot complete order with status ${this._status}. Must be 'pending'.`)
    }
    this._status = 'completed'
    this._finalScore = Math.max(0, Math.min(100, score))
  }

  fail(): void {
    if (this._status !== 'pending') {
      throw new Error(`Cannot fail order with status ${this._status}. Must be 'pending'.`)
    }
    this._status = 'failed'
  }
}

export const INITIAL_ORDERS: OrderRequirement[] = [
  {
    customerName: 'ASMRマニアのアオイ',
    avatarEmoji: '🎧',
    dialogue: 'サクサク音が鳴る可愛いメロンパンのスクイーズを作って！カラフルチョコスプレーもかけてね！',
    targetMoldId: 'melon_pan',
    preferredSoundType: 'crunch_beads',
    minSoftness: 0.6,
    minSlowRisingRate: 0.3,
    requiredDecorationIds: ['topping_sprinkles'],
    rewardCoins: 80,
  },
  {
    customerName: '癒やしを求めるサトシ',
    avatarEmoji: '👔',
    dialogue: '仕事で疲れてて…息を吐くように「シュワ〜」と空気が抜ける超低反発のネコまんじゅうが欲しいです。',
    targetMoldId: 'cat_bun',
    preferredSoundType: 'air_slow',
    minSoftness: 0.8,
    minSlowRisingRate: 0.85,
    rewardCoins: 100,
  },
  {
    customerName: '小学生のユウタ',
    avatarEmoji: '🧢',
    dialogue: '押したらパチパチキャンディみたいに弾ける音のする柴犬食パンが欲しい！',
    targetMoldId: 'shiba_toast',
    preferredSoundType: 'popping_candy',
    minSoftness: 0.5,
    minSlowRisingRate: 0.4,
    rewardCoins: 120,
  },
  {
    customerName: '熱血隊士のヒナタ',
    avatarEmoji: '⚔️',
    dialogue: '【鬼滅風】「全集中！心の炎を燃やせ！」市松模様の羽織カラーで、サクサクの市松おにぎりパンスクイーズをお願いします！',
    targetMoldId: 'ichimatsu_onigiri',
    preferredSoundType: 'crunch_beads',
    minSoftness: 0.7,
    requiredDecorationIds: ['color_ichimatsu'],
    rewardCoins: 160,
  },
  {
    customerName: 'ほっこり学生のミホ',
    avatarEmoji: '🍵',
    dialogue: '【すみっコ風】お部屋のすみっこでぎゅっと抱きしめたいの…ピンクの水玉フロシキを巻いた、真っ白なしろくまスクイーズを作って！',
    targetMoldId: 'sumikko_polar',
    preferredSoundType: 'air_slow',
    minSoftness: 0.85,
    minSlowRisingRate: 0.7,
    requiredDecorationIds: ['prop_furoshiki'],
    rewardCoins: 170,
  },
  {
    customerName: 'ぷにぷに愛好家のリン',
    avatarEmoji: '🥺',
    dialogue: '【ちいかわ風】「ワッ…フッ…！」って今にも泣きそうになっちゃう、うるうる涙目の超絶柔らかマシュマロなくまちゃんが欲しいの！',
    targetMoldId: 'chiikawa_teary',
    preferredSoundType: 'slime_gel',
    minSoftness: 0.9,
    requiredDecorationIds: ['prop_teary_eyes'],
    rewardCoins: 180,
  },
  {
    customerName: '甘党カフェ店長のマサキ',
    avatarEmoji: '☕',
    dialogue: 'パリッとカラメルが割れるASMR音がたまらない、濃厚キャラメルソースがけのくまさんパンケーキをぜひ！',
    targetMoldId: 'bear_cake',
    preferredSoundType: 'caramel_crust',
    minSoftness: 0.6,
    requiredDecorationIds: ['sauce_caramel'],
    rewardCoins: 150,
  },
  {
    customerName: '和菓子職人のソウエン',
    avatarEmoji: '🍡',
    dialogue: '神社の澄みわたる鈴の音がチリンと鳴るような、金箔パウダーが輝くいちごのスクイーズを作ってくだされ。',
    targetMoldId: 'strawberry',
    preferredSoundType: 'bell_charm',
    minSoftness: 0.7,
    requiredDecorationIds: ['topping_gold_leaf'],
    rewardCoins: 200,
  },
]

// Endless random customer order generator
const CUSTOMER_TEMPLATES = [
  { name: '猫好きのナナセ', emoji: '🐱', sound: 'cat_purr' as SoundType, text: '猫がゴロゴロ喉を鳴らす音のする、最高に癒やされるスクイーズが欲しいニャ！' },
  { name: 'ソーダマニアのケン', emoji: '🥤', sound: 'soda_fizz' as SoundType, text: '炭酸飲料みたいにしゅわしゅわ微細な音がはじける涼しげなスクイーズを！' },
  { name: '和菓子フェチのチサト', emoji: '🍡', sound: 'mochi_dango' as SoundType, text: '白玉餅みたいにもちもち吸い付くような高弾性の手触りを求めています。' },
  { name: 'アニメファンのレン', emoji: '🎋', sound: 'air_slow' as SoundType, text: '【鬼滅風】竹筒をくわえた桜色のうさぎスクイーズを作って！' },
  { name: '元気っ子のハルキ', emoji: '😸', sound: 'squeak_toy' as SoundType, text: '【ちいかわ風】「なんとかなれーッ！」ってピヨピヨ鳴るハチワレねこちゃんが欲しい！' },
  { name: 'すみっこ好きのユキ', emoji: '🦕', sound: 'slime_gel' as SoundType, text: '【すみっコ風】パステル水色のやさしいとかげスクイーズを作ってほしいな…' },
  { name: '食いしん坊のダイキ', emoji: '🍤', sound: 'crunch_beads' as SoundType, text: 'サクサク衣のエビフライのしっぽスクイーズ！音がたまらないやつをお願い！' },
]

const RANDOM_MOLD_IDS = [
  'melon_pan',
  'cat_bun',
  'shiba_toast',
  'bear_cake',
  'strawberry',
  'fluffy_donut',
  'ichimatsu_onigiri',
  'asanoha_bunny',
  'sumikko_polar',
  'sumikko_lizard',
  'chiikawa_teary',
  'hachiware_cat',
  'fried_shrimp',
]

export function generateRandomCustomerOrder(index: number): OrderRequirement {
  const tmpl = CUSTOMER_TEMPLATES[index % CUSTOMER_TEMPLATES.length]
  const moldId = RANDOM_MOLD_IDS[(index * 3) % RANDOM_MOLD_IDS.length]
  const reward = 120 + ((index * 25) % 150)

  return {
    customerName: `${tmpl.name} (第${index + 1}客)`,
    avatarEmoji: tmpl.emoji,
    dialogue: tmpl.text,
    targetMoldId: moldId,
    preferredSoundType: tmpl.sound,
    minSoftness: 0.65,
    minSlowRisingRate: 0.4,
    rewardCoins: reward,
  }
}
