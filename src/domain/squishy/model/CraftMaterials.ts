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
    defaultColor: '#fef08a',
    cost: 30,
  }),
  new BaseMaterial({
    id: 'silicone_gel',
    name: 'ぷるぷるシリコンゲル',
    description: 'ゼリーのようにぷるんぷるんと揺れる驚異の高弾性クリア。',
    tactileProperty: new TactileProperty({ softness: 0.75, slowRisingRate: 0.3, elasticity: 0.85 }),
    defaultColor: '#a5f3fc',
    cost: 20,
  }),
  new BaseMaterial({
    id: 'clay_sponge',
    name: 'もっちりクレイフォーム',
    description: '赤ちゃんのほっぺや耳たぶのように吸い付くもっちり餅肌。',
    tactileProperty: new TactileProperty({ softness: 0.65, slowRisingRate: 0.65, elasticity: 0.4 }),
    defaultColor: '#fed7aa',
    cost: 10,
  }),
  new BaseMaterial({
    id: 'marshmallow_sponge',
    name: 'ふわふわマシュマロスポンジ',
    description: '羽毛のように空気を含んだ、どこまでも軽いふんわり感。',
    tactileProperty: new TactileProperty({ softness: 0.95, slowRisingRate: 0.5, elasticity: 0.3 }),
    defaultColor: '#ffffff',
    cost: 25,
  }),
  new BaseMaterial({
    id: 'water_gel',
    name: 'ひんやり冷感ウォータージェル',
    description: '触れるとひんやり澄みわたる、潤いたっぷりのアクア感。',
    tactileProperty: new TactileProperty({ softness: 0.8, slowRisingRate: 0.35, elasticity: 0.7 }),
    defaultColor: '#bae6fd',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'tapioca_polymer',
    name: 'つぶつぶタピオカポリマー',
    description: '指先につぶつぶとした小気味よい粒感を感じる新世代ポリマー。',
    tactileProperty: new TactileProperty({ softness: 0.7, slowRisingRate: 0.4, elasticity: 0.65 }),
    defaultColor: '#e9d5ff',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'raw_caramel_rubber',
    name: '濃厚生キャラメルラバー',
    description: '指がゆっくり吸い込まれるような極限の粘弾性と重厚な反発。',
    tactileProperty: new TactileProperty({ softness: 0.85, slowRisingRate: 0.9, elasticity: 0.2 }),
    defaultColor: '#fed7aa',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'custard_mousse',
    name: 'とろけるカスタードムース',
    description: '指を置いた瞬間にふわりと沈み、優しく押し返す極上ムース。',
    tactileProperty: new TactileProperty({ softness: 0.88, slowRisingRate: 0.75, elasticity: 0.35 }),
    defaultColor: '#fef9c3',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'tofu_foam',
    name: 'しっとり絹ごし豆腐フォーム',
    description: '触れたら崩れそうなほど極限までソフトな純白ウレタン。',
    tactileProperty: new TactileProperty({ softness: 0.96, slowRisingRate: 0.8, elasticity: 0.2 }),
    defaultColor: '#f8fafc',
    cost: 50,
  }),
  new BaseMaterial({
    id: 'crystal_resin',
    name: 'クランチクリスタル樹脂',
    description: '表面はパリッと薄皮、中はもっちりとした魅惑の二重触感。',
    tactileProperty: new TactileProperty({ softness: 0.6, slowRisingRate: 0.45, elasticity: 0.8 }),
    defaultColor: '#fbcfe8',
    cost: 55,
  }),
  // --- 新規追加ベース素材 (計30種・3倍化！) ---
  new BaseMaterial({
    id: 'cloud_slime',
    name: 'もこもこクラウドスライム',
    description: '雲のように軽くふわふわで、押すとじゅわっと包まれる不思議スライム。',
    tactileProperty: new TactileProperty({ softness: 0.92, slowRisingRate: 0.55, elasticity: 0.45 }),
    defaultColor: '#e0f2fe',
    cost: 30,
  }),
  new BaseMaterial({
    id: 'mochi_wax',
    name: '吸い付く求肥餅ワックス',
    description: '指先にピタッと吸い付き離れない、和菓子職人監修の求肥触感。',
    tactileProperty: new TactileProperty({ softness: 0.82, slowRisingRate: 0.7, elasticity: 0.5 }),
    defaultColor: '#fdf4ff',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'matcha_ganache',
    name: '宇治抹茶生チョコベース',
    description: 'カカオバターと宇治抹茶が織りなす濃厚で重厚なスロータッチ。',
    tactileProperty: new TactileProperty({ softness: 0.78, slowRisingRate: 0.85, elasticity: 0.25 }),
    defaultColor: '#bbf7d0',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'stardust_pearl',
    name: '星屑パールエラストマー',
    description: '微細な星屑ラメが練り込まれた高反発でピョンピョン跳ねる弾性体。',
    tactileProperty: new TactileProperty({ softness: 0.7, slowRisingRate: 0.3, elasticity: 0.85 }),
    defaultColor: '#f5d0fe',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'souffle_foam',
    name: '極ふわスフレパンケーキ',
    description: 'メレンゲをたっぷり含んだ焼き立てスフレのようなエアリー食感。',
    tactileProperty: new TactileProperty({ softness: 0.94, slowRisingRate: 0.6, elasticity: 0.4 }),
    defaultColor: '#fef3c7',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'ice_aqua_crystal',
    name: '氷河アクアクリスタル',
    description: '触れた瞬間ひんやり透き通る、雪解け水のような爽快クリア。',
    tactileProperty: new TactileProperty({ softness: 0.68, slowRisingRate: 0.4, elasticity: 0.8 }),
    defaultColor: '#bae6fd',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'cotton_candy_fluff',
    name: '魔法のコットンキャンディ',
    description: '夢のように甘く、指が沈んでも跡がほとんど残らない超軽量綿。',
    tactileProperty: new TactileProperty({ softness: 0.98, slowRisingRate: 0.4, elasticity: 0.2 }),
    defaultColor: '#fce7f3',
    cost: 30,
  }),
  new BaseMaterial({
    id: 'honey_jelly',
    name: 'とろ〜りハニーゼリー',
    description: '黄金色の蜂蜜のような濃密な粘りとツヤのあるストレッチ性。',
    tactileProperty: new TactileProperty({ softness: 0.85, slowRisingRate: 0.65, elasticity: 0.6 }),
    defaultColor: '#fde047',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'cheese_steamed_cake',
    name: '北海道チーズ蒸しパンフォーム',
    description: 'ふかふかしっとり、一度触ったら離せない至福の低反発。',
    tactileProperty: new TactileProperty({ softness: 0.9, slowRisingRate: 0.75, elasticity: 0.35 }),
    defaultColor: '#fef08a',
    cost: 30,
  }),
  new BaseMaterial({
    id: 'konjac_jelly',
    name: 'ぷるるんこんにゃくゼリーゲル',
    description: '指を弾き返すような弾力とみずみずしい潤いの蒟蒻ゼリー感。',
    tactileProperty: new TactileProperty({ softness: 0.75, slowRisingRate: 0.2, elasticity: 0.92 }),
    defaultColor: '#fbcfe8',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'velvet_peach_skin',
    name: 'ベルベットピーチスキン',
    description: '桃の産毛のようなさらさら感と、奥に潜むみずみずしい果肉の柔らかさ。',
    tactileProperty: new TactileProperty({ softness: 0.86, slowRisingRate: 0.8, elasticity: 0.3 }),
    defaultColor: '#fed7aa',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'carbonated_bubble_foam',
    name: '炭酸微粒子バブルウレタン',
    description: '超微細な炭酸気泡を閉じ込めた、押すとシュワっと逃げる発泡感。',
    tactileProperty: new TactileProperty({ softness: 0.84, slowRisingRate: 0.5, elasticity: 0.6 }),
    defaultColor: '#cffafe',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'sakura_mochi_base',
    name: '桜もち求肥ベース',
    description: '春の桜葉の香りを思わせる、しっとり薄紅色の優しい弾力。',
    tactileProperty: new TactileProperty({ softness: 0.88, slowRisingRate: 0.7, elasticity: 0.45 }),
    defaultColor: '#fecdd3',
    cost: 35,
  }),
  new BaseMaterial({
    id: 'water_balloon_rubber',
    name: 'ぷよぷよ水風船ラバー',
    description: '薄皮の中に水がたっぷり詰まったような、たぷたぷ揺れる極上触感。',
    tactileProperty: new TactileProperty({ softness: 0.8, slowRisingRate: 0.25, elasticity: 0.88 }),
    defaultColor: '#a7f3d0',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'cosmic_aurora_gel',
    name: 'コズミックオーロラゲル',
    description: '光の当たる角度で七色に輝く、宇宙の星雲を閉じ込めたクリアゲル。',
    tactileProperty: new TactileProperty({ softness: 0.76, slowRisingRate: 0.45, elasticity: 0.75 }),
    defaultColor: '#ddd6fe',
    cost: 50,
  }),
  new BaseMaterial({
    id: 'butterscotch_mousse',
    name: 'バタースコッチ練乳フォーム',
    description: 'バターとキャラメルの濃厚な甘さを連想させる、どっしり低反発。',
    tactileProperty: new TactileProperty({ softness: 0.89, slowRisingRate: 0.88, elasticity: 0.22 }),
    defaultColor: '#fef3c7',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'forest_moss_foam',
    name: 'どんぐりの森こけむすフォーム',
    description: '【ジブリ風】雨上がりの深い森の苔を触っているかのような深い安らぎ。',
    tactileProperty: new TactileProperty({ softness: 0.9, slowRisingRate: 0.82, elasticity: 0.3 }),
    defaultColor: '#bbf7d0',
    cost: 40,
  }),
  new BaseMaterial({
    id: 'princess_glass_gel',
    name: 'プリンセスクリアガラスゲル',
    description: '【プリンセス風】ガラスの靴のように透明で気品あふれるプレミアムゲル。',
    tactileProperty: new TactileProperty({ softness: 0.72, slowRisingRate: 0.35, elasticity: 0.85 }),
    defaultColor: '#c7d2fe',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'precure_heart_mousse',
    name: 'キュアハートエンジェルムース',
    description: '【プリキュア風】胸いっぱいの愛とときめきが詰まった高密度ピンクムース。',
    tactileProperty: new TactileProperty({ softness: 0.92, slowRisingRate: 0.65, elasticity: 0.5 }),
    defaultColor: '#f472b6',
    cost: 45,
  }),
  new BaseMaterial({
    id: 'super_star_glow_rubber',
    name: '無敵スタースパークラバー',
    description: '【マリオ風】無敵スターのように弾む！元気いっぱいハイパワーラバー。',
    tactileProperty: new TactileProperty({ softness: 0.65, slowRisingRate: 0.15, elasticity: 0.95 }),
    defaultColor: '#facc15',
    cost: 50,
  }),
]

// --- SoundFilling (個性的なASMR音＆特殊コア 30種) ---
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
  // --- 新規追加音フィリング (計30種・3倍化！) ---
  new SoundFilling({
    id: 'forest_acorn_core',
    name: '森のどんぐりコトコトコア',
    description: '【ジブリ風】どんぐりが木箱の中でコトコト転がり木漏れ日が揺れる音。',
    soundProfile: new SoundProfile({ soundType: 'forest_rustle', pitch: 1.0, intensity: 0.85, crackleRate: 0.5 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.7, elasticity: 0.4 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'fire_calcifer_sparks',
    name: 'パチパチ暖炉の焚き火コア',
    description: '【ジブリ風】カルシファーがパチパチ炭火を爆ぜさせる暖かいASMR音。',
    soundProfile: new SoundProfile({ soundType: 'fire_crackle', pitch: 1.1, intensity: 0.85, crackleRate: 0.8 }),
    tactileModifier: new TactileProperty({ softness: 0.75, slowRisingRate: 0.6, elasticity: 0.5 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'magic_wand_chime',
    name: '魔法のステッキ星屑チャイム',
    description: '【プリンセス風】ステッキを一振りするとキラキラ星屑がこぼれ落ちる音。',
    soundProfile: new SoundProfile({ soundType: 'magic_wand', pitch: 1.1, intensity: 0.85, crackleRate: 0.3 }),
    tactileModifier: new TactileProperty({ softness: 0.85, slowRisingRate: 0.7, elasticity: 0.45 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'ice_crystal_tinkle',
    name: '氷雪のスノークリスタル音',
    description: '【プリンセス風】エルサの魔法で氷の花が咲き誇るようなチリンチリン音。',
    soundProfile: new SoundProfile({ soundType: 'ice_sparkle', pitch: 1.3, intensity: 0.8, crackleRate: 0.2 }),
    tactileModifier: new TactileProperty({ softness: 0.65, slowRisingRate: 0.3, elasticity: 0.8 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'ocean_shell_whisper',
    name: '潮騒のシェルシェル波音',
    description: '【プリンセス風】アリエルが耳をすませた、貝殻から響く優しい波の音。',
    soundProfile: new SoundProfile({ soundType: 'ocean_wave', pitch: 0.95, intensity: 0.8, crackleRate: 0.1 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.65, elasticity: 0.45 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'precure_miracle_bell',
    name: 'プリキュアミラクルベル',
    description: '【プリキュア風】変身シーンで胸のブローチがピュアにきらめくベル音。',
    soundProfile: new SoundProfile({ soundType: 'magic_wand', pitch: 1.35, intensity: 0.9, crackleRate: 0.4 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.5, elasticity: 0.7 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'fairy_wing_flutter',
    name: 'もふもふ妖精の羽ばたきコア',
    description: '【プリキュア風】妖精マスコットがパタパタ空を飛び、甘えて鳴く鈴音。',
    soundProfile: new SoundProfile({ soundType: 'bell_charm', pitch: 1.25, intensity: 0.8, crackleRate: 0.1 }),
    tactileModifier: new TactileProperty({ softness: 0.9, slowRisingRate: 0.6, elasticity: 0.5 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'paw_puppy_whistle',
    name: 'レスキューパウわんこ鳴き笛',
    description: '【パウパト風】パトロールわんこが「ワンッ！」と元気に吠えるトイ笛。',
    soundProfile: new SoundProfile({ soundType: 'puppy_bark', pitch: 1.1, intensity: 0.9, crackleRate: 0.0 }),
    tactileModifier: new TactileProperty({ softness: 0.7, slowRisingRate: 0.3, elasticity: 0.85 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'paw_patrol_siren',
    name: 'ミニパトカーピポーサイレン',
    description: '【パウパト風】緊急出動だ！キュートで小気味よいピポーサイレン笛。',
    soundProfile: new SoundProfile({ soundType: 'squeak_toy', pitch: 1.6, intensity: 0.9, crackleRate: 0.0 }),
    tactileModifier: new TactileProperty({ softness: 0.6, slowRisingRate: 0.2, elasticity: 0.9 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'mario_coin_1up',
    name: 'コインチャリン＆1UPチャイム',
    description: '【マリオ風】コインをゲットした瞬間のあの心地よすぎるチャリン音！',
    soundProfile: new SoundProfile({ soundType: 'coin_1up', pitch: 1.0, intensity: 0.95, crackleRate: 0.0 }),
    tactileModifier: new TactileProperty({ softness: 0.75, slowRisingRate: 0.3, elasticity: 0.85 }),
    cost: 50,
  }),
  new SoundFilling({
    id: 'mario_super_star_tune',
    name: '無敵スーパースターリズム',
    description: '【マリオ風】星屑が弾けて無敵になったときのハッピーなピッチ音！',
    soundProfile: new SoundProfile({ soundType: 'coin_1up', pitch: 1.35, intensity: 0.9, crackleRate: 0.2 }),
    tactileModifier: new TactileProperty({ softness: 0.7, slowRisingRate: 0.25, elasticity: 0.9 }),
    cost: 55,
  }),
  new SoundFilling({
    id: 'bubble_wrap_capsule',
    name: '無限プチプチ気泡カプセル',
    description: '押すたびにプチッ！と弾ける、梱包材プチプチを忠実に再現した快感。',
    soundProfile: new SoundProfile({ soundType: 'bubble_pop', pitch: 1.0, intensity: 0.9, crackleRate: 0.7 }),
    tactileModifier: new TactileProperty({ softness: 0.7, slowRisingRate: 0.4, elasticity: 0.75 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'music_box_gear',
    name: 'ノスタルジック星空オルゴール',
    description: '澄んだ一粒一粒の金属音が優しく響く、おやすみオルゴール。',
    soundProfile: new SoundProfile({ soundType: 'music_box', pitch: 1.0, intensity: 0.8, crackleRate: 0.0 }),
    tactileModifier: new TactileProperty({ softness: 0.85, slowRisingRate: 0.8, elasticity: 0.3 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'suction_pop_beads',
    name: 'パコパコ吸盤ビーズ',
    description: '壁から吸盤を剥がすような、小気味よいパコッ！という連打音。',
    soundProfile: new SoundProfile({ soundType: 'suction_pop', pitch: 1.1, intensity: 0.85, crackleRate: 0.3 }),
    tactileModifier: new TactileProperty({ softness: 0.65, slowRisingRate: 0.4, elasticity: 0.7 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'croissant_flake',
    name: 'クロワッサンさくさくフレーク',
    description: '焼きたてクロワッサンの層がサクサク音を立てて崩れる至高のASMR。',
    soundProfile: new SoundProfile({ soundType: 'caramel_crust', pitch: 1.25, intensity: 0.85, crackleRate: 0.85 }),
    tactileModifier: new TactileProperty({ softness: 0.6, slowRisingRate: 0.4, elasticity: 0.6 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'tapioca_popping_boba',
    name: 'ポッピングボバ弾け玉',
    description: 'ぷちんと薄皮が弾けて甘い果汁が広がるようなジューシー音。',
    soundProfile: new SoundProfile({ soundType: 'slime_gel', pitch: 1.15, intensity: 0.85, crackleRate: 0.5 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.35, elasticity: 0.8 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'honeycomb_crunch',
    name: '蜂の巣ハニカムクランチ',
    description: 'サクッ・じゅわ〜と甘い蜜が染み出すような立体的なクランチ音。',
    soundProfile: new SoundProfile({ soundType: 'crunch_beads', pitch: 0.95, intensity: 0.85, crackleRate: 0.75 }),
    tactileModifier: new TactileProperty({ softness: 0.75, slowRisingRate: 0.55, elasticity: 0.5 }),
    cost: 40,
  }),
  new SoundFilling({
    id: 'water_drop_plop',
    name: 'ぽちゃん！水滴しずくコア',
    description: '静かな水面に透明なしずくが一粒落ちる、澄みわたるぽちゃん音。',
    soundProfile: new SoundProfile({ soundType: 'slime_gel', pitch: 1.3, intensity: 0.8, crackleRate: 0.1 }),
    tactileModifier: new TactileProperty({ softness: 0.85, slowRisingRate: 0.4, elasticity: 0.75 }),
    cost: 35,
  }),
  new SoundFilling({
    id: 'velvet_whisper_sponge',
    name: '微音さらさらベルベット',
    description: '耳元でそっとシルクをなでるような、囁く超微小エアリーノイズ。',
    soundProfile: new SoundProfile({ soundType: 'air_slow', pitch: 1.2, intensity: 0.65, crackleRate: 0.05 }),
    tactileModifier: new TactileProperty({ softness: 0.95, slowRisingRate: 0.9, elasticity: 0.2 }),
    cost: 45,
  }),
  new SoundFilling({
    id: 'aurora_glitter_rustle',
    name: 'しゃらしゃらオーロラグリッター',
    description: '星屑の砂時計がサラサラと流れるような幻想的なシャラシャラ音。',
    soundProfile: new SoundProfile({ soundType: 'bell_charm', pitch: 1.4, intensity: 0.75, crackleRate: 0.3 }),
    tactileModifier: new TactileProperty({ softness: 0.8, slowRisingRate: 0.6, elasticity: 0.5 }),
    cost: 50,
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

  // --- ジブリアニメ (Ghibli) ---
  new Mold({
    id: 'ghibli_totoro',
    name: '森のふっくら大トトロ型',
    category: 'special_character',
    characterTheme: 'ghibli',
    description: '【ジブリ風】お腹の模様と大きな瞳、耳がピンと立った森の主モールド！',
    unlockCost: 0,
  }),
  new Mold({
    id: 'ghibli_kurosuke',
    name: 'まっくろススワタリ型',
    category: 'special_character',
    characterTheme: 'ghibli',
    description: '【ジブリ風】まっくろふわふわ毛並みに大きなギョロ目のススワタリ型！',
    unlockCost: 80,
  }),
  new Mold({
    id: 'ghibli_calcifer',
    name: 'パチパチ炎のカルシファー型',
    category: 'special_character',
    characterTheme: 'ghibli',
    description: '【ジブリ風】燃え盛る暖炉の火の悪魔！「おいら燃えてるぜ！」と叫ぶカルシファー型！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'ghibli_kaonashi',
    name: 'お面の黒影カオナシ型',
    category: 'special_character',
    characterTheme: 'ghibli',
    description: '【ジブリ風】白仮面と黒いグラデーション影が印象的なカオナシモールド！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'ghibli_catbus',
    name: 'にっこり笑顔のネコバス型',
    category: 'special_character',
    characterTheme: 'ghibli',
    description: '【ジブリ風】ピカッと光るネズミライトと大きな口で笑うネコバス型！',
    unlockCost: 110,
  }),

  // --- ディズニープリンセス (Disney Princess) ---
  new Mold({
    id: 'princess_cinderella',
    name: 'ガラスの靴のプリンセス型',
    category: 'special_character',
    characterTheme: 'disney_princess',
    description: '【プリンセス風】スカイブルーの舞踏会ドレスとティアラが輝くシンデレラ型！',
    unlockCost: 0,
  }),
  new Mold({
    id: 'princess_belle',
    name: '魔法の赤い薔薇プリンセス型',
    category: 'special_character',
    characterTheme: 'disney_princess',
    description: '【プリンセス風】黄金イエロードレスと真実の愛の赤い薔薇を抱いたベル型！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'princess_ariel',
    name: '潮騒の人魚姫シェル型',
    category: 'special_character',
    characterTheme: 'disney_princess',
    description: '【プリンセス風】エメラルドの尾ひれと赤毛、貝殻の胸当てが愛らしいアリエル型！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'princess_elsa',
    name: '氷雪スノークリスタル女王型',
    category: 'special_character',
    characterTheme: 'disney_princess',
    description: '【プリンセス風】雪の結晶マントとアイスブルーの透明ドレスが美しいエルサ型！',
    unlockCost: 110,
  }),
  new Mold({
    id: 'princess_rapunzel',
    name: '魔法の花と三つ編みプリンセス型',
    category: 'special_character',
    characterTheme: 'disney_princess',
    description: '【プリンセス風】小花が散りばめられた長い黄金の三つ編みとラベンダードレス型！',
    unlockCost: 120,
  }),

  // --- プリキュア (Precure) ---
  new Mold({
    id: 'precure_heart',
    name: 'きらめくキュアハート型',
    category: 'special_character',
    characterTheme: 'precure',
    description: '【プリキュア風】ゴールドの天使の羽と大きなピンクリボンがついた変身コンパクト型！',
    unlockCost: 0,
  }),
  new Mold({
    id: 'precure_fairy',
    name: 'もふもふうさぎ妖精マスコット型',
    category: 'special_character',
    characterTheme: 'precure',
    description: '【プリキュア風】「〜モフ！」「〜ラビ！」と話しかけてくれそうな、うるうる瞳の妖精型！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'precure_ribbon',
    name: 'ミラクルリボンステッキ型',
    category: 'special_character',
    characterTheme: 'precure',
    description: '【プリキュア風】虹色の星屑が溢れ出す、魔法のミラクルリボンステッキ型！',
    unlockCost: 100,
  }),

  // --- パウ・パトロール (PAW Patrol) ---
  new Mold({
    id: 'paw_chase',
    name: '正義のポリスシェパードわんこ型',
    category: 'special_character',
    characterTheme: 'paw_patrol',
    description: '【パウパト風】「俺の仕事にお任せだぜ！」青いポリス帽をかぶったチェイス型！',
    unlockCost: 0,
  }),
  new Mold({
    id: 'paw_marshall',
    name: '元気なファイヤーダルメシアン型',
    category: 'special_character',
    characterTheme: 'paw_patrol',
    description: '【パウパト風】「燃えてきた〜！」赤い消防ヘルメットのブチ模様ダルメシアン型！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'paw_skye',
    name: 'お空を飛ぶフライングわんこ型',
    category: 'special_character',
    characterTheme: 'paw_patrol',
    description: '【パウパト風】ピンクのフライトゴーグルとプロペラを背負った愛らしいスカイ型！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'paw_badge',
    name: 'パウ・パトロール肉球バッジ型',
    category: 'special_character',
    characterTheme: 'paw_patrol',
    description: '【パウパト風】パウ・パトロールのシンボル！立体的な肉球が浮き出るエンブレム型！',
    unlockCost: 110,
  }),

  // --- マリオ (Mario) ---
  new Mold({
    id: 'mario_mushroom',
    name: 'スーパー赤キノコ型',
    category: 'special_character',
    characterTheme: 'mario',
    description: '【マリオ風】白水玉の赤いカサとつぶらな瞳！食べたら大きくなるスーパーキノコ型！',
    unlockCost: 0,
  }),
  new Mold({
    id: 'mario_star',
    name: '無敵のスーパースター型',
    category: 'special_character',
    characterTheme: 'mario',
    description: '【マリオ風】キラキラ輝く黄色い星に縦長のつぶらな瞳！無敵のスーパースター型！',
    unlockCost: 90,
  }),
  new Mold({
    id: 'mario_block',
    name: 'コイン飛び出すハテナブロック型',
    category: 'special_character',
    characterTheme: 'mario',
    description: '【マリオ風】押すとコインがチャリン！黄金色に輝く「？」ハテナブロック型！',
    unlockCost: 100,
  }),
  new Mold({
    id: 'mario_cap',
    name: 'Mマークの赤帽子とヒゲ型',
    category: 'special_character',
    characterTheme: 'mario',
    description: '【マリオ風】赤いキャスケット帽の「M」エンブレムと立派なくるりんヒゲ型！',
    unlockCost: 110,
  }),
]

// --- Decoration (デコレーション＆トッピング＆プロップ 48種) ---
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
  // --- 着色カラー (20種) ---
  new Decoration({ id: 'color_pink', name: 'パステルピンク着色', type: 'color', icon: '🎨', colorCode: '#f472b6', cost: 10, description: '淡くかわいい桜ピンク' }),
  new Decoration({ id: 'color_matcha', name: '抹茶グリーン着色', type: 'color', icon: '🍵', colorCode: '#86efac', cost: 10, description: '上品な宇治抹茶グリーン' }),
  new Decoration({ id: 'color_chocolate', name: 'チョコブラウン着色', type: 'color', icon: '🍫', colorCode: '#92400e', cost: 10, description: 'ビターな濃厚チョコ色' }),
  new Decoration({ id: 'color_ichimatsu', name: '鬼滅の市松グリーン＆黒', type: 'color', icon: '⚔️', colorCode: '#15803d', cost: 25, description: '【鬼滅風】深緑と漆黒の市松羽織カラー' }),
  new Decoration({ id: 'color_asanoha', name: '麻の葉ピンク＆桜色', type: 'color', icon: '🌸', colorCode: '#fb7185', cost: 25, description: '【鬼滅風】華やかな麻の葉ピンクグラデ' }),
  new Decoration({ id: 'color_lightning', name: '雷光イエロー＆橙', type: 'color', icon: '⚡', colorCode: '#facc15', cost: 25, description: '【鬼滅風】稲妻のような三角鱗イエロー' }),
  new Decoration({ id: 'color_sumikko_blue', name: 'パステルアクアブルー', type: 'color', icon: '🦕', colorCode: '#7dd3fc', cost: 20, description: '【すみっコ風】水色とかげのやさしいアクア' }),
  new Decoration({ id: 'color_chiikawa_white', name: 'ちいかわピュアホワイト', type: 'color', icon: '🤍', colorCode: '#ffffff', cost: 20, description: '【ちいかわ風】無垢でまぶしい純白肌' }),
  new Decoration({ id: 'color_hachiware_blue', name: 'ハチワレスカイブルー', type: 'color', icon: '😸', colorCode: '#38bdf8', cost: 20, description: '【ちいかわ風】ハチワレの青空ブルー' }),
  new Decoration({ id: 'color_ghibli_grey', name: 'トトログレー', type: 'color', icon: '🌲', colorCode: '#94a3b8', cost: 20, description: '【ジブリ風】森に佇むトトロの穏やかなグレー' }),
  new Decoration({ id: 'color_kurosuke_black', name: 'ススワタリ漆黒ブラック', type: 'color', icon: '🖤', colorCode: '#1e293b', cost: 20, description: '【ジブリ風】夜の暗闇に溶け込む漆黒' }),
  new Decoration({ id: 'color_calcifer_orange', name: 'カルシファーフレアオレンジ', type: 'color', icon: '🔥', colorCode: '#f97316', cost: 20, description: '【ジブリ風】パチパチ燃える鮮やかな炎の橙' }),
  new Decoration({ id: 'color_cinderella_blue', name: 'シンデレラアイスブルー', type: 'color', icon: '👠', colorCode: '#93c5fd', cost: 25, description: '【プリンセス風】魔法が舞い降りた煌めくドレスブルー' }),
  new Decoration({ id: 'color_belle_yellow', name: 'ベルゴールドドレス', type: 'color', icon: '🌹', colorCode: '#fde047', cost: 25, description: '【プリンセス風】舞踏会で輝く黄金のドレスイエロー' }),
  new Decoration({ id: 'color_ariel_teal', name: 'アリエルマーメイドエメラルド', type: 'color', icon: '🧜‍♀️', colorCode: '#2dd4bf', cost: 25, description: '【プリンセス風】海の中で輝く美しい人魚のエメラルド' }),
  new Decoration({ id: 'color_elsa_frost', name: 'エルサスノークリスタル', type: 'color', icon: '❄️', colorCode: '#e0f2fe', cost: 25, description: '【プリンセス風】氷の宮殿を彩る透き通るフロストシルバー' }),
  new Decoration({ id: 'color_precure_magenta', name: 'キュアハートマゼンタピンク', type: 'color', icon: '💖', colorCode: '#ec4899', cost: 25, description: '【プリキュア風】胸のときめきを放つ鮮烈マゼンタ' }),
  new Decoration({ id: 'color_paw_police_blue', name: 'チェイスポリスディープブルー', type: 'color', icon: '👮', colorCode: '#1d4ed8', cost: 25, description: '【パウパト風】パトロールに出動するポリスブルー' }),
  new Decoration({ id: 'color_paw_fire_red', name: 'マーシャルファイヤーレッド', type: 'color', icon: '🚒', colorCode: '#ef4444', cost: 25, description: '【パウパト風】元気いっぱいレスキューの情熱レッド' }),
  new Decoration({ id: 'color_mario_red', name: 'マリオスーパーレッド', type: 'color', icon: '🍄', colorCode: '#dc2626', cost: 25, description: '【マリオ風】みんな大好き！ヒーローのスーパーレッド' }),

  // --- トッピング＆ソース (14種) ---
  new Decoration({ id: 'topping_sprinkles', name: 'カラフルチョコスプレー', type: 'topping', icon: '🍬', cost: 15, description: '虹色のチョコスプレー' }),
  new Decoration({ id: 'topping_glitter', name: 'キラキラスクイーズラメ', type: 'topping', icon: '✨', cost: 20, description: '光の反射で輝くオーロララメ' }),
  new Decoration({ id: 'topping_gold_leaf', name: '純金箔ジュエルパウダー', type: 'topping', icon: '🌟', cost: 35, description: 'まばゆい黄金のプレミアムパウダー' }),
  new Decoration({ id: 'topping_star_candies', name: 'こんぺいとう星屑シュガー', type: 'topping', icon: '⭐', cost: 20, description: 'トトロも大好きなカラフルなこんぺいとう' }),
  new Decoration({ id: 'topping_flower_petals', name: 'プリンセス花びらフレーク', type: 'topping', icon: '🌸', cost: 25, description: 'ドレスを華やかに飾る食用フラワーフレーク' }),
  new Decoration({ id: 'topping_pearls', name: 'マーメイドシェルパール', type: 'topping', icon: '🫧', cost: 25, description: '海から届いたつやつや真珠ビーズ' }),
  new Decoration({ id: 'topping_snowflakes', name: '氷雪のミニスノーフレーク', type: 'topping', icon: '❄️', cost: 25, description: '触っても溶けないきらめく雪の結晶' }),
  new Decoration({ id: 'topping_paw_prints', name: 'ミニ肉球シュガークッキー', type: 'topping', icon: '🐾', cost: 25, description: 'パウ・パトロールのかわいい肉球トッピング' }),
  new Decoration({ id: 'sauce_strawberry', name: 'とろ〜り苺ソース', type: 'sauce', icon: '🍓', colorCode: '#e11d48', cost: 15, description: 'つややかな真っ赤なストロベリー' }),
  new Decoration({ id: 'sauce_caramel', name: '濃厚キャラメルソース', type: 'sauce', icon: '🍯', colorCode: '#d97706', cost: 15, description: '甘く香ばしい琥珀色のキャラメル' }),
  new Decoration({ id: 'sauce_blueberry', name: '濃厚ブルーベリーソース', type: 'sauce', icon: '🫐', colorCode: '#3b82f6', cost: 15, description: '果肉たっぷりのジューシーなブルーベリー' }),
  new Decoration({ id: 'sauce_matcha', name: '宇治抹茶みたらしソース', type: 'sauce', icon: '🍵', colorCode: '#16a34a', cost: 15, description: 'ほろ苦さと甘みが絶妙な和風ソース' }),
  new Decoration({ id: 'sauce_white_chocolate', name: 'とろけるホワイトチョコ', type: 'sauce', icon: '🥛', colorCode: '#f8fafc', cost: 15, description: 'ミルキーで優しい甘さのホワイトソース' }),
  new Decoration({ id: 'sauce_mango', name: '完熟マンゴーパッションソース', type: 'sauce', icon: '🥭', colorCode: '#f59e0b', cost: 15, description: 'トロピカルな輝きのパッションソース' }),

  // --- 特製キャラプロップ (14種) ---
  new Decoration({ id: 'prop_bamboo', name: '特製・竹筒くわえパーツ', type: 'prop', icon: '🎋', cost: 30, description: '【鬼滅風】口元にくわえる緑の竹筒' }),
  new Decoration({ id: 'prop_furoshiki', name: 'ピンクの水玉フロシキ', type: 'prop', icon: '🎀', cost: 30, description: '【すみっコ風】しろくまが抱きしめるフロシキ' }),
  new Decoration({ id: 'prop_teary_eyes', name: 'うるうる涙目＆ほっぺシール', type: 'prop', icon: '🥺', cost: 30, description: '【ちいかわ風】きらめく大きな涙目と赤ら顔' }),
  new Decoration({ id: 'prop_donguri_leaf', name: 'どんぐり＆頭のせ葉っぱ', type: 'prop', icon: '🍃', cost: 30, description: '【ジブリ風】頭にちょこんと乗せる大きな雨宿り葉っぱ' }),
  new Decoration({ id: 'prop_calcifer_wood', name: 'カルシファーの燃える薪', type: 'prop', icon: '🪵', cost: 30, description: '【ジブリ風】カルシファーの下にくべる香ばしい薪' }),
  new Decoration({ id: 'prop_kaonashi_gold', name: 'カオナシの差し出す砂金', type: 'prop', icon: '🪙', cost: 30, description: '【ジブリ風】カオナシが手の上に光らせる砂金塊' }),
  new Decoration({ id: 'prop_tiara', name: 'きらめくプリンセスティアラ', type: 'prop', icon: '👑', cost: 35, description: '【プリンセス風】頭上で輝くシルバーとクリスタルの冠' }),
  new Decoration({ id: 'prop_glass_slipper', name: 'ガラスの靴チャーム', type: 'prop', icon: '🥿', cost: 35, description: '【プリンセス風】透明に透き通る伝説のガラスの靴' }),
  new Decoration({ id: 'prop_enchanted_rose', name: 'ガラスドームの赤い魔法薔薇', type: 'prop', icon: '🥀', cost: 35, description: '【プリンセス風】花びらが舞い散る美しい真実の薔薇' }),
  new Decoration({ id: 'prop_cure_heart_gem', name: '胸のキュアハートジュエル', type: 'prop', icon: '💎', cost: 35, description: '【プリキュア風】胸元で光を放つ宝石ハートブローチ' }),
  new Decoration({ id: 'prop_cure_ribbon_bow', name: 'ミラクルビッグリボン', type: 'prop', icon: '🎀', cost: 30, description: '【プリキュア風】背中や頭につけるふんわり大きなピンクリボン' }),
  new Decoration({ id: 'prop_paw_police_hat', name: 'チェイスのポリスハット', type: 'prop', icon: '🧢', cost: 30, description: '【パウパト風】黄色い星のバッジがついた紺色警察帽' }),
  new Decoration({ id: 'prop_paw_fire_helmet', name: 'マーシャルの消防ヘルメット', type: 'prop', icon: '🪖', cost: 30, description: '【パウパト風】かっこいい消防レスキューヘルメット' }),
  new Decoration({ id: 'prop_mario_mustache', name: 'ヒゲ＆Mマークエンブレム', type: 'prop', icon: '🥸', cost: 35, description: '【マリオ風】立派なくるりん黒ヒゲと丸いMマーク' }),
]
