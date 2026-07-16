package dev.slne.surf.factions.shared.module

interface FactionsModule {
    val type: FactionsModuleType
    val dependencies: List<FactionsModuleType>
}
