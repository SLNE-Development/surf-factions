package dev.slne.surf.factions.fractions.api.member.result

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.factions.fractions.api.Fraction
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike

sealed class AddMemberResult(
    val message: Component
) : ComponentLike {
    override fun asComponent() = message

    data class AlreadyMember(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : AddMemberResult(buildText {
        append(memberDisplayName)
        error(" ist bereits ein Mitglied von ")
        append(fraction)
        error(".")
    })

    data class NoPermission(
        val fraction: Fraction,
        val memberDisplayName: Component
    ) : AddMemberResult(buildText {
        error("Du hast keine Berechtigung, ")
        append(memberDisplayName)
        error(" zu ")
        append(fraction)
        error(" hinzuzufügen.")
    })
}