package dev.slne.surf.factions.user.api

import dev.slne.surf.core.api.common.player.SurfPlayer
import java.util.*

interface FactionUser {
    val uuid: UUID

    val surfPlayer: SurfPlayer

    companion object {
        operator fun get(uuid: UUID) = FactionUserManager.getUserByUuid(uuid)
    }
}