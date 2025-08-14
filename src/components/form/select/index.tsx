'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './select.module.css'
import { FaCircleChevronDown } from 'react-icons/fa6'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

function Select({ value, onValueChange, children, ...props }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.select} ref={selectRef} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            setIsOpen,
            value,
            onValueChange,
            onKeyDown: handleKeyDown,
          })
        }
        return child
      })}
    </div>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export function SelectTrigger({
  children,
  className = '',
  isOpen,
  setIsOpen,
  onKeyDown,
}: SelectTriggerProps) {
  return (
    <button
      className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''} ${className}`}
      onClick={() => setIsOpen?.(!isOpen)}
      onKeyDown={onKeyDown}
      type="button"
    >
      {children}
      <FaCircleChevronDown className={styles.triggerIcon} />
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
  value?: string
}

function SelectValue({ placeholder, value }: SelectValueProps) {
  return <span>{value || placeholder}</span>
}

interface SelectContentProps {
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  onValueChange?: (value: string) => void
}

function SelectContent({ children, isOpen, setIsOpen, onValueChange }: SelectContentProps) {
  if (!isOpen) return null

  return (
    <div className={styles.content}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            setIsOpen,
            onValueChange,
          })
        }
        return child
      })}
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  setIsOpen?: (open: boolean) => void
  onValueChange?: (value: string) => void
  selectedValue?: string
}

function SelectItem({ value, children, setIsOpen, onValueChange, selectedValue }: SelectItemProps) {
  const handleClick = () => {
    onValueChange?.(value)
    setIsOpen?.(false)
  }

  const isSelected = selectedValue === value

  return (
    <button
      className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  )
}

Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Content = SelectContent
Select.Item = SelectItem

export default Select
