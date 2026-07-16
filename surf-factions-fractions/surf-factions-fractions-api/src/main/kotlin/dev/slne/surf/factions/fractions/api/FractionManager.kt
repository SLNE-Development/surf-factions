package dev.slne.surf.factions.fractions.api

import dev.slne.surf.api.core.util.requiredService
import it.unimi.dsi.fastutil.objects.ObjectSet
import org.jetbrains.annotations.Unmodifiable
import java.util.*

interface FractionManager {
    val fractions: @Unmodifiable ObjectSet<Fraction>

    fun getFractionByUuid(uuid: UUID): Fraction?
    fun getFractionByName(name: String): Fraction?
    fun getFractionByTag(tag: String): Fraction?

    fun getFractionByMemberUuid(memberUuid: UUID): Fraction?

    companion object : FractionManager by manager {
        val INSTANCE get() = manager
    }
}

private val manager = requiredService<FractionManager>()