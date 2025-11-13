import { University } from './types';

export const universityData: University[] = [
  {
    id: 'apex',
    name: 'Apex University of Technology',
    slug: 'apex-university',
    location: 'Bangalore, Karnataka',
    logoUrl: 'https://picsum.photos/seed/apexlogo/200/50',
    heroImageUrl: 'https://picsum.photos/seed/apex-campus/1600/900',
    overview: 'Apex University of Technology is a premier institution dedicated to excellence in engineering, science, and management. With state-of-the-art infrastructure and a world-class faculty, we provide a dynamic learning environment that fosters innovation and critical thinking. Our graduates are industry-ready and poised to become leaders in their respective fields.',
    courses: [
      { name: 'B.Tech in Computer Science', duration: '4 Years', description: 'A comprehensive program covering software development, AI, and data science.', feeRange: { min: 800000, max: 1200000 } },
      { name: 'B.Tech in Electronics & Communication', duration: '4 Years', description: 'Focuses on circuit design, communication systems, and embedded systems.', feeRange: { min: 750000, max: 1100000 } },
      { name: 'MBA in Digital Marketing', duration: '2 Years', description: 'Specialized MBA for the modern marketing landscape.', feeRange: { min: 1000000, max: 1500000 } },
      { name: 'B.Sc in Data Science', duration: '3 Years', description: 'Hands-on training in data analysis, machine learning, and big data technologies.', feeRange: { min: 600000, max: 900000 } },
    ],
    placements: {
      highestPackage: '₹45 LPA',
      averagePackage: '₹12 LPA',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Intel', 'Samsung'],
    },
    facilities: ['Advanced Robotics Lab', 'High-Performance Computing Center', 'Digital Library', 'On-campus Hostel', 'Sports Complex', '24/7 Medical Services'],
  },
  {
    id: 'stellar',
    name: 'Stellar Arts University',
    slug: 'stellar-arts-university',
    location: 'Pune, Maharashtra',
    logoUrl: 'https://picsum.photos/seed/stellarlogo/200/50',
    heroImageUrl: 'https://picsum.photos/seed/stellar-campus/1600/900',
    overview: 'Stellar Arts University is a leading creative institution, nurturing the next generation of artists, designers, and storytellers. Our curriculum blends classical techniques with modern technology, taught by renowned artists and industry professionals. We encourage students to find their unique voice and push the boundaries of creative expression.',
    courses: [
      { name: 'B.A. in Fine Arts', duration: '3 Years', description: 'Explore painting, sculpture, and printmaking.', feeRange: { min: 500000, max: 800000 } },
      { name: 'B.Des in Graphic Design', duration: '4 Years', description: 'Master visual communication, branding, and UI/UX design.', feeRange: { min: 900000, max: 1400000 } },
      { name: 'B.A. in Film Making', duration: '3 Years', description: 'A hands-on program in direction, cinematography, and post-production.', feeRange: { min: 1200000, max: 1800000 } },
      { name: 'M.A. in Creative Writing', duration: '2 Years', description: 'Hone your skills in fiction, poetry, and screenwriting.', feeRange: { min: 400000, max: 600000 } },
    ],
    placements: {
      highestPackage: '₹25 LPA',
      averagePackage: '₹8 LPA',
      topRecruiters: ['Disney', 'Pixar', 'Penguin Random House', 'Ogilvy', 'Ubisoft'],
    },
    facilities: ['Professional Film Studio', 'Digital Design Labs', 'Art Gallery & Exhibition Space', 'Pottery & Sculpture Workshop', 'Library of Arts', 'Creative Coworking Spaces'],
  }
];

export const indianStates: string[] = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const intakeYears: string[] = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() + 1).toString(),
    (new Date().getFullYear() + 2).toString()
];


export const PIPEDREAM_ENDPOINT = 'https://eot5a7tkmso6kf4.m.pipedream.net';