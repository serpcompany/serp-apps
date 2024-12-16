import { eq, or } from 'drizzle-orm'
import type { Team, InsertTeam } from '../../../types/database'

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
    throw new Error('Failed to find user teams')
  }
}

export const createTeam = async (payload: InsertTeam) => {
  try {
    const team = await useDB()
      .insert(tables.teams)
      .values(payload)
      .returning()
      .get()

    // Also create a team member record for the owner
    await useDB().insert(tables.teamMembers).values({
      teamId: team.id,
      userId: payload.ownerId,
      role: 'owner',
    })

    return team
  } catch (error) {
    console.error(error)
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
    console.error(error)
    throw new Error('Failed to update team')
  }
}

export const deleteTeam = async (teamId: string) => {
  try {
    await useDB().delete(tables.teams).where(eq(tables.teams.id, teamId))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete team')
  }
}
