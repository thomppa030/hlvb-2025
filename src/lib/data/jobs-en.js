// src/lib/data/jobs-en.js

export const jobs = [
  {
    id: 'reception-fulltime',
    title: 'Receptionist',
    department: 'Front Office',
    type: 'Full-time',
    description: 'We are looking for a friendly and service-oriented person for our reception. You will be the first face of our hotel and ensure a warm welcome for our guests.',
    responsibilities: [
      'Guest check-in and check-out',
      'Phone reservation handling and processing',
      'Guest care and information service',
      'Billing and cash desk operations',
      'Coordination with other departments',
      'Handling complaints and special requests'
    ],
    requirements: [
      'Completed training in hospitality or comparable experience',
      'Excellent German and English skills',
      'Friendly and professional appearance',
      'Team player and stress resistance',
      'Flexibility with working hours',
      'Basic knowledge of MS Office and hotel software'
    ],
    benefits: [
      'Permanent employment contract',
      'Competitive salary according to tariff',
      'Company pension scheme',
      'Free drinks and meals',
      'Training opportunities',
      'Family-friendly working hours'
    ],
    contact: 'jobs@hotel-ludwig-van-beethoven.de'
  },
  {
    id: 'housekeeping-parttime',
    title: 'Housekeeper',
    department: 'Housekeeping',
    type: 'Part-time',
    description: 'For our housekeeping team, we are looking for reliable employees who keep our rooms and public areas in perfect condition.',
    responsibilities: [
      'Cleaning and maintenance of hotel rooms',
      'Changing bed linen and towels',
      'Restocking minibars and amenities',
      'Checking room equipment',
      'Cleaning public areas',
      'Reporting repair needs'
    ],
    requirements: [
      'Experience in hotel cleaning advantageous',
      'Careful and conscientious work approach',
      'Physical resilience',
      'Team player',
      'Basic German language skills',
      'Reliability and punctuality'
    ],
    benefits: [
      'Flexible working hours',
      'Competitive salary according to tariff',
      'Free work clothing',
      'Company outings',
      'Holiday pay',
      'Pleasant working atmosphere'
    ],
    contact: 'jobs@hotel-ludwig-van-beethoven.de'
  },
  {
    id: 'service-minijob',
    title: 'Breakfast Service Staff',
    department: 'Service',
    type: 'Mini-job',
    description: 'To strengthen our breakfast team, we are looking for a friendly service staff member for the morning hours.',
    responsibilities: [
      'Setting up and preparing the breakfast buffet',
      'Guest care during breakfast',
      'Refilling and monitoring the buffet',
      'Clearing and cleaning tables',
      'Dishwashing and kitchen cleaning',
      'Supporting special events'
    ],
    requirements: [
      'Experience in service desirable',
      'Early working hours (from 6:00 AM)',
      'Friendly interaction with guests',
      'Hygiene awareness',
      'Team player',
      'Morning resilience'
    ],
    benefits: [
      'Flexible hour scheduling',
      'Punctual payment',
      'Free meals',
      'Nice team',
      'Central location in Berlin',
      'No weekend work'
    ],
    contact: 'jobs@hotel-ludwig-van-beethoven.de'
  }
];

export const jobsByCategory = {
  'Front Office': jobs.filter(job => job.department === 'Front Office'),
  'Housekeeping': jobs.filter(job => job.department === 'Housekeeping'),
  'Service': jobs.filter(job => job.department === 'Service')
};

export const jobsByType = {
  'Full-time': jobs.filter(job => job.type === 'Full-time'),
  'Part-time': jobs.filter(job => job.type === 'Part-time'),
  'Mini-job': jobs.filter(job => job.type === 'Mini-job')
};