'use client'

import { STEP_LABELS } from '@/lib/schema'

interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: '#152047' }}>
          Étape {current} sur {total}
        </span>
        <span className="text-sm font-medium" style={{ color: '#d6b98c' }}>
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: '#d6b98c' }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
        {STEP_LABELS[current - 1]}
      </p>
    </div>
  )
}
