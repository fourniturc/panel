'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData, DOCUMENTS } from '@/lib/schema'
import CheckboxGroup from '@/components/CheckboxGroup'

interface Props {
  form: UseFormReturn<FormData>
}

export default function Step5({ form }: Props) {
  const { watch, setValue } = form

  return (
    <div>
      <label className="block text-sm font-semibold text-[#152047] mb-3">
        Disposez-vous actuellement des éléments suivants ?
      </label>
      <CheckboxGroup
        options={DOCUMENTS}
        value={watch('documents') ?? []}
        onChange={(v) => setValue('documents', v)}
      />
    </div>
  )
}
