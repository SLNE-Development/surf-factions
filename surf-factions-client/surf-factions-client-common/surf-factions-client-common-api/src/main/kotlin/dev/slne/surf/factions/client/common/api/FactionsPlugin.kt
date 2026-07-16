package dev.slne.surf.factions.client.common.api

import dev.slne.surf.factions.shared.module.FactionsModule
import dev.slne.surf.factions.shared.module.FactionsModuleType

abstract class FactionsPlugin(
    override val type: FactionsModuleType,
    override val dependencies: List<FactionsModuleType> = emptyList()
) : FactionsModule {
    abstract suspend fun onLoad()
    abstract suspend fun onEnable()
    abstract suspend fun onDisable()
}