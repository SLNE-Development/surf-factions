package dev.slne.surf.factions.client.common.shade

import dev.slne.surf.api.core.util.requiredService
import dev.slne.surf.factions.client.common.api.FactionsPlugin

abstract class FactionsPluginManager {
    lateinit var plugins: List<FactionsPlugin>

    abstract fun buildPluginList(): List<FactionsPlugin>

    suspend fun onLoad() {
        plugins = buildPluginList()
    }

    suspend fun onEnable() {

    }

    suspend fun onDisable() {

    }

    companion object {
        val INSTANCE = requiredService<FactionsPluginManager>()
    }
}