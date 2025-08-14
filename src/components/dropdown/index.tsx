import clsx from 'clsx'
import Toggle from '@components/toggle'
import styles from './menu.module.css'
import Button from '../button'

export interface MenuProps {
  children: React.ReactNode
  onOpen: (open: boolean) => void
  className?: string
}

function Menu({ children, onOpen, className }: MenuProps) {
  return (
    <Toggle onToggle={onOpen}>
      <div className={clsx(styles.menu, className)}>{children}</div>
    </Toggle>
  )
}

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

Menu.Button = function MenuButton({ children, className, ...props }: MenuButtonProps) {
  return (
    <Toggle.Button className={clsx(styles.trigger, className)} {...props}>
      {children}
    </Toggle.Button>
  )
}

interface MenuItemProps {
  children: React.ReactNode
  className?: string
  isDestructive?: boolean
}

Menu.Item = function MenuItem({ children, className, isDestructive }: MenuItemProps) {
  return (
    <Button
      className={clsx(styles.item, isDestructive && styles.itemDestructive, className)}
      variant="ghost"
      size="sm"
    >
      {children}
    </Button>
  )
}

interface MenuDropdownProps {
  children: React.ReactNode
  className?: string
}

Menu.Dropdown = function MenuDropdown({ children, className }: MenuDropdownProps) {
  return (
    <Toggle.On>
      <div className={clsx(styles.content, className)}>{children}</div>
    </Toggle.On>
  )
}

export default Menu
