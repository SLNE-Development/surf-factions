package dev.slne.surf.factions.fractions.api.role

import it.unimi.dsi.fastutil.objects.ObjectSet
import net.kyori.adventure.text.ComponentLike
import org.jetbrains.annotations.Unmodifiable

interface FractionRole : ComponentLike {
    val name: String

    val permissions: @Unmodifiable ObjectSet<FractionPermission>
}