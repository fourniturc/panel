'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormData } from '@/lib/schema'
import { supabase } from '@/lib/supabase'
import {
  PAYS, TYPE_PROJET, USAGE_PROJET, ETAPE_PROJET,
  TIMING_ACHAT, LOTS, PRIORITE, NIVEAU_FINITION, DOCUMENTS,
} from '@/lib/schema'

// ─── Icon helpers ──────────────────────────────────────────────────────────────
function IconPerson() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M9 3.75H4.5A2.25 2.25 0 002.25 6v15M14.25 3.75h5.25A2.25 2.25 0 0121.75 6v15M9 3.75v17.25M14.25 3.75v17.25M6.75 7.5h.008v.008H6.75V7.5zm0 3.75h.008v.008H6.75v-.008zm0 3.75h.008v.008H6.75v-.008zm6.75-7.5h.008v.008h-.008V7.5zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008z" />
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  )
}
function IconMapPin() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  )
}
function IconEmail() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
function IconRuler() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 10 8">
      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
function IconTelegram() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

// ─── Reusable field components ─────────────────────────────────────────────────
const inputCls = 'w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#152047] focus:ring-1 focus:ring-[#152047] transition-colors'

function FieldLabel({ icon, label, required }: { icon: React.ReactNode; label: string; required?: boolean }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-semibold text-[#152047] uppercase tracking-wide mb-1.5">
      <span className="text-[#d6b98c]">{icon}</span>
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1 text-xs text-red-500">{msg}</p>
}

function CheckboxPill({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer select-none text-sm transition-all ${
        checked ? 'border-[#152047] bg-[#152047] text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-[#152047]'
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
        checked ? 'bg-white border-white' : 'border-gray-300'
      }`}>
        {checked && <svg className="w-2.5 h-2.5" style={{ color: '#152047' }} fill="none" viewBox="0 0 10 8">
          <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>}
      </span>
      {label}
    </label>
  )
}

function RadioPill({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer select-none text-sm transition-all ${
        checked ? 'border-[#152047] bg-[#152047] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-[#152047]'
      }`}
    >
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? 'border-white' : 'border-gray-300'
      }`}>
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </label>
  )
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 rounded-t-xl" style={{ backgroundColor: '#152047' }}>
      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-black shrink-0" style={{ color: '#152047' }}>
        {number}
      </span>
      <h2 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h2>
    </div>
  )
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside className="space-y-4">
      {/* OBJECTIF */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-4 py-3" style={{ backgroundColor: '#152047' }}>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Objectif</h3>
        </div>
        <div className="bg-white px-4 py-4 space-y-2.5">
          {[
            'Comprendre votre projet en détail',
            'Identifier vos besoins réels',
            'Préparer une offre sur mesure',
            'Vous faire gagner du temps',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#d6b98c' }}>
                <IconCheck />
              </span>
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* POURQUOI CES INFORMATIONS */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-4 py-3" style={{ backgroundColor: '#1e2d5a' }}>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Pourquoi ces informations ?</h3>
        </div>
        <div className="bg-white px-4 py-4 space-y-3">
          {[
            { bloc: 'BLOC 1', desc: 'Identifier qui vous êtes et comprendre votre contexte géographique et professionnel.' },
            { bloc: 'BLOC 2', desc: "Évaluer l'urgence et l'avancement du projet pour adapter notre réponse." },
            { bloc: 'BLOC 3', desc: 'Cibler les lots concernés pour vous proposer uniquement ce qui est pertinent.' },
            { bloc: 'BLOC 4', desc: 'Calibrer notre offre selon votre surface, vos ambitions et votre niveau de finition.' },
            { bloc: 'BLOC 5', desc: 'Savoir ce que vous avez déjà pour préparer le chiffrage le plus précis possible.' },
          ].map(({ bloc, desc }) => (
            <div key={bloc}>
              <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded mb-1 uppercase tracking-wider" style={{ backgroundColor: '#f0f4ff', color: '#152047' }}>
                {bloc}
              </span>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* APRÈS LE FORMULAIRE */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-4 py-3" style={{ backgroundColor: '#1e2d5a' }}>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Après le formulaire</h3>
        </div>
        <div className="bg-white px-4 py-4 space-y-3">
          {[
            { n: '01', label: 'Analyse de votre projet par notre équipe' },
            { n: '02', label: 'Orientation stratégique préparée' },
            { n: '03', label: 'Contact WhatsApp sous 24–48h' },
            { n: '04', label: 'Proposition personnalisée envoyée' },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-start gap-3">
              <span className="text-xs font-black shrink-0 mt-0.5" style={{ color: '#d6b98c' }}>{n}</span>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BESOIN D'AIDE */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-4 py-3" style={{ backgroundColor: '#1e2d5a' }}>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Besoin d&apos;aide ?</h3>
        </div>
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-gray-500 mb-3">Une question sur le formulaire ? Contactez-nous directement sur WhatsApp.</p>
          <a
            href="https://wa.me/33600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <IconWhatsApp />
            Contacter sur WhatsApp
          </a>
        </div>
      </div>
    </aside>
  )
}

// ─── Success screen ────────────────────────────────────────────────────────────
function SuccessScreen() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#152047' }} className="px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="text-xs font-black px-2.5 py-1 rounded uppercase tracking-widest" style={{ backgroundColor: '#d6b98c', color: '#152047' }}>BLOC 3</span>
          <span className="text-white font-bold text-lg tracking-wide">FORMULAIRE TALLY</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#d6b98c' }}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-3" style={{ color: '#152047' }}>Merci !</h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            Notre équipe va maintenant analyser votre projet afin de préparer une première orientation stratégique. Vous serez recontacté très rapidement.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-black tracking-widest uppercase" style={{ borderColor: '#d6b98c', color: '#152047' }}>
            <IconShield />
            100% Confidentiel
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: '#152047' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <IconTelegram />
            <span>Building Excellence Africa</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: '#d6b98c' }}>
            <IconShield />
            100% Confidentiel
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Main form ─────────────────────────────────────────────────────────────────
export default function BEAForm({ embed = false }: { embed?: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_prenom: '', societe: '', pays: '', ville: '',
      whatsapp: '', email: '',
      type_projet: [], usage_projet: [],
      etape_projet: '', timing_achat: '',
      lots: [],
      surface: '', nb_appartements: '', priorite: '', niveau_finition: '',
      documents: [],
    },
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { error } = await supabase.from('leads').insert([{
        nom_prenom: data.nom_prenom,
        societe: data.societe || null,
        pays: data.pays,
        ville: data.ville,
        whatsapp: data.whatsapp,
        email: data.email,
        type_projet: data.type_projet,
        usage_projet: data.usage_projet,
        etape_projet: data.etape_projet,
        timing_achat: data.timing_achat,
        lots: data.lots,
        surface: data.surface,
        nb_appartements: data.nb_appartements,
        priorite: data.priorite,
        niveau_finition: data.niveau_finition,
        documents: data.documents,
      }])
      if (error) throw error
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <SuccessScreen />

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f9fa' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      {!embed && (
        <header style={{ backgroundColor: '#152047' }} className="px-6 py-6 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded uppercase tracking-widest" style={{ backgroundColor: '#d6b98c', color: '#152047' }}>
                BLOC 3
              </span>
              <h1 className="text-white font-black text-xl tracking-wide uppercase">
                Formulaire Tally
              </h1>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#d6b98c' }}>
              Qualifier, Comprendre, Préparer
            </p>
          </div>
        </header>
      )}

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── LEFT: FORM SECTIONS ────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* ── SECTION 1 ─ INFORMATIONS GÉNÉRALES ─────────────────────── */}
              <div className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <SectionHeader number="1" title="Informations générales" />
                <div className="bg-white px-5 py-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel icon={<IconPerson />} label="Nom / Prénom" required />
                      <input {...register('nom_prenom')} className={inputCls} placeholder="Jean Dupont" />
                      <FieldError msg={errors.nom_prenom?.message} />
                    </div>
                    <div>
                      <FieldLabel icon={<IconBuilding />} label="Société" />
                      <input {...register('societe')} className={inputCls} placeholder="BEA Construction" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel icon={<IconGlobe />} label="Pays" required />
                      <select {...register('pays')} className={inputCls} defaultValue="">
                        <option value="" disabled>Sélectionner un pays</option>
                        {PAYS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <FieldError msg={errors.pays?.message} />
                    </div>
                    <div>
                      <FieldLabel icon={<IconMapPin />} label="Ville" required />
                      <input {...register('ville')} className={inputCls} placeholder="Abidjan" />
                      <FieldError msg={errors.ville?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel icon={<IconPhone />} label="WhatsApp" required />
                      <input {...register('whatsapp')} className={inputCls} placeholder="+225 07 00 00 00 00" />
                      <FieldError msg={errors.whatsapp?.message} />
                    </div>
                    <div>
                      <FieldLabel icon={<IconEmail />} label="Email" required />
                      <input {...register('email')} type="email" className={inputCls} placeholder="jean@exemple.com" />
                      <FieldError msg={errors.email?.message} />
                    </div>
                  </div>

                  <div>
                    <FieldLabel icon={<IconBuilding />} label="Type de projet" required />
                    <Controller
                      control={control}
                      name="type_projet"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TYPE_PROJET.map((opt) => (
                            <CheckboxPill
                              key={opt} label={opt}
                              checked={field.value.includes(opt)}
                              onChange={() => {
                                const v = field.value.includes(opt)
                                  ? field.value.filter((x) => x !== opt)
                                  : [...field.value, opt]
                                field.onChange(v)
                              }}
                            />
                          ))}
                        </div>
                      )}
                    />
                    <FieldError msg={errors.type_projet?.message} />
                  </div>

                  <div>
                    <FieldLabel icon={<IconBuilding />} label="Usage du projet" />
                    <Controller
                      control={control}
                      name="usage_projet"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {USAGE_PROJET.map((opt) => (
                            <CheckboxPill
                              key={opt} label={opt}
                              checked={(field.value ?? []).includes(opt)}
                              onChange={() => {
                                const cur = field.value ?? []
                                const v = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]
                                field.onChange(v)
                              }}
                            />
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION 2 ─ ÉTAT DU PROJET ──────────────────────────────── */}
              <div className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <SectionHeader number="2" title="État du projet" />
                <div className="bg-white px-5 py-5 space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                      À quelle étape en est votre projet ? <span className="text-red-400">*</span>
                    </p>
                    <Controller
                      control={control}
                      name="etape_projet"
                      render={({ field }) => (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {ETAPE_PROJET.map((opt) => (
                            <RadioPill key={opt} label={opt} checked={field.value === opt} onChange={() => field.onChange(opt)} />
                          ))}
                        </div>
                      )}
                    />
                    <FieldError msg={errors.etape_projet?.message} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                      Quel est votre timing d&apos;achat ? <span className="text-red-400">*</span>
                    </p>
                    <Controller
                      control={control}
                      name="timing_achat"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TIMING_ACHAT.map((opt) => (
                            <RadioPill key={opt} label={opt} checked={field.value === opt} onChange={() => field.onChange(opt)} />
                          ))}
                        </div>
                      )}
                    />
                    <FieldError msg={errors.timing_achat?.message} />
                  </div>
                </div>
              </div>

              {/* ── SECTION 3 ─ LOTS CONCERNÉS ──────────────────────────────── */}
              <div className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <SectionHeader number="3" title="Lots concernés" />
                <div className="bg-white px-5 py-5">
                  <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                    Quels lots vous intéressent ? <span className="text-red-400">*</span>
                  </p>
                  <Controller
                    control={control}
                    name="lots"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {LOTS.map((opt) => (
                          <CheckboxPill
                            key={opt} label={opt}
                            checked={field.value.includes(opt)}
                            onChange={() => {
                              const v = field.value.includes(opt)
                                ? field.value.filter((x) => x !== opt)
                                : [...field.value, opt]
                              field.onChange(v)
                            }}
                          />
                        ))}
                      </div>
                    )}
                  />
                  <FieldError msg={errors.lots?.message} />
                </div>
              </div>

              {/* ── SECTION 4 ─ BUDGET & SURFACE ────────────────────────────── */}
              <div className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <SectionHeader number="4" title="Budget & Surface" />
                <div className="bg-white px-5 py-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel icon={<IconRuler />} label="Surface approximative" required />
                      <input {...register('surface')} className={inputCls} placeholder="Ex: 1500 m²" />
                      <FieldError msg={errors.surface?.message} />
                    </div>
                    <div>
                      <FieldLabel icon={<IconBuilding />} label="Nb appartements / chambres" required />
                      <input {...register('nb_appartements')} className={inputCls} placeholder="Ex: 24 appartements" />
                      <FieldError msg={errors.nb_appartements?.message} />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                      Priorité principale <span className="text-red-400">*</span>
                    </p>
                    <Controller
                      control={control}
                      name="priorite"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRIORITE.map((opt) => (
                            <RadioPill key={opt} label={opt} checked={field.value === opt} onChange={() => field.onChange(opt)} />
                          ))}
                        </div>
                      )}
                    />
                    <FieldError msg={errors.priorite?.message} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                      Niveau de finition <span className="text-red-400">*</span>
                    </p>
                    <Controller
                      control={control}
                      name="niveau_finition"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {NIVEAU_FINITION.map((opt) => (
                            <RadioPill key={opt} label={opt} checked={field.value === opt} onChange={() => field.onChange(opt)} />
                          ))}
                        </div>
                      )}
                    />
                    <FieldError msg={errors.niveau_finition?.message} />
                  </div>
                </div>
              </div>

              {/* ── SECTION 5 ─ DOCUMENTS ───────────────────────────────────── */}
              <div className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <SectionHeader number="5" title="Documents disponibles" />
                <div className="bg-white px-5 py-5">
                  <p className="text-xs font-semibold text-[#152047] uppercase tracking-wide mb-2.5">
                    Quels documents avez-vous déjà ?
                  </p>
                  <Controller
                    control={control}
                    name="documents"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DOCUMENTS.map((opt) => (
                          <CheckboxPill
                            key={opt} label={opt}
                            checked={(field.value ?? []).includes(opt)}
                            onChange={() => {
                              const cur = field.value ?? []
                              const v = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]
                              field.onChange(v)
                            }}
                          />
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* ── SUBMIT ──────────────────────────────────────────────────── */}
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl text-base font-black text-white uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-60 shadow-lg"
                style={{ backgroundColor: '#152047' }}
              >
                {submitting ? 'Envoi en cours…' : '→ Soumettre mon projet'}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <IconShield />
                Informations 100% confidentielles — jamais revendues
              </p>
            </div>

            {/* ── RIGHT: SIDEBAR ─────────────────────────────────────────────── */}
            <div className="w-full lg:w-80 shrink-0">
              <Sidebar />
            </div>

          </div>
        </form>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      {!embed && (
        <footer style={{ backgroundColor: '#152047' }} className="px-6 py-5 mt-4">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <IconTelegram />
              <span>Building Excellence Africa — Formulaire de qualification</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: '#d6b98c' }}>
              <IconShield />
              100% Confidentiel
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
