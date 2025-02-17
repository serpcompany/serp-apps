import type { Post, InsertPost } from '@@/types/database'

export const usePosts = () => {
  const { currentTeam } = useTeam()
  const getAllPosts = async () => {
    return await useFetch<Post[]>(`/api/teams/${currentTeam.value?.id}/posts`)
  }

  const createPost = async (post: Partial<InsertPost>) => {
    const data = await $fetch<Post>(
      `/api/teams/${currentTeam.value?.id}/posts`,
      {
        method: 'POST',
        body: post,
      },
    )
    return data
  }

  return {
    getAllPosts,
    createPost,
  }
}
