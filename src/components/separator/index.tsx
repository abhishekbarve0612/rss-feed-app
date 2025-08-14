import clsx from 'clsx'
import styles from './separator.module.css'

const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const

type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION]

interface Props {
  orientation?: Orientation
  className?: string
}

function Separator({ orientation = ORIENTATION.HORIZONTAL, className = '' }: Props) {
  return <div className={clsx(styles[orientation], className)} />
}

export default Separator
