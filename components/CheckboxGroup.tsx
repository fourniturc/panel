'use client'

interface Props {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

export default function CheckboxGroup({ options, value, onChange, error }: Props) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const checked = value.includes(opt)
          return (
            <label
              key={opt}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all text-sm font-medium select-none ${
                checked
                  ? 'border-[#d6b98c] bg-[#fdf8f2] text-[#152047]'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#d6b98c]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt)}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  checked ? 'bg-[#d6b98c] border-[#d6b98c]' : 'border-gray-300'
                }`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {opt}
            </label>
          )
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
