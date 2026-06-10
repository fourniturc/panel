'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData, LOTS } from '@/lib/schema'
import CheckboxGroup from '@/components/CheckboxGroup'

interface Props {
  form: UseFormReturn<FormData>
}

export default function Step3({ form }: Props) {
  const { watch, setValue, formState: { errors } } = form

  return (
    <div>
      <label className="block text-sm font-semibold text-[#152047] mb-3">
        Quels lots vous intéressent ? <span className="text-red-400">*</span>
      </label>
      <CheckboxGroup
        options={LOTS}
        value={watch('lots') ?? []}
        onChange={(v) => setValue('lots', v, { shouldValidate: true })}
        error={errors.lots?.message}
      />
    </div>
  )
}
