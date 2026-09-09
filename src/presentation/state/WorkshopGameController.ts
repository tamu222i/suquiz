import { Workshop } from '../../domain/workshop/model/Workshop'
import { Order, INITIAL_ORDERS, generateRandomCustomerOrder } from '../../domain/order/model/Order'
import { OrderId } from '../../domain/order/model/OrderId'
import type { Squishy } from '../../domain/squishy/model/Squishy'
import type { Mold } from '../../domain/squishy/model/CraftMaterials'
import type { SecretRecipe } from '../../domain/squishy/model/SecretRecipes'
import { CraftSquishyUseCase } from '../../application/CraftSquishyUseCase'
import { DeliverOrderUseCase } from '../../application/DeliverOrderUseCase'
import { SquishyScorer } from '../../domain/squishy/service/SquishyScorer'
import type { OrderEvaluationResult } from '../../domain/squishy/service/SquishyScorer'

export type ScreenType = 'orders' | 'craft' | 'inspect' | 'showroom' | 'shop'

export interface CraftingSessionState {
  moldId: string
  baseMaterialId: string
  soundFillingId?: string
  decorationIds: string[]
}

export interface WorkshopGameState {
  workshop: Workshop
  orders: Order[]
  currentScreen: ScreenType
  activeSquishy: Squishy | null
  craftingSession: CraftingSessionState
  selectedOrderId: string | null
  lastDeliveryResult: OrderEvaluationResult | null
  discoveredRecipeIds: string[]
  newlyDiscoveredRecipe: SecretRecipe | null
}

export class WorkshopGameController {
  private workshop: Workshop
  private orders: Order[]
  private currentScreen: ScreenType
  private activeSquishy: Squishy | null
  private craftingSession: CraftingSessionState
  private selectedOrderId: string | null
  private lastDeliveryResult: OrderEvaluationResult | null
  private discoveredRecipeIds: Set<string>
  private newlyDiscoveredRecipe: SecretRecipe | null

  private readonly craftUseCase: CraftSquishyUseCase
  private readonly deliverUseCase: DeliverOrderUseCase
  private listeners: Set<() => void>

  constructor() {
    this.workshop = Workshop.createInitial()
    this.orders = INITIAL_ORDERS.map(
      (req, i) => new Order({ id: new OrderId(`order_${i + 1}`), requirement: req })
    )
    this.currentScreen = 'orders'
    this.activeSquishy = null
    this.craftingSession = {
      moldId: 'melon_pan',
      baseMaterialId: 'memory_foam',
      soundFillingId: 'air_slow_valve',
      decorationIds: [],
    }
    this.selectedOrderId = null
    this.lastDeliveryResult = null
    this.discoveredRecipeIds = new Set<string>()
    this.newlyDiscoveredRecipe = null

    this.craftUseCase = new CraftSquishyUseCase()
    this.deliverUseCase = new DeliverOrderUseCase(new SquishyScorer())
    this.listeners = new Set()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener()
    }
  }

  getState(): WorkshopGameState {
    return {
      workshop: this.workshop,
      orders: this.orders,
      currentScreen: this.currentScreen,
      activeSquishy: this.activeSquishy,
      craftingSession: { ...this.craftingSession },
      selectedOrderId: this.selectedOrderId,
      lastDeliveryResult: this.lastDeliveryResult,
      discoveredRecipeIds: Array.from(this.discoveredRecipeIds),
      newlyDiscoveredRecipe: this.newlyDiscoveredRecipe,
    }
  }

  navigateTo(screen: ScreenType): void {
    this.currentScreen = screen
    this.notify()
  }

  startCraftingForOrder(orderId: string): void {
    const order = this.orders.find((o) => o.id.value === orderId)
    if (order) {
      this.selectedOrderId = orderId
      // Pre-fill session with requirements
      this.craftingSession = {
        moldId: order.requirement.targetMoldId,
        baseMaterialId: this.craftingSession.baseMaterialId || 'memory_foam',
        soundFillingId: order.requirement.preferredSoundType
          ? this.findFillingForSound(order.requirement.preferredSoundType)
          : this.craftingSession.soundFillingId,
        decorationIds: order.requirement.requiredDecorationIds ? [...order.requirement.requiredDecorationIds] : [],
      }
    }
    this.currentScreen = 'craft'
    this.notify()
  }

  private findFillingForSound(soundType: string): string {
    const map: Record<string, string> = {
      air_slow: 'air_slow_valve',
      crunch_beads: 'crunch_beads',
      popping_candy: 'popping_candy',
      slime_gel: 'slime_core',
      squeak_toy: 'squeaker_whistle',
      soda_fizz: 'carbonated_soda',
      mochi_dango: 'mochi_core',
      caramel_crust: 'caramel_crust',
      bell_charm: 'bell_charm',
      cat_purr: 'cat_purr_vibe',
    }
    return map[soundType] ?? 'air_slow_valve'
  }

  startCrafting(moldId: string = 'melon_pan'): void {
    this.craftingSession.moldId = moldId
    this.currentScreen = 'craft'
    this.notify()
  }

  selectBaseMaterial(materialId: string): void {
    this.craftingSession.baseMaterialId = materialId
    this.notify()
  }

  selectSoundFilling(fillingId?: string): void {
    this.craftingSession.soundFillingId = fillingId
    this.notify()
  }

  selectMold(moldId: string): void {
    this.craftingSession.moldId = moldId
    this.notify()
  }

  toggleDecoration(decorationId: string): void {
    const index = this.craftingSession.decorationIds.indexOf(decorationId)
    if (index >= 0) {
      this.craftingSession.decorationIds.splice(index, 1)
    } else {
      this.craftingSession.decorationIds.push(decorationId)
    }
    this.notify()
  }

  applySecretRecipePreset(recipe: SecretRecipe): void {
    if (recipe.requiredMoldId) {
      this.craftingSession.moldId = recipe.requiredMoldId
    }
    if (recipe.requiredBaseMaterialId) {
      this.craftingSession.baseMaterialId = recipe.requiredBaseMaterialId
    }
    if (recipe.requiredSoundFillingId) {
      this.craftingSession.soundFillingId = recipe.requiredSoundFillingId
    }
    if (recipe.requiredDecorationIds) {
      this.craftingSession.decorationIds = [...recipe.requiredDecorationIds]
    }
    this.notify()
  }

  finishCrafting(name: string): void {
    const result = this.craftUseCase.execute({
      name: name || '自慢のスクイーズ',
      baseMaterialId: this.craftingSession.baseMaterialId,
      soundFillingId: this.craftingSession.soundFillingId,
      moldId: this.craftingSession.moldId,
      decorationIds: this.craftingSession.decorationIds,
      workshop: this.workshop,
    })

    this.activeSquishy = result.squishy

    if (result.squishy.secretRecipe) {
      this.discoveredRecipeIds.add(result.squishy.secretRecipe.id)
      this.newlyDiscoveredRecipe = result.squishy.secretRecipe
    } else {
      this.newlyDiscoveredRecipe = null
    }

    this.currentScreen = 'inspect'
    this.notify()
  }

  dismissNewlyDiscovered(): void {
    this.newlyDiscoveredRecipe = null
    this.notify()
  }

  /**
   * Save the active squishy to showroom at any time!
   */
  saveActiveSquishyToShowroom(): boolean {
    if (!this.activeSquishy) return false
    const alreadySaved = this.workshop.hasSquishyInShowroom(this.activeSquishy.id.value)
    if (!alreadySaved) {
      this.workshop.addCraftedSquishy(this.activeSquishy)
      this.workshop.addExperience(30) // Bonus crafting experience
      this.notify()
      return true
    }
    return false
  }

  isCurrentSquishyInShowroom(): boolean {
    if (!this.activeSquishy) return false
    return this.workshop.hasSquishyInShowroom(this.activeSquishy.id.value)
  }

  removeSquishyFromShowroom(squishyId: string): void {
    this.workshop.removeCraftedSquishy(squishyId)
    this.notify()
  }

  renameSquishyInShowroom(squishyId: string, newName: string): void {
    this.workshop.renameCraftedSquishy(squishyId, newName)
    this.notify()
  }

  deliverActiveSquishy(orderId: string): void {
    if (!this.activeSquishy) {
      throw new Error('No active squishy to deliver')
    }
    const order = this.orders.find((o) => o.id.value === orderId)
    if (!order) {
      throw new Error(`Order not found: ${orderId}`)
    }

    const output = this.deliverUseCase.execute({
      order,
      squishy: this.activeSquishy,
      workshop: this.workshop,
    })

    this.lastDeliveryResult = output.evaluation
    this.notify()
  }

  /**
   * Call a new customer via bell!
   */
  requestNewCustomerOrder(): Order {
    const newOrderReq = generateRandomCustomerOrder(this.orders.length)
    const newOrder = new Order({
      id: new OrderId(`order_${this.orders.length + 1}`),
      requirement: newOrderReq,
    })
    this.orders.push(newOrder)
    this.notify()
    return newOrder
  }

  unlockMold(mold: Mold): void {
    this.workshop.unlockMold(mold)
    this.notify()
  }

  setActiveSquishy(squishy: Squishy): void {
    this.activeSquishy = squishy
    this.currentScreen = 'inspect'
    this.notify()
  }
}
