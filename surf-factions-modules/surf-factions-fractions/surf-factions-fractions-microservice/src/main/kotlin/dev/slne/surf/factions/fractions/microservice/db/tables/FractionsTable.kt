package dev.slne.surf.factions.fractions.microservice.db.tables

import dev.slne.surf.database.columns.component
import dev.slne.surf.database.columns.nativeUuid
import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.Column
import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.core.Table
import dev.slne.surf.database.table.AuditableLongIdTable
import net.kyori.adventure.text.format.TextColor

object FractionsTable : AuditableLongIdTable("fractions") {
    val uuid = nativeUuid("uuid").uniqueIndex()
    val name = varchar("name", 16).uniqueIndex()
    val displayName = component("display_name")

    val tag = varchar("tag", 4).uniqueIndex()
    val tagForegroundColor = optionalTextColor("tag_foreground_color")
    val tagShadowColor = optionalTextColor("tag_shadow_color")
    val tagBackgroundColor = optionalTextColor("tag_background_color")

    val founderUuid = nativeUuid("founder_uuid")
}

private fun Table.optionalTextColor(name: String): Column<TextColor?> = integer(name)
    .transform(TextColor::color, TextColor::value)
    .nullable()
    .default(null)