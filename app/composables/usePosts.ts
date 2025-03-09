import type { Post, InsertPost } from '@@/types/database'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

export const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
  image: z.string().optional(),
})

export type Schema = z.output<typeof schema>

export const usePosts = () => {
  const { currentTeam } = useTeam()
  const toast = useToast()
  const loading = ref(false)
  const posts = ref<Post[]>([])
  const selectedFile = ref<File | null>(null)
  const { user } = useUserSession()
  // Modal states
  const postModal = reactive({
    show: false,
    isEdit: false,
    currentPost: null as Post | null,
  })

  const confirmModal = reactive({
    show: false,
    post: null as Post | null,
  })

  const state = reactive<Partial<Schema>>({
    title: undefined,
    content: undefined,
    image: undefined,
  })

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
    // Append user data locally, when refreshed or new data fetched userId from db is added
    return { ...data, userId: user.value }
  }

  const getPost = async (id: string) => {
    return await useFetch<Post>(
      `/api/teams/${currentTeam.value?.id}/posts/${id}`,
    )
  }

  const updatePost = async (id: string, post: Partial<Post>) => {
    return await $fetch<Post>(
      `/api/teams/${currentTeam.value?.id}/posts/${id}`,
      {
        method: 'PATCH',
        body: post,
      },
    )
  }

  const deletePost = async (id: string) => {
    return await $fetch<Post>(
      `/api/teams/${currentTeam.value?.id}/posts/${id}`,
      {
        method: 'DELETE',
      },
    )
  }

  const uploadImage = async () => {
    try {
      if (!selectedFile.value) return ''
      const formData = new FormData()
      formData.append('image', selectedFile.value)
      const filePath = await $fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })
      return `/images/${filePath}`
    } catch (error) {
      console.log(error)
      toast.add({
        title: 'Failed to upload image',
        description: error.data.message,
        color: 'error',
      })
      throw createError('Failed to upload image')
    }
  }

  const handleFileSelected = (file: File | null) => {
    selectedFile.value = file
    if (!file) {
      state.image = undefined
    }
  }

  const resetPostModal = () => {
    postModal.isEdit = false
    postModal.currentPost = null
    state.title = undefined
    state.content = undefined
    state.image = undefined
    selectedFile.value = null
  }

  const editPost = (post: Post) => {
    postModal.isEdit = true
    postModal.currentPost = post
    state.title = post.title
    state.content = post.content
    state.image = post.image
    postModal.show = true
  }

  const confirmDelete = (post: Post) => {
    confirmModal.post = post
    confirmModal.show = true
  }

  const handleDelete = async () => {
    if (!confirmModal.post) return

    loading.value = true
    try {
      await deletePost(confirmModal.post.id)
      posts.value = posts.value?.filter((p) => p.id !== confirmModal.post?.id)
      toast.add({
        title: 'Success',
        description: 'Note deleted',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to delete note',
        color: 'error',
      })
    } finally {
      loading.value = false
      confirmModal.show = false
      confirmModal.post = null
    }
  }

  const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
    loading.value = true
    try {
      let image = state.image

      if (selectedFile.value) {
        image = await uploadImage()
      }

      const postData = {
        ...event.data,
        image,
      }

      if (postModal.isEdit && postModal.currentPost) {
        const updatedPost = await updatePost(postModal.currentPost.id, postData)
        const index =
          posts.value?.findIndex((p) => p.id === postModal.currentPost?.id) ??
          -1
        if (index !== -1) {
          posts.value[index] = updatedPost
        }
        toast.add({
          title: 'Success',
          description: 'Note updated',
          color: 'success',
        })
      } else {
        const newPost = await createPost(postData)
        posts.value.unshift(newPost)
        toast.add({
          title: 'Success',
          description: 'Note created',
          color: 'success',
        })
      }
      postModal.show = false
      resetPostModal()
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to save note',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // Initialize posts
  const initializePosts = async () => {
    const { data } = await getAllPosts()
    posts.value = data.value || []
  }

  // Watch modal state
  watch(
    () => postModal.show,
    (isOpen) => {
      if (!isOpen) {
        resetPostModal()
      }
    },
  )

  return {
    posts,
    loading,
    postModal,
    confirmModal,
    state,
    schema,
    editPost,
    confirmDelete,
    handleDelete,
    handleSubmit,
    initializePosts,
    handleFileSelected,
  }
}
