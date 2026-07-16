package dev.slne.surf.factions.user.api

import dev.slne.surf.api.core.util.requiredService
import it.unimi.dsi.fastutil.objects.ObjectSet
import org.jetbrains.annotations.Unmodifiable
import java.util.*

interface FactionUserManager {
    val cachedUsers: @Unmodifiable ObjectSet<FactionUser>

    fun getUserByUuid(uuid: UUID): FactionUser?

    companion object : FactionUserManager by manager {
        val INSTANCE get() = manager
    }
}

private val manager = requiredService<FactionUserManager>()