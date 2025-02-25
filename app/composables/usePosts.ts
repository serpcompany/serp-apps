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

  const getPost = async (id: string) => {
    return await useFetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`)
  }

  const updatePost = async (id: string, post: Partial<Post>) => {
    return await $fetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`, {
      method: 'PATCH',
      body: post,
    })
  }

  const deletePost = async (id: string) => {
    return await $fetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
  }
}
