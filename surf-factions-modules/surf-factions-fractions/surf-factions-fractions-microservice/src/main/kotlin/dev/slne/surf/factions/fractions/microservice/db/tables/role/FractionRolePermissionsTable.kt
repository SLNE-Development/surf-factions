package dev.slne.surf.factions.fractions.microservice.db.tables

import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.ReferenceOption
import dev.slne.surf.database.table.AuditableLongIdTable
import dev.slne.surf.factions.fractions.api.role.FractionPermission

object FractionRolePermissionsTable : AuditableLongIdTable("fraction_role_permissions") {
    val roleId = reference(
        name = "role_id",
        foreign = FractionsTable,
        onUpdate = ReferenceOption.CASCADE,
        onDelete = ReferenceOption.CASCADE
    )
    val permission = enumerationByName<FractionPermission>("permission", 255)

    init {
        uniqueIndex(roleId, permission)
    }
}