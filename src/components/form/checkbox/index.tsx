import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa6'
import styles from './checkbox.module.css'

interface CheckboxProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

function Checkbox({ checked, onCheckedChange, className = '', ...props }: CheckboxProps) {
  const handleClick = () => {
    onCheckedChange(!checked)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onCheckedChange(!checked)
    }
  }

  return (
    <button
      className={clsx(styles.checkbox, checked && styles.checkboxChecked, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="checkbox"
      aria-checked={checked}
      {...props}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        className={styles.checkboxInput}
        tabIndex={-1}
      />
      <FaCheck className={styles.checkboxIcon} />
    </button>
  )
}

export default Checkbox
