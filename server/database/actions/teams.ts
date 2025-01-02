import { eq, or, and, sql } from 'drizzle-orm'
import type {
  Team,
  InsertTeam,
  InsertTeamInvite,
} from '../../../types/database'

export const findUserTeams = async (userId: string) => {
  try {
    const teams = await useDB()
      .select({
        id: tables.teams.id,
        name: tables.teams.name,
        ownerId: tables.teams.ownerId,
        logo: tables.teams.logo,
        createdAt: tables.teams.createdAt,
        updatedAt: tables.teams.updatedAt,
        role: tables.teamMembers.role,
        slug: tables.teams.slug,
      })
      .from(tables.teams)
      .leftJoin(
        tables.teamMembers,
        eq(tables.teams.id, tables.teamMembers.teamId),
      )
      .where(
        or(
          eq(tables.teams.ownerId, userId),
          eq(tables.teamMembers.userId, userId),
        ),
      )
    return teams
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user teams',
    })
  }
}

export const createTeam = async (payload: InsertTeam) => {
  try {
    const team = await useDB()
      .insert(tables.teams)
      .values(payload)
      .returning()
      .get()

    await useDB().insert(tables.teamMembers).values({
      teamId: team.id,
      userId: payload.ownerId,
      role: 'owner',
    })

    return team
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed: teams.slug')) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Team slug not available, please pick another one',
        })
      }
      throw new Error(error.message)
    }
    throw new Error('Failed to create team')
  }
}

export const updateTeam = async (teamId: string, payload: Partial<Team>) => {
  try {
    const record = await useDB()
      .update(tables.teams)
      .set(payload)
      .where(eq(tables.teams.id, teamId))
      .returning()
      .get()
    return record
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team',
    })
  }
}

export const deleteTeam = async (teamId: string) => {
  try {
    await useDB().delete(tables.teams).where(eq(tables.teams.id, teamId))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team',
    })
  }
}

export const inviteTeamMember = async (payload: InsertTeamInvite) => {
  try {
    const invite = await useDB()
      .insert(tables.teamInvites)
      .values(payload)
      .returning()
      .get()
    return invite
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to invite team member',
    })
  }
}

export const getActiveTeamMembers = async (teamId: string) => {
  const members = await useDB()
    .select({
      id: tables.teamMembers.id,
      teamId: tables.teamMembers.teamId,
      userId: tables.teamMembers.userId,
      role: tables.teamMembers.role,
      email: tables.users.email,
      name: tables.users.name,
      avatarUrl: tables.users.avatarUrl,
      lastLoginAt: tables.users.lastActive,
      createdAt: tables.teamMembers.createdAt,
    })
    .from(tables.teamMembers)
    .leftJoin(tables.users, eq(tables.teamMembers.userId, tables.users.id))
    .where(eq(tables.teamMembers.teamId, teamId))
  return members
}

export const getTeamInvites = async (teamId: string) => {
  const invites = await useDB()
    .select()
    .from(tables.teamInvites)
    .where(eq(tables.teamInvites.teamId, teamId))
  return invites
}
