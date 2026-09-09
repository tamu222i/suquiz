export type SecretCategory = 'kimetsu' | 'sumikko' | 'chiikawa'

export interface SecretRecipe {
  id: string
  name: string
  category: SecretCategory
  categoryLabel: string
  characterName: string
  catchphrase: string
  description: string
  icon: string
  hint: string
  requiredMoldId?: string
  requiredBaseMaterialId?: string
  requiredSoundFillingId?: string
  requiredDecorationIds?: string[]
}

export const SECRET_RECIPES: SecretRecipe[] = [
  // --- 鬼滅の刃風 (Demon Slayer style) ---
  {
    id: 'kimetsu_tanjiro',
    name: '滅の市松メロンパン',
    category: 'kimetsu',
    categoryLabel: '⚔️ 鬼滅風スクイーズ',
    characterName: '市松模様の熱血少年風',
    catchphrase: '「心を燃やせ！全集中・水のぷにぷに！」',
    description: '緑と黒の市松模様羽織と額の傷跡が勇ましい、ふっくら優しい心のメロンパンスクイーズ。',
    icon: '⚔️',
    hint: '市松の型または着色 ＋ クランチビーズ ＋ 低反発ウレタン',
    requiredMoldId: 'ichimatsu_onigiri',
    requiredDecorationIds: ['color_ichimatsu'],
  },
  {
    id: 'kimetsu_nezuko',
    name: '麻の葉ピンクの竹筒うさぎ',
    category: 'kimetsu',
    categoryLabel: '⚔️ 鬼滅風スクイーズ',
    characterName: '竹筒をくわえた鬼の妹風',
    catchphrase: '「ムームーッ！（お兄ちゃん大好き！）」',
    description: '麻の葉模様の着物に緑の竹筒をくわえた、つぶらな瞳の愛らしいうさぎスクイーズ。',
    icon: '🎋',
    hint: '麻の葉うさぎ型 ＋ 竹筒パーツ ＋ パチパチキャンディ',
    requiredMoldId: 'asanoha_bunny',
    requiredDecorationIds: ['prop_bamboo'],
  },
  {
    id: 'kimetsu_zenitsu',
    name: '雷鳴の三角スズメ',
    category: 'kimetsu',
    categoryLabel: '⚔️ 鬼滅風スクイーズ',
    characterName: '泣き虫な雷の少年＆チュン太郎風',
    catchphrase: '「ぎゃーーッ！助けてくれぇぇ！雷の呼吸・壱ノ型！」',
    description: '黄色とオレンジの三角鱗模様に、ちゅんと佇む表情がたまらないスズメスクイーズ。',
    icon: '⚡',
    hint: '雷鳴スズメ型 ＋ 炭酸しゅわしゅわまたは雷光イエロー',
    requiredMoldId: 'zenitsu_sparrow',
  },

  // --- すみっコぐらし風 (Sumikko Gurashi style) ---
  {
    id: 'sumikko_shirokuma',
    name: 'すみっこのはずかしがり屋しろくま',
    category: 'sumikko',
    categoryLabel: '🍵 すみっコ風スクイーズ',
    characterName: '北から逃げてきた寒がりなしろくま風',
    catchphrase: '「すみっこが一番おちつくの…」',
    description: 'ピンクの水玉フロシキをぎゅっと抱きしめた、まあるく恥ずかしがり屋なしろくまスクイーズ。',
    icon: '🐻‍❄️',
    hint: 'まんまるフロシキ型 ＋ 水玉フロシキデコ ＋ 絹ごし豆腐または低反発',
    requiredMoldId: 'sumikko_polar',
    requiredDecorationIds: ['prop_furoshiki'],
  },
  {
    id: 'sumikko_tokage',
    name: '海から来たまんまる水色とかげ',
    category: 'sumikko',
    categoryLabel: '🍵 すみっコ風スクイーズ',
    characterName: '実は恐竜の生き残り？な水色のともだち風',
    catchphrase: '「ほんとはきょうりゅう…でもナイショだよ」',
    description: '背中に小さなひれを持つ、やさしいパステル水色のまんまるスクイーズ。',
    icon: '🦕',
    hint: '水色とかげ型 ＋ パステルアクアブルー ＋ 冷感ウォータージェル',
    requiredMoldId: 'sumikko_lizard',
    requiredDecorationIds: ['color_sumikko_blue'],
  },
  {
    id: 'sumikko_ebifurai',
    name: '残されちゃったエビフライのしっぽ',
    category: 'sumikko',
    categoryLabel: '🍵 すみっコ風スクイーズ',
    characterName: '硬いから残された、健気なエビフライ風',
    catchphrase: '「いつか全部たべてもらえると信じてる…」',
    description: 'サクサクの衣につぶらな瞳、頭にちょこんと赤いリボンをつけたエビフライのしっぽスクイーズ。',
    icon: '🍤',
    hint: 'エビフライ型 ＋ クランチ発泡ビーズ',
    requiredMoldId: 'fried_shrimp',
  },

  // --- ちいかわ風 (Chiikawa style) ---
  {
    id: 'chiikawa_teary',
    name: 'ちいさくて泣き虫な白いくま',
    category: 'chiikawa',
    categoryLabel: '🌸 ちいかわ風スクイーズ',
    characterName: 'ちいさくてかわいい泣き虫なやつ風',
    catchphrase: '「ワッ…！フッ…！（ぷにぷにされて涙目になっちゃう）」',
    description: 'うるうるの輝く瞳でぎゅっと握ると涙を浮かべる、純白の極上マシュマロスクイーズ。',
    icon: '🥺',
    hint: '泣き虫型 ＋ うるうる涙目シール ＋ マシュマロスポンジまたはシリコンゲル',
    requiredMoldId: 'chiikawa_teary',
    requiredDecorationIds: ['prop_teary_eyes'],
  },
  {
    id: 'chiikawa_hachiware',
    name: '笑顔のハチワレ青ねこ',
    category: 'chiikawa',
    categoryLabel: '🌸 ちいかわ風スクイーズ',
    characterName: 'ピンチでも前向きなハチワレ青ねこ風',
    catchphrase: '「なんとかなれーーッ！！」',
    description: '頭が八の字に青い、いつも元気で友達思いのハチワレねこスクイーズ。',
    icon: '😸',
    hint: 'ハチワレ型 ＋ ハチワレブルー ＋ ピヨピヨ笛またはスライムコア',
    requiredMoldId: 'hachiware_cat',
  },
  {
    id: 'chiikawa_usagi',
    name: 'ハイテンション黄色うさぎ',
    category: 'chiikawa',
    categoryLabel: '🌸 ちいかわ風スクイーズ',
    characterName: '叫びながら奇想天外に動く黄色うさぎ風',
    catchphrase: '「ヤハ！ウララララ！プルャ！」',
    description: 'ピンと立った長耳で奇声を上げながら元気をくれる、弾力抜群の黄色いうさぎスクイーズ。',
    icon: '🐰',
    hint: '長耳うさぎ型 ＋ 雷光イエローまたはパチパチキャンディ',
    requiredMoldId: 'usagi_rabbit',
  },
]

export function detectSecretRecipe(params: {
  moldId: string
  baseMaterialId: string
  soundFillingId?: string
  decorationIds: string[]
}): SecretRecipe | null {
  const { moldId, decorationIds } = params

  for (const recipe of SECRET_RECIPES) {
    let matches = true

    if (recipe.requiredMoldId && recipe.requiredMoldId !== moldId) {
      matches = false
    }

    if (recipe.requiredDecorationIds) {
      for (const reqDeco of recipe.requiredDecorationIds) {
        if (!decorationIds.includes(reqDeco)) {
          matches = false
          break
        }
      }
    }

    if (matches) {
      return recipe
    }
  }

  // Also check secondary flexible combos (e.g. cat_bun with prop_teary_eyes -> chiikawa vibe, cat_bun with color_ichimatsu -> kimetsu vibe, etc.)
  if (decorationIds.includes('color_ichimatsu')) {
    return SECRET_RECIPES[0] // kimetsu_tanjiro
  }
  if (decorationIds.includes('prop_bamboo')) {
    return SECRET_RECIPES[1] // kimetsu_nezuko
  }
  if (decorationIds.includes('prop_furoshiki')) {
    return SECRET_RECIPES[3] // sumikko_shirokuma
  }
  if (decorationIds.includes('prop_teary_eyes')) {
    return SECRET_RECIPES[6] // chiikawa_teary
  }

  return null
}
