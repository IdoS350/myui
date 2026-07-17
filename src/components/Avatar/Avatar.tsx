import { type SlotProps } from '@/lib/slotProps'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import Primitives from './primitives'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarColor = 'neutral' | 'blue' | 'green' | 'amber' | 'red'

const AvatarRoot = Primitives.Root
const AvatarImage = Primitives.Image
const AvatarFallback = Primitives.Fallback

export interface AvatarProps
  extends
    Omit<BaseAvatar.Root.Props, 'children'>,
    SlotProps<typeof BaseAvatar, 'image' | 'fallback'> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  size?: AvatarSize
  shape?: AvatarShape
  color?: AvatarColor
}

function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  color = 'neutral',
  imageProps,
  fallbackProps,
  ...props
}: AvatarProps) {
  return (
    <Primitives.Root data-size={size} data-shape={shape} data-color={color} {...props}>
      {src && <Primitives.Image src={src} alt={alt ?? ''} loading='lazy' {...imageProps} />}
      <Primitives.Fallback delay={src ? 600 : 0} {...fallbackProps}>
        {fallback}
      </Primitives.Fallback>
    </Primitives.Root>
  )
}

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot }
