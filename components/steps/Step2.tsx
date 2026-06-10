'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData, ETAPE_PROJET, TIMING_ACHAT } from '@/lib/schema'
import RadioGroup from '@/components/RadioGroup'

interface Props {
  form: UseFormReturn<FormData>
}

export default function Step2({ form }: Props) {
  const { watch, setValue, formState: { errors } } = form

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-3">
          À quelle étape en est votre projet ? <span className="text-red-400">*</span>
        </label>
        <RadioGroup
          options={ETAPE_PROJET}
          value={watch('etape_projet') ?? ''}
          onChange={(v) => setValue('etape_projet', v, { shouldValidate: true })}
          error={errors.etape_projet?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-3">
          Quel est votre timing d&apos;achat ? <span className="text-red-400">*</span>
        </label>
        <RadioGroup
          options={TIMING_ACHAT}
          value={watch('timing_achat') ?? ''}
          onChange={(v) => setValue('timing_achat', v, { shouldValidate: true })}
          error={errors.timing_achat?.message}
        />
      </div>
    </div>
  )
}
