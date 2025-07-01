
export interface TreatmentInfo {
  slug: string;
  nameKey: string;
  descKey: string;
  hasLandingPage: boolean;
  category: 'general' | 'specialized' | 'aesthetic' | 'pediatric';
  icon: string;
  imageUrl: string;
}

export const treatmentRegistry: Record<string, TreatmentInfo> = {
  'children-dentistry': {
    slug: 'children-dentistry',
    nameKey: 'childrenDentistry.hero.title',
    descKey: 'childrenDentistry.hero.subtitle',
    hasLandingPage: true,
    category: 'pediatric',
    icon: 'children.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  },
  'aesthetic-treatments': {
    slug: 'aesthetic-treatments',
    nameKey: 'aestheticTreatments.hero.title',
    descKey: 'aestheticTreatments.hero.subtitle',
    hasLandingPage: true,
    category: 'aesthetic',
    icon: 'aesthetic.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'preventive-medicine': {
    slug: 'preventive-medicine',
    nameKey: 'preventiveMedicine.hero.title',
    descKey: 'preventiveMedicine.hero.subtitle',
    hasLandingPage: true,
    category: 'general',
    icon: 'preventive.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'root-canal': {
    slug: 'root-canal',
    nameKey: 'rootCanal.hero.title',
    descKey: 'rootCanal.hero.subtitle',
    hasLandingPage: true,
    category: 'specialized',
    icon: 'root-canal.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'oral-rehabilitation': {
    slug: 'oral-rehabilitation',
    nameKey: 'oralRehabilitation.hero.title',
    descKey: 'oralRehabilitation.hero.subtitle',
    hasLandingPage: true,
    category: 'specialized',
    icon: 'rehabilitation.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'orthodontics': {
    slug: 'orthodontics',
    nameKey: 'orthodontics.hero.title',
    descKey: 'orthodontics.hero.subtitle',
    hasLandingPage: true,
    category: 'specialized',
    icon: 'orthodontics.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  },
  'botox-treatments': {
    slug: 'botox-treatments',
    nameKey: 'botoxTreatments.hero.title',
    descKey: 'botoxTreatments.hero.subtitle',
    hasLandingPage: false,
    category: 'aesthetic',
    icon: 'botox.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  }
};

export const getTreatmentInfo = (slug: string): TreatmentInfo | null => {
  return treatmentRegistry[slug] || null;
};

export const getAllTreatments = (): TreatmentInfo[] => {
  return Object.values(treatmentRegistry);
};

export const getTreatmentsByCategory = (category: TreatmentInfo['category']): TreatmentInfo[] => {
  return Object.values(treatmentRegistry).filter(t => t.category === category);
};
