import React from 'react'

export interface ToggleState {
  on: boolean
  toggle: () => void
}

const ToggleContext = React.createContext<ToggleState>({
  on: false,
  toggle: () => {},
})

export interface ToggleProps {
  children: React.ReactNode | ((state: ToggleState) => React.ReactNode)
  onToggle: (on: boolean) => void
}

function Toggle({ children, onToggle }: ToggleProps) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    setOn((prevOn) => !prevOn)
  }

  React.useEffect(() => {
    onToggle(on)
  }, [on])

  const state = { on, toggle }

  return (
    <ToggleContext.Provider value={state}>
      {typeof children === 'function' ? children(state) : children}
    </ToggleContext.Provider>
  )
}

Toggle.On = function On({ children }: { children: React.ReactNode }) {
  const { on } = React.useContext(ToggleContext)
  return on ? children : null
}

Toggle.Off = function Off({ children }: { children: React.ReactNode }) {
  const { on } = React.useContext(ToggleContext)
  return on ? null : children
}

Toggle.Button = function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle } = React.useContext(ToggleContext)
  return (
    <button onClick={toggle} {...props}>
      {children}
    </button>
  )
}

export default Toggle

export { ToggleContext }
