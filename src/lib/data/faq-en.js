// src/lib/data/faq-en.js

export const faqItems = [
  {
    id: 'check-in-out',
    question: 'What are the check-in and check-out times?',
    answer: '<p>Check-in is available from <strong>3:00 PM</strong>, check-out until <strong>11:00 AM</strong>.</p><p>Early check-in or late check-out can be arranged depending on availability. Please contact us in advance.</p>',
    category: 'General'
  },
  {
    id: 'parking',
    question: 'Are there parking facilities at the hotel?',
    answer: '<p>We unfortunately have <strong>no private parking spaces</strong>, but there are public parking options nearby:</p><ul><li>Street parking (charges apply)</li><li>Hasenheide parking garage (5 minutes walk)</li><li>Park & Ride at Hermannplatz U-Bahn station</li></ul><p>We are happy to help you find a suitable parking space.</p>',
    category: 'Arrival'
  },
  {
    id: 'wifi',
    question: 'Is WiFi available in the hotel?',
    answer: '<p>Yes, we offer <strong>free WiFi</strong> in all rooms and public areas.</p><p>You will receive the access details at reception during check-in.</p>',
    category: 'Amenities'
  },
  {
    id: 'breakfast',
    question: 'What breakfast options are available?',
    answer: '<p>We serve a rich breakfast buffet daily from <strong>7:00 AM to 10:30 AM</strong> featuring:</p><ul><li>Fresh rolls and bread</li><li>Cold cuts, cheese and vegan alternatives</li><li>Cereal, yogurt and fresh fruit</li><li>Coffee, tea and fresh juices</li><li>Warm dishes like scrambled eggs and bacon</li></ul><p>Special dietary requirements can be accommodated upon request.</p>',
    category: 'Service'
  },
  {
    id: 'public-transport',
    question: 'How do I reach the hotel by public transport?',
    answer: '<p>Our hotel is very well connected to the public transport network:</p><ul><li><strong>U-Bahn:</strong> U8 Hermannplatz (5 minutes walk)</li><li><strong>Bus:</strong> Lines M29, M41, 104 (Fontanestraße stop)</li><li><strong>S-Bahn:</strong> S41/S42 Hermannstraße (10 minutes walk)</li></ul><p>From BER Airport: S-Bahn S9 to Hermannstraße, then bus M41 to Fontanestraße</p>',
    category: 'Arrival'
  },
  {
    id: 'room-amenities',
    question: 'What amenities do the rooms have?',
    answer: '<p>All our rooms are equipped with:</p><ul><li>Private bathroom with shower</li><li>Free WiFi</li><li>Flat-screen TV</li><li>Desk</li><li>Wardrobe</li><li>Hair dryer</li><li>Free toilet paper and towels</li></ul><p>Additional amenities vary by room category.</p>',
    category: 'Amenities'
  },
  {
    id: 'pets',
    question: 'Are pets allowed?',
    answer: '<p>Yes, <strong>pets are welcome!</strong></p><p>We charge a small fee of <strong>€10 per night</strong> for pets.</p><p>Please inform us about your pet when booking so we can reserve a suitable room for you.</p>',
    category: 'Service'
  },
  {
    id: 'cancellation',
    question: 'What are the cancellation conditions?',
    answer: '<p>Our standard cancellation conditions:</p><ul><li><strong>Free cancellation</strong> until 6:00 PM on the day before arrival</li><li>Later cancellations will be charged one night</li><li>No-show: Full booking will be charged</li></ul><p>Special rates may have different conditions. Details can be found in your booking confirmation.</p>',
    category: 'Booking'
  },
  {
    id: 'luggage-storage',
    question: 'Can I store my luggage before check-in or after check-out?',
    answer: '<p>Yes, you can store your luggage <strong>free of charge</strong> at reception:</p><ul><li>Before check-in from 8:00 AM</li><li>After check-out until 8:00 PM</li></ul><p>Our luggage room is secure and monitored.</p>',
    category: 'Service'
  },
  {
    id: 'payment-methods',
    question: 'Which payment methods are accepted?',
    answer: '<p>We accept the following payment methods:</p><ul><li>Cash (Euro)</li><li>EC card (Girocard)</li><li>Credit cards: Visa, Mastercard, American Express</li><li>Contactless payment (NFC)</li></ul><p>Prepayment for online bookings is possible but not required.</p>',
    category: 'Booking'
  }
];

export const faqByCategory = {
  'General': faqItems.filter(item => item.category === 'General'),
  'Arrival': faqItems.filter(item => item.category === 'Arrival'),
  'Amenities': faqItems.filter(item => item.category === 'Amenities'),
  'Service': faqItems.filter(item => item.category === 'Service'),
  'Booking': faqItems.filter(item => item.category === 'Booking')
};

export const faqCategories = [
  'General',
  'Arrival',
  'Amenities',
  'Service',
  'Booking'
];