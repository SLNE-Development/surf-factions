package dev.slne.surf.factions.fractions.microservice.db.repositories

import dev.slne.surf.database.libs.org.jetbrains.exposed.v1.r2dbc.transactions.suspendTransaction
import dev.slne.surf.factions.fractions.api.Fraction

object FractionsRepository {
    suspend fun fetchFractions(): List<Fraction> = suspendTransaction {
        return@suspendTransaction emptyList()
    }
}