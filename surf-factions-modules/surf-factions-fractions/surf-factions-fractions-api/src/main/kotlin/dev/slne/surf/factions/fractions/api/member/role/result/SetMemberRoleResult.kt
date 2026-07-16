package dev.slne.surf.factions.fractions.api.member.role.result

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.factions.fractions.api.Fraction
import dev.slne.surf.factions.fractions.api.role.FractionRole
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike

sealed class SetMemberRoleResult(
    val message: Component
) : ComponentLike {
    override fun asComponent() = message

    data class AlreadyRole(
        val fraction: Fraction,
        val role: FractionRole,
        val memberDisplayName: Component
    ) : SetMemberRoleResult(buildText {
        append(memberDisplayName)
        error(" hat bereits die Rolle ")
        append(role)
        error(" in ")
        append(fraction)
        error(".")
    })

    data class NoPermission(
        val fraction: Fraction,
        val role: FractionRole,
        val memberDisplayName: Component,
    ) : SetMemberRoleResult(buildText {
        error("Du hast keine Berechtigung, ")
        append(memberDisplayName)
        error(" die Rolle ")
        append(role)
        error(" in ")
        append(fraction)
        error(" zu setzen.")
    })
}