package dev.slne.surf.factions.claims.heart

import java.time.OffsetDateTime

interface FactionHeartMovement {
    val x: Int
    val y: Int
    val z: Int

    val createdAt: OffsetDateTime
}