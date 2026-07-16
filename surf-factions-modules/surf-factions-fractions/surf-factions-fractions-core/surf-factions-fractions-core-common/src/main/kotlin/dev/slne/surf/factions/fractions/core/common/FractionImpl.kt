package dev.slne.surf.factions.fractions.core.common

import dev.slne.surf.api.core.util.freeze
import dev.slne.surf.api.core.util.mutableObjectSetOf
import dev.slne.surf.factions.fractions.api.Fraction
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
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.format.TextColor
import java.time.OffsetDateTime
import java.util.*

class FractionImpl(
    override val uuid: UUID,
    override val name: String,
    override val displayName: Component,
    override val fractionTag: FractionTag,
    override val founderUuid: UUID,
    override val createdAt: OffsetDateTime,
    override val updatedAt: OffsetDateTime,
    members: Set<FractionMember>,
    roles: Set<FractionRole>,
    memberInvites: Set<FractionMemberInvite>
) : Fraction {
    private val _roles = mutableObjectSetOf(roles)
    private val _members = mutableObjectSetOf(members)
    private val _memberInvites = mutableObjectSetOf(memberInvites)

    override val roles get() = _roles.freeze()
    override val members get() = _members.freeze()
    override val memberInvites get() = _memberInvites.freeze()

    override fun asComponent() = displayName

    override fun getMemberByUuid(memberUuid: UUID): FractionMember? =
        _members.firstOrNull { it.uuid == memberUuid }

    override suspend fun addMember(memberUuid: UUID): AddMemberResult {
        TODO("Not yet implemented")
    }

    override suspend fun removeMember(memberUuid: UUID): RemoveMemberResult {
        TODO("Not yet implemented")
    }

    override fun getMemberInviteByUuid(memberUuid: UUID): FractionMemberInvite? =
        _memberInvites.firstOrNull { it.invitedUuid == memberUuid }

    override suspend fun inviteMember(
        memberUuid: UUID,
        invitedByUuid: UUID
    ): InviteMemberResult {
        TODO("Not yet implemented")
    }

    override suspend fun uninviteMember(memberUuid: UUID): UninviteMemberResult {
        TODO("Not yet implemented")
    }

    override fun getRoleByName(roleName: String): FractionRole? =
        _roles.firstOrNull { it.name == roleName }

    override suspend fun setMemberRole(
        memberUuid: UUID,
        role: FractionRole
    ): SetMemberRoleResult {
        TODO("Not yet implemented")
    }

    override suspend fun setTag(fractionTag: FractionTag): SetTagResult {
        TODO("Not yet implemented")
    }

    override suspend fun setTag(
        tag: String,
        foregroundColor: TextColor?,
        shadowColor: TextColor?,
        backgroundColor: TextColor?
    ) = setTag(FractionTag(tag, foregroundColor, shadowColor, backgroundColor))

    override fun renderTag(): Component {
        TODO("Not yet implemented")
    }
}