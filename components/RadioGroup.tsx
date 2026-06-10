'use client'

interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function RadioGroup({ options, value, onChange, error }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const checked = value === opt
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm font-medium select-none ${
                checked
                  ? 'border-[#d6b98c] bg-[#fdf8f2] text-[#152047]'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#d6b98c]'
              }`}
            >
              <input
                type="radio"
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checked ? 'border-[#d6b98c]' : 'border-gray-300'
                }`}
              >
                {checked && <span className="w-2 h-2 rounded-full bg-[#d6b98c]" />}
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
