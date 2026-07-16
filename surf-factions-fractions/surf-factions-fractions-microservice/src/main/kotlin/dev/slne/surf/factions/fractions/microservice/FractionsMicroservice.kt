package dev.slne.surf.factions.fractions.microservice

import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.r2dbc.SchemaUtils
import dev.slne.surf.factions.fractions.microservice.db.tables.FractionRolePermissionsTable
import dev.slne.surf.factions.fractions.microservice.db.tables.FractionRolesTable
import dev.slne.surf.factions.fractions.microservice.db.tables.FractionsTable
import dev.slne.surf.factions.fractions.microservice.db.tables.member.FractionMemberRoleHistoriesTable
import dev.slne.surf.factions.fractions.microservice.db.tables.member.FractionMembersTable
import dev.slne.surf.factions.fractions.microservice.db.tables.member.invite.FractionMemberInvitesTable
import dev.slne.surf.factions.microservice.api.FactionsMicroservice
import dev.slne.surf.factions.shared.module.FactionsModuleType

object FractionsMicroservice : FactionsMicroservice(
    type = FactionsModuleType.FRACTIONS,
    dependencies = listOf(FactionsModuleType.USERS)
) {
    override suspend fun onBootstrap(args: List<String>) {
        SchemaUtils.create(
            FractionsTable,
            FractionRolesTable,
            FractionRolePermissionsTable,
            FractionMembersTable,
            FractionMemberRoleHistoriesTable,
            FractionMemberInvitesTable,
        )
    }

    override suspend fun onDisable() {

    }
}