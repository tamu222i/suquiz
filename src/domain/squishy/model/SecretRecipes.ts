export type SecretCategory =
  | 'kimetsu'
  | 'sumikko'
  | 'chiikawa'
  | 'ghibli'
  | 'disney_princess'
  | 'precure'
  | 'paw_patrol'
  | 'mario'

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

  // --- ジブリアニメ (Ghibli style) ---
  {
    id: 'ghibli_totoro',
    name: '森のふっくら大トトロ',
    category: 'ghibli',
    categoryLabel: '🌲 ジブリ風スクイーズ',
    characterName: '雨宿りする森の主大トトロ風',
    catchphrase: '「ウォォォォン！（森の木漏れ日とどんぐりの音）」',
    description: 'お腹の三日月模様とピンと立った耳、頭に大きな雨宿りの葉っぱを乗せた森の主スクイーズ。',
    icon: '🌲',
    hint: '大トトロ型 ＋ トトログレー ＋ 森のどんぐりコア',
    requiredMoldId: 'ghibli_totoro',
  },
  {
    id: 'ghibli_kurosuke',
    name: 'まっくろススワタリ',
    category: 'ghibli',
    categoryLabel: '🌲 ジブリ風スクイーズ',
    characterName: 'こんぺいとう大好きなまっくろくろすけ風',
    catchphrase: '「ザワザワ…（まっくろくろすけ出ておいで〜！）」',
    description: '漆黒の毛並みに大きな丸い瞳！カラフルなこんぺいとうを大事そうに抱えたスクイーズ。',
    icon: '🖤',
    hint: 'ススワタリ型 ＋ 漆黒ブラック ＋ こんぺいとう星屑シュガー',
    requiredMoldId: 'ghibli_kurosuke',
  },
  {
    id: 'ghibli_calcifer',
    name: 'パチパチ暖炉のカルシファー',
    category: 'ghibli',
    categoryLabel: '🌲 ジブリ風スクイーズ',
    characterName: '薪を食べて燃え上がる火の悪魔風',
    catchphrase: '「おいら燃えてるぜ！ベーッだ！」',
    description: '薪の上でメラメラと踊るオレンジの炎の悪魔！パチパチ炭火が爆ぜるASMRスクイーズ。',
    icon: '🔥',
    hint: 'カルシファー型 ＋ フレアオレンジ ＋ パチパチ暖炉コア',
    requiredMoldId: 'ghibli_calcifer',
  },
  {
    id: 'ghibli_kaonashi',
    name: '砂金を差し出す黒影カオナシ',
    category: 'ghibli',
    categoryLabel: '🌲 ジブリ風スクイーズ',
    characterName: '千尋にそっと砂金を差し出すカオナシ風',
    catchphrase: '「ア…ア…（これ…あげる…）」',
    description: '静かな白仮面に紫のペイント、手の上にキラキラと砂金を光らせた神秘的なスクイーズ。',
    icon: '🎭',
    hint: 'カオナシ型 ＋ カオナシの砂金 ＋ スローエア通気コア',
    requiredMoldId: 'ghibli_kaonashi',
  },
  {
    id: 'ghibli_catbus',
    name: '夜空をかける笑顔のネコバス',
    category: 'ghibli',
    categoryLabel: '🌲 ジブリ風スクイーズ',
    characterName: '電線の上を跳び越えるネコバス風',
    catchphrase: '「ニャーオ！ピカッと行先表示！」',
    description: '大きな口を開けた満面の笑顔にネズミのヘッドライト！ふかふかの座席のような弾力。',
    icon: '🚌',
    hint: 'ネコバス型 ＋ キャラメルラバー ＋ 鈴入りベルチャーム',
    requiredMoldId: 'ghibli_catbus',
  },

  // --- ディズニープリンセス (Disney Princess style) ---
  {
    id: 'princess_cinderella',
    name: 'ガラスの靴のシンデレラ',
    category: 'disney_princess',
    categoryLabel: '👑 プリンセス風スクイーズ',
    characterName: '魔法にかけられた気品ある舞踏会プリンセス風',
    catchphrase: '「信じていれば、夢はきっと叶うわ…✨」',
    description: '煌めくアイスブルーのドレスにきらめくティアラとガラスの靴を添えた至高のプリンセス。',
    icon: '👠',
    hint: 'シンデレラ型 ＋ アイスブルー ＋ ガラスの靴チャーム ＋ 魔法のステッキ音',
    requiredMoldId: 'princess_cinderella',
  },
  {
    id: 'princess_belle',
    name: '魔法の赤い薔薇プリンセス・ベル',
    category: 'disney_princess',
    categoryLabel: '👑 プリンセス風スクイーズ',
    characterName: '心優しく読書好きな黄金ドレスのプリンセス風',
    catchphrase: '「真実の愛は、見た目ではなく心の中にあるの」',
    description: '黄金に輝く舞踏会ドレスとガラスドームに守られた真実の愛の赤い薔薇スクイーズ。',
    icon: '🌹',
    hint: 'ベル型 ＋ ベルゴールドドレス ＋ ガラスドーム赤い薔薇',
    requiredMoldId: 'princess_belle',
  },
  {
    id: 'princess_ariel',
    name: '潮騒の人魚姫アリエル',
    category: 'disney_princess',
    categoryLabel: '👑 プリンセス風スクイーズ',
    characterName: '海の上を夢見るエメラルド色の人魚姫風',
    catchphrase: '「海の底には素敵な宝物がいっぱい！」',
    description: 'エメラルドの尾ひれに紫の貝殻、潮騒のささやきが響く真珠ビーズ付きスクイーズ。',
    icon: '🧜‍♀️',
    hint: 'アリエル型 ＋ マーメイドエメラルド ＋ 潮騒シェル波音',
    requiredMoldId: 'princess_ariel',
  },
  {
    id: 'princess_elsa',
    name: '氷雪スノークリスタル女王エルサ',
    category: 'disney_princess',
    categoryLabel: '👑 プリンセス風スクイーズ',
    characterName: '氷の魔法を操る美しい雪の女王風',
    catchphrase: '「少しも寒くないわ！氷雪よ輝け！」',
    description: '透き通る氷のドレスに雪の結晶マント、チリンと鳴り響くスノークリスタル音のスクイーズ。',
    icon: '❄️',
    hint: 'エルサ型 ＋ スノークリスタル着色 ＋ 氷雪スノークリスタル音',
    requiredMoldId: 'princess_elsa',
  },
  {
    id: 'princess_rapunzel',
    name: '黄金三つ編みのラプンツェル',
    category: 'disney_princess',
    categoryLabel: '👑 プリンセス風スクイーズ',
    characterName: '夜空のランタンを夢見る三つ編みプリンセス風',
    catchphrase: '「外の世界へ飛び出そう！新しい冒険が待っているわ！」',
    description: '可憐な小花が編み込まれた長い黄金の三つ編み髪とラベンダードレスのスクイーズ。',
    icon: '🌸',
    hint: 'ラプンツェル型 ＋ プリンセス花びらフレーク ＋ 星空オルゴール',
    requiredMoldId: 'princess_rapunzel',
  },

  // --- プリキュア (Precure style) ---
  {
    id: 'precure_heart',
    name: '愛を届けるキュアハートコンパクト',
    category: 'precure',
    categoryLabel: '💖 プリキュア風スクイーズ',
    characterName: '愛と勇気のピンクヒロイン風',
    catchphrase: '「届け！ときめくハートのミラクルパワー！」',
    description: '黄金のエンジェルウィングと胸元で輝くマゼンタのキュアハートジュエルスクイーズ。',
    icon: '💖',
    hint: 'キュアハート型 ＋ マゼンタピンク ＋ キュアハートジュエル ＋ プリキュアミラクルベル',
    requiredMoldId: 'precure_heart',
  },
  {
    id: 'precure_fairy',
    name: 'もふもふうさぎ妖精マスコット',
    category: 'precure',
    categoryLabel: '💖 プリキュア風スクイーズ',
    characterName: '主人公の肩にとまる甘えん坊妖精風',
    catchphrase: '「プリキュアがんばるモフ〜！応援してるラビ！」',
    description: 'もふもふの耳と大きいうるうる瞳、パタパタ飛ぶ羽音が愛らしすぎる妖精スクイーズ。',
    icon: '🐰',
    hint: '妖精型 ＋ もふもふ羽ばたきコア ＋ パステルピンク',
    requiredMoldId: 'precure_fairy',
  },
  {
    id: 'precure_ribbon',
    name: '星屑ミラクルリボンステッキ',
    category: 'precure',
    categoryLabel: '💖 プリキュア風スクイーズ',
    characterName: '浄化の光を放つ魔法ステッキ風',
    catchphrase: '「きらめく星よ、みんなの笑顔をまもって！」',
    description: 'ビッグリボンに星屑チャイムが響く、握るたびに奇跡が起こるミラクルステッキ型。',
    icon: '🎀',
    hint: 'リボンステッキ型 ＋ ミラクルビッグリボン ＋ 魔法のステッキ音',
    requiredMoldId: 'precure_ribbon',
  },

  // --- パウ・パトロール (PAW Patrol style) ---
  {
    id: 'paw_chase',
    name: '頼れるリーダー！ポリスチェイス',
    category: 'paw_patrol',
    categoryLabel: '🐾 パウパト風スクイーズ',
    characterName: '正義感あふれる警察犬シェパード風',
    catchphrase: '「チェイスにお任せだぜ！パウパト出動！」',
    description: '濃紺のポリスキャップに星のバッジ！元気に「ワンッ！」と吠えるパトロールスクイーズ。',
    icon: '👮',
    hint: 'ポリスシェパード型 ＋ ポリスディープブルー ＋ チェイスポリスハット ＋ わんこ鳴き笛',
    requiredMoldId: 'paw_chase',
  },
  {
    id: 'paw_marshall',
    name: 'おっちょこちょい消防士マーシャル',
    category: 'paw_patrol',
    categoryLabel: '🐾 パウパト風スクイーズ',
    characterName: '元気いっぱいダルメシアン消防士風',
    catchphrase: '「燃えてきた〜！すべって転んでもへっちゃら！」',
    description: '真っ赤な消防ヘルメットに黒いブチ模様！サイレン笛がピポーと鳴るファイヤースクイーズ。',
    icon: '🚒',
    hint: 'ファイヤーダルメシアン型 ＋ ファイヤーレッド ＋ 消防ヘルメット ＋ サイレン笛',
    requiredMoldId: 'paw_marshall',
  },
  {
    id: 'paw_skye',
    name: '大空を舞うフライングスカイ',
    category: 'paw_patrol',
    categoryLabel: '🐾 パウパト風スクイーズ',
    characterName: 'お空からみんなを見守るコッカプー風',
    catchphrase: '「大空高く舞い上がるわ！スカイにお任せ！」',
    description: 'ピンクのゴーグルをつけた愛くるしい瞳！ふんわり羽毛のように軽いフライングスクイーズ。',
    icon: '🛩️',
    hint: 'フライングわんこ型 ＋ パウ肉球トッピング ＋ スローエア通気コア',
    requiredMoldId: 'paw_skye',
  },
  {
    id: 'paw_badge',
    name: 'パウ・パトロール肉球バッジ',
    category: 'paw_patrol',
    categoryLabel: '🐾 パウパト風スクイーズ',
    characterName: 'チーム全員の友情と誇りのバッジ風',
    catchphrase: '「どんなトラブルも、パウ・パトロールならパウフェクト！」',
    description: 'ぷっくり肉球が中央にエンボスされた、隊員証のような輝くメタルシールドスクイーズ。',
    icon: '🐾',
    hint: '肉球バッジ型 ＋ わんこ鳴き笛 ＋ 純金箔パウダー',
    requiredMoldId: 'paw_badge',
  },

  // --- マリオ (Mario style) ---
  {
    id: 'mario_mushroom',
    name: 'でっかくなあれ！スーパー赤キノコ',
    category: 'mario',
    categoryLabel: '🍄 マリオ風スクイーズ',
    characterName: '食べたらパワーアップする伝説の赤いキノコ風',
    catchphrase: '「チャララララ〜ン！（巨大化パワーアップ！）」',
    description: '真っ赤なカサに大きな白水玉とつぶらな瞳！握ると1UPチャイムが鳴り響くスクイーズ。',
    icon: '🍄',
    hint: 'スーパー赤キノコ型 ＋ マリオスーパーレッド ＋ コイン・1UPチャイム',
    requiredMoldId: 'mario_mushroom',
  },
  {
    id: 'mario_star',
    name: '虹色に輝く無敵スーパースター',
    category: 'mario',
    categoryLabel: '🍄 マリオ風スクイーズ',
    characterName: '触れたら無敵になるキラキラ星風',
    catchphrase: '「テッテッテレッテッ♪ 無敵モード突入！」',
    description: '黄金イエローの五角星に縦長のつぶらな瞳！スーパーボールのように跳ねるハイパワーラバー。',
    icon: '⭐',
    hint: 'スーパースター型 ＋ 無敵スタースパークラバー ＋ スーパースターリズム',
    requiredMoldId: 'mario_star',
  },
  {
    id: 'mario_block',
    name: 'コイン飛び出すハテナブロック',
    category: 'mario',
    categoryLabel: '🍄 マリオ風スクイーズ',
    characterName: '下から突き上げるとコインが出るブロック風',
    catchphrase: '「チャリンッ！コインをたくさん集めよう！」',
    description: '四隅のリベットと白く浮き出る「？」マーク！押すたびにコインチャリン音が鳴り止まない！',
    icon: '❓',
    hint: 'ハテナブロック型 ＋ コイン・1UPチャイム ＋ 金箔パウダー',
    requiredMoldId: 'mario_block',
  },
  {
    id: 'mario_cap',
    name: '赤帽子とくるりんヒゲのヒーロー',
    category: 'mario',
    categoryLabel: '🍄 マリオ風スクイーズ',
    characterName: 'キノコ王国を救う赤い配管工ヒーロー風',
    catchphrase: '「It\'s-a me, Mario! マンマ・ミーア！」',
    description: '白丸に赤い「M」のエンブレムとダンディなくるりん黒ヒゲがついた大人気スクイーズ。',
    icon: '🧢',
    hint: '赤帽子とヒゲ型 ＋ ヒゲ＆Mマークエンブレム ＋ コインチャイム',
    requiredMoldId: 'mario_cap',
    requiredDecorationIds: ['prop_mario_mustache'],
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

  // Also check secondary flexible combos based on iconic character decorations
  if (decorationIds.includes('color_ichimatsu')) return SECRET_RECIPES.find(r => r.id === 'kimetsu_tanjiro') || null
  if (decorationIds.includes('prop_bamboo')) return SECRET_RECIPES.find(r => r.id === 'kimetsu_nezuko') || null
  if (decorationIds.includes('prop_furoshiki')) return SECRET_RECIPES.find(r => r.id === 'sumikko_shirokuma') || null
  if (decorationIds.includes('prop_teary_eyes')) return SECRET_RECIPES.find(r => r.id === 'chiikawa_teary') || null
  if (decorationIds.includes('prop_donguri_leaf')) return SECRET_RECIPES.find(r => r.id === 'ghibli_totoro') || null
  if (decorationIds.includes('prop_calcifer_wood')) return SECRET_RECIPES.find(r => r.id === 'ghibli_calcifer') || null
  if (decorationIds.includes('prop_kaonashi_gold')) return SECRET_RECIPES.find(r => r.id === 'ghibli_kaonashi') || null
  if (decorationIds.includes('prop_tiara') || decorationIds.includes('prop_glass_slipper')) return SECRET_RECIPES.find(r => r.id === 'princess_cinderella') || null
  if (decorationIds.includes('prop_enchanted_rose')) return SECRET_RECIPES.find(r => r.id === 'princess_belle') || null
  if (decorationIds.includes('prop_cure_heart_gem')) return SECRET_RECIPES.find(r => r.id === 'precure_heart') || null
  if (decorationIds.includes('prop_paw_police_hat')) return SECRET_RECIPES.find(r => r.id === 'paw_chase') || null
  if (decorationIds.includes('prop_paw_fire_helmet')) return SECRET_RECIPES.find(r => r.id === 'paw_marshall') || null
  if (decorationIds.includes('prop_mario_mustache')) return SECRET_RECIPES.find(r => r.id === 'mario_cap') || null

  return null
}
