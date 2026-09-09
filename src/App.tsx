import React, { useState, useMemo } from 'react'
import './App.css'
import { useWorkshopGame } from './presentation/hooks/useWorkshopGame'
import { SquishyToy } from './presentation/components/SquishyToy'
import { WebAudioAsmrPlayer } from './infrastructure/sound/WebAudioAsmrPlayer'
import {
  BASE_MATERIALS,
  SOUND_FILLINGS,
  MOLDS,
  DECORATIONS,
} from './domain/squishy/model/CraftMaterials'
import { SECRET_RECIPES } from './domain/squishy/model/SecretRecipes'
import type { SecretRecipe } from './domain/squishy/model/SecretRecipes'
import confetti from 'canvas-confetti'

export function App() {
  const game = useWorkshopGame()
  const soundPlayer = useMemo(() => new WebAudioAsmrPlayer(), [])

  const [squishyName, setSquishyName] = useState('とっておきのスクイーズ')
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [saveFlashMessage, setSaveFlashMessage] = useState<string | null>(null)
  const [editingSquishyId, setEditingSquishyId] = useState<string | null>(null)
  const [renameInputValue, setRenameInputValue] = useState('')
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<'all' | 'kimetsu' | 'sumikko' | 'chiikawa'>('all')
  const [gridMode, setGridMode] = useState<'grid' | 'list'>('grid')

  // Handle touch unlock for mobile browsers
  const handleInteraction = () => {
    soundPlayer.unlockAudio()
  }

  // Sound Preview Helper
  const previewSound = (e: React.MouseEvent, soundFillingId: string) => {
    e.stopPropagation()
    const filling = SOUND_FILLINGS.find((f) => f.id === soundFillingId)
    if (filling) {
      soundPlayer.playSquish({
        soundType: filling.soundProfile.soundType,
        volume: 0.9,
        pitch: filling.soundProfile.pitch,
        crackleCount: Math.max(3, Math.round(filling.soundProfile.crackleRate * 8)),
      })
    }
  }

  // Handle Delivery
  const handleDeliver = (orderId: string) => {
    game.deliverActiveSquishy(orderId)
    setShowDeliveryModal(true)
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
    })
  }

  // Handle Manual Save to Showroom
  const handleManualSaveToShowroom = () => {
    if (!game.activeSquishy) return
    const success = game.saveActiveSquishyToShowroom()
    if (success) {
      setSaveFlashMessage('🎉 ショールームに保存しました！工房EXP+30獲得！')
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      })
    } else {
      setSaveFlashMessage('✓ このスクイーズはすでにショールームに保存されています')
    }
    setTimeout(() => setSaveFlashMessage(null), 3500)
  }

  // Handle Calling a New Customer
  const handleCallNewCustomer = () => {
    const newOrder = game.requestNewCustomerOrder()
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.5 },
    })
    setSaveFlashMessage(`🔔 カランコロン♪ 新しいお客さん（${newOrder.requirement.customerName}さん）が来店しました！`)
    setTimeout(() => setSaveFlashMessage(null), 3500)
  }

  // Apply recipe preset directly
  const handleApplyRecipe = (recipe: SecretRecipe) => {
    game.applySecretRecipePreset(recipe)
    setSquishyName(recipe.name)
    game.navigateTo('craft')
    setActiveStep(4)
    setSaveFlashMessage(`🧪「${recipe.name}」の配合素材を作業台にセットしました！`)
    setTimeout(() => setSaveFlashMessage(null), 3500)
  }

  // Finish crafting with celebration if secret recipe found
  const handleFinishCrafting = () => {
    game.finishCrafting(squishyName)
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Sound name label helper
  const getSoundLabel = (type: string) => {
    switch (type) {
      case 'air_slow':
        return '🌬️ スローエア（シュワ〜っと抜ける低反発音）'
      case 'crunch_beads':
        return '🥣 クランチビーズ（サクサク・シャリシャリ音）'
      case 'popping_candy':
        return '💥 パチパチキャンディ（パチパチ弾ける音）'
      case 'slime_gel':
        return '💧 スライムジェル（むにゅっ・ぽちゃ音）'
      case 'squeak_toy':
        return '🐥 ピヨピヨ笛（キュッ！と鳴るトイ音）'
      case 'soda_fizz':
        return '🫧 炭酸ソーダ（シュワシュワ爽快音）'
      case 'mochi_dango':
        return '🍡 おもち団子（ぽにゅっ・むちむち音）'
      case 'caramel_crust':
        return '🍮 キャラメルクラスト（パリッサクッ音）'
      case 'bell_charm':
        return '🔔 鈴チャーム（チリンチリン癒やし音）'
      case 'cat_purr':
        return '🐾 猫ゴロゴロ（心地よい低周波ゴロゴロ音）'
      default:
        return '無音'
    }
  }

  const expProgress = (game.workshop.experience % 100)
  const isSavedInShowroom = game.isCurrentSquishyInShowroom()

  return (
    <div className="app-container" onPointerDown={handleInteraction}>
      {/* Header */}
      <header className="glass-card app-header">
        <div className="logo-group">
          <span className="logo-icon">🧸</span>
          <div>
            <h1 className="logo-title">ぷにぷに工房</h1>
            <div className="logo-subtitle">〜 スクイーズASMRクラフトショップ 〜</div>
          </div>
        </div>

        <div className="header-status-group">
          {/* Rank & Level Badge */}
          <div className="rank-badge">
            <span>{game.workshop.rankTitle}</span>
            <span style={{ fontWeight: 800 }}>Lv.{game.workshop.level}</span>
            <div style={{ width: 60, height: 6, background: '#dcfce7', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${expProgress}%`, height: '100%', background: '#22c55e' }} />
            </div>
            <span style={{ fontSize: 11, color: '#15803d' }}>{expProgress}/100</span>
          </div>

          {/* Coins */}
          <div className="coin-badge">
            <span>🪙</span>
            <span>{game.workshop.coins.value} コイン</span>
          </div>
        </div>
      </header>

      {/* Global Notification Banner */}
      {saveFlashMessage && (
        <div
          style={{
            background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: 12,
            marginBottom: 16,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'popIn 0.3s ease-out',
          }}
        >
          <span>{saveFlashMessage}</span>
          <button
            onClick={() => setSaveFlashMessage(null)}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="glass-card nav-tabs">
        <button
          className={`nav-tab-btn ${game.currentScreen === 'orders' ? 'active' : ''}`}
          onClick={() => game.navigateTo('orders')}
        >
          <span>📋</span>
          <span>注文 ({game.orders.filter((o) => o.status === 'pending').length})</span>
        </button>
        <button
          className={`nav-tab-btn ${game.currentScreen === 'craft' ? 'active' : ''}`}
          onClick={() => game.navigateTo('craft')}
        >
          <span>🧪</span>
          <span>スクイーズ調合台</span>
        </button>
        <button
          className={`nav-tab-btn ${game.currentScreen === 'inspect' ? 'active' : ''}`}
          onClick={() => game.navigateTo('inspect')}
          disabled={!game.activeSquishy}
          style={{ opacity: game.activeSquishy ? 1 : 0.5 }}
        >
          <span>✨</span>
          <span>ASMRプレイ＆検査</span>
        </button>
        <button
          className={`nav-tab-btn ${game.currentScreen === 'showroom' ? 'active' : ''}`}
          onClick={() => game.navigateTo('showroom')}
        >
          <span>🏆</span>
          <span>ショールーム ({game.workshop.showroom.length})</span>
        </button>
        <button
          className={`nav-tab-btn ${game.currentScreen === 'shop' ? 'active' : ''}`}
          onClick={() => game.navigateTo('shop')}
        >
          <span>📖</span>
          <span>ひみつのレシピ手帳</span>
        </button>
        <button
          className={`nav-tab-btn ${game.currentScreen === 'shop' ? 'active' : ''}`}
          onClick={() => game.navigateTo('shop')}
        >
          <span>🛒</span>
          <span>工房ショップ</span>
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main>
        {/* SCREEN 1: ORDERS (EXTENDED GAMEPLAY) */}
        {game.currentScreen === 'orders' && (
          <div className="glass-card panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 className="panel-title" style={{ margin: 0 }}>
                  <span>📋</span>
                  <span>届いているオーダー一覧 ({game.orders.length}件)</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: 13 }}>
                  3つクリアしても終わりません！ストーリー注文をこなし、いつでも新しいお客さんを呼び出せます。
                </p>
              </div>

              {/* Call Customer Bell Button */}
              <button
                className="btn-primary"
                onClick={handleCallNewCustomer}
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '10px 20px', fontSize: 14 }}
              >
                <span>🔔</span>
                <span>呼び鈴を鳴らす（新しいお客さんを呼ぶ）</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {game.orders.map((order) => {
                const targetMold = MOLDS.find((m) => m.id === order.requirement.targetMoldId)
                const isCompleted = order.status === 'completed'

                return (
                  <div
                    key={order.id.value}
                    className="glass-card"
                    style={{
                      padding: 18,
                      border: isCompleted ? '2px solid #86efac' : '2px solid #fbcfe8',
                      background: isCompleted ? '#f0fdf4' : '#ffffff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 14,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 20 }}>👤</span>
                        <strong style={{ fontSize: 16 }}>{order.requirement.customerName}</strong>
                        {isCompleted ? (
                          <span style={{ fontSize: 12, background: '#bbf7d0', color: '#166534', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                            ✓ 納品済み (スコア: {order.finalScore}点)
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, background: '#fef08a', color: '#854d0e', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                            受付中
                          </span>
                        )}
                      </div>
                      <p style={{ fontStyle: 'italic', color: '#4b5563', margin: '6px 0 10px', background: '#f9fafb', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
                        「{order.requirement.dialogue}」
                      </p>
                      <div style={{ display: 'flex', gap: 12, fontSize: 13, color: '#6b7280', flexWrap: 'wrap' }}>
                        <span>希望の型: <strong>{targetMold?.name ?? order.requirement.targetMoldId}</strong></span>
                        {order.requirement.preferredSoundType && (
                          <span>希望の音: <strong>{getSoundLabel(order.requirement.preferredSoundType)}</strong></span>
                        )}
                        <span style={{ color: '#d97706', fontWeight: 700 }}>報酬: 🪙 {order.requirement.rewardCoins}</span>
                      </div>
                    </div>

                    <div>
                      {!isCompleted ? (
                        <button
                          className="btn-primary"
                          onClick={() => {
                            game.startCraftingForOrder(order.id.value)
                            setActiveStep(1)
                          }}
                        >
                          <span>🛠️</span>
                          <span>この注文を作る</span>
                        </button>
                      ) : (
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            game.startCraftingForOrder(order.id.value)
                            setActiveStep(1)
                          }}
                        >
                          <span>🔄 もう一度作る</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* SCREEN 2: CRAFT TABLE (10x10x10 MATERIAL GRID) */}
        {game.currentScreen === 'craft' && (
          <div className="glass-card panel">
            {/* Header with Step Switcher & Display Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 className="panel-title" style={{ margin: 0 }}>
                  <span>🧪</span>
                  <span>スクイーズ調合台（10×10×10 素材マトリクス）</span>
                </h2>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  主剤10種 × ASMRフィリング10種 × モールド11種 × 装飾12種以上から自由に調合！
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setGridMode(gridMode === 'grid' ? 'list' : 'grid')}
                  style={{ padding: '6px 12px', fontSize: 12 }}
                >
                  {gridMode === 'grid' ? '📋 リスト表示' : '🔲 グリッド表示 (10x10)'}
                </button>

                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { step: 1, label: '1.主剤' },
                    { step: 2, label: '2.音素材' },
                    { step: 3, label: '3.型' },
                    { step: 4, label: '4.仕上げ' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step as any)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        border: 'none',
                        background: activeStep === s.step ? 'var(--primary)' : '#e5e7eb',
                        color: activeStep === s.step ? '#fff' : '#4b5563',
                        fontWeight: 800,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Themed Recipe Presets Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #fff1f2 0%, #fef2f2 50%, #eff6ff 100%)',
                border: '1px solid #fecdd3',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 13, color: '#be123c', marginBottom: 8 }}>
                <span>✨</span>
                <span>こだわりの組み合わせ！かわいい人気キャラ風スクイーズの配合レシピ</span>
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {SECRET_RECIPES.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => handleApplyRecipe(recipe)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #fbcfe8',
                      padding: '6px 12px',
                      borderRadius: 16,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#4b5563',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span>{recipe.icon}</span>
                    <span>{recipe.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 1: BASE MATERIAL (10 TYPES) */}
            {activeStep === 1 && (
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 4, color: 'var(--primary)' }}>
                  ステップ 1: ベースウレタン主剤の選択（全10種）
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                  柔らかさ・低反発の復元遅延・弾性を決定する核となるベース素材です。
                </p>

                <div className={gridMode === 'grid' ? 'material-grid-10' : 'selection-list'}>
                  {BASE_MATERIALS.map((mat) => {
                    const isSelected = game.craftingSession.baseMaterialId === mat.id
                    return (
                      <div
                        key={mat.id}
                        className={`selection-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => game.selectBaseMaterial(mat.id)}
                      >
                        <div style={{ flex: 1, paddingRight: 8 }}>
                          <strong style={{ fontSize: 14 }}>{mat.name}</strong>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                            柔 {Math.round(mat.tactileProperty.softness * 100)}% | 復元 {Math.round(mat.tactileProperty.slowRisingRate * 100)}% | 弾 {Math.round(mat.tactileProperty.elasticity * 100)}%
                          </div>
                        </div>
                        <span style={{ fontSize: 20 }}>{isSelected ? '✅' : '⚪'}</span>
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: 24, textAlign: 'right' }}>
                  <button className="btn-primary" onClick={() => setActiveStep(2)}>
                    <span>次へ: サウンド素材選択（10種）🔊</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SOUND FILLINGS (10 ASMR SOUND TYPES) */}
            {activeStep === 2 && (
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 4, color: 'var(--primary)' }}>
                  ステップ 2: ASMRサウンド特殊フィリング配合（全10種）🔊
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                  スクイーズを押した瞬間に響く特殊ビーズ・炭酸パウダー・鈴チャーム等を配合します！
                </p>

                <div className={gridMode === 'grid' ? 'material-grid-10' : 'selection-list'}>
                  {/* Empty Option */}
                  <div
                    className={`selection-card ${!game.craftingSession.soundFillingId ? 'selected' : ''}`}
                    onClick={() => game.selectSoundFilling(undefined)}
                  >
                    <div>
                      <strong style={{ fontSize: 14 }}>🍃 フィリングなし</strong>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                        自然なウレタンの空気抜き音
                      </div>
                    </div>
                    <span style={{ fontSize: 20 }}>{!game.craftingSession.soundFillingId ? '✅' : '⚪'}</span>
                  </div>

                  {SOUND_FILLINGS.map((filling) => {
                    const isSelected = game.craftingSession.soundFillingId === filling.id
                    return (
                      <div
                        key={filling.id}
                        className={`selection-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => game.selectSoundFilling(filling.id)}
                      >
                        <div style={{ flex: 1, paddingRight: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong style={{ fontSize: 14 }}>{filling.name}</strong>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            {getSoundLabel(filling.soundProfile.soundType).split('（')[0]}
                          </div>
                          <button
                            type="button"
                            className="btn-sound-preview"
                            style={{ marginTop: 6 }}
                            onClick={(e) => previewSound(e, filling.id)}
                          >
                            <span>🔊 試聴</span>
                          </button>
                        </div>
                        <span style={{ fontSize: 20 }}>{isSelected ? '✅' : '⚪'}</span>
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn-secondary" onClick={() => setActiveStep(1)}>
                    戻る
                  </button>
                  <button className="btn-primary" onClick={() => setActiveStep(3)}>
                    <span>次へ: 型（モールド）選択 🧁</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MOLD SELECTION (10+ TYPES INCL. THEMED MOLDS) */}
            {activeStep === 3 && (
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 4, color: 'var(--primary)' }}>
                  ステップ 3: 成形モールド型の選択（全11種）
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                  鬼滅風・すみっコ風・ちいかわ風や定番パンケーキなど、好きな形を選んで流し込みます。
                </p>

                <div className={gridMode === 'grid' ? 'material-grid-10' : 'selection-list'}>
                  {MOLDS.map((mold) => {
                    const isUnlocked = game.workshop.isMoldUnlocked(mold.id)
                    const isSelected = game.craftingSession.moldId === mold.id

                    return (
                      <div
                        key={mold.id}
                        className={`selection-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
                        onClick={() => {
                          if (isUnlocked) game.selectMold(mold.id)
                        }}
                      >
                        <div style={{ flex: 1, paddingRight: 6 }}>
                          <strong style={{ fontSize: 14 }}>
                            {mold.name}
                          </strong>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                            {mold.description}
                          </div>
                        </div>
                        <span style={{ fontSize: 20 }}>
                          {!isUnlocked ? '🔒' : isSelected ? '✅' : '⚪'}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn-secondary" onClick={() => setActiveStep(2)}>
                    戻る
                  </button>
                  <button className="btn-primary" onClick={() => setActiveStep(4)}>
                    <span>次へ: デコレーション＆完成 ✨</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DECORATION & FINISH */}
            {activeStep === 4 && (
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 4, color: 'var(--primary)' }}>
                  ステップ 4: デコレーション・特別パーツ・命名（全12種以上）
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                  竹筒マズルや風呂敷包み、うるうる涙、ソースやラメを自由にトッピング！
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10, marginBottom: 24 }}>
                  {DECORATIONS.map((deco) => {
                    const isSelected = game.craftingSession.decorationIds.includes(deco.id)
                    return (
                      <div
                        key={deco.id}
                        className={`selection-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => game.toggleDecoration(deco.id)}
                        style={{ padding: 10 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 22 }}>{deco.icon}</span>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{deco.name}</span>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                              {deco.type === 'color' ? 'カラー' : deco.type === 'sauce' ? 'ソース' : deco.type === 'prop' ? 'キャラクター小道具' : 'トッピング'}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: 18 }}>{isSelected ? '✅' : '➕'}</span>
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginBottom: 24, background: '#f9fafb', padding: 16, borderRadius: 12 }}>
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: 8, fontSize: 14 }}>
                    スクイーズの名前を決めよう:
                  </label>
                  <input
                    type="text"
                    value={squishyName}
                    onChange={(e) => setSquishyName(e.target.value)}
                    placeholder="スクイーズの名前"
                    style={{
                      width: '100%',
                      maxWidth: 420,
                      padding: '10px 16px',
                      borderRadius: 10,
                      border: '2px solid #e5e7eb',
                      fontSize: 16,
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <button className="btn-secondary" onClick={() => setActiveStep(3)}>
                    戻る
                  </button>
                  <button
                    className="btn-primary"
                    style={{ padding: '16px 36px', fontSize: 17 }}
                    onClick={handleFinishCrafting}
                  >
                    <span>🎉 成形して完成！ASMRで遊ぶ</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 3: INSPECT & ASMR PLAY */}
        {game.currentScreen === 'inspect' && game.activeSquishy && (
          <div className="glass-card panel">
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 className="panel-title" style={{ margin: 0 }}>
                    <span>✨</span>
                    <span>{game.activeSquishy.name}</span>
                  </h2>
                  {game.activeSquishy.secretRecipe && (
                    <span style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                      {game.activeSquishy.secretRecipe.icon} {game.activeSquishy.secretRecipe.name}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                  {getSoundLabel(game.activeSquishy.soundProfile.soundType)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {/* MANUAL SAVE TO SHOWROOM BUTTON */}
                <button
                  className={isSavedInShowroom ? 'btn-secondary' : 'btn-save-showroom'}
                  onClick={handleManualSaveToShowroom}
                >
                  <span>{isSavedInShowroom ? '✓' : '💾'}</span>
                  <span>{isSavedInShowroom ? 'ショールーム展示中' : 'いつでもショールームに保存'}</span>
                </button>

                {/* Delivery Action Button if Order is matched */}
                {game.selectedOrderId && (
                  <button
                    className="btn-primary"
                    onClick={() => handleDeliver(game.selectedOrderId!)}
                  >
                    <span>📦 このスクイーズを納品する！</span>
                  </button>
                )}
              </div>
            </div>

            {/* Secret Recipe Discovery Banner */}
            {game.newlyDiscoveredRecipe && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)',
                  border: '2px solid #f472b6',
                  borderRadius: 14,
                  padding: '16px 20px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(244, 114, 182, 0.25)',
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#be185d' }}>
                    🎊 ひみつの配合を発見！「{game.newlyDiscoveredRecipe.name}」
                  </div>
                  <div style={{ fontSize: 13, color: '#4b5563', marginTop: 4 }}>
                    {game.newlyDiscoveredRecipe.description}（レシピ手帳に記録されました）
                  </div>
                </div>
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: 12 }}
                  onClick={() => game.dismissNewlyDiscovered()}
                >
                  OK
                </button>
              </div>
            )}

            <div className="grid-2">
              {/* Interactive Squishy Stage */}
              <div className="inspection-stage">
                <SquishyToy
                  squishy={game.activeSquishy}
                  soundPlayer={soundPlayer}
                  size={260}
                />
              </div>

              {/* Tactile & Acoustic Properties Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="glass-card" style={{ padding: 18, background: '#ffffff' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: 15, color: 'var(--primary)' }}>
                    📊 触感ステータス
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>柔らかさ (Softness)</span>
                        <strong>{Math.round(game.activeSquishy.tactileProperty.softness * 100)}%</strong>
                      </div>
                      <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${game.activeSquishy.tactileProperty.softness * 100}%`, height: '100%', background: '#f43f5e' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>復元遅延 (Slow-Rising)</span>
                        <strong>{Math.round(game.activeSquishy.tactileProperty.slowRisingRate * 100)}%</strong>
                      </div>
                      <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${game.activeSquishy.tactileProperty.slowRisingRate * 100}%`, height: '100%', background: '#a855f7' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>弾性 (Elasticity)</span>
                        <strong>{Math.round(game.activeSquishy.tactileProperty.elasticity * 100)}%</strong>
                      </div>
                      <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${game.activeSquishy.tactileProperty.elasticity * 100}%`, height: '100%', background: '#3b82f6' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: 18, background: '#ffffff' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: 15, color: '#4338ca' }}>
                    🎧 ASMR音響プロファイル
                  </h4>
                  <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
                    {getSoundLabel(game.activeSquishy.soundProfile.soundType)}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                    マウスや指でぎゅーっと押すほど、音量と心地よいASMRノイズがダイナミックに変化します。
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      game.startCrafting()
                      setActiveStep(1)
                    }}
                  >
                    別のスクイーズを作る
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => game.navigateTo('showroom')}
                  >
                    ショールームを見る
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: SHOWROOM (VIEW & MANAGE SAVED SQUISHIES) */}
        {game.currentScreen === 'showroom' && (
          <div className="glass-card panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 className="panel-title" style={{ margin: 0 }}>
                  <span>🏆</span>
                  <span>工房コレクション・ショールーム ({game.workshop.showroom.length}個)</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: 13 }}>
                  いつでも保存できる自慢の作品コレクション。タップして心ゆくまでぷにぷに鑑賞できます！
                </p>
              </div>

              <button
                className="btn-primary"
                onClick={() => {
                  game.startCrafting()
                  setActiveStep(1)
                }}
              >
                <span>➕</span>
                <span>新しいスクイーズを作る</span>
              </button>
            </div>

            {game.workshop.showroom.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: 52 }}>🧁</span>
                <p style={{ marginTop: 14, fontSize: 15 }}>まだショールームにスクイーズがありません。</p>
                <p style={{ fontSize: 13 }}>スクイーズ調合台で作って「いつでもショールームに保存」を押すとコレクションに追加されます！</p>
                <button
                  className="btn-primary"
                  style={{ marginTop: 16 }}
                  onClick={() => {
                    game.startCrafting()
                    setActiveStep(1)
                  }}
                >
                  スクイーズを作りに行く
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {game.workshop.showroom.map((squishy) => (
                  <div
                    key={squishy.id.value}
                    className="glass-card"
                    style={{
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: '#ffffff',
                      borderRadius: 16,
                      border: '2px solid #f3f4f6',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {/* Secret badge */}
                    {squishy.secretRecipe && (
                      <div style={{ alignSelf: 'flex-start', background: '#fdf2f8', color: '#db2777', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
                        {squishy.secretRecipe.icon} {squishy.secretRecipe.name}
                      </div>
                    )}

                    <div onClick={() => game.setActiveSquishy(squishy)} style={{ cursor: 'pointer' }}>
                      <SquishyToy
                        squishy={squishy}
                        soundPlayer={soundPlayer}
                        size={170}
                        interactive={false}
                      />
                    </div>

                    {/* Renaming or Title */}
                    {editingSquishyId === squishy.id.value ? (
                      <div style={{ display: 'flex', gap: 6, width: '100%', marginTop: 8 }}>
                        <input
                          type="text"
                          value={renameInputValue}
                          onChange={(e) => setRenameInputValue(e.target.value)}
                          style={{ flex: 1, padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                        />
                        <button
                          className="btn-primary"
                          style={{ padding: '4px 8px', fontSize: 12 }}
                          onClick={() => {
                            if (renameInputValue.trim()) {
                              game.renameSquishyInShowroom(squishy.id.value, renameInputValue.trim())
                            }
                            setEditingSquishyId(null)
                          }}
                        >
                          保存
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                        <strong style={{ fontSize: 15 }}>{squishy.name}</strong>
                        <button
                          onClick={() => {
                            setEditingSquishyId(squishy.id.value)
                            setRenameInputValue(squishy.name)
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#9ca3af' }}
                          title="名前を変更"
                        >
                          ✏️
                        </button>
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                      {getSoundLabel(squishy.soundProfile.soundType).split('（')[0]}
                    </div>

                    <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 12 }}>
                      <button
                        className="btn-secondary"
                        style={{ flex: 1, padding: '6px 10px', fontSize: 12 }}
                        onClick={() => game.setActiveSquishy(squishy)}
                      >
                        👆 ぷにぷにする
                      </button>
                      <button
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}
                        onClick={() => {
                          if (confirm(`「${squishy.name}」をショールームから片付けますか？`)) {
                            game.removeSquishyFromShowroom(squishy.id.value)
                          }
                        }}
                        title="ショールームから片付ける"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SCREEN 5: RECIPE BOOK (HINT & FORMULAS) */}
        {game.currentScreen === 'shop' && (
          <div className="glass-card panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 className="panel-title" style={{ margin: 0 }}>
                  <span>📖</span>
                  <span>ひみつのレシピ手帳 ＆ 工房ショップ</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: 13 }}>
                  鬼滅・すみっコ・ちいかわ風スクイーズの配合レシピ。組み合わせると特別なスクイーズが誕生！
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { id: 'all', label: 'すべて' },
                  { id: 'kimetsu', label: '🔥 鬼滅風' },
                  { id: 'sumikko', label: '🐻‍❄️ すみっコ風' },
                  { id: 'chiikawa', label: '🥺 ちいかわ風' },
                ].map((f) => (
                  <button
                    key={f.id}
                    className={`nav-tab-btn ${recipeCategoryFilter === f.id ? 'active' : ''}`}
                    onClick={() => setRecipeCategoryFilter(f.id as any)}
                    style={{ padding: '6px 12px', fontSize: 12, minWidth: 'auto' }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 36 }}>
              {SECRET_RECIPES.filter((r) => recipeCategoryFilter === 'all' || r.category === recipeCategoryFilter).map((recipe) => {
                const isDiscovered = game.discoveredRecipeIds.includes(recipe.id)
                const moldName = MOLDS.find((m) => m.id === recipe.requiredMoldId)?.name
                const baseName = BASE_MATERIALS.find((b) => b.id === recipe.requiredBaseMaterialId)?.name
                const soundName = SOUND_FILLINGS.find((s) => s.id === recipe.requiredSoundFillingId)?.name

                return (
                  <div
                    key={recipe.id}
                    className={`recipe-card ${isDiscovered ? 'discovered' : ''}`}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 24 }}>{recipe.icon}</span>
                          <strong style={{ fontSize: 16 }}>{recipe.name}</strong>
                        </div>
                        {isDiscovered ? (
                          <span style={{ fontSize: 11, background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                            ★ 発見済み
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 10 }}>
                            未発見
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: 12, color: '#4b5563', margin: '4px 0 12px', lineHeight: 1.5 }}>
                        {recipe.description}
                      </p>

                      <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: '#374151', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div><strong>型:</strong> {moldName}</div>
                        <div><strong>主剤:</strong> {baseName}</div>
                        <div><strong>音フィリング:</strong> {soundName}</div>
                        <div><strong>ヒント:</strong> {recipe.hint}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 14 }}>
                      <button
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px', fontSize: 13 }}
                        onClick={() => handleApplyRecipe(recipe)}
                      >
                        <span>🧪 この配合を作業台にセットする</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Shop Molds Section */}
            <h3 style={{ fontSize: 17, margin: '24px 0 12px', color: 'var(--text-main)', borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
              🛒 工房ショップ（型のアンロック）
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {MOLDS.map((mold) => {
                const isUnlocked = game.workshop.isMoldUnlocked(mold.id)
                const canAfford = game.workshop.coins.value >= mold.unlockCost

                return (
                  <div
                    key={mold.id}
                    className="glass-card"
                    style={{
                      padding: 18,
                      background: '#ffffff',
                      border: isUnlocked ? '2px solid #86efac' : '2px solid #e5e7eb',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 14,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: 15 }}>{mold.name}</strong>
                        {isUnlocked && <span style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>✓ 解放済み</span>}
                      </div>
                      <p style={{ fontSize: 12, color: '#4b5563', margin: '6px 0 14px' }}>
                        {mold.description}
                      </p>
                    </div>

                    <div>
                      {isUnlocked ? (
                        <button
                          className="btn-secondary"
                          style={{ width: '100%' }}
                          onClick={() => {
                            game.startCrafting(mold.id)
                            setActiveStep(1)
                          }}
                        >
                          この型で作る
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          style={{
                            width: '100%',
                            opacity: canAfford ? 1 : 0.6,
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                          }}
                          disabled={!canAfford}
                          onClick={() => game.unlockMold(mold)}
                        >
                          <span>🪙 {mold.unlockCost} コインで解放</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* DELIVERY EVALUATION RESULT MODAL */}
      {showDeliveryModal && game.lastDeliveryResult && (
        <div className="modal-backdrop" onClick={() => setShowDeliveryModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 48 }}>🎉</span>
              <h3 style={{ fontSize: 22, margin: '8px 0' }}>納品完了！</h3>
              <div style={{ fontSize: 34, fontWeight: 900, color: 'var(--primary)', margin: '10px 0' }}>
                スコア: {game.lastDeliveryResult.totalScore} 点
              </div>

              {/* Feedback Dialogue */}
              <div
                style={{
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                  borderRadius: 12,
                  padding: '14px 18px',
                  color: '#9f1239',
                  fontStyle: 'italic',
                  margin: '14px 0',
                  fontSize: 14,
                }}
              >
                {game.lastDeliveryResult.feedback}
              </div>

              {/* Score Breakdown */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '12px 0',
                  borderTop: '1px solid #f3f4f6',
                  borderBottom: '1px solid #f3f4f6',
                  fontSize: 13,
                  color: '#4b5563',
                }}
              >
                <div>見た目: <strong>{game.lastDeliveryResult.appearanceScore}点</strong></div>
                <div>ASMR音: <strong>{game.lastDeliveryResult.soundScore}点</strong></div>
                <div>触感: <strong>{game.lastDeliveryResult.tactileScore}点</strong></div>
              </div>

              {/* Coins Earned */}
              <div
                style={{
                  margin: '16px 0',
                  fontSize: 17,
                  fontWeight: 800,
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>🪙</span>
                <span>+{game.lastDeliveryResult.earnedCoins} コイン獲得！</span>
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setShowDeliveryModal(false)
                  game.navigateTo('orders')
                }}
              >
                次の注文を受ける
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
