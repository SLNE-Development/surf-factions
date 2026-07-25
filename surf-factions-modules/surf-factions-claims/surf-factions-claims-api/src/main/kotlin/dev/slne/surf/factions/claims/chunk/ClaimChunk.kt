package dev.slne.surf.factions.claims.chunk

import org.jetbrains.annotations.Unmodifiable
import java.time.OffsetDateTime

interface ClaimChunk {
    val chunkX: Int
    val chunkZ: Int

    val owner: ClaimChunkOwner
    val ownerHistory: @Unmodifiable List<ClaimChunkOwner>

    val createdAt: OffsetDateTime
    val updatedAt: OffsetDateTime
}