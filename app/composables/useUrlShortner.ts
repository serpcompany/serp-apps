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
    `/api/teams/${currentTeam.value.id}/urls`,
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

  async function svgToPng(svg: SVGElement | string): Promise<string> {
    const svgString =
      typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
    const svgUrl = URL.createObjectURL(svgBlob)

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          URL.revokeObjectURL(svgUrl)
          reject(new Error('Failed to get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0)
        URL.revokeObjectURL(svgUrl)
        resolve(canvas.toDataURL('image/png'))
      }

      img.onerror = () => {
        URL.revokeObjectURL(svgUrl)
        reject(new Error('Failed to load SVG'))
      }

      img.src = svgUrl
    })
  }

  const downloadQRCode = async (shortcode: string) => {
    try {
      if (!shortcode) {
        throw new Error('Shortcode is required')
      }
      const svgString = generateQRCode(shortcode)
      const pngDataUrl = await svgToPng(svgString)

      const a = document.createElement('a')
      a.href = pngDataUrl
      a.download = `${shortcode}.png`
      a.click()
    } catch (error) {
      console.error('Failed to convert QR code to PNG:', error)
    }
  }

  // Get unique shortcode
  const getUniqueShortcode = async () => {
    return await $fetch<string>(
      `/api/teams/${currentTeam.value.id}/urls/short-code`,
      {
        method: 'GET',
      },
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

  const isDeleting = ref(false)
  // Delete URL
  const deleteUrl = async (id: string) => {
    try {
      isDeleting.value = true
      await $fetch(`/api/teams/${currentTeam.value.id}/urls/${id}`, {
        method: 'DELETE',
      })
      refresh()
      toast.add({
        title: 'URL deleted',
        description: 'URL deleted successfully',
        color: 'success',
      })
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error deleting URL',
        description: 'Failed to delete URL',
        color: 'error',
      })
    } finally {
      isDeleting.value = false
    }
  }

  return {
    host,
    urls,
    copied,
    isDeleting,
    refresh,
    generateQRCode,
    copyUrl,
    downloadQRCode,
    getUniqueShortcode,
    createUrl,
    deleteUrl,
  }
}
