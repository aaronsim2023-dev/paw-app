// ─── Shared ───────────────────────────────────────────────────────────────────

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// ─── Vet Clinics ──────────────────────────────────────────────────────────────

export interface VetClinic {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  hours: string[];
  emergency24hr: boolean;
  rating: number;
  reviewCount: number;
  services: string[];
  specialties: string[];
  photo: string;
  mapUrl: string;
  website: string;
}

export const VET_CLINICS: VetClinic[] = [
  {
    id: 'v1',
    name: 'Mount Pleasant Animal Medical Centre',
    address: '232 Whitley Road, S297824',
    area: 'Novena',
    phone: '+65 6250 8333',
    hours: ['Mon–Fri: 8:30am – 6:30pm', 'Sat: 8:30am – 1:00pm', 'Sun: Closed'],
    emergency24hr: false,
    rating: 4.7,
    reviewCount: 412,
    services: ['General Consultation', 'Surgery', 'Dental', 'X-Ray', 'Ultrasound', 'Grooming'],
    specialties: ['Dogs', 'Cats', 'Rabbits', 'Birds'],
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
    mapUrl: 'https://maps.google.com/?q=Mount+Pleasant+Animal+Medical+Centre+Singapore',
    website: 'https://www.mountpleasant.com.sg',
  },
  {
    id: 'v2',
    name: 'The Animal Clinic',
    address: '1 Jalan Anak Bukit #01-02, S588996',
    area: 'Bukit Timah',
    phone: '+65 6468 1700',
    hours: ['Mon–Fri: 9:00am – 7:00pm', 'Sat–Sun: 9:00am – 1:00pm'],
    emergency24hr: false,
    rating: 4.8,
    reviewCount: 287,
    services: ['Consultation', 'Surgery', 'Dental', 'Dermatology', 'Oncology', 'Ophthalmology'],
    specialties: ['Dogs', 'Cats'],
    photo: 'https://images.unsplash.com/photo-1559523161-0fc0d8b814c0?w=600',
    mapUrl: 'https://maps.google.com/?q=The+Animal+Clinic+Bukit+Timah+Singapore',
    website: 'https://www.theanimalclinic.com.sg',
  },
  {
    id: 'v3',
    name: 'Amber Veterinary Practice',
    address: '159 East Coast Road, S428875',
    area: 'Katong',
    phone: '+65 6440 9197',
    hours: ['Mon–Fri: 9:00am – 6:00pm', 'Sat: 9:00am – 1:00pm', 'Sun: Closed'],
    emergency24hr: false,
    rating: 4.6,
    reviewCount: 198,
    services: ['Consultation', 'Vaccination', 'Dental', 'Surgery', 'Microchipping'],
    specialties: ['Dogs', 'Cats', 'Small Mammals'],
    photo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600',
    mapUrl: 'https://maps.google.com/?q=Amber+Veterinary+Practice+Singapore',
    website: 'https://www.ambervet.com',
  },
  {
    id: 'v4',
    name: 'Animal Recovery Centre',
    address: '354 Clementi Avenue 2, S120354',
    area: 'Clementi',
    phone: '+65 6777 1101',
    hours: ['Open 24 Hours, 7 Days a Week'],
    emergency24hr: true,
    rating: 4.5,
    reviewCount: 523,
    services: ['Emergency Care', 'ICU', 'Surgery', 'Consultation', 'Radiology', 'Blood Bank'],
    specialties: ['Dogs', 'Cats', 'Exotic'],
    photo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600',
    mapUrl: 'https://maps.google.com/?q=Animal+Recovery+Centre+Clementi+Singapore',
    website: 'https://www.arc.com.sg',
  },
  {
    id: 'v5',
    name: 'Peace Avenue Animal Hospital',
    address: '9 Peace Avenue, S000129',
    area: 'Toa Payoh',
    phone: '+65 6353 1300',
    hours: ['Open 24 Hours, 7 Days a Week'],
    emergency24hr: true,
    rating: 4.4,
    reviewCount: 367,
    services: ['Emergency', 'Consultation', 'Surgery', 'Dental', 'Orthopaedics', 'Neurology'],
    specialties: ['Dogs', 'Cats'],
    photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    mapUrl: 'https://maps.google.com/?q=Peace+Avenue+Animal+Hospital+Singapore',
    website: 'https://www.peaceave.com.sg',
  },
  {
    id: 'v6',
    name: 'Animal & Avian Veterinary Clinic',
    address: '31 Jalan Bukit Merah, S169567',
    area: 'Bukit Merah',
    phone: '+65 6276 1549',
    hours: ['Mon–Fri: 9:00am – 6:00pm', 'Sat: 9:00am – 12:30pm', 'Sun: Closed'],
    emergency24hr: false,
    rating: 4.7,
    reviewCount: 144,
    services: ['Avian Consultation', 'General Practice', 'Exotic Pets', 'Surgery'],
    specialties: ['Birds', 'Reptiles', 'Exotic', 'Dogs', 'Cats'],
    photo: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600',
    mapUrl: 'https://maps.google.com/?q=Animal+Avian+Vet+Clinic+Singapore',
    website: 'https://www.aavs.com.sg',
  },
  {
    id: 'v7',
    name: 'Sincere Vet Clinic (Yishun)',
    address: '930 Yishun Ave 2 #01-169, S760930',
    area: 'Yishun',
    phone: '+65 6759 0011',
    hours: ['Mon–Sat: 9:00am – 5:00pm', 'Sun: 9:00am – 12:00pm'],
    emergency24hr: false,
    rating: 4.3,
    reviewCount: 211,
    services: ['Consultation', 'Vaccination', 'Sterilisation', 'Dental', 'Microchipping'],
    specialties: ['Dogs', 'Cats', 'Rabbits'],
    photo: 'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=600',
    mapUrl: 'https://maps.google.com/?q=Sincere+Vet+Clinic+Yishun+Singapore',
    website: 'https://www.sincerevc.com.sg',
  },
  {
    id: 'v8',
    name: 'Westway Veterinary Clinic',
    address: '3 Westway #01-41, S648886',
    area: 'Jurong East',
    phone: '+65 6565 3900',
    hours: ['Mon–Fri: 9:00am – 7:00pm', 'Sat–Sun: 9:00am – 2:00pm'],
    emergency24hr: false,
    rating: 4.5,
    reviewCount: 178,
    services: ['General Practice', 'Surgery', 'Dental Scaling', 'X-Ray', 'Grooming'],
    specialties: ['Dogs', 'Cats', 'Hamsters'],
    photo: 'https://images.unsplash.com/photo-1617896848219-75a4e2c48cf2?w=600',
    mapUrl: 'https://maps.google.com/?q=Westway+Veterinary+Clinic+Jurong',
    website: 'https://www.westwayvet.com.sg',
  },
  {
    id: 'v9',
    name: 'All Paws Veterinary Clinic',
    address: '10 Tampines Central 1 #01-15, S529536',
    area: 'Tampines',
    phone: '+65 6783 5808',
    hours: ['Mon–Fri: 9:00am – 6:00pm', 'Sat: 9:00am – 1:00pm', 'Sun: Closed'],
    emergency24hr: false,
    rating: 4.6,
    reviewCount: 259,
    services: ['Consultation', 'Surgery', 'Ultrasound', 'Dental', 'In-house Lab'],
    specialties: ['Dogs', 'Cats', 'Rabbits', 'Guinea Pigs'],
    photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    mapUrl: 'https://maps.google.com/?q=All+Paws+Vet+Tampines+Singapore',
    website: 'https://www.allpawsvet.com.sg',
  },
  {
    id: 'v10',
    name: 'East Coast Veterinary Clinic',
    address: '88 East Coast Road #01-05, S428790',
    area: 'East Coast',
    phone: '+65 6348 5100',
    hours: ['Mon–Fri: 9:00am – 7:00pm', 'Sat–Sun: 9:00am – 3:00pm'],
    emergency24hr: false,
    rating: 4.4,
    reviewCount: 193,
    services: ['General Practice', 'Vaccination', 'Dental', 'Sterilisation', 'Health Screening'],
    specialties: ['Dogs', 'Cats'],
    photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    mapUrl: 'https://maps.google.com/?q=East+Coast+Veterinary+Clinic+Singapore',
    website: 'https://www.ecvet.com.sg',
  },
  {
    id: 'v11',
    name: 'ARC (24Hr) — Novena',
    address: '10 Sinaran Drive #09-02, S307506',
    area: 'Novena',
    phone: '+65 6258 2225',
    hours: ['Open 24 Hours, 7 Days a Week'],
    emergency24hr: true,
    rating: 4.6,
    reviewCount: 441,
    services: ['Emergency & Critical Care', 'Surgery', 'MRI', 'CT Scan', 'Cardiology'],
    specialties: ['Dogs', 'Cats'],
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
    mapUrl: 'https://maps.google.com/?q=ARC+Novena+Singapore',
    website: 'https://www.arc.com.sg',
  },
];

// ─── Groomers ─────────────────────────────────────────────────────────────────

export interface PricingTier {
  label: string;
  price: number;
  includes: string[];
}

export interface Groomer {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  rating: number;
  reviewCount: number;
  petTypes: string[];
  pricing: { basic: PricingTier; full: PricingTier; premium?: PricingTier };
  photos: string[];
  hours: string;
  mapUrl: string;
  featured: boolean;
}

export const GROOMERS: Groomer[] = [
  {
    id: 'g1',
    name: 'The Wagington',
    address: '15 Scotts Road, S228218',
    area: 'Orchard',
    phone: '+65 6694 6600',
    rating: 4.9,
    reviewCount: 512,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 65, includes: ['Shampoo', 'Blow dry', 'Ear cleaning', 'Nail trim'] },
      full: { label: 'Full Groom', price: 95, includes: ['Full bath', 'Breed cut', 'Styling', 'Teeth brushing', 'Paw treatment'] },
      premium: { label: 'Luxury Spa', price: 145, includes: ['All full groom services', 'Deep conditioning mask', 'Aromatherapy', 'Blueberry facial', 'Paw balm'] },
    },
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
    hours: 'Daily: 10:00am – 8:00pm',
    mapUrl: 'https://maps.google.com/?q=The+Wagington+Orchard+Singapore',
    featured: true,
  },
  {
    id: 'g2',
    name: 'Pawsome Groomers',
    address: '284 Bishan Street 22 #01-193, S570284',
    area: 'Bishan',
    phone: '+65 8812 3344',
    rating: 4.6,
    reviewCount: 228,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 35, includes: ['Shampoo', 'Blow dry', 'Nail trim'] },
      full: { label: 'Full Groom', price: 60, includes: ['Bath', 'Haircut', 'Ear cleaning', 'Nail trim'] },
      premium: { label: 'Premium', price: 85, includes: ['All full groom', 'De-shedding', 'Teeth brushing', 'Paw massage'] },
    },
    photos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600'],
    hours: 'Mon–Sat: 10:00am – 7:00pm | Sun: 10:00am – 5:00pm',
    mapUrl: 'https://maps.google.com/?q=Pawsome+Groomers+Bishan+Singapore',
    featured: true,
  },
  {
    id: 'g3',
    name: 'Fluffy Friends Salon',
    address: '418 Bedok North Ave 2 #01-56, S460418',
    area: 'Bedok',
    phone: '+65 9234 5678',
    rating: 4.5,
    reviewCount: 165,
    petTypes: ['Dogs', 'Rabbits'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 30, includes: ['Shampoo', 'Blow dry', 'Nail trim'] },
      full: { label: 'Full Groom', price: 55, includes: ['Bath', 'Trim', 'Ear cleaning', 'Nail clip'] },
    },
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
    hours: 'Tue–Sun: 10:00am – 6:00pm | Mon: Closed',
    mapUrl: 'https://maps.google.com/?q=Fluffy+Friends+Salon+Bedok+Singapore',
    featured: false,
  },
  {
    id: 'g4',
    name: 'Happy Paws Grooming',
    address: '501 West Coast Drive #01-111, S120501',
    area: 'West Coast',
    phone: '+65 9876 4321',
    rating: 4.4,
    reviewCount: 142,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 32, includes: ['Medicated shampoo', 'Blow dry', 'Nail trim'] },
      full: { label: 'Full Groom', price: 58, includes: ['Bath', 'Haircut', 'Ear cleaning', 'Paw trim'] },
      premium: { label: 'Spa Package', price: 80, includes: ['All full groom', 'Oatmeal bath', 'Cologne spritz', 'Bandana'] },
    },
    photos: ['https://images.unsplash.com/photo-1616587894289-86480e533129?w=600'],
    hours: 'Mon–Sun: 9:00am – 6:00pm',
    mapUrl: 'https://maps.google.com/?q=Happy+Paws+Grooming+West+Coast+Singapore',
    featured: false,
  },
  {
    id: 'g5',
    name: 'Cat & Dog Studio',
    address: '177 Toa Payoh Central #01-128, S310177',
    area: 'Toa Payoh',
    phone: '+65 8765 1234',
    rating: 4.7,
    reviewCount: 296,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 38, includes: ['Shampoo', 'Conditioner', 'Blow dry', 'Nail trim'] },
      full: { label: 'Full Groom', price: 65, includes: ['Bath', 'Breed-specific cut', 'Ear cleaning', 'Teeth brushing'] },
      premium: { label: 'Platinum Spa', price: 98, includes: ['All full groom', 'Collagen treatment', 'Paw balm', 'Aromatherapy bath'] },
    },
    photos: ['https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600'],
    hours: 'Mon–Sun: 10:00am – 7:30pm',
    mapUrl: 'https://maps.google.com/?q=Cat+Dog+Studio+Toa+Payoh+Singapore',
    featured: true,
  },
  {
    id: 'g6',
    name: 'Woof & Whiskers Grooming',
    address: '311 New Upper Changi Rd #01-07, S467360',
    area: 'Bedok / Changi',
    phone: '+65 9123 7890',
    rating: 4.3,
    reviewCount: 107,
    petTypes: ['Dogs', 'Cats', 'Rabbits'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 28, includes: ['Shampoo', 'Blow dry'] },
      full: { label: 'Full Groom', price: 52, includes: ['Bath', 'Trim', 'Ear & nail care'] },
    },
    photos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600'],
    hours: 'Tue–Sun: 10:00am – 6:00pm',
    mapUrl: 'https://maps.google.com/?q=Woof+Whiskers+Grooming+Changi+Singapore',
    featured: false,
  },
  {
    id: 'g7',
    name: 'Fluff & Buff Pet Grooming',
    address: '8 Woodlands Square #02-14, S737808',
    area: 'Woodlands',
    phone: '+65 9345 6789',
    rating: 4.5,
    reviewCount: 183,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Blow', price: 30, includes: ['Shampoo', 'Conditioner', 'Blow dry', 'Nail trim'] },
      full: { label: 'Full Groom', price: 55, includes: ['Bath', 'Haircut', 'Ear clean', 'Paw trim'] },
      premium: { label: 'Spa Day', price: 82, includes: ['All full groom', 'Deep conditioning', 'Paw scrub', 'De-shed treatment'] },
    },
    photos: ['https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600'],
    hours: 'Mon–Sat: 9:30am – 6:30pm | Sun: Closed',
    mapUrl: 'https://maps.google.com/?q=Fluff+Buff+Grooming+Woodlands+Singapore',
    featured: false,
  },
  {
    id: 'g8',
    name: 'The Paw Parlour',
    address: '1 Harbourfront Walk #02-100, S098585',
    area: 'VivoCity / HarbourFront',
    phone: '+65 6376 8120',
    rating: 4.8,
    reviewCount: 388,
    petTypes: ['Dogs', 'Cats'],
    pricing: {
      basic: { label: 'Bath & Dry', price: 55, includes: ['Premium shampoo', 'Blow dry', 'Nail grind'] },
      full: { label: 'Full Groom', price: 88, includes: ['Bath', 'Scissor finish', 'Ear & eye care', 'Teeth brushing'] },
      premium: { label: 'Ultimate Spa', price: 130, includes: ['All full groom', 'Keratin treatment', 'Blueberry facial', 'Paw manicure', 'Bandana & bow'] },
    },
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600'],
    hours: 'Daily: 11:00am – 9:00pm',
    mapUrl: 'https://maps.google.com/?q=The+Paw+Parlour+VivoCity+Singapore',
    featured: true,
  },
];

// ─── Boarding ─────────────────────────────────────────────────────────────────

export interface BoardingFacility {
  id: string;
  name: string;
  type: 'facility' | 'sitter';
  address: string;
  area: string;
  phone: string;
  rating: number;
  reviewCount: number;
  petTypes: string[];
  pricePerNight: number;
  capacity: string;
  indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  photos: string[];
  amenities: string[];
  mapUrl: string;
  description: string;
  featured: boolean;
}

export const BOARDING: BoardingFacility[] = [
  {
    id: 'b1',
    name: 'The Wagington Luxury Pet Hotel',
    type: 'facility',
    address: '15 Scotts Road, S228218',
    area: 'Orchard',
    phone: '+65 6694 6600',
    rating: 4.9,
    reviewCount: 634,
    petTypes: ['Dogs', 'Cats'],
    pricePerNight: 120,
    capacity: '40 suites',
    indoorOutdoor: 'indoor',
    photos: ['https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600'],
    amenities: ['Private suites', 'CCTV monitoring', 'Daily walks', 'Gourmet meals', 'Cuddle sessions', 'Webcam access', 'Report cards'],
    mapUrl: 'https://maps.google.com/?q=The+Wagington+Singapore',
    description: 'Singapore\'s most luxurious pet hotel with private suite accommodation, 24/7 staff, and complimentary daily activities. Trusted by celebrity owners.',
    featured: true,
  },
  {
    id: 'b2',
    name: 'Happy Kennel @ Sembawang',
    type: 'facility',
    address: '20 Gambas Crescent, S757016',
    area: 'Sembawang',
    phone: '+65 6756 8899',
    rating: 4.5,
    reviewCount: 287,
    petTypes: ['Dogs'],
    pricePerNight: 45,
    capacity: '30 runs',
    indoorOutdoor: 'both',
    photos: ['https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600'],
    amenities: ['Individual runs', 'Outdoor play yard', 'Daily feeding', 'Vaccination required', 'AC indoor kennels'],
    mapUrl: 'https://maps.google.com/?q=Happy+Kennel+Sembawang+Singapore',
    description: 'Spacious kennel facility with large individual runs and a safe outdoor play yard. Perfect for active dogs who love space to roam.',
    featured: false,
  },
  {
    id: 'b3',
    name: "Snoopy's Dream Resort",
    type: 'facility',
    address: '12 Pasir Ris Farmway 1, S519352',
    area: 'Pasir Ris',
    phone: '+65 6581 9007',
    rating: 4.6,
    reviewCount: 419,
    petTypes: ['Dogs', 'Cats'],
    pricePerNight: 65,
    capacity: '50 pets',
    indoorOutdoor: 'both',
    photos: ['https://images.unsplash.com/photo-1534361960057-19f4434a6d9a?w=600'],
    amenities: ['Spacious farm setting', 'Pool access', 'Socialisation play', 'Daily photo updates', 'In-house vet on call'],
    mapUrl: 'https://maps.google.com/?q=Snoopy+Dream+Resort+Pasir+Ris+Singapore',
    description: 'Set on a beautiful farm, Snoopy\'s offers a resort-style stay with open spaces, swimming pools, and all-day supervision in a calm environment.',
    featured: true,
  },
  {
    id: 'b4',
    name: 'Mewingtons Cat Hotel',
    type: 'facility',
    address: '391B Orchard Road #22-01, S238874',
    area: 'Orchard',
    phone: '+65 9832 5567',
    rating: 4.8,
    reviewCount: 342,
    petTypes: ['Cats'],
    pricePerNight: 75,
    capacity: '25 cat rooms',
    indoorOutdoor: 'indoor',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600'],
    amenities: ['Cat-only environment', 'Cat TV', 'Climbing towers', 'Interactive toys', 'Daily playtime', 'Live webcam', 'Vaccination required'],
    mapUrl: 'https://maps.google.com/?q=Mewingtons+Cat+Hotel+Singapore',
    description: 'Singapore\'s premier cat-only hotel. Every cat gets their own private room with a view, climbing towers, and personalised care from cat-loving staff.',
    featured: true,
  },
  {
    id: 'b5',
    name: 'Rabbit Haven Boarding',
    type: 'facility',
    address: '24 Sin Ming Lane #02-103, S573970',
    area: 'Bishan / Sin Ming',
    phone: '+65 9345 1122',
    rating: 4.7,
    reviewCount: 128,
    petTypes: ['Rabbits', 'Guinea Pigs', 'Hamsters'],
    pricePerNight: 25,
    capacity: '20 small pets',
    indoorOutdoor: 'indoor',
    photos: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600'],
    amenities: ['AC environment', 'Hay & pellets provided', 'Daily exercise time', 'Health monitoring', 'Experienced rabbit carers'],
    mapUrl: 'https://maps.google.com/?q=Rabbit+Haven+Boarding+Singapore',
    description: 'Specialised small animal boarding run by experienced rabbit owners. Bring your own food and accessories for a home-away-from-home experience.',
    featured: false,
  },
  {
    id: 'b6',
    name: 'Sarah\'s Pet Sitting (Home Boarding)',
    type: 'sitter',
    address: '22 Jalan Dua, Queenstown',
    area: 'Queenstown',
    phone: '+65 9876 5432',
    rating: 5.0,
    reviewCount: 89,
    petTypes: ['Dogs', 'Cats'],
    pricePerNight: 55,
    capacity: 'Max 2 dogs or 3 cats',
    indoorOutdoor: 'indoor',
    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600'],
    amenities: ['Home environment', 'Owner\'s home', 'Daily walks', 'Lots of love', 'Whatsapp updates', 'No cage policy'],
    mapUrl: 'https://maps.google.com/?q=Queenstown+Singapore',
    description: 'Experienced pet sitter with 6 years of home boarding. Your pets sleep on the couch and get treated like family. Limited spots — book early!',
    featured: false,
  },
  {
    id: 'b7',
    name: 'Paws Inn Premium Boarding',
    type: 'facility',
    address: '3 Tampines Grande, S528799',
    area: 'Tampines',
    phone: '+65 6789 0123',
    rating: 4.4,
    reviewCount: 201,
    petTypes: ['Dogs', 'Cats'],
    pricePerNight: 55,
    capacity: '35 units',
    indoorOutdoor: 'indoor',
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
    amenities: ['Individual suites', 'AC rooms', 'Playtime included', 'Fresh meals', '24hr CCTV', 'Monthly health reports'],
    mapUrl: 'https://maps.google.com/?q=Paws+Inn+Boarding+Tampines+Singapore',
    description: 'Modern boarding facility in the East with spacious private suites, experienced staff, and a 24/7 surveillance system for your peace of mind.',
    featured: false,
  },
];

// ─── Dog Walkers ──────────────────────────────────────────────────────────────

export interface Walker {
  id: string;
  name: string;
  photo: string;
  bio: string;
  rating: number;
  reviewCount: number;
  totalWalks: number;
  ratePerWalk: number;
  walkDuration: string;
  areas: string[];
  availability: { day: string; slots: string[] }[];
  petTypes: string[];
  experience: string;
  phone: string;
  verified: boolean;
  badges: string[];
}

export const WALKERS: Walker[] = [
  {
    id: 'w1',
    name: 'Jake Tan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: 'Full-time dog walker and certified pet first-aider. I treat every dog like my own and know how to handle all temperaments, from shy rescues to high-energy breeds.',
    rating: 5.0,
    reviewCount: 134,
    totalWalks: 820,
    ratePerWalk: 22,
    walkDuration: '45 min',
    areas: ['Bishan', 'Ang Mo Kio', 'Toa Payoh', 'Thomson'],
    availability: [
      { day: 'Mon', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Tue', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Wed', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Thu', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Fri', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Sat', slots: ['8am', '9am', '10am'] },
      { day: 'Sun', slots: [] },
    ],
    petTypes: ['Dogs'],
    experience: '5 years',
    phone: '+65 9111 2222',
    verified: true,
    badges: ['Top Rated', 'First Aid Certified', '800+ Walks'],
  },
  {
    id: 'w2',
    name: 'Sarah Lim',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    bio: 'Animal behaviourist background with a love for rescue dogs. I specialise in anxious and reactive dogs, using positive reinforcement on every walk.',
    rating: 4.9,
    reviewCount: 98,
    totalWalks: 560,
    ratePerWalk: 25,
    walkDuration: '45 min',
    areas: ['Jurong', 'Clementi', 'West Coast', 'Buona Vista'],
    availability: [
      { day: 'Mon', slots: ['7am', '5pm'] },
      { day: 'Tue', slots: ['7am', '5pm'] },
      { day: 'Wed', slots: ['Fully Booked'] },
      { day: 'Thu', slots: ['7am', '5pm'] },
      { day: 'Fri', slots: ['7am', '5pm'] },
      { day: 'Sat', slots: ['8am', '9am', '10am', '11am'] },
      { day: 'Sun', slots: ['9am', '10am'] },
    ],
    petTypes: ['Dogs'],
    experience: '4 years',
    phone: '+65 9222 3333',
    verified: true,
    badges: ['Behaviourist', 'Reactive Dog Specialist', 'Positive Reinforcement'],
  },
  {
    id: 'w3',
    name: 'Rashid Mohamed',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    bio: 'Retired army dog handler with 8 years of experience with working and pet dogs. I run structured, discipline-reinforcing walks that keep your dog mentally stimulated.',
    rating: 4.8,
    reviewCount: 211,
    totalWalks: 1100,
    ratePerWalk: 20,
    walkDuration: '60 min',
    areas: ['Tampines', 'Pasir Ris', 'Bedok', 'Changi'],
    availability: [
      { day: 'Mon', slots: ['7am', '8am', '4pm', '5pm', '6pm'] },
      { day: 'Tue', slots: ['7am', '8am', '4pm', '5pm'] },
      { day: 'Wed', slots: ['7am', '8am', '4pm', '5pm', '6pm'] },
      { day: 'Thu', slots: ['7am', '8am', '4pm', '5pm'] },
      { day: 'Fri', slots: ['7am', '4pm', '5pm', '6pm'] },
      { day: 'Sat', slots: ['7am', '8am', '9am', '10am'] },
      { day: 'Sun', slots: ['8am', '9am'] },
    ],
    petTypes: ['Dogs'],
    experience: '8 years',
    phone: '+65 9333 4444',
    verified: true,
    badges: ['Ex-Army Handler', '1000+ Walks', 'Large Breed Expert'],
  },
  {
    id: 'w4',
    name: 'Amy Chen',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    bio: 'Part-time walker and full-time dog lover! I offer group walks at Bishan Park for socialising your pup with other friendly dogs. Also available for solo walks.',
    rating: 4.7,
    reviewCount: 72,
    totalWalks: 320,
    ratePerWalk: 18,
    walkDuration: '60 min',
    areas: ['Bishan', 'Serangoon', 'Hougang', 'Punggol'],
    availability: [
      { day: 'Mon', slots: [] },
      { day: 'Tue', slots: ['6pm'] },
      { day: 'Wed', slots: ['6pm'] },
      { day: 'Thu', slots: ['6pm'] },
      { day: 'Fri', slots: ['6pm'] },
      { day: 'Sat', slots: ['8am', '9am', '10am', '11am', '4pm'] },
      { day: 'Sun', slots: ['8am', '9am', '10am', '11am', '4pm'] },
    ],
    petTypes: ['Dogs'],
    experience: '2 years',
    phone: '+65 9444 5555',
    verified: true,
    badges: ['Group Walk Specialist', 'Socialization Focus'],
  },
  {
    id: 'w5',
    name: 'David Ng',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    bio: 'Professional dog trainer and walker. I incorporate basic obedience cues during every walk so your dog learns while they exercise. Great for puppies and newly adopted dogs.',
    rating: 4.9,
    reviewCount: 156,
    totalWalks: 690,
    ratePerWalk: 28,
    walkDuration: '45 min',
    areas: ['Orchard', 'Bukit Timah', 'Holland Village', 'Clementi'],
    availability: [
      { day: 'Mon', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Tue', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Wed', slots: ['7am', '5pm', '6pm'] },
      { day: 'Thu', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Fri', slots: ['7am', '8am', '5pm', '6pm'] },
      { day: 'Sat', slots: ['8am', '9am', '10am'] },
      { day: 'Sun', slots: [] },
    ],
    petTypes: ['Dogs'],
    experience: '6 years',
    phone: '+65 9555 6666',
    verified: true,
    badges: ['Certified Trainer', 'Train-Walk Combo', '600+ Walks'],
  },
];

// ─── Trainers ─────────────────────────────────────────────────────────────────

export interface Trainer {
  id: string;
  name: string;
  businessName: string;
  photo: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  credentials: string[];
  groupRate: number;
  privateRate: number;
  sessionDuration: string;
  areas: string[];
  phone: string;
  petTypes: string[];
  featured: boolean;
}

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Marcus Wong',
    businessName: 'Alpha Dog Training SG',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: 'Singapore\'s top-rated obedience trainer with 15 years of experience. Specialises in transforming reactive and aggressive dogs using science-based positive reinforcement methods.',
    rating: 4.9,
    reviewCount: 378,
    specialties: ['Obedience', 'Behaviour Modification', 'Reactive Dogs', 'Aggression'],
    credentials: ['CPDT-KA Certified', 'IAABC Member', '15 Years Experience'],
    groupRate: 45,
    privateRate: 120,
    sessionDuration: '60 min',
    areas: ['Island-wide'],
    phone: '+65 9666 7777',
    petTypes: ['Dogs'],
    featured: true,
  },
  {
    id: 't2',
    name: 'Ling Hui',
    businessName: 'Happy Paws Training School',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    bio: 'Puppy specialist and founder of Happy Paws Training School. Runs the most popular puppy socialisation classes in Singapore with a fun, reward-based approach.',
    rating: 4.8,
    reviewCount: 256,
    specialties: ['Puppy Training', 'Socialisation', 'Basic Obedience', 'Trick Training'],
    credentials: ['Delta Institute Certified', 'Fear Free Certified', '10 Years Experience'],
    groupRate: 35,
    privateRate: 95,
    sessionDuration: '60 min',
    areas: ['Bukit Timah', 'Holland Village', 'Clementi'],
    phone: '+65 9777 8888',
    petTypes: ['Dogs'],
    featured: true,
  },
  {
    id: 't3',
    name: 'Kevin Ramasamy',
    businessName: 'Agility Masters Singapore',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    bio: 'National agility champion trainer. Takes both beginners and competition-level handlers. Agility training is the best mental and physical workout for energetic dogs.',
    rating: 4.9,
    reviewCount: 142,
    specialties: ['Agility', 'Competition Training', 'Trick Training', 'Sport Dogs'],
    credentials: ['National Agility Champion (2x)', 'AKC Agility Judge', '12 Years Experience'],
    groupRate: 55,
    privateRate: 140,
    sessionDuration: '90 min',
    areas: ['Pasir Ris', 'Tampines', 'East Coast'],
    phone: '+65 9888 9999',
    petTypes: ['Dogs'],
    featured: false,
  },
  {
    id: 't4',
    name: 'Zoe Tan',
    businessName: 'Zen Dog Training',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    bio: 'Calm, patient trainer specialising in anxious dogs, fearful rescues, and sensitive breeds. Creates individualised training plans that work with your dog\'s personality.',
    rating: 4.8,
    reviewCount: 189,
    specialties: ['Fearful Dogs', 'Anxiety Management', 'Shelter Dog Rehab', 'Loose Leash Walking'],
    credentials: ['CPDT-KSA Certified', 'Fear Free Trainer', 'KPA-CTP Graduate'],
    groupRate: 40,
    privateRate: 110,
    sessionDuration: '60 min',
    areas: ['Yishun', 'Sembawang', 'Woodlands', 'Canberra'],
    phone: '+65 8111 2233',
    petTypes: ['Dogs'],
    featured: false,
  },
  {
    id: 't5',
    name: 'Ben Ho',
    businessName: 'Puppy Education Academy',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    bio: 'Early education specialist for puppies aged 8–20 weeks. The first socialisation window is critical — Ben\'s puppy kindergarten programme has graduated over 500 pups.',
    rating: 4.7,
    reviewCount: 223,
    specialties: ['Puppy Kindergarten', 'Bite Inhibition', 'House Training', 'Early Socialisation'],
    credentials: ['CPDT-KA Certified', 'VSA-CDT Graduate', 'AKC S.T.A.R. Puppy Evaluator'],
    groupRate: 38,
    privateRate: 90,
    sessionDuration: '60 min',
    areas: ['Serangoon', 'Toa Payoh', 'Ang Mo Kio', 'Bishan'],
    phone: '+65 8223 3344',
    petTypes: ['Dogs'],
    featured: true,
  },
];

// ─── Insurance ────────────────────────────────────────────────────────────────

export interface InsurancePlan {
  id: string;
  insurer: string;
  planName: string;
  tagline: string;
  color: string;
  basePremium: { dog: number; cat: number; rabbit: number; bird: number };
  coverage: {
    accident: boolean;
    illness: boolean;
    surgery: boolean;
    dental: boolean;
    preventive: boolean;
    liability: boolean;
    boarding: boolean;
  };
  annualLimit: number;
  deductible: number;
  reimbursementRate: number;
  features: string[];
  url: string;
  recommended: boolean;
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'i1',
    insurer: 'Pawfect Care',
    planName: 'Pawfect Plus',
    tagline: 'Most comprehensive pet cover in Singapore',
    color: '#FF8C42',
    basePremium: { dog: 55, cat: 32, rabbit: 20, bird: 18 },
    coverage: {
      accident: true, illness: true, surgery: true, dental: true,
      preventive: true, liability: true, boarding: true,
    },
    annualLimit: 10000,
    deductible: 100,
    reimbursementRate: 80,
    features: ['Unlimited vet visits', 'Preventive care included', 'Hereditary conditions covered', '24/7 vet helpline', 'Multi-pet discount 10%'],
    url: 'https://www.pawfectcare.sg',
    recommended: true,
  },
  {
    id: 'i2',
    insurer: 'Liberty Insurance',
    planName: 'PetCare Protect',
    tagline: 'Trusted protection from Liberty',
    color: '#2196F3',
    basePremium: { dog: 42, cat: 26, rabbit: 16, bird: 14 },
    coverage: {
      accident: true, illness: true, surgery: true, dental: false,
      preventive: false, liability: true, boarding: false,
    },
    annualLimit: 6000,
    deductible: 150,
    reimbursementRate: 75,
    features: ['Accident & illness cover', 'Third-party liability', 'Hospitalisation cash benefit', 'Overseas cover up to 60 days'],
    url: 'https://www.libertyinsurance.com.sg',
    recommended: false,
  },
  {
    id: 'i3',
    insurer: 'MSIG Insurance',
    planName: 'PetPlus',
    tagline: 'Affordable everyday pet protection',
    color: '#4CAF50',
    basePremium: { dog: 38, cat: 24, rabbit: 14, bird: 12 },
    coverage: {
      accident: true, illness: true, surgery: true, dental: false,
      preventive: false, liability: false, boarding: false,
    },
    annualLimit: 4000,
    deductible: 200,
    reimbursementRate: 70,
    features: ['Accident & illness', 'Surgery cover up to $4,000', 'Death & theft benefit', 'Straightforward claims'],
    url: 'https://www.msig.com.sg',
    recommended: false,
  },
];

// ─── Pet Supplies ─────────────────────────────────────────────────────────────

export type ProductCategory = 'Food' | 'Treats' | 'Toys' | 'Health' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  petTypes: string[];
  price: number;
  originalPrice?: number;
  image: string;
  store: 'Pet Lovers Centre' | 'Kohepets' | 'Perromart';
  storeUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  deal: boolean;
  description: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Royal Canin Maxi Adult (15kg)', brand: 'Royal Canin', category: 'Food', petTypes: ['Dogs'], price: 98, originalPrice: 115, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', store: 'Perromart', storeUrl: 'https://www.perromart.com.sg', rating: 4.7, reviewCount: 512, featured: true, deal: true, description: 'Complete nutrition for large breed adult dogs.' },
  { id: 'p2', name: "Hill's Science Diet Adult Cat (7.3kg)", brand: "Hill's", category: 'Food', petTypes: ['Cats'], price: 76, originalPrice: 89, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', store: 'Kohepets', storeUrl: 'https://www.kohepets.com.sg', rating: 4.8, reviewCount: 344, featured: true, deal: true, description: 'Vet-recommended nutrition for healthy adult cats.' },
  { id: 'p3', name: 'Absolute Holistic Grain-Free Dog (1.8kg)', brand: 'Absolute Holistic', category: 'Food', petTypes: ['Dogs'], price: 32, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', store: 'Perromart', storeUrl: 'https://www.perromart.com.sg', rating: 4.6, reviewCount: 198, featured: false, deal: false, description: 'Local brand grain-free kibble made from real fish.' },
  { id: 'p4', name: "Zuke's Mini Naturals Chicken Treats (170g)", brand: "Zuke's", category: 'Treats', petTypes: ['Dogs'], price: 14, originalPrice: 18, image: 'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=400', store: 'Pet Lovers Centre', storeUrl: 'https://www.petloverscentre.com.sg', rating: 4.8, reviewCount: 267, featured: true, deal: true, description: 'Soft training treats under 3 calories each.' },
  { id: 'p5', name: 'Wellness Soft WellBites Lamb (170g)', brand: 'Wellness', category: 'Treats', petTypes: ['Dogs'], price: 12, image: 'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=400', store: 'Kohepets', storeUrl: 'https://www.kohepets.com.sg', rating: 4.6, reviewCount: 189, featured: false, deal: false, description: 'Natural soft chew treats for dogs.' },
  { id: 'p6', name: 'KONG Classic Dog Toy (Large)', brand: 'KONG', category: 'Toys', petTypes: ['Dogs'], price: 22, image: 'https://images.unsplash.com/photo-1601758123927-196f90e88c30?w=400', store: 'Pet Lovers Centre', storeUrl: 'https://www.petloverscentre.com.sg', rating: 4.9, reviewCount: 623, featured: true, deal: false, description: 'Durable rubber chew toy that can be stuffed with treats.' },
  { id: 'p7', name: 'PetSafe Busy Buddy Twist n Treat', brand: 'PetSafe', category: 'Toys', petTypes: ['Dogs'], price: 18, image: 'https://images.unsplash.com/photo-1601758123927-196f90e88c30?w=400', store: 'Perromart', storeUrl: 'https://www.perromart.com.sg', rating: 4.5, reviewCount: 145, featured: false, deal: false, description: 'Puzzle feeder that slows eating and enriches mealtime.' },
  { id: 'p8', name: 'Yeowww! Catnip Banana Toy', brand: 'Yeowww!', category: 'Toys', petTypes: ['Cats'], price: 16, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400', store: 'Kohepets', storeUrl: 'https://www.kohepets.com.sg', rating: 4.8, reviewCount: 412, featured: true, deal: false, description: 'Organically grown catnip inside durable cotton toy.' },
  { id: 'p9', name: 'Frontline Plus Flea & Tick (3 pack)', brand: 'Frontline', category: 'Health', petTypes: ['Dogs', 'Cats'], price: 45, originalPrice: 55, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', store: 'Pet Lovers Centre', storeUrl: 'https://www.petloverscentre.com.sg', rating: 4.7, reviewCount: 388, featured: true, deal: true, description: 'Monthly spot-on treatment against fleas and ticks.' },
  { id: 'p10', name: 'NexGard Chewable Flea Tablet (3 pack)', brand: 'NexGard', category: 'Health', petTypes: ['Dogs'], price: 52, image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400', store: 'Kohepets', storeUrl: 'https://www.kohepets.com.sg', rating: 4.8, reviewCount: 255, featured: false, deal: false, description: 'Tasty chewable monthly flea and tick treatment.' },
  { id: 'p11', name: 'Ruffwear Front Range Harness', brand: 'Ruffwear', category: 'Accessories', petTypes: ['Dogs'], price: 79, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', store: 'Perromart', storeUrl: 'https://www.perromart.com.sg', rating: 4.9, reviewCount: 534, featured: true, deal: false, description: 'Padded everyday harness with two leash attachment points.' },
  { id: 'p12', name: 'Catit Flower Fountain (3L)', brand: 'Catit', category: 'Accessories', petTypes: ['Cats'], price: 42, originalPrice: 52, image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400', store: 'Pet Lovers Centre', storeUrl: 'https://www.petloverscentre.com.sg', rating: 4.7, reviewCount: 321, featured: true, deal: true, description: 'Encourages cats to drink more with a flowing water fountain.' },
  { id: 'p13', name: 'Oxbow Essentials Adult Rabbit Pellets (5lb)', brand: 'Oxbow', category: 'Food', petTypes: ['Rabbits'], price: 28, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400', store: 'Kohepets', storeUrl: 'https://www.kohepets.com.sg', rating: 4.8, reviewCount: 187, featured: false, deal: false, description: 'Vet-recommended pelleted diet for adult rabbits.' },
  { id: 'p14', name: 'Kaytee Timothy Hay (24oz)', brand: 'Kaytee', category: 'Food', petTypes: ['Rabbits', 'Guinea Pigs'], price: 15, image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400', store: 'Perromart', storeUrl: 'https://www.perromart.com.sg', rating: 4.6, reviewCount: 233, featured: false, deal: false, description: 'First cut premium timothy hay for small animals.' },
  { id: 'p15', name: 'Zymox Ear Solution (1.25oz)', brand: 'Zymox', category: 'Health', petTypes: ['Dogs', 'Cats'], price: 28, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', store: 'Pet Lovers Centre', storeUrl: 'https://www.petloverscentre.com.sg', rating: 4.7, reviewCount: 178, featured: false, deal: false, description: 'Enzymatic ear solution for dogs and cats.' },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = ['Food', 'Treats', 'Toys', 'Health', 'Accessories'];

// ─── Pet-Friendly Places ──────────────────────────────────────────────────────

export type PlaceCategory = 'Dining' | 'Outdoor' | 'Hotel' | 'Events';

export interface PetFriendlyPlace {
  id: string;
  name: string;
  category: PlaceCategory;
  address: string;
  area: string;
  petPolicy: string;
  sizeLimit?: string;
  petTypes: string[];
  rating: number;
  reviewCount: number;
  photos: string[];
  description: string;
  hours: string;
  mapUrl: string;
  phone?: string;
  website?: string;
  featured: boolean;
}

export const PET_PLACES: PetFriendlyPlace[] = [
  {
    id: 'pl1',
    name: 'Wild Honey',
    category: 'Dining',
    address: '333A Orchard Road, Mandarin Gallery #03-01, S238897',
    area: 'Orchard',
    petPolicy: 'Leashed dogs welcome on outdoor terrace',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs'],
    rating: 4.6,
    reviewCount: 728,
    photos: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'],
    description: 'All-day breakfast spot with a stunning outdoor terrace. Bring your dog for Sunday brunch — water bowls provided for furry guests!',
    hours: 'Daily: 9:00am – 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Wild+Honey+Mandarin+Gallery+Singapore',
    website: 'https://www.wildhoney.com.sg',
    featured: true,
  },
  {
    id: 'pl2',
    name: 'East Coast Park (Dog Run)',
    category: 'Outdoor',
    address: 'East Coast Park Area D (near Marine Cove)',
    area: 'East Coast',
    petPolicy: 'Dogs must be leashed in park; off-leash in designated dog run',
    petTypes: ['Dogs', 'Cats (carrier)'],
    rating: 4.8,
    reviewCount: 1243,
    photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'],
    description: 'Singapore\'s most popular dog-friendly park with a large off-leash dog run, cycling paths, and a long beachfront promenade. Waste bags available on-site.',
    hours: 'Open 24 Hours',
    mapUrl: 'https://maps.google.com/?q=East+Coast+Park+Dog+Run+Singapore',
    featured: true,
  },
  {
    id: 'pl3',
    name: 'Camp Kilo Charcoal Club',
    category: 'Dining',
    address: '19 Kandahar Street, S198892',
    area: 'Kampong Glam',
    petPolicy: 'All well-behaved pets welcome indoors and outdoors',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs', 'Cats'],
    rating: 4.5,
    reviewCount: 412,
    photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600'],
    description: 'Industrial-chic café in the heart of Kampong Glam. Extremely pet-friendly with a shaded outdoor area and pet treats at the counter.',
    hours: 'Mon–Thu: 12pm–10pm | Fri–Sun: 11am–10pm',
    mapUrl: 'https://maps.google.com/?q=Camp+Kilo+Charcoal+Club+Singapore',
    featured: true,
  },
  {
    id: 'pl4',
    name: 'Labrador Nature Reserve',
    category: 'Outdoor',
    address: 'Labrador Villa Road, S119187',
    area: 'Labrador Park',
    petPolicy: 'Dogs welcome on leash throughout the reserve',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs'],
    rating: 4.7,
    reviewCount: 876,
    photos: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600'],
    description: 'One of Singapore\'s most scenic coastal trails with sea views, historical ruins, and shaded forest paths. Perfect for a morning hike with your dog.',
    hours: 'Open 24 Hours',
    mapUrl: 'https://maps.google.com/?q=Labrador+Nature+Reserve+Singapore',
    featured: false,
  },
  {
    id: 'pl5',
    name: 'Hard Rock Hotel Singapore',
    category: 'Hotel',
    address: '8 Sentosa Gateway, S098269',
    area: 'Sentosa',
    petPolicy: 'Small pets welcome in pet-friendly rooms (fee applies)',
    sizeLimit: 'Under 8kg',
    petTypes: ['Dogs', 'Cats'],
    rating: 4.4,
    reviewCount: 289,
    photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'],
    description: 'Rock \'n\' roll vibes on Sentosa! Pet-friendly rooms available for small dogs and cats. Your pet gets a welcome kit and special amenities upon check-in.',
    hours: '24 Hours (hotel)',
    mapUrl: 'https://maps.google.com/?q=Hard+Rock+Hotel+Sentosa+Singapore',
    website: 'https://www.hardrockhotel.com.sg',
    phone: '+65 6577 8899',
    featured: false,
  },
  {
    id: 'pl6',
    name: 'PetCular Café',
    category: 'Dining',
    address: '1 Vista Exchange Green #01-16, S138617',
    area: 'one-north',
    petPolicy: 'All pets welcome — indoor and outdoor seating',
    petTypes: ['Dogs', 'Cats', 'Rabbits', 'Others'],
    rating: 4.7,
    reviewCount: 534,
    photos: ['https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600'],
    description: 'Singapore\'s most inclusive pet café. All well-behaved pets welcome inside. Serves excellent coffee and brunch dishes. Pet menu available too!',
    hours: 'Tue–Sun: 10:00am – 8:00pm | Mon: Closed',
    mapUrl: 'https://maps.google.com/?q=PetCular+Cafe+one-north+Singapore',
    featured: true,
  },
  {
    id: 'pl7',
    name: 'Singapore Botanic Gardens',
    category: 'Outdoor',
    address: '1 Cluny Road, S259569',
    area: 'Tanglin',
    petPolicy: 'Leashed dogs welcome in most areas except the Heritage Garden',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs'],
    rating: 4.8,
    reviewCount: 2103,
    photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'],
    description: 'Singapore\'s only UNESCO World Heritage Site welcomes leashed dogs. The sprawling lawns and shaded paths make it a perfect weekend outing for you and your pup.',
    hours: '5:00am – Midnight daily',
    mapUrl: 'https://maps.google.com/?q=Singapore+Botanic+Gardens',
    featured: false,
  },
  {
    id: 'pl8',
    name: 'Park Hotel Clarke Quay',
    category: 'Hotel',
    address: '1 Unity Street, S237983',
    area: 'Clarke Quay',
    petPolicy: 'Small dogs and cats welcome (deposit required)',
    sizeLimit: 'Under 10kg',
    petTypes: ['Dogs', 'Cats'],
    rating: 4.3,
    reviewCount: 178,
    photos: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600'],
    description: 'Boutique hotel near the river with a dedicated pet package. Includes a pet bed, food mat, and treats. Close to Robertson Quay\'s pet-friendly dining strip.',
    hours: '24 Hours (hotel)',
    mapUrl: 'https://maps.google.com/?q=Park+Hotel+Clarke+Quay+Singapore',
    website: 'https://www.parkhotelgroup.com/clarquay',
    phone: '+65 6593 8888',
    featured: false,
  },
  {
    id: 'pl9',
    name: 'Marina Barrage Rooftop',
    category: 'Outdoor',
    address: '8 Marina Gardens Drive, S018951',
    area: 'Marina Bay',
    petPolicy: 'All pets welcome on the rooftop lawn',
    petTypes: ['Dogs', 'Cats (carrier)'],
    rating: 4.6,
    reviewCount: 1087,
    photos: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600'],
    description: 'Enjoy sweeping views of the city skyline from the grassy rooftop. Very popular for picnics and kite-flying. No shade in the afternoon, so visit in the morning.',
    hours: '24 Hours',
    mapUrl: 'https://maps.google.com/?q=Marina+Barrage+Singapore',
    featured: false,
  },
  {
    id: 'pl10',
    name: 'Tanjong Beach Club',
    category: 'Dining',
    address: '120 Tanjong Beach Walk, Sentosa, S098942',
    area: 'Sentosa',
    petPolicy: 'Leashed dogs welcome on the beach. No pets in main club area.',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs'],
    rating: 4.5,
    reviewCount: 678,
    photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'],
    description: 'Singapore\'s most glamorous beach bar. Bring your dog to the sandy shores of Sentosa for sunset drinks. Dogs must be on leash outside the beach club area.',
    hours: 'Tue–Sun: 11:00am – Late | Mon: Closed',
    mapUrl: 'https://maps.google.com/?q=Tanjong+Beach+Club+Sentosa+Singapore',
    website: 'https://www.tanjongbeachclub.com',
    featured: true,
  },
  {
    id: 'pl11',
    name: 'Paw-ty at Gardens by the Bay',
    category: 'Events',
    address: '18 Marina Gardens Drive, S018953',
    area: 'Marina Bay',
    petPolicy: 'Event-specific — dogs only, all sizes welcome',
    petTypes: ['Dogs'],
    rating: 4.8,
    reviewCount: 345,
    photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'],
    description: 'Monthly pet-friendly event at the Meadow with photo booths, pet vendor stalls, grooming pop-ups, and a group walk around the Supertrees. Check schedule for dates.',
    hours: 'Monthly events, typically Sundays 9am–2pm',
    mapUrl: 'https://maps.google.com/?q=Gardens+by+the+Bay+Singapore',
    website: 'https://www.gardensbythebay.com.sg',
    featured: false,
  },
  {
    id: 'pl12',
    name: 'Mount Faber Park',
    category: 'Outdoor',
    address: 'Mount Faber Road, S099203',
    area: 'Telok Blangah',
    petPolicy: 'Leashed dogs welcome on all trails',
    sizeLimit: 'All sizes',
    petTypes: ['Dogs'],
    rating: 4.6,
    reviewCount: 543,
    photos: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600'],
    description: 'A short but scenic green hill with forest trails, city views, and cool breezes. Connected to the Southern Ridges trail — a beautiful extended route for adventurous dogs.',
    hours: '24 Hours',
    mapUrl: 'https://maps.google.com/?q=Mount+Faber+Park+Singapore',
    featured: false,
  },
];

// ─── Service Category definitions ─────────────────────────────────────────────

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  route: string;
  count: number;
  emoji: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'vets', label: 'Vets', icon: 'medkit', color: '#F44336', bgColor: '#FFEBEE', route: '/services/vets', count: VET_CLINICS.length, emoji: '🏥' },
  { id: 'grooming', label: 'Grooming', icon: 'cut', color: '#E91E63', bgColor: '#FCE4EC', route: '/services/grooming', count: GROOMERS.length, emoji: '✂️' },
  { id: 'boarding', label: 'Boarding', icon: 'bed', color: '#9C27B0', bgColor: '#F3E5F5', route: '/services/boarding', count: BOARDING.length, emoji: '🏨' },
  { id: 'supplies', label: 'Supplies', icon: 'cart', color: '#FF9800', bgColor: '#FFF3E0', route: '/services/supplies', count: PRODUCTS.length, emoji: '🛒' },
  { id: 'walking', label: 'Dog Walking', icon: 'walk', color: '#4CAF50', bgColor: '#E8F5E9', route: '/services/walking', count: WALKERS.length, emoji: '🐕' },
  { id: 'training', label: 'Training', icon: 'school', color: '#2196F3', bgColor: '#E3F2FD', route: '/services/training', count: TRAINERS.length, emoji: '🎓' },
  { id: 'insurance', label: 'Insurance', icon: 'shield-checkmark', color: '#00BCD4', bgColor: '#E0F7FA', route: '/services/insurance', count: INSURANCE_PLANS.length, emoji: '🛡️' },
  { id: 'places', label: 'Pet-Friendly', icon: 'location', color: '#FF5722', bgColor: '#FBE9E7', route: '/services/places', count: PET_PLACES.length, emoji: '📍' },
];
