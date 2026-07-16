package dev.slne.surf.factions.client.velocity.shade

import com.google.auto.service.AutoService
import dev.slne.surf.factions.client.common.api.FactionsPlugin
import dev.slne.surf.factions.client.common.shade.FactionsPluginManager

@AutoService(FactionsPluginManager::class)
class VelocityFactionsPluginManager : FactionsPluginManager() {
    override fun buildPluginList(): List<FactionsPlugin> = buildList {
        
    }
}