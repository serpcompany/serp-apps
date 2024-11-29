export const useTeams = () => {
  const getUserTeams = async () => {
    return await $fetch('/api/teams/user-teams')
  }

  const createTeam = async (teamData: { name: string; logo?: string }) => {
    return await $fetch('/api/teams', {
      method: 'POST',
      body: teamData,
    })
  }

  return {
    getUserTeams,
    createTeam,
  }
}
