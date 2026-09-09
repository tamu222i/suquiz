import { useState, useEffect, useMemo } from 'react'
import { WorkshopGameController } from '../state/WorkshopGameController'
import type { WorkshopGameState } from '../state/WorkshopGameController'
import type { Mold } from '../../domain/squishy/model/CraftMaterials'
import type { Squishy } from '../../domain/squishy/model/Squishy'
import type { SecretRecipe } from '../../domain/squishy/model/SecretRecipes'

export function useWorkshopGame() {
  const controller = useMemo(() => new WorkshopGameController(), [])
  const [state, setState] = useState<WorkshopGameState>(() => controller.getState())

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.getState())
    })
    return unsubscribe
  }, [controller])

  return {
    ...state,
    controller,
    navigateTo: (screen: WorkshopGameState['currentScreen']) => controller.navigateTo(screen),
    startCraftingForOrder: (orderId: string) => controller.startCraftingForOrder(orderId),
    startCrafting: (moldId?: string) => controller.startCrafting(moldId),
    selectBaseMaterial: (id: string) => controller.selectBaseMaterial(id),
    selectSoundFilling: (id?: string) => controller.selectSoundFilling(id),
    selectMold: (id: string) => controller.selectMold(id),
    toggleDecoration: (id: string) => controller.toggleDecoration(id),
    finishCrafting: (name: string) => controller.finishCrafting(name),
    deliverActiveSquishy: (orderId: string) => controller.deliverActiveSquishy(orderId),
    unlockMold: (mold: Mold) => controller.unlockMold(mold),
    setActiveSquishy: (squishy: Squishy) => controller.setActiveSquishy(squishy),
    saveActiveSquishyToShowroom: () => controller.saveActiveSquishyToShowroom(),
    isCurrentSquishyInShowroom: () => controller.isCurrentSquishyInShowroom(),
    removeSquishyFromShowroom: (squishyId: string) => controller.removeSquishyFromShowroom(squishyId),
    renameSquishyInShowroom: (squishyId: string, newName: string) => controller.renameSquishyInShowroom(squishyId, newName),
    requestNewCustomerOrder: () => controller.requestNewCustomerOrder(),
    applySecretRecipePreset: (recipe: SecretRecipe) => controller.applySecretRecipePreset(recipe),
    dismissNewlyDiscovered: () => controller.dismissNewlyDiscovered(),
  }
}
