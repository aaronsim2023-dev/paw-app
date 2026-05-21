export interface Shelter {
  id: string;
  name: string;
  shortName: string;
  description: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  operatingHours: string[];
  animalTypes: string[];
  logo: string;
  mapUrl: string;
  latitude: number;
  longitude: number;
}

export const SHELTERS: Shelter[] = [
  {
    id: 'spca',
    name: 'SPCA Singapore',
    shortName: 'SPCA',
    description:
      'The Society for the Prevention of Cruelty to Animals (SPCA) Singapore is the island\'s leading animal welfare charity, rehoming thousands of animals every year. They operate Singapore\'s largest animal shelter and provide a wide range of programmes including rehoming, education, and veterinary services.',
    address: '50 Seletar North Link',
    postalCode: '798768',
    phone: '+65 6287 5355',
    email: 'info@spca.org.sg',
    website: 'https://www.spca.org.sg',
    operatingHours: [
      'Mon–Fri: 9:00am – 4:00pm',
      'Sat: 9:00am – 4:00pm',
      'Sun: 9:00am – 1:00pm',
      'Public Holidays: Closed',
    ],
    animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Hamsters', 'Reptiles'],
    logo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
    mapUrl: 'https://maps.google.com/?q=SPCA+Singapore',
    latitude: 1.4024,
    longitude: 103.8687,
  },
  {
    id: 'asd',
    name: 'Action for Singapore Dogs',
    shortName: 'ASD',
    description:
      'Action for Singapore Dogs (ASD) is dedicated to the welfare of Singapore\'s dogs, particularly strays and dogs surrendered by owners. They run an active adoption programme and work tirelessly to find loving homes for every dog in their care through a network of volunteer fosters.',
    address: '10 Sembawang Crescent',
    postalCode: '757932',
    phone: '+65 9111 9159',
    email: 'adopt@asd.org.sg',
    website: 'https://www.asd.org.sg',
    operatingHours: [
      'Sat: 10:00am – 5:00pm',
      'Sun: 10:00am – 5:00pm',
      'Weekdays: By Appointment Only',
    ],
    animalTypes: ['Dogs'],
    logo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=200',
    mapUrl: 'https://maps.google.com/?q=Action+for+Singapore+Dogs',
    latitude: 1.4353,
    longitude: 103.8198,
  },
  {
    id: 'cas',
    name: 'Cat Welfare Society',
    shortName: 'CWS',
    description:
      'The Cat Welfare Society (CWS) is Singapore\'s foremost cat welfare organisation, focused on the Trap-Neuter-Return (TNR) programme for community cats, as well as rehoming abandoned and stray cats. They advocate for humane management of community cats and run active fostering and adoption programmes.',
    address: 'Various community locations across Singapore',
    postalCode: '000000',
    phone: '+65 9027 7613',
    email: 'info@catwelfare.org',
    website: 'https://www.catwelfare.org',
    operatingHours: [
      'Adoption events on weekends',
      'Contact via website for appointments',
    ],
    animalTypes: ['Cats'],
    logo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
    mapUrl: 'https://maps.google.com/?q=Cat+Welfare+Society+Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
  },
  {
    id: 'sosd',
    name: 'Save Our Street Dogs',
    shortName: 'SOSD',
    description:
      'Save Our Street Dogs (SOSD) rescues, rehabilitates, and rehomes stray dogs from Singapore\'s streets. They are a foster-based rescue operating across Singapore, with a dedicated team of volunteers working around the clock to give every dog a second chance at a loving home.',
    address: '51 Eng Kong Place',
    postalCode: '599317',
    phone: '+65 9155 0501',
    email: 'adopt@sosd.org.sg',
    website: 'https://www.sosd.org.sg',
    operatingHours: [
      'Sat: 1:00pm – 5:00pm',
      'Sun: 1:00pm – 5:00pm',
      'Weekdays: By Appointment',
    ],
    animalTypes: ['Dogs'],
    logo: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=200',
    mapUrl: 'https://maps.google.com/?q=SOSD+Singapore',
    latitude: 1.3198,
    longitude: 103.7783,
  },
  {
    id: 'bunny',
    name: 'Bunny Wonderland Singapore',
    shortName: 'Bunny Wonderland',
    description:
      'Bunny Wonderland is Singapore\'s primary rabbit rescue and education organisation. They rehome abandoned rabbits, promote responsible rabbit ownership, and run educational programmes to dispel myths about rabbit care. They also maintain a bunny-proofing guide and resources for new rabbit owners.',
    address: 'Eunos area (contact for exact address)',
    postalCode: '400000',
    phone: '+65 9767 1010',
    email: 'adopt@bunnywonderland.com',
    website: 'https://www.bunnywonderland.com',
    operatingHours: [
      'By Appointment Only',
      'Contact via Facebook for adoption enquiries',
    ],
    animalTypes: ['Rabbits'],
    logo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200',
    mapUrl: 'https://maps.google.com/?q=Bunny+Wonderland+Singapore',
    latitude: 1.3202,
    longitude: 103.8993,
  },
  {
    id: 'hrss',
    name: 'House Rabbit Society Singapore',
    shortName: 'HRSS',
    description:
      'The House Rabbit Society Singapore (HRSS) is a volunteer-run organisation dedicated to the welfare of domestic rabbits. They provide shelter for abandoned rabbits, organise adoption events, and offer resources and education about indoor rabbit care. HRSS believes every rabbit deserves to live as a cherished house pet.',
    address: 'Bishan area (foster-based)',
    postalCode: '570000',
    phone: '+65 9640 3647',
    email: 'contact@hrss.org.sg',
    website: 'https://www.hrss.org.sg',
    operatingHours: [
      'Adoption events monthly',
      'Contact via website for schedule',
    ],
    animalTypes: ['Rabbits'],
    logo: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=200',
    mapUrl: 'https://maps.google.com/?q=House+Rabbit+Society+Singapore',
    latitude: 1.3508,
    longitude: 103.8485,
  },
];
