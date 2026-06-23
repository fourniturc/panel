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
  priorite: z.array(z.string()).min(1, 'Veuillez sélectionner au moins une priorité'),
  niveau_finition: z.string().min(1, 'Champ requis'),

  // Step 5
  documents: z.array(z.string()),
})

export type FormData = z.infer<typeof formSchema>

// All 54 African countries (French names) with their international dial codes.
export const AFRICAN_COUNTRIES: { name: string; dial: string }[] = [
  { name: 'Afrique du Sud', dial: '+27' },
  { name: 'Algérie', dial: '+213' },
  { name: 'Angola', dial: '+244' },
  { name: 'Bénin', dial: '+229' },
  { name: 'Botswana', dial: '+267' },
  { name: 'Burkina Faso', dial: '+226' },
  { name: 'Burundi', dial: '+257' },
  { name: 'Cameroun', dial: '+237' },
  { name: 'Cap-Vert', dial: '+238' },
  { name: 'Comores', dial: '+269' },
  { name: 'Congo (Brazzaville)', dial: '+242' },
  { name: 'Congo (RDC)', dial: '+243' },
  { name: 'Côte d\'Ivoire', dial: '+225' },
  { name: 'Djibouti', dial: '+253' },
  { name: 'Égypte', dial: '+20' },
  { name: 'Érythrée', dial: '+291' },
  { name: 'Eswatini', dial: '+268' },
  { name: 'Éthiopie', dial: '+251' },
  { name: 'Gabon', dial: '+241' },
  { name: 'Gambie', dial: '+220' },
  { name: 'Ghana', dial: '+233' },
  { name: 'Guinée', dial: '+224' },
  { name: 'Guinée équatoriale', dial: '+240' },
  { name: 'Guinée-Bissau', dial: '+245' },
  { name: 'Kenya', dial: '+254' },
  { name: 'Lesotho', dial: '+266' },
  { name: 'Libéria', dial: '+231' },
  { name: 'Libye', dial: '+218' },
  { name: 'Madagascar', dial: '+261' },
  { name: 'Malawi', dial: '+265' },
  { name: 'Mali', dial: '+223' },
  { name: 'Maroc', dial: '+212' },
  { name: 'Maurice', dial: '+230' },
  { name: 'Mauritanie', dial: '+222' },
  { name: 'Mozambique', dial: '+258' },
  { name: 'Namibie', dial: '+264' },
  { name: 'Niger', dial: '+227' },
  { name: 'Nigéria', dial: '+234' },
  { name: 'Ouganda', dial: '+256' },
  { name: 'République centrafricaine', dial: '+236' },
  { name: 'Rwanda', dial: '+250' },
  { name: 'São Tomé-et-Principe', dial: '+239' },
  { name: 'Sénégal', dial: '+221' },
  { name: 'Seychelles', dial: '+248' },
  { name: 'Sierra Leone', dial: '+232' },
  { name: 'Somalie', dial: '+252' },
  { name: 'Soudan', dial: '+249' },
  { name: 'Soudan du Sud', dial: '+211' },
  { name: 'Tanzanie', dial: '+255' },
  { name: 'Tchad', dial: '+235' },
  { name: 'Togo', dial: '+228' },
  { name: 'Tunisie', dial: '+216' },
  { name: 'Zambie', dial: '+260' },
  { name: 'Zimbabwe', dial: '+263' },
]

export const PAYS = [...AFRICAN_COUNTRIES.map((c) => c.name), 'Autre']

// Quick lookup: country name → dial code.
export const DIAL_CODES: Record<string, string> = Object.fromEntries(
  AFRICAN_COUNTRIES.map((c) => [c.name, c.dial])
)

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
