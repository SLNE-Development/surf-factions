package dev.slne.surf.factions.fractions.microservice.db.tables.member.invite

import dev.slne.surf.database.columns.nativeUuid
import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.ReferenceOption
import dev.slne.surf.database.table.AuditableLongIdTable
import dev.slne.surf.factions.fractions.microservice.db.tables.FractionsTable

object FractionMemberInvitesTable : AuditableLongIdTable("fraction_member_invites") {
    val fractionId = reference(
        name = "fraction_id",
        foreign = FractionsTable,
        onUpdate = ReferenceOption.CASCADE,
        onDelete = ReferenceOption.CASCADE
    )
    val invitedUuid = nativeUuid("invited_uuid")
    val invitedByUuid = nativeUuid("invited_by_uuid")
}