import { TactileProperty } from './TactileProperty'
import { SoundProfile } from './SoundProfile'

// --- BaseMaterial (ベース主剤 10種) ---
export interface BaseMaterialProps {
  id: string
  name: string
  description?: string
  tactileProperty: TactileProperty
  defaultColor: string
  cost: number
}

export class BaseMaterial {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly tactileProperty: TactileProperty
  readonly defaultColor: string
  readonly cost: number

  constructor(props: BaseMaterialProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description ?? ''
    this.tactileProperty = props.tactileProperty
    this.defaultColor = props.defaultColor
    this.cost = props.cost
  }
}

export const BASE_MATERIALS: BaseMaterial[] = [
  new BaseMaterial({
    id: 'memory_foam',
    name: 'プレミアム低反発ウレタン',
    description: 'じわ〜っと数秒かけて戻る最高級のスローライジング感触。',
    tactileProperty: new TactileProperty({ softness: 0.9, slowRisingRate: 0.95, elasticity: 0.15 }),
    defaultColor: '#fef08a', // クリームイエロー
    cost: 30,
  }),
  new BaseMaterial({
    id: 'silicone_gel',
    name: 'ぷるぷるシリコンゲル',
    description: 'ゼリーのようにぷるんぷるんと揺れる驚異の高弾性クリア。',
    tactileProperty: new TactileProperty({ softness: 0.75, slowRisingRate: 0.3, elasticity: 0.85 }),
    defaultColor: '#a5f3fc', // クリアシアン
    cost: 20,
  }),
  new BaseMaterial({
    id: 'clay_sponge',
    name: 'もっちりクレイフォーム',
    description: '赤ちゃんのほっぺや耳たぶのように吸い付くもっちり餅肌。',
    tactileProperty: new TactileProperty({ softness: 0.65, slowRisingRate: 0.65, elasticity: 0.4 }),
    defaultColor: '#fed7aa', // ピーチベージュ
    cost: 10,
  }),
  new BaseMaterial({
    id: 'marshmallow_sponge',
    name: 'ふわふわマシュマロスポンジ',
    description: '羽毛のように空気を含んだ、どこまでも軽いふんわり感。',
    tactileProperty: new TactileProperty({ softness: 0.95, slowRisingRate: 0.5, elasticity: 0.3 }),
    defaultColor: '#ffffff', // マシュマロホワイト
    cost: 25,
  }),
  new BaseMaterial({
    id: 'water_gel',
    name: 'ひんやり冷感ウォータージェル',
    description: '触れるとひんやり澄みわたる、潤いたっぷりのアクア感。',
    tactileProperty: new TactileProperty({ softness: 0.8, slowRisingRate: 0.35, elasticity: 0.7 }),
    defaultColor: '#bae6fd', // スカイブルー
    cost: 35,
  }),
  new BaseMaterial({
    id: 'tapioca_polymer',
    name: 'つぶつぶタピオカポリマー',
    description: '指先につぶつぶとした小気味よい粒感を感じる新世代ポリマー。',
    tactileProperty: new TactileProperty({ softness: 0.7, slowRisingRate: 0.4, elasticity: 0.65 }),
    defaultColor: '#e9d5ff', // ラベンダー
    cost: 40,
  }),
  new BaseMaterial({
    id: 'raw_caramel_rubber',
    name: '濃厚生キャラメルラバー',
    description: '指がゆっくり吸い込まれるような極限の粘弾性と重厚な反発。',
    tactileProperty: new TactileProperty({ softness: 0.85, slowRisingRate: 0.9, elasticity: 0.2 }),
    defaultColor: '#fed7aa', // キャラメルベージュ
    cost: 45,
  }),
  new BaseMaterial({
    id: 'custard_mousse',
    name: 'とろけるカスタードムース',
    description: '指を置いた瞬間にふわりと沈み、優しく押し返す極上ムース。',
    tactileProperty: new TactileProperty({ softness: 0.88, slowRisingRate: 0.75, elasticity: 0.35 }),
    defaultColor: '#fef9c3', // カスタードイエロー
    cost: 35,
  }),
  new BaseMaterial({
    id: 'tofu_foam',
    name: 'しっとり絹ごし豆腐フォーム',
    description: '触れたら崩れそうなほど極限までソフトな純白ウレタン。',
    tactileProperty: new TactileProperty({ softness: 0.96, slowRisingRate: 0.8, elasticity: 0.2 }),
    defaultColor: '#f8fafc', // ピュアホワイト
    cost: 50,
  }),
  new BaseMaterial({
    id: 'crystal_resin',
    name: 'クランチクリスタル樹脂',
    description: '表面はパリッと薄皮、中はもっちりとした魅惑の二重触感。',
    tactileProperty: new TactileProperty({ softness: 0.6, slowRisingRate: 0.45, elasticity: 0.8 }),
    defaultColor: '#fbcfe8', // クリスタルピンク
    cost: 55,
  }),
]

// --- SoundFilling (個性的なASMR音＆特殊コア 10種) ---
export interface SoundFillingProps {
  id: string
  name: string
  description?: string
  soundProfile: SoundProfile
  tactileModifier: TactileProperty
  cost: number
}

export class SoundFilling {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly soundProfile: SoundProfile
  readonly tactileModifier: TactileProperty
  readonly cost: number

  constructor(props: SoundFillingProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description ?? ''
    this.soundProfile = props.soundProfile
    this.tactileModifier = props.tactileModifier
    this.cost = props.cost
  }
}

export const SOUND_FILLINGS: SoundFilling[] = [
  new SoundFilling({
    id: 'air_slow_valve',
    name: 'スローエア通気コア',
    description: 'フワ〜っと息を吐くように空気が抜ける安らぎのASMR音。',
    soundProfile: SoundProfile.AIR_SLOW,
    tactileModifier: new TactileProperty({ softness: 0.85, slowRisingRate: 0.95, elasticity: 0.1 }),
    cost: 25,
  }),
  new SoundFilling({
    id: 'crunch_beads',
    name: 'クランチ発泡ビーズ',
    description: 'サクサク・ジャリジャリと心地よい音が連打するクランチ感。',
    soundProfile: SoundProfile.CRUNCH_BEADS,
    tactileModifier: new TactileProperty({ softness: 0.65, slowRisingRate: 0.3, elasticity: 0.6 }),
    cost: 30,
  }),
  new SoundFilling({
    id: 'popping_candy',
    name: 'パチパチキャンディ粉',
    description: '押した瞬間にパチパチパチッと小気味よく弾ける爽快音。',
    soundProfile: SoundProfile.POPPING_CANDY,
    tactileModifier: new TactileProperty({ softness: 0.7, slowRisingRate: 0.5, elasticity: 0.5 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'slime_core',
    name: 'スライムジェルコア',
    description: 'むにゅっ・ぽちゃっと潤いあふれるみずみずしいジェル音。',
    soundProfile: SoundProfile.SLIME_GEL,
    tactileModifier: new TactileProperty({ softness: 0.9, slowRisingRate: 0.4, elasticity: 0.75 }),
    cost: 20,
  }),
  new SoundFilling({
    id: 'squeaker_whistle',
    name: 'ピヨピヨ笛ギミック',
    description: 'キュッ！ピヨッ！と元気よく鳴く愛らしいトイ笛。',
    soundProfile: SoundProfile.SQUEAK_TOY,
    tactileModifier: new TactileProperty({ softness: 0.5, slowRisingRate: 0.1, elasticity: 0.9 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'carbonated_soda',
    name: '炭酸しゅわしゅわ微粒子',
    description: 'ソーダのように微細な泡がしゅわしゅわ囁く炭酸音。',
    soundProfile: new SoundProfile({ soundType: 'soda_fizz', pitch: 1.2, intensity: 0.85, crackleRate: 0.9 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.6, elasticity: 0.4 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'mochi_core',
    name: 'もちもち白玉コア',
    description: 'ぎゅっぎゅっと高密度で吸い付くような白玉の沈み込み音。',
    soundProfile: new SoundProfile({ soundType: 'mochi_dango', pitch: 0.9, intensity: 0.8, crackleRate: 0.1 }),
    tactileModifier: new TactileProperty({ softness: 0.75, slowRisingRate: 0.7, elasticity: 0.6 }),
    cost: 30,
  }),
  new SoundFilling({
    id: 'caramel_crust',
    name: 'カリカリカラメルクラスト',
    description: 'パリッ・サクッと表面の薄氷が割れるようなクリスピー音。',
    soundProfile: new SoundProfile({ soundType: 'caramel_crust', pitch: 1.15, intensity: 0.85, crackleRate: 0.7 }),
    tactileModifier: new TactileProperty({ softness: 0.6, slowRisingRate: 0.4, elasticity: 0.7 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'bell_charm',
    name: '癒しの鈴入りベルチャーム',
    description: 'チリンチリン…と優しく澄んだ音色が響く神社の鈴チャーム。',
    soundProfile: new SoundProfile({ soundType: 'bell_charm', pitch: 1.0, intensity: 0.75, crackleRate: 0.0 }),
    tactileModifier: new TactileProperty({ softness: 0.7, slowRisingRate: 0.5, elasticity: 0.6 }),
    cost: 50,
  }),
  new SoundFilling({
    id: 'cat_purr_vibe',
    name: '猫のゴロゴロ喉鳴りデバイス',
    description: 'ゴロゴロ…と猫が甘えて喉を鳴らすような低周波バイブ音。',
    soundProfile: new SoundProfile({ soundType: 'cat_purr', pitch: 0.9, intensity: 0.9, crackleRate: 0.3 }),
    tactileModifier: new TactileProperty({ softness: 0.85, slowRisingRate: 0.8, elasticity: 0.3 }),
    cost: 60,
  }),
]

// --- Mold (モールド・型) ---
export type MoldCategory = 'bakery' | 'animal' | 'dessert' | 'fruit' | 'special_character'

export interface MoldProps {
  id: string
  name: string
  category: MoldCategory
  description: string
  unlockCost: number
  characterTheme?: string
}

export class Mold {
  readonly id: string
  readonly name: string
  readonly category: MoldCategory
  readonly description: string
  readonly unlockCost: number
  readonly characterTheme?: string

  constructor(props: MoldProps) {
    this.id = props.id
    this.name = props.name
    this.category = props.category
    this.description = props.description
    this.unlockCost = props.unlockCost
    this.characterTheme = props.characterTheme
  }
}

export const MOLDS: Mold[] = [
  new Mold({
    id: 'melon_pan',
    name: 'メロンパン型',
    category: 'bakery',
    description: '格子模様がふっくら浮き出る王道のメロンパン型。',
    unlockCost: 0,
  }),
  new Mold({
    id: 'cat_bun',
    name: 'まんまるネコまんじゅう型',
    category: 'animal',
    description: 'ぴょこんと生えた耳が愛らしいネコ型。',
    unlockCost: 0,
  }),
  new Mold({
    id: 'shiba_toast',
    name: '柴犬食パン型',
    category: 'bakery',
    description: '柴犬の顔が焼き型になったトーストスクイーズ型。',
    unlockCost: 50,
  }),
  new Mold({
    id: 'bear_cake',
    name: 'くまさんパンケーキ型',
    category: 'dessert',
    description: 'ふんわり厚みのあるくま型パンケーキ。',
    unlockCost: 60,
  }),
  new Mold({
    id: 'strawberry',
    name: 'ジューシーいちご型',
    category: 'fruit',
    description: '粒々のつぶつぶ感がリアルないちご型。',
    unlockCost: 100,
  }),
  new Mold({
    id: 'fluffy_donut',
    name: 'ふんわりエンゼルリングドーナツ型',
    category: 'bakery',
    description: 'まあるい穴が可愛いふっくらアメリカンドーナツ。',
    unlockCost: 70,
  }),

  // --- キャラクターオマージュ特製モールド ---
  new Mold({
    id: 'ichimatsu_onigiri',
    name: '市松模様のおにぎりパン型',
    category: 'special_character',
    characterTheme: 'kimetsu',
    description: '【鬼滅風】緑と黒の市松羽織と額のあざが勇ましい炭治郎風モールド！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'asanoha_bunny',
    name: '麻の葉竹筒うさぎ型',
    category: 'special_character',
    characterTheme: 'kimetsu',
    description: '【鬼滅風】ピンクの麻の葉模様と竹筒をくわえた禰豆子風うさぎモールド！',
    unlockCost: 110,
  }),
  new Mold({
    id: 'zenitsu_sparrow',
    name: '雷鳴の三角スズメ型',
    category: 'special_character',
    characterTheme: 'kimetsu',
    description: '【鬼滅風】黄色とオレンジの三角鱗模様にチュン太郎が乗った善逸風モールド！',
    unlockCost: 120,
  }),
  new Mold({
    id: 'sumikko_polar',
    name: 'すみっこのまんまるフロシキ型',
    category: 'special_character',
    characterTheme: 'sumikko',
    description: '【すみっコ風】水玉フロシキをぎゅっと抱いた恥ずかしがり屋なしろくまモールド！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'sumikko_lizard',
    name: 'すみっこの水色とかげ型',
    category: 'special_character',
    characterTheme: 'sumikko',
    description: '【すみっコ風】海から来たまんまる水色のやさしいとかげ（恐竜？）モールド！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'fried_shrimp',
    name: 'サクサク衣のエビフライ型',
    category: 'special_character',
    characterTheme: 'sumikko',
    description: '【すみっコ風】サクサク衣に赤いリボンをつけたエビフライのしっぽモールド！',
    unlockCost: 110,
  }),
  new Mold({
    id: 'chiikawa_teary',
    name: 'ちいさくてかわいい泣き虫型',
    category: 'special_character',
    characterTheme: 'chiikawa',
    description: '【ちいかわ風】うるうる涙目でぷるぷる震える、ちいさくてかわいい白くまモールド！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'hachiware_cat',
    name: '元気な青いハチワレ型',
    category: 'special_character',
    characterTheme: 'chiikawa',
    description: '【ちいかわ風】八割れの青い頭と「なんとかなれーッ！」笑顔のハチワレモールド！',
    unlockCost: 110,
  }),
  new Mold({
    id: 'usagi_rabbit',
    name: 'ハイテンション長耳うさぎ型',
    category: 'special_character',
    characterTheme: 'chiikawa',
    description: '【ちいかわ風】「ヤハ！ウララララ！」と叫ぶ黄色い長耳うさぎモールド！',
    unlockCost: 120,
  }),
]

// --- Decoration (デコレーション＆トッピング＆プロップ 16種) ---
export type DecorationType = 'color' | 'topping' | 'sauce' | 'prop'

export interface DecorationProps {
  id: string
  name: string
  type: DecorationType
  icon: string
  colorCode?: string
  cost: number
  description?: string
}

export class Decoration {
  readonly id: string
  readonly name: string
  readonly type: DecorationType
  readonly icon: string
  readonly colorCode?: string
  readonly cost: number
  readonly description: string

  constructor(props: DecorationProps) {
    this.id = props.id
    this.name = props.name
    this.type = props.type
    this.icon = props.icon
    this.colorCode = props.colorCode
    this.cost = props.cost
    this.description = props.description ?? ''
  }
}

export const DECORATIONS: Decoration[] = [
  // --- 着色カラー ---
  new Decoration({ id: 'color_pink', name: 'パステルピンク着色', type: 'color', icon: '🎨', colorCode: '#f472b6', cost: 10, description: '淡くかわいい桜ピンク' }),
  new Decoration({ id: 'color_matcha', name: '抹茶グリーン着色', type: 'color', icon: '🍵', colorCode: '#86efac', cost: 10, description: '上品な宇治抹茶グリーン' }),
  new Decoration({ id: 'color_chocolate', name: 'チョコブラウン着色', type: 'color', icon: '🍫', colorCode: '#92400e', cost: 10, description: 'ビターな濃厚チョコ色' }),
  new Decoration({ id: 'color_ichimatsu', name: '鬼滅の市松グリーン＆黒', type: 'color', icon: '⚔️', colorCode: '#15803d', cost: 25, description: '【鬼滅風】深緑と漆黒の市松羽織カラー' }),
  new Decoration({ id: 'color_asanoha', name: '麻の葉ピンク＆桜色', type: 'color', icon: '🌸', colorCode: '#fb7185', cost: 25, description: '【鬼滅風】華やかな麻の葉ピンクグラデ' }),
  new Decoration({ id: 'color_lightning', name: '雷光イエロー＆橙', type: 'color', icon: '⚡', colorCode: '#facc15', cost: 25, description: '【鬼滅風】稲妻のような三角鱗イエロー' }),
  new Decoration({ id: 'color_sumikko_blue', name: 'パステルアクアブルー', type: 'color', icon: '🦕', colorCode: '#7dd3fc', cost: 20, description: '【すみっコ風】水色とかげのやさしいアクア' }),
  new Decoration({ id: 'color_chiikawa_white', name: 'ちいかわピュアホワイト', type: 'color', icon: '🤍', colorCode: '#ffffff', cost: 20, description: '【ちいかわ風】無垢でまぶしい純白肌' }),
  new Decoration({ id: 'color_hachiware_blue', name: 'ハチワレスカイブルー', type: 'color', icon: '😸', colorCode: '#38bdf8', cost: 20, description: '【ちいかわ風】ハチワレの青空ブルー' }),

  // --- トッピング＆ソース ---
  new Decoration({ id: 'topping_sprinkles', name: 'カラフルチョコスプレー', type: 'topping', icon: '🍬', cost: 15, description: '虹色のチョコスプレー' }),
  new Decoration({ id: 'topping_glitter', name: 'キラキラスクイーズラメ', type: 'topping', icon: '✨', cost: 20, description: '光の反射で輝くオーロララメ' }),
  new Decoration({ id: 'topping_gold_leaf', name: '純金箔ジュエルパウダー', type: 'topping', icon: '🌟', cost: 35, description: 'まばゆい黄金のプレミアムパウダー' }),
  new Decoration({ id: 'sauce_strawberry', name: 'とろ〜り苺ソース', type: 'sauce', icon: '🍓', colorCode: '#e11d48', cost: 15, description: 'つややかな真っ赤なストロベリー' }),
  new Decoration({ id: 'sauce_caramel', name: '濃厚キャラメルソース', type: 'sauce', icon: '🍯', colorCode: '#d97706', cost: 15, description: '甘く香ばしい琥珀色のキャラメル' }),

  // --- 特製キャラプロップ（重要アイテム） ---
  new Decoration({ id: 'prop_bamboo', name: '特製・竹筒くわえパーツ', type: 'prop', icon: '🎋', cost: 30, description: '【鬼滅風】口元にくわえる緑の竹筒' }),
  new Decoration({ id: 'prop_furoshiki', name: 'ピンクの水玉フロシキ', type: 'prop', icon: '🎀', cost: 30, description: '【すみっコ風】しろくまが抱きしめるフロシキ' }),
  new Decoration({ id: 'prop_teary_eyes', name: 'うるうる涙目＆ほっぺシール', type: 'prop', icon: '🥺', cost: 30, description: '【ちいかわ風】きらめく大きな涙目と赤ら顔' }),
]
