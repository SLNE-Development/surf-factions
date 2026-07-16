package dev.slne.surf.factions.client.paper.shade

import com.github.shynixn.mccoroutine.folia.SuspendingJavaPlugin
import dev.slne.surf.factions.client.common.shade.FactionsPluginManager
import org.bukkit.plugin.java.JavaPlugin

class PaperMain : SuspendingJavaPlugin() {
    override suspend fun onLoadAsync() {
        FactionsPluginManager.INSTANCE.onLoad()
    }

    override suspend fun onEnableAsync() {
        FactionsPluginManager.INSTANCE.onEnable()
    }

    override suspend fun onDisableAsync() {
        FactionsPluginManager.INSTANCE.onDisable()
    }
}

val plugin get() = JavaPlugin.getPlugin(PaperMain::class.java)