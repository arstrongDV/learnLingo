import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import style from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  /** Text shown in the closed select, e.g. "30 $" for the option "30" */
  formatSelected?: (option: SelectOption) => string
  className?: string
}

/**
 * Custom select following the WAI-ARIA "select-only combobox" pattern:
 * focus stays on the button, arrow keys move the active option.
 */
const Select = ({ label, value, options, onChange, formatSelected, className }: SelectProps) => {
  const id = useId()
  const labelId = `${id}-label`
  const listId = `${id}-list`
  const optionId = (index: number) => `${id}-option-${index}`

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedIndex = Math.max(0, options.findIndex(option => option.value === value))
  const selectedOption = options[selectedIndex]

  // Close when clicking anywhere outside the select
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const open = () => {
    setActiveIndex(selectedIndex)
    setIsOpen(true)
  }

  const selectOption = (index: number) => {
    onChange(options[index].value)
    setIsOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        open()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(index => Math.min(index + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(index => Math.max(index - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        selectOption(activeIndex)
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className={`${style.select} ${className ?? ''}`}>
      <span id={labelId} className={style.label}>{label}</span>

      <button
        type='button'
        role='combobox'
        className={style.trigger}
        aria-labelledby={labelId}
        aria-haspopup='listbox'
        aria-controls={listId}
        aria-expanded={isOpen}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
      >
        <span className={style.value}>
          {selectedOption && (formatSelected ? formatSelected(selectedOption) : selectedOption.label)}
        </span>

        <svg
          className={`${style.chevron} ${isOpen ? style.chevronOpen : ''}`}
          width={20}
          height={20}
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path d='M5 7.5l5 5 5-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>
    
      {isOpen && (
        <ul id={listId} role='listbox' aria-labelledby={labelId} className={style.list}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={optionId(index)}
              role='option'
              aria-selected={index === selectedIndex}
              className={`${style.option} ${index === activeIndex ? style.optionActive : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              // pointerdown keeps focus on the button instead of moving it to the list
              onPointerDown={e => e.preventDefault()}
              onClick={() => selectOption(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
