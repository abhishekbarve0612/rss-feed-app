import clsx from 'clsx'

import { Button, Tooltip } from '@/components'
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/button.constants'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  children: React.ReactNode
  tooltip: string
  isActive?: boolean
  className?: string
}

function ToolbarButton({
  onClick,
  children,
  tooltip,
  isActive = false,
  className = '',
  ...props
}: Props) {
  return (
    <Tooltip content={tooltip}>
      <Button
        onClick={onClick}
        variant={isActive ? BUTTON_VARIANTS.default : BUTTON_VARIANTS.ghost}
        size={BUTTON_SIZES.sm}
        aria-label={tooltip}
        className={clsx(className)}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export default ToolbarButton
