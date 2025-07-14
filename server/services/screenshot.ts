import { FetchError } from 'ofetch'
import { env } from '@@/env'

const SCREENSHOT_API_ACCESS_KEY = env.SCREENSHOT_API_ACCESS_KEY
const SCREENSHOT_API_BASE_URL = env.SCREENSHOT_API_BASE_URL
const SCREENSHOT_API_URL_ANIMATE_SUFFIX = env.SCREENSHOT_API_URL_SCROLLING_SUFFIX
const SCREENSHOT_API_URL_STILL_SUFFIX = env.SCREENSHOT_API_URL_STILL_SUFFIX

const DEFAULT_FULL_PAGE_SCROLLING_CONFIG = {
  access_key: SCREENSHOT_API_ACCESS_KEY,
  format: 'mp4',
  block_ads: 'true',
  block_cookie_banners: 'true',
  block_banners_by_heuristics: 'false',
  block_trackers: 'true',
  delay: '0',
  timeout: '60',
  scenario: 'scroll',
  duration: '5',
  scroll_delay: '500',
  scroll_duration: '1500',
  scroll_by: '1000',
  scroll_start_immediately: 'true',
  scroll_back: 'true',
  scroll_complete: 'true',
  scroll_easing: 'ease_in_out_quint',
  cache: 'true',
}

const DEFAULT_SCREENSHOT_CONFIG = {
  access_key: SCREENSHOT_API_ACCESS_KEY,
  format: 'jpg',
  block_ads: 'true',
  block_cookie_banners: 'true',
  block_trackers: 'true',
  delay: '0',
  timeout: '60',
  response_type: 'by_format',
  image_quality: '80',
  cache: 'true',
}

export async function generateScreenshot(url: string, fullPage: boolean = false, scrollingAnimation: boolean = false) {
  let screenshotUrl: string
  try {
    if (scrollingAnimation) {
      const params = new URLSearchParams({
        url,
        ...DEFAULT_FULL_PAGE_SCROLLING_CONFIG,
      })

      screenshotUrl = `${SCREENSHOT_API_BASE_URL}/${SCREENSHOT_API_URL_ANIMATE_SUFFIX}?${params.toString()}`
    } else {
      const params = new URLSearchParams({
        url,
        ...DEFAULT_SCREENSHOT_CONFIG,
      })

      if (fullPage) {
        params.set('full_page', 'true')
      }

      screenshotUrl = `${SCREENSHOT_API_BASE_URL}/${SCREENSHOT_API_URL_STILL_SUFFIX}?${params.toString()}`
    }

    const imageResponse = await $fetch.raw(screenshotUrl, {
      responseType: 'stream',
    })

    const contentType = imageResponse.headers.get('content-type')

    return { stream: imageResponse.body, contentType }
  } catch (error) {
    if (error instanceof FetchError && error.response) {
      console.error('Error generating screenshot: ', error.statusCode, error.statusText)
      console.error('Error details: ', await error.response.json())
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate screenshot. Please try again later.',
    })
  }
}
