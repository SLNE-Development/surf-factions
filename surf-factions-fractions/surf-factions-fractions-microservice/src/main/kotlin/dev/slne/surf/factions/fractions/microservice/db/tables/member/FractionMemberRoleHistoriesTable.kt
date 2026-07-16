package dev.slne.surf.factions.fractions.microservice.db.tables.member

import dev.slne.surf.database.columns.nativeUuid
import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.ReferenceOption
import dev.slne.surf.database.table.AuditableLongIdTable
import dev.slne.surf.factions.fractions.microservice.db.tables.FractionRolesTable

object FractionMemberRoleHistoriesTable : AuditableLongIdTable("fraction_member_role_histories") {
    val memberUuid = nativeUuid("member_uuid")
    val roleId = reference(
        name = "role_id",
        foreign = FractionRolesTable,
        onUpdate = ReferenceOption.CASCADE,
        onDelete = ReferenceOption.CASCADE
    )
}