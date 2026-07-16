package dev.slne.surf.factions.client.common.shade

import dev.slne.surf.api.core.util.requiredService
import dev.slne.surf.factions.client.common.api.FactionsPlugin
import dev.slne.surf.factions.shared.module.FactionsModuleDependencyTree

abstract class FactionsPluginManager {
    private val dependencyTree = FactionsModuleDependencyTree<FactionsPlugin>(buildPluginList())

    abstract fun buildPluginList(): List<FactionsPlugin>

    suspend fun onLoad() {
        for (plugin in dependencyTree.sortedAscending()) {
            plugin.onLoad()
        }
    }

    suspend fun onEnable() {
        for (plugin in dependencyTree.sortedAscending()) {
            plugin.onEnable()
        }
    }

    suspend fun onDisable() {
        for (plugin in dependencyTree.sortedDescending()) {
            plugin.onDisable()
        }
    }

    companion object {
        val INSTANCE = requiredService<FactionsPluginManager>()
    }
}