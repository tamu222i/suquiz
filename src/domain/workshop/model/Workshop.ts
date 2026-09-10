import { Coin } from './Coin'
import { BASE_MATERIALS, SOUND_FILLINGS, type Mold } from '../../squishy/model/CraftMaterials'
import type { Squishy } from '../../squishy/model/Squishy'

export interface WorkshopProps {
  coins: Coin
  unlockedMoldIds: Set<string>
  unlockedMaterialIds: Set<string>
  unlockedFillingIds: Set<string>
  showroom: Squishy[]
  experience?: number
}

export class Workshop {
  private _coins: Coin
  private _unlockedMoldIds: Set<string>
  private _unlockedMaterialIds: Set<string>
  private _unlockedFillingIds: Set<string>
  private _showroom: Squishy[]
  private _experience: number

  constructor(props: WorkshopProps) {
    this._coins = props.coins
    this._unlockedMoldIds = new Set(props.unlockedMoldIds)
    this._unlockedMaterialIds = new Set(props.unlockedMaterialIds)
    this._unlockedFillingIds = new Set(props.unlockedFillingIds)
    this._showroom = [...props.showroom]
    this._experience = props.experience ?? 0
  }

  get coins(): Coin {
    return this._coins
  }

  get showroom(): ReadonlyArray<Squishy> {
    return this._showroom
  }

  get unlockedMoldIds(): ReadonlySet<string> {
    return this._unlockedMoldIds
  }

  get unlockedMaterialIds(): ReadonlySet<string> {
    return this._unlockedMaterialIds
  }

  get unlockedFillingIds(): ReadonlySet<string> {
    return this._unlockedFillingIds
  }

  get experience(): number {
    return this._experience
  }

  get level(): number {
    // Level 1 at 0 EXP, Level 2 at 100, Level 3 at 250, Level 4 at 500, Level 5 at 900+
    if (this._experience >= 900) return 5
    if (this._experience >= 500) return 4
    if (this._experience >= 250) return 3
    if (this._experience >= 100) return 2
    return 1
  }

  get rankTitle(): string {
    switch (this.level) {
      case 5:
        return '伝説の神の手マイスター'
      case 4:
        return 'ASMRカリスマ人気職人'
      case 3:
        return '行列のできる評判工房'
      case 2:
        return '一人前のスクイーズ作家'
      default:
        return '見習いぷにぷにクラフター'
    }
  }

  addExperience(exp: number): void {
    this._experience += exp
  }

  static createInitial(): Workshop {
    return new Workshop({
      coins: new Coin(100),
      // All 30 materials unlocked by default for rich 30x30 exploration!
      unlockedMaterialIds: new Set(BASE_MATERIALS.map(m => m.id)),
      // All 30 fillings unlocked by default!
      unlockedFillingIds: new Set(SOUND_FILLINGS.map(f => f.id)),
      // Standard and themed starter molds unlocked
      unlockedMoldIds: new Set([
        'melon_pan',
        'cat_bun',
        'ichimatsu_onigiri',
        'asanoha_bunny',
        'zenitsu_sparrow',
        'sumikko_polar',
        'sumikko_lizard',
        'fried_shrimp',
        'chiikawa_teary',
        'hachiware_cat',
        'usagi_rabbit',
        'fluffy_donut',
        // Ghibli starters
        'ghibli_totoro',
        'ghibli_kurosuke',
        // Disney Princess starter
        'princess_cinderella',
        // Precure starter
        'precure_heart',
        // PAW Patrol starter
        'paw_chase',
        // Mario starter
        'mario_mushroom',
      ]),
      showroom: [],
      experience: 0,
    })
  }

  isMoldUnlocked(moldId: string): boolean {
    return this._unlockedMoldIds.has(moldId)
  }

  isMaterialUnlocked(materialId: string): boolean {
    return this._unlockedMaterialIds.has(materialId)
  }

  isFillingUnlocked(fillingId: string): boolean {
    return this._unlockedFillingIds.has(fillingId)
  }

  addCoins(amount: number): void {
    this._coins = this._coins.add(amount)
  }

  spendCoins(amount: number): void {
    this._coins = this._coins.subtract(amount)
  }

  unlockMold(mold: Mold): void {
    if (this.isMoldUnlocked(mold.id)) {
      return
    }
    this.spendCoins(mold.unlockCost)
    this._unlockedMoldIds.add(mold.id)
  }

  addCraftedSquishy(squishy: Squishy): void {
    // Avoid duplicate entries if already added
    const exists = this._showroom.some((s) => s.id.value === squishy.id.value)
    if (!exists) {
      this._showroom.push(squishy)
    }
  }

  removeCraftedSquishy(idValue: string): void {
    this._showroom = this._showroom.filter((s) => s.id.value !== idValue)
  }

  hasSquishyInShowroom(idValue: string): boolean {
    return this._showroom.some((s) => s.id.value === idValue)
  }

  renameCraftedSquishy(idValue: string, newName: string): void {
    const target = this._showroom.find((s) => s.id.value === idValue)
    if (target) {
      target.name = newName.trim() || target.name
    }
  }
}
