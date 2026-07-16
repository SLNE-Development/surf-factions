package dev.slne.surf.factions.microservice.api

import dev.slne.surf.factions.shared.module.FactionsModule
import dev.slne.surf.factions.shared.module.FactionsModuleType

abstract class FactionsMicroservice(
    override val type: FactionsModuleType,
    override val dependencies: List<FactionsModuleType> = emptyList()
) : FactionsModule {
    val name get() = type.name

    abstract suspend fun onBootstrap(args: List<String>)
    abstract suspend fun onDisable()
}