package dev.slne.surf.factions.client.common.api

import dev.slne.surf.factions.shared.module.FactionModuleType

abstract class FactionsPlugin(
    val type: FactionModuleType,
    val dependencies: List<FactionModuleType> = emptyList()
) {
    abstract suspend fun onLoad()
    abstract suspend fun onEnable()
    abstract suspend fun onDisable()
}