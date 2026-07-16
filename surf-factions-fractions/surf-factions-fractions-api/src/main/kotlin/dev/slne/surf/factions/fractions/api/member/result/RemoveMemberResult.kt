package dev.slne.surf.factions.fractions.api.member.result

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.factions.fractions.api.Fraction
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike

sealed class RemoveMemberResult(
    val message: Component
) : ComponentLike {
    override fun asComponent() = message

    data class NotAMember(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : RemoveMemberResult(buildText {
        append(memberDisplayName)
        error(" ist kein Mitglied von ")
        append(fraction)
        error(".")
    })

    data class NoPermission(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : RemoveMemberResult(buildText {
        error("Du hast keine Berechtigung, ")
        append(memberDisplayName)
        error(" von ")
        append(fraction)
        error(" zu entfernen.")
    })
}