package dev.slne.surf.factions.fractions.microservice.db.tables

import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.ReferenceOption
import dev.slne.surf.database.table.AuditableLongIdTable

object FractionRolesTable : AuditableLongIdTable("fraction_roles") {
    val fractionId = reference(
        name = "fraction_id",
        foreign = FractionsTable,
        onUpdate = ReferenceOption.CASCADE,
        onDelete = ReferenceOption.CASCADE
    )
    val name = varchar("name", 255)

    init {
        uniqueIndex(fractionId, name)
    }
}