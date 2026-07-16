package dev.slne.surf.factions.fractions.core.common.member

import dev.slne.surf.factions.fractions.api.member.role.FractionMemberRoleHistory
import dev.slne.surf.factions.fractions.api.role.FractionRole
import java.time.OffsetDateTime
import java.util.*

class FractionMemberRoleHistoryImpl(
    override val memberUuid: UUID,
    override val role: FractionRole,
    override val assignedByUuid: UUID,
    override val assignedAt: OffsetDateTime
) : FractionMemberRoleHistory