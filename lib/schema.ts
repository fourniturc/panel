import { z } from 'zod'

export const formSchema = z.object({
  // Step 1
  nom_prenom: z.string().min(2, 'Champ requis'),
  societe: z.string().optional(),
  pays: z.string().min(1, 'Veuillez sélectionner un pays'),
  ville: z.string().min(1, 'Champ requis'),
  whatsapp: z.string().min(1, 'Champ requis'),
  email: z.string().email('Email invalide'),
  type_projet: z.array(z.string()).min(1, 'Veuillez sélectionner au moins un type'),
  usage_projet: z.array(z.string()),

  // Step 2
  etape_projet: z.string().min(1, 'Champ requis'),
  timing_achat: z.string().min(1, 'Champ requis'),

  // Step 3
  lots: z.array(z.string()).min(1, 'Veuillez sélectionner au moins un lot'),

  // Step 4
  surface: z.string().min(1, 'Champ requis'),
  nb_appartements: z.string().min(1, 'Champ requis'),
  priorite: z.string().min(1, 'Champ requis'),
  niveau_finition: z.string().min(1, 'Champ requis'),

  // Step 5
  documents: z.array(z.string()),
})

export type FormData = z.infer<typeof formSchema>

export const PAYS = [
  'Sénégal', 'Côte d\'Ivoire', 'Maroc', 'Cameroun',
  'Mauritanie', 'Guinée', 'Autre',
]

export const TYPE_PROJET = [
  'Immeuble', 'Résidence', 'Villa', 'Hôtel',
  'Bureau', 'Commerce', 'Airbnb', 'Autre',
]

export const USAGE_PROJET = [
  'Résidence personnelle', 'Investissement locatif',
  'Airbnb / Location courte durée', 'VEFA',
  'Revente / Marchand de biens', 'Bureau / Commerce',
  'Hôtel', 'Autre',
]

export const ETAPE_PROJET = [
  'Réflexion / Idée', 'Plans en cours', 'Gros œuvre',
  'Second œuvre', 'Achat imminent',
]

export const TIMING_ACHAT = [
  'Moins d\'1 mois', '1 à 3 mois', '3 à 6 mois', 'Plus de 6 mois',
]

export const LOTS = [
  'Carrelage', 'Portes intérieures', 'Portes extérieures',
  'Aluminium / Menuiserie', 'Cuisine', 'Dressing / Placards',
  'Sanitaires', 'Mobilier', 'Éclairage', 'Autre',
]

export const PRIORITE = [
  'Optimisation budget', 'Rapport qualité/prix', 'Design / esthétique',
  'Durabilité / longévité', 'Délais rapides', 'Standing premium', 'Autre',
]

export const NIVEAU_FINITION = ['Standard', 'Premium', 'Haut de gamme', 'Luxe']

export const DOCUMENTS = [
  'DQE', 'Plans PDF', 'DWG', 'Moodboard',
  'Photos chantier', 'Inspirations', 'Aucun pour le moment',
]

export const STEP_LABELS = [
  'Informations générales',
  'État du projet',
  'Lots concernés',
  'Budget & Surface',
  'Documents',
]
