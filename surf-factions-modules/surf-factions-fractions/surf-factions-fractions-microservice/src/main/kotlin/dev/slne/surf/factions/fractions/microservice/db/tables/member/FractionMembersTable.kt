package dev.slne.surf.factions.fractions.microservice.db.tables.member

import dev.slne.surf.database.columns.nativeUuid
import dev.slne.surf.database.table.AuditableLongIdTable

object FractionMembersTable : AuditableLongIdTable("fraction_members") {
    val memberUuid = nativeUuid("member_uuid")
    val addedByUuid = nativeUuid("added_by_uuid")
}