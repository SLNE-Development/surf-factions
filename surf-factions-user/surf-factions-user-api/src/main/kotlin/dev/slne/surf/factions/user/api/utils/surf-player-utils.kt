package dev.slne.surf.factions.user.api.utils

import dev.slne.surf.core.api.common.player.SurfPlayer
import dev.slne.surf.factions.user.api.FactionUser
import dev.slne.surf.factions.user.api.FactionUserManager

fun SurfPlayer.factionUser(): FactionUser? = FactionUserManager.getUserByUuid(uuid)