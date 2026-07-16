package dev.slne.surf.factions.fractions.api

import dev.slne.surf.factions.fractions.api.member.FractionMember
import dev.slne.surf.factions.fractions.api.member.invite.FractionMemberInvite
import dev.slne.surf.factions.fractions.api.member.invite.result.InviteMemberResult
import dev.slne.surf.factions.fractions.api.member.invite.result.UninviteMemberResult
import dev.slne.surf.factions.fractions.api.member.result.AddMemberResult
import dev.slne.surf.factions.fractions.api.member.result.RemoveMemberResult
import dev.slne.surf.factions.fractions.api.member.role.result.SetMemberRoleResult
import dev.slne.surf.factions.fractions.api.role.FractionRole
import dev.slne.surf.factions.fractions.api.tag.FractionTag
import dev.slne.surf.factions.fractions.api.tag.result.SetTagResult
import it.unimi.dsi.fastutil.objects.ObjectSet
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.ComponentLike
import net.kyori.adventure.text.format.TextColor
import org.jetbrains.annotations.Unmodifiable
import java.time.OffsetDateTime
import java.util.*

interface Fraction : ComponentLike {
    val uuid: UUID

    val name: String
    val displayName: Component
    val fractionTag: FractionTag

    val founderUuid: UUID

    val createdAt: OffsetDateTime
    val updatedAt: OffsetDateTime

    val roles: @Unmodifiable ObjectSet<FractionRole>
    val members: @Unmodifiable ObjectSet<FractionMember>
    val memberInvites: @Unmodifiable ObjectSet<FractionMemberInvite>

    fun getMemberByUuid(memberUuid: UUID): FractionMember?

    suspend fun addMember(memberUuid: UUID): AddMemberResult
    suspend fun removeMember(memberUuid: UUID): RemoveMemberResult

    fun getMemberInviteByUuid(memberUuid: UUID): FractionMemberInvite?

    suspend fun inviteMember(memberUuid: UUID, invitedByUuid: UUID): InviteMemberResult
    suspend fun uninviteMember(memberUuid: UUID): UninviteMemberResult

    fun getRoleByName(roleName: String): FractionRole?

    suspend fun setMemberRole(memberUuid: UUID, role: FractionRole): SetMemberRoleResult

    suspend fun setTag(fractionTag: FractionTag): SetTagResult
    suspend fun setTag(
        tag: String,
        foregroundColor: TextColor?,
        shadowColor: TextColor?,
        backgroundColor: TextColor?
    ): SetTagResult

    fun renderTag(): Component

    companion object {
        operator fun get(uuid: UUID) = FractionManager.getFractionByUuid(uuid)
        operator fun get(name: String) = FractionManager.getFractionByName(name)
    }
}