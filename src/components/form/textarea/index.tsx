import clsx from 'clsx'
import styles from './textarea.module.css'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}
function Textarea({ value, onChange, placeholder, className = '', style = {}, ...props }: Props) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(styles.textarea, className)}
      style={style}
      {...props}
    />
  )
}

export default Textarea
