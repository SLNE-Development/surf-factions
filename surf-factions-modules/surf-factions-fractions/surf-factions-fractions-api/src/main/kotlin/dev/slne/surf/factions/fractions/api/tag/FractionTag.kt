package dev.slne.surf.factions.fractions.api.tag

import dev.slne.surf.api.core.messages.adventure.text
import net.kyori.adventure.text.ComponentLike
import net.kyori.adventure.text.format.TextColor

data class FractionTag(
    val tag: String,
    val foregroundColor: TextColor?,
    val shadowColor: TextColor?,
    val backgroundColor: TextColor?
) : ComponentLike {
    val displayName = text(tag, foregroundColor)

    override fun asComponent() = displayName
}
