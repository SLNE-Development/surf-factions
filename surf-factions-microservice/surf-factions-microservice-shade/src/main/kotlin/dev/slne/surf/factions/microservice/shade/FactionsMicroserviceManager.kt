package dev.slne.surf.factions.microservice.shade

import dev.slne.surf.factions.fractions.microservice.FractionsMicroservice
import dev.slne.surf.factions.microservice.api.FactionsMicroservice

object FactionsMicroserviceManager {
    lateinit var microservices: List<FactionsMicroservice>

    suspend fun onBootstrap(args: List<String>) {
        microservices = buildList {
            add(FractionsMicroservice)
        }
    }

    suspend fun onDisable() {

    }
}