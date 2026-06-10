'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData, PRIORITE, NIVEAU_FINITION } from '@/lib/schema'
import RadioGroup from '@/components/RadioGroup'

interface Props {
  form: UseFormReturn<FormData>
}

const inputClass = `w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d6b98c] focus:ring-1 focus:ring-[#d6b98c] transition-colors`

export default function Step4({ form }: Props) {
  const { register, watch, setValue, formState: { errors } } = form

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-1">
          Surface approximative du projet <span className="text-red-400">*</span>
        </label>
        <input {...register('surface')} className={inputClass} placeholder="Ex: 1500 m²" />
        {errors.surface && <p className="mt-1 text-xs text-red-500">{errors.surface.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-1">
          Nombre d&apos;appartements / chambres <span className="text-red-400">*</span>
        </label>
        <input {...register('nb_appartements')} className={inputClass} placeholder="Ex: 24 appartements ou 36 chambres" />
        {errors.nb_appartements && <p className="mt-1 text-xs text-red-500">{errors.nb_appartements.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-3">
          Quelle est votre priorité principale ? <span className="text-red-400">*</span>
        </label>
        <RadioGroup
          options={PRIORITE}
          value={watch('priorite') ?? ''}
          onChange={(v) => setValue('priorite', v, { shouldValidate: true })}
          error={errors.priorite?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-3">
          Niveau de finition recherché <span className="text-red-400">*</span>
        </label>
        <RadioGroup
          options={NIVEAU_FINITION}
          value={watch('niveau_finition') ?? ''}
          onChange={(v) => setValue('niveau_finition', v, { shouldValidate: true })}
          error={errors.niveau_finition?.message}
        />
      </div>
    </div>
  )
}
