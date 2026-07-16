package dev.slne.surf.factions.fractions.api.member.role

import dev.slne.surf.factions.fractions.api.role.FractionRole
import java.time.OffsetDateTime
import java.util.*

interface FractionMemberRoleHistory {
    val memberUuid: UUID
    val role: FractionRole
    val assignedByUuid: UUID
    val assignedAt: OffsetDateTime
}