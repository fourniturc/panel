'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData, PAYS, TYPE_PROJET, USAGE_PROJET } from '@/lib/schema'
import CheckboxGroup from '@/components/CheckboxGroup'

interface Props {
  form: UseFormReturn<FormData>
}

const inputClass = `w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d6b98c] focus:ring-1 focus:ring-[#d6b98c] transition-colors`

export default function Step1({ form }: Props) {
  const { register, watch, setValue, formState: { errors } } = form

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-1">
          Nom / Prénom <span className="text-red-400">*</span>
        </label>
        <input {...register('nom_prenom')} className={inputClass} placeholder="Jean Dupont" />
        {errors.nom_prenom && <p className="mt-1 text-xs text-red-500">{errors.nom_prenom.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-1">Société</label>
        <input {...register('societe')} className={inputClass} placeholder="BEA Construction" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#152047] mb-1">
            Pays <span className="text-red-400">*</span>
          </label>
          <select {...register('pays')} className={inputClass} defaultValue="">
            <option value="" disabled>Sélectionner</option>
            {PAYS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.pays && <p className="mt-1 text-xs text-red-500">{errors.pays.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#152047] mb-1">
            Ville <span className="text-red-400">*</span>
          </label>
          <input {...register('ville')} className={inputClass} placeholder="Abidjan" />
          {errors.ville && <p className="mt-1 text-xs text-red-500">{errors.ville.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#152047] mb-1">
            WhatsApp <span className="text-red-400">*</span>
          </label>
          <input {...register('whatsapp')} className={inputClass} placeholder="+225 07 00 00 00 00" />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#152047] mb-1">
            Email <span className="text-red-400">*</span>
          </label>
          <input {...register('email')} type="email" className={inputClass} placeholder="jean@exemple.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-2">
          Type de projet <span className="text-red-400">*</span>
        </label>
        <CheckboxGroup
          options={TYPE_PROJET}
          value={watch('type_projet') ?? []}
          onChange={(v) => setValue('type_projet', v, { shouldValidate: true })}
          error={errors.type_projet?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#152047] mb-2">
          Usage du projet
        </label>
        <CheckboxGroup
          options={USAGE_PROJET}
          value={watch('usage_projet') ?? []}
          onChange={(v) => setValue('usage_projet', v, { shouldValidate: true })}
        />
      </div>
    </div>
  )
}
