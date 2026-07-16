package dev.slne.surf.factions.fractions.api.tag.result

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.factions.fractions.api.Fraction
import dev.slne.surf.factions.fractions.api.tag.FractionTag
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike

sealed class SetTagResult(
    val message: Component
) : ComponentLike {
    override fun asComponent() = message

    data class AlreadyTag(
        val fraction: Fraction,
        val tag: FractionTag,
    ) : SetTagResult(buildText {
        append(tag)
        error(" ist bereits der Tag von ")
        append(fraction)
        error(".")
    })

    data class AlreadyTagInUse(
        val fraction: Fraction,
        val tag: FractionTag,
    ) : SetTagResult(buildText {
        append(tag)
        error(" wird bereits von einer anderen Fraktion verwendet.")
    })

    class NoPermission(
        val fraction: Fraction,
        val tag: FractionTag,
    ) : SetTagResult(buildText {
        error("Du hast keine Berechtigung, den Tag ")
        append(tag)
        error(" in ")
        append(fraction)
        error(" zu setzen.")
    })
}