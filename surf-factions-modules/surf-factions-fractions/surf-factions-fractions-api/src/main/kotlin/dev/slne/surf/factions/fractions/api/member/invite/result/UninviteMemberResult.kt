package dev.slne.surf.factions.fractions.api.member.invite.result

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.factions.fractions.api.Fraction
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike

sealed class UninviteMemberResult(
    val message: Component
) : ComponentLike {
    override fun asComponent() = message

    data class NotInvited(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : UninviteMemberResult(buildText {
        append(memberDisplayName)
        error(" wurde nicht zu ")
        append(fraction)
        error(" eingeladen.")
    })

    data class NoPermission(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : UninviteMemberResult(buildText {
        error("Du hast keine Berechtigung, ")
        append(memberDisplayName)
        error(" von ")
        append(fraction)
        error(" zu entfernen.")
    })
}