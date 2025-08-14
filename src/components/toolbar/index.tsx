import clsx from 'clsx'

import ToolbarButton from './ToolbarButton'

import styles from './toolbar.module.css'

interface Props {
  children?: React.ReactNode
  className?: string
}

function Toolbar({ children = null, className = '' }: Props) {
  return <div className={clsx(styles.toolbar, className)}>{children}</div>
}

Toolbar.Left = function ToolbarLeft({ children = null, className = '' }: Props) {
  return <div className={clsx(styles.toolbarLeft, className)}>{children}</div>
}

Toolbar.Right = function ToolbarRight({ children = null, className = '' }: Props) {
  return <div className={clsx(styles.toolbarRight, className)}>{children}</div>
}

Toolbar.Separator = function ToolbarSeparator({ className = '' }: Props) {
  return <div className={clsx(styles.separator, className)} />
}

Toolbar.Button = ToolbarButton

export default Toolbar
