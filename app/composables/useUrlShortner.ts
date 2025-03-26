import { renderSVG } from 'uqr'
import { useClipboard } from '@vueuse/core'
import type { Url } from '@@/types/database'

export const useUrlShortner = () => {
  const host = useRuntimeConfig().public.host
  const toast = useToast()
  const { copy, copied } = useClipboard()
  const { currentTeam } = useTeam()

  // Fetch URLs for current team
  const { data: urls, refresh } = useFetch<Url[]>(
    `/api/teams/${currentTeam.value.id}/urls`
  )

  // Generate QR code
  const generateQRCode = (shortcode: string) => {
    return renderSVG(`${host}/l/${shortcode}`)
  }

  // Copy URL to clipboard
  const copyUrl = (shortcode: string) => {
    const fullUrl = `${host}/l/${shortcode}`
    copy(fullUrl)
    toast.add({
      title: 'URL copied to clipboard',
      description: fullUrl,
      color: 'success',
    })
  }

  // Download QR code
  const downloadQRCode = (shortcode: string) => {
    const svg = generateQRCode(shortcode)
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-code.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Get unique shortcode
  const getUniqueShortcode = async () => {
    return await $fetch<string>(
      `/api/teams/${currentTeam.value.id}/urls/short-code`,
      {
        method: 'GET',
      }
    )
  }

  // Create new URL
  const createUrl = async (data: any) => {
    const response = await useFetch(`/api/teams/${currentTeam.value.id}/urls`, {
      method: 'POST',
      body: data,
    })
    
    if (response.data.value) {
      copyUrl(response.data.value.shortcode)
      refresh()
    }
    
    return response.data.value
  }

  // Delete URL
  const deleteUrl = async (id: string) => {
    await $fetch(`/api/teams/${currentTeam.value.id}/urls/${id}`, {
      method: 'DELETE',
    })
    refresh()
  }

  return {
    host,
    urls,
    copied,
    refresh,
    generateQRCode,
    copyUrl,
    downloadQRCode,
    getUniqueShortcode,
    createUrl,
    deleteUrl,
  }
}
