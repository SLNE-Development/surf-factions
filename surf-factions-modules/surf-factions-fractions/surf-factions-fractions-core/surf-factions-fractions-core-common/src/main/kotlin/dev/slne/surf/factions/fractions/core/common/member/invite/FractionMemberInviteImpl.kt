package dev.slne.surf.factions.fractions.core.common.member.invite

import dev.slne.surf.factions.fractions.api.member.invite.FractionMemberInvite
import java.time.OffsetDateTime
import java.util.*

class FractionMemberInviteImpl(
    override val invitedUuid: UUID,
    override val invitedByUuid: UUID,
    override val invitedAt: OffsetDateTime
) : FractionMemberInvite 