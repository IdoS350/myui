import { useEffect, useRef, useState } from 'react'

const DEFAULT_DELAY_BEFORE_LOADING = 200
const DEFAULT_MIN_LOADING_DURATION = 400

type Timeout = ReturnType<typeof setTimeout>

/**
 * Smooths a raw `isLoading` flag to avoid spinner flicker.
 *
 * - `delayBeforeLoading` (default `200`ms): how long `isLoading` must stay `true` before the
 *   delayed state turns on. Skips the spinner entirely for very fast loads.
 * - `minLoadingDuration` (default `400`ms): once the delayed state turns on, the minimum time it
 *   stays `true`, even if `isLoading` turns `false` sooner.
 */
export function useDelayedLoading(
  isLoading: boolean,
  delayBeforeLoading: number = DEFAULT_DELAY_BEFORE_LOADING,
  minLoadingDuration: number = DEFAULT_MIN_LOADING_DURATION,
): boolean {
  const delayTimeoutRef = useRef<Timeout>(undefined)
  const minLoadingDurationRef = useRef<Timeout>(undefined)

  const [delayedIsLoading, setDelayedIsLoading] = useState(false)
  const [isDelayPassed, setIsDelayPassed] = useState(false)

  if (isLoading && !delayedIsLoading && isDelayPassed) {
    setIsDelayPassed(false)
  }

  if (!isLoading && delayedIsLoading && isDelayPassed) {
    setDelayedIsLoading(false)
    setIsDelayPassed(false)
  }

  useEffect(() => {
    if (isLoading) {
      delayTimeoutRef.current = setTimeout(() => setDelayedIsLoading(true), delayBeforeLoading)
    }

    return () => clearTimeout(delayTimeoutRef.current)
  }, [isLoading, delayBeforeLoading])

  useEffect(() => {
    if (delayedIsLoading) {
      minLoadingDurationRef.current = setTimeout(() => setIsDelayPassed(true), minLoadingDuration)
    }

    return () => clearTimeout(minLoadingDurationRef.current)
  }, [delayedIsLoading, minLoadingDuration])

  return delayedIsLoading
}
