package dev.slne.surf.factions.fractions.api.utils

import dev.slne.surf.factions.fractions.api.Fraction
import dev.slne.surf.factions.fractions.api.FractionManager
import dev.slne.surf.factions.user.api.FactionUser

val FactionUser.fraction: Fraction?
    get() = FractionManager.getFractionByMemberUuid(uuid)