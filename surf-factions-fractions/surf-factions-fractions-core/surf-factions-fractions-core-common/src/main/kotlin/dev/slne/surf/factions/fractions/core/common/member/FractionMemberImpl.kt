package dev.slne.surf.factions.fractions.core.common.member

import dev.slne.surf.api.core.util.freeze
import dev.slne.surf.api.core.util.mutableObjectListOf
import dev.slne.surf.factions.fractions.api.member.FractionMember
import dev.slne.surf.factions.fractions.api.member.role.FractionMemberRoleHistory
import dev.slne.surf.factions.fractions.api.role.FractionRole
import java.time.OffsetDateTime
import java.util.*

class FractionMemberImpl(
    override val uuid: UUID,
    override val addedByUuid: UUID,
    override val addedAt: OffsetDateTime,
    roleHistory: List<FractionMemberRoleHistory>
) : FractionMember {
    private val _fractionRoleHistory = mutableObjectListOf(roleHistory)

    override val currentFractionRole: FractionRole
        get() = _fractionRoleHistory.maxBy { it.assignedAt }.role

    override val fractionRoleHistory get() = _fractionRoleHistory.freeze()
}