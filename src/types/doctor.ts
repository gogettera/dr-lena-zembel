
export interface DoctorSpecialty {
  title: string;
  description: string;
}

export interface DoctorInfo {
  name: string;
  title: string;
  education: string;
  languages: string;
  experience: string;
  approach: string;
  profileImage: string;
  specialties: {
    [key: string]: DoctorSpecialty;
  };
  tags: {
    [key: string]: string[];
  };
}

export type TreatmentArea = 
  | 'rehabilitation' 
  | 'preventiveMedicine' 
  | 'childenDentistry' 
  | 'rootCanal' 
  | 'orthodontics'
  | 'aestheticTreatments';
