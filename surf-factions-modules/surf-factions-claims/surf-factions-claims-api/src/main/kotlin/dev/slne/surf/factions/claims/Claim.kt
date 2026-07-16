package dev.slne.surf.factions.claims

import dev.slne.surf.factions.claims.chunk.ClaimChunk
import dev.slne.surf.factions.claims.heart.FactionHeartMovement
import dev.slne.surf.factions.fractions.api.Fraction
import it.unimi.dsi.fastutil.objects.ObjectSet
import net.kyori.adventure.text.ComponentLike
import org.jetbrains.annotations.Unmodifiable
import java.time.OffsetDateTime
import java.util.*

interface Claim : ComponentLike {
    val uuid: UUID
    val name: String

    val fraction: Fraction

    val worldUuid: UUID
    val chunks: @Unmodifiable ObjectSet<ClaimChunk>

    val claimExperience: Long

    val currentHeartMovement: FactionHeartMovement
    val heartMovements: @Unmodifiable List<FactionHeartMovement>

    val currentRadius: Int

    val createdAt: OffsetDateTime
    val updatedAt: OffsetDateTime
}