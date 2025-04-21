
export type TreatmentType = {
  icon: string;
  imageUrl: string;
};

export const treatmentTypes: Record<string, TreatmentType> = {
  'children-dentistry': {
    icon: 'children.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  },
  'aesthetic-treatments': {
    icon: 'aesthetic.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'preventive-medicine': {
    icon: 'preventive.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'root-canal': {
    icon: 'root-canal.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'oral-rehabilitation': {
    icon: 'rehabilitation.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'orthodontics': {
    icon: 'orthodontics.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  }
};

export const getTreatmentNameKey = (treatmentType: string): string => {
  switch(treatmentType) {
    case 'children-dentistry': return 'childrenDentistry';
    case 'aesthetic-treatments': return 'aestheticTreatments';
    case 'preventive-medicine': return 'preventiveMedicine';
    case 'root-canal': return 'rootCanal';
    case 'oral-rehabilitation': return 'oralRehabilitation';
    case 'orthodontics': return 'orthodontics';
    default: return '';
  }
};

export const getTreatmentDescKey = (treatmentType: string): string => {
  switch(treatmentType) {
    case 'children-dentistry': return 'childrenDentistryDesc';
    case 'aesthetic-treatments': return 'aestheticTreatmentsDesc';
    case 'preventive-medicine': return 'preventiveMedicineDesc';
    case 'root-canal': return 'rootCanalDesc';
    case 'oral-rehabilitation': return 'oralRehabilitationDesc';
    case 'orthodontics': return 'orthodonticsDesc';
    default: return '';
  }
};
