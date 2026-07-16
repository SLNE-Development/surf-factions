package dev.slne.surf.factions.fractions.core.client

import com.google.auto.service.AutoService
import dev.slne.surf.api.core.messages.adventure.buildText
import dev.slne.surf.api.core.util.freeze
import dev.slne.surf.api.core.util.mutableObjectSetOf
import dev.slne.surf.factions.fractions.api.Fraction
import dev.slne.surf.factions.fractions.api.FractionManager
import dev.slne.surf.factions.fractions.api.tag.FractionTag
import dev.slne.surf.factions.fractions.core.common.FractionImpl
import dev.slne.surf.factions.fractions.core.common.member.FractionMemberImpl
import dev.slne.surf.factions.fractions.core.common.member.FractionMemberRoleHistoryImpl
import dev.slne.surf.factions.fractions.core.common.member.invite.FractionMemberInviteImpl
import dev.slne.surf.factions.fractions.core.common.role.FractionRoleImpl
import net.kyori.adventure.text.format.NamedTextColor
import java.time.OffsetDateTime
import java.util.*

@AutoService(FractionManager::class)
class FractionManagerImpl : FractionManager {
    private val _fractions = mutableObjectSetOf<Fraction>()
    override val fractions get() = _fractions.freeze()

    // TODO: Remove once DB connection is established
    init {
        val ammoUuid = UUID.fromString("5c63e51b-82b1-4222-af0f-66a4c31e36ad")
        val onsoUuid = UUID.fromString("d0a55f1b-762a-49a4-b4be-cbc59cec0239")
        val keviroUuid = UUID.fromString("3a1d37a0-0a1d-419f-ac7a-f9201206cfd0")

        val leaderRole = FractionRoleImpl(name = "Leader", permissions = emptySet())
        val officerRole = FractionRoleImpl(name = "Officer", permissions = emptySet())
        val memberRole = FractionRoleImpl(name = "Member", permissions = emptySet())

        val ammoMember = FractionMemberImpl(
            uuid = ammoUuid,
            addedByUuid = ammoUuid,
            addedAt = OffsetDateTime.now(),
            roleHistory = buildList {
                add(
                    FractionMemberRoleHistoryImpl(
                        memberUuid = ammoUuid,
                        role = leaderRole,
                        assignedByUuid = ammoUuid,
                        assignedAt = OffsetDateTime.now()
                    )
                )
            }
        )

        val onsoMember = FractionMemberImpl(
            uuid = onsoUuid,
            addedByUuid = ammoUuid,
            addedAt = OffsetDateTime.now(),
            roleHistory = buildList {
                add(
                    FractionMemberRoleHistoryImpl(
                        memberUuid = onsoUuid,
                        role = memberRole,
                        assignedByUuid = ammoUuid,
                        assignedAt = OffsetDateTime.now().minusDays(7)
                    )
                )

                add(
                    FractionMemberRoleHistoryImpl(
                        memberUuid = onsoUuid,
                        role = officerRole,
                        assignedByUuid = ammoUuid,
                        assignedAt = OffsetDateTime.now()
                    )
                )
            }
        )

        _fractions.add(
            FractionImpl(
                uuid = UUID.randomUUID(),
                name = "SILENCE",
                displayName = buildText {
                    variableValue("SILENCE")
                },
                fractionTag = FractionTag("SLNE", NamedTextColor.WHITE, null, NamedTextColor.BLACK),
                founderUuid = ammoUuid,
                createdAt = OffsetDateTime.now(),
                updatedAt = OffsetDateTime.now(),
                members = buildSet {
                    add(ammoMember)
                    add(onsoMember)
                },
                roles = buildSet {
                    add(leaderRole)
                    add(officerRole)
                    add(memberRole)
                },
                memberInvites = buildSet {
                    add(
                        FractionMemberInviteImpl(
                            invitedUuid = keviroUuid,
                            invitedByUuid = onsoUuid,
                            invitedAt = OffsetDateTime.now()
                        )
                    )
                }
            )
        )
    }

    override fun getFractionByUuid(uuid: UUID): Fraction? =
        _fractions.firstOrNull { it.uuid == uuid }

    override fun getFractionByName(name: String): Fraction? =
        _fractions.firstOrNull { it.name == name }

    override fun getFractionByTag(tag: String): Fraction? =
        _fractions.firstOrNull { it.fractionTag.tag == tag }

    override fun getFractionByMemberUuid(memberUuid: UUID): Fraction? =
        _fractions.firstOrNull { it.members.any { member -> member.uuid == memberUuid } }
}