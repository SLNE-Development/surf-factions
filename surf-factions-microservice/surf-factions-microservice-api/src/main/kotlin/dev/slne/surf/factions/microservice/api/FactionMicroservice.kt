package dev.slne.surf.factions.microservice.api

import dev.slne.surf.factions.shared.module.FactionModuleType

abstract class FactionMicroservice(
    val type: FactionModuleType,
    val dependencies: List<FactionModuleType> = emptyList()
) {
    val name get() = type.name

    abstract suspend fun onBootstrap(args: List<String>)
    abstract suspend fun onDisable()
}