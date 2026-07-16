package dev.slne.surf.factions.fractions.api.member.invite

import java.time.OffsetDateTime
import java.util.*

interface FractionMemberInvite {
    val invitedUuid: UUID
    val invitedByUuid: UUID
    val invitedAt: OffsetDateTime
}