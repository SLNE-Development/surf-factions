package dev.slne.surf.factions.microservice.shade

import dev.slne.surf.factions.claims.microservice.ClaimsMicroservice
import dev.slne.surf.factions.fractions.microservice.FractionsMicroservice
import dev.slne.surf.factions.microservice.api.FactionsMicroservice
import dev.slne.surf.factions.shared.module.FactionsModuleDependencyTree

object FactionsMicroserviceManager {
    private val dependencyTree = FactionsModuleDependencyTree<FactionsMicroservice>(buildList {
        add(FractionsMicroservice)
        add(ClaimsMicroservice)
    })

    suspend fun onBootstrap(args: List<String>) {
        for (microservice in dependencyTree.sortedAscending()) {
            microservice.onBootstrap(args)
        }
    }

    suspend fun onDisable() {
        for (microservice in dependencyTree.sortedDescending()) {
            microservice.onDisable()
        }
    }
}