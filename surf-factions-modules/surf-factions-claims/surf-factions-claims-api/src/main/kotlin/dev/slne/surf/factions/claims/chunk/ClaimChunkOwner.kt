package dev.slne.surf.factions.claims.chunk

import dev.slne.surf.factions.fractions.api.Fraction
import java.time.OffsetDateTime

interface ClaimChunkOwner {
    val faction: Fraction
    
    val createdAt: OffsetDateTime
}
