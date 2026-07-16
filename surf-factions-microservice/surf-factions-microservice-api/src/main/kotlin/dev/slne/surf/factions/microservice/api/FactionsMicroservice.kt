package dev.slne.surf.factions.microservice.api

import dev.slne.surf.factions.shared.module.FactionsModuleType

abstract class FactionsMicroservice(
    val type: FactionsModuleType,
    val dependencies: List<FactionsModuleType> = emptyList()
) {
    val name get() = type.name

    abstract suspend fun onBootstrap(args: List<String>)
    abstract suspend fun onDisable()
}