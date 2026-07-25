package dev.slne.surf.factions.claims.microservice

import dev.slne.surf.factions.microservice.api.FactionsMicroservice
import dev.slne.surf.factions.shared.module.FactionsModuleType

object ClaimsMicroservice : FactionsMicroservice(
    type = FactionsModuleType.CLAIMS,
    dependencies = listOf(FactionsModuleType.FRACTIONS, FactionsModuleType.USERS)
) {
    override suspend fun onBootstrap(args: List<String>) {
    }

    override suspend fun onDisable() {

    }
}