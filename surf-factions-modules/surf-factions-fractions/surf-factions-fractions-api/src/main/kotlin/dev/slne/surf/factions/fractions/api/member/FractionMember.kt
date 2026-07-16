package dev.slne.surf.factions.fractions.api.member

import dev.slne.surf.factions.fractions.api.member.role.FractionMemberRoleHistory
import dev.slne.surf.factions.fractions.api.role.FractionRole
import it.unimi.dsi.fastutil.objects.ObjectList
import org.jetbrains.annotations.Unmodifiable
import java.time.OffsetDateTime
import java.util.*

interface FractionMember {
    val uuid: UUID
    val addedByUuid: UUID

    val addedAt: OffsetDateTime

    val currentFractionRole: FractionRole
    val fractionRoleHistory: @Unmodifiable ObjectList<FractionMemberRoleHistory>
}