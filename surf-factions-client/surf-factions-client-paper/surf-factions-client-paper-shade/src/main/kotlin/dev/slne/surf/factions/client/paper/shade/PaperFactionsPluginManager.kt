package dev.slne.surf.factions.client.paper.shade

import com.google.auto.service.AutoService
import dev.slne.surf.factions.client.common.api.FactionsPlugin
import dev.slne.surf.factions.client.common.shade.FactionsPluginManager
import dev.slne.surf.factions.fractions.client.paper.FractionsFactionsPlugin

@AutoService(FactionsPluginManager::class)
class PaperFactionsPluginManager : FactionsPluginManager() {
    override fun buildPluginList(): List<FactionsPlugin> = buildList {
        add(FractionsFactionsPlugin)
    }
}