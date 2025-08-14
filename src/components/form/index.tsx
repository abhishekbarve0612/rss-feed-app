import clsx from 'clsx'
import Input from './input'
import Label from './label'
import Select from './select'
import Textarea from './textarea'
import Checkbox from './checkbox'
import styles from './form.module.css'

export { default as Input } from './input'
export { default as Label } from './label'
export { default as Select } from './select'
export { default as Textarea } from './textarea'
export { default as Checkbox } from './checkbox'

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
  errors?: {
    message: string
  }[]
}

function Form({ children, label, description, errors, ...props }: Props) {
  console.log('logging form props', props)
  return (
    <form
      aria-label={label}
      aria-describedby="form-description"
      className={clsx(styles.form, props.className)}
      {...props}
    >
      {description && (
        <div id="form-description" className="sr-only">
          {description}
        </div>
      )}
      {children}
      {errors && (
        <div role="alert" className={styles.errorMessage}>
          {errors.map((error) => (
            <p key={error.message}>{error.message}</p>
          ))}
        </div>
      )}
    </form>
  )
}

Form.Input = Input
Form.Label = Label
Form.Select = Select
Form.Textarea = Textarea
Form.Checkbox = Checkbox

export default Form
