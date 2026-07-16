package dev.slne.surf.factions.microservice.shade

import dev.slne.surf.factions.fractions.microservice.FractionsMicroservice
import dev.slne.surf.factions.microservice.api.FactionMicroservice

object FactionMicroserviceManager {
    lateinit var microservices: List<FactionMicroservice>

    suspend fun onBootstrap(args: List<String>) {
        microservices = buildList {
            add(FractionsMicroservice)
        }
    }

    suspend fun onDisable() {

    }
}