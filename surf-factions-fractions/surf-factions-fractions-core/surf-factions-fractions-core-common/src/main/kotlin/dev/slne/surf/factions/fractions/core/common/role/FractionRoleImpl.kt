package dev.slne.surf.factions.fractions.core.common.role

import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.api.core.util.freeze
import dev.slne.surf.api.core.util.mutableObjectSetOf
import dev.slne.surf.factions.fractions.api.role.FractionPermission
import dev.slne.surf.factions.fractions.api.role.FractionRole
import net.kyori.adventure.text.Component

class FractionRoleImpl(
    override val name: String,
    permissions: Set<FractionPermission>
) : FractionRole {
    val displayName = buildText {
        variableValue(name)
    }

    private val _permissions = mutableObjectSetOf(permissions)
    override val permissions get() = _permissions.freeze()

    override fun asComponent(): Component = displayName
}