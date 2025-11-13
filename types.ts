
export interface Course {
  name: string;
  duration: string;
  description: string;
  feeRange: {
    min: number;
    max: number;
  };
}

export interface University {
  id: string;
  name: string;
  slug: string;
  location: string;
  logoUrl: string;
  heroImageUrl: string;
  overview: string;
  courses: Course[];
  placements: {
    highestPackage: string;
    averagePackage: string;
    topRecruiters: string[];
  };
  facilities: string[];
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  course: string;
  intakeYear: string;
  consent: boolean;
}
