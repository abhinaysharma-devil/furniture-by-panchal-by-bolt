import { Category, FurnitureItem, Order, User } from '../lib/types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '9876543210',
  }
];

export const categories: Category[] = [
  {
    id: 'cat1',
    title: 'Living Room from static',
    description: 'Stylish and comfortable furniture for your living space',
    slug: 'living-room',
    imgPath: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat2',
    title: 'Bedroom',
    description: 'Elegant and restful furniture for your personal sanctuary',
    slug: 'bedroom',
    imgPath: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat3',
    title: 'Dining Room',
    description: 'Beautiful dining sets for memorable meals with family and friends',
    slug: 'dining-room',
    imgPath: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat4',
    title: 'Office',
    description: 'Professional and ergonomic furniture for your workspace',
    slug: 'office',
    imgPath: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat5',
    title: 'Outdoor',
    description: 'Durable and stylish furniture for your garden or patio',
    slug: 'outdoor',
    imgPath: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  }
];

export const furnitureItems: FurnitureItem[] = [
  {
    id: 'item1',
    categoryId: 'cat1',
    title: 'Modern Leather Sofa from static',
    price: 45999,
    description: 'A luxurious 3-seater leather sofa with chrome legs, perfect for contemporary living rooms.',
    imgPath: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'modern-leather-sofa',
    featured: true,
    inStock: true,
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '220cm x 95cm x 85cm',
      'Color': 'Black',
      'Weight': '45kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item2',
    categoryId: 'cat1',
    title: 'Minimalist Coffee Table',
    price: 12999,
    description: 'A sleek wooden coffee table with a drawer for storage, ideal for modern living spaces.',
    imgPath: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'minimalist-coffee-table',
    featured: true,
    inStock: true,
    specifications: {
      'Material': 'Solid Oak',
      'Dimensions': '120cm x 60cm x 45cm',
      'Color': 'Natural',
      'Weight': '25kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item3',
    categoryId: 'cat2',
    title: 'King Size Bed Frame',
    price: 36999,
    description: 'A sturdy and elegant king size bed frame with an upholstered headboard.',
    imgPath: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'king-size-bed-frame',
    featured: false,
    inStock: true,
    specifications: {
      'Material': 'Solid Wood with Fabric Upholstery',
      'Dimensions': '210cm x 190cm x 120cm',
      'Color': 'Gray',
      'Weight': '65kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item4',
    categoryId: 'cat2',
    title: 'Wardrobe with Mirror',
    price: 29999,
    description: 'A spacious wardrobe with sliding doors and a full-length mirror.',
    imgPath: 'https://images.pexels.com/photos/271689/pexels-photo-271689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'wardrobe-with-mirror',
    featured: false,
    inStock: true,
    specifications: {
      'Material': 'Engineered Wood',
      'Dimensions': '180cm x 60cm x 220cm',
      'Color': 'White',
      'Weight': '85kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item5',
    categoryId: 'cat3',
    title: '6-Seater Dining Set',
    price: 48999,
    description: 'A complete dining set with a table and six chairs, perfect for family gatherings.',
    imgPath: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: '6-seater-dining-set',
    featured: true,
    inStock: true,
    specifications: {
      'Material': 'Solid Wood',
      'Table Dimensions': '180cm x 90cm x 75cm',
      'Chair Dimensions': '45cm x 45cm x 95cm',
      'Color': 'Walnut',
      'Weight': '75kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item6',
    categoryId: 'cat4',
    title: 'Ergonomic Office Chair',
    price: 18999,
    description: 'A comfortable and adjustable office chair with lumbar support and armrests.',
    imgPath: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'ergonomic-office-chair',
    featured: false,
    inStock: true,
    specifications: {
      'Material': 'Mesh and Metal',
      'Dimensions': '65cm x 65cm x 110-120cm',
      'Color': 'Black',
      'Weight': '15kg',
      'Assembly': 'Required',
      'Max Weight Capacity': '120kg',
    }
  },
  {
    id: 'item7',
    categoryId: 'cat5',
    title: 'Garden Lounge Set',
    price: 35999,
    description: 'A weather-resistant lounge set with a sofa, two chairs, and a coffee table for your garden.',
    imgPath: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'garden-lounge-set',
    featured: true,
    inStock: true,
    specifications: {
      'Material': 'Weather-resistant Rattan',
      'Sofa Dimensions': '180cm x 80cm x 85cm',
      'Chair Dimensions': '75cm x 75cm x 85cm',
      'Table Dimensions': '90cm x 50cm x 45cm',
      'Color': 'Brown',
      'Weight': '45kg',
      'Assembly': 'Required',
    }
  },
  {
    id: 'item8',
    categoryId: 'cat1',
    title: 'Corner Bookshelf',
    price: 9999,
    description: 'A space-saving corner bookshelf with multiple tiers for books and decorative items.',
    imgPath: 'https://images.pexels.com/photos/380473/pexels-photo-380473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    slug: 'corner-bookshelf',
    featured: false,
    inStock: true,
    specifications: {
      'Material': 'Engineered Wood and Metal',
      'Dimensions': '60cm x 60cm x 180cm',
      'Color': 'Oak and Black',
      'Weight': '20kg',
      'Assembly': 'Required',
    }
  }
];

export const orders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    orderDate: '2025-03-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        itemId: 'item1',
        title: 'Modern Leather Sofa',
        quantity: 1,
        price: 45999,
      },
      {
        itemId: 'item2',
        title: 'Minimalist Coffee Table',
        quantity: 1,
        price: 12999,
      }
    ],
    total: 58998,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
    }
  },
  {
    id: 'order2',
    userId: 'user1',
    orderDate: '2025-04-05T14:45:00Z',
    status: 'shipped',
    items: [
      {
        itemId: 'item6',
        title: 'Ergonomic Office Chair',
        quantity: 1,
        price: 18999,
      }
    ],
    total: 18999,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
    }
  }
];

export const featuredProducts = furnitureItems.filter(item => item.featured);

export const heroSlides = [
  {
    id: 'slide1',
    imgPath: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    title: 'Premium Living Room Collection',
    description: 'Elevate your living space with our exclusive furniture',
  },
  {
    id: 'slide2',
    imgPath: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    title: 'Dining Room Essentials',
    description: 'Create memorable moments with our dining collections',
  },
  {
    id: 'slide3',
    imgPath: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    title: 'Bedroom Sanctuary',
    description: 'Transform your bedroom into a peaceful retreat',
  },
];

export const aboutUsContent = {
  title: 'About Furniture By Panchal',
  description: `
    FurnitureByPanchal was founded in 2025 with a simple mission: to create beautiful, functional furniture that transforms living spaces into homes. What began as a small workshop has grown into a beloved furniture brand that serves customers nationwide.

Our founder, Abhinay Sharma, started with a passion for woodworking and an eye for design. He believed that furniture should not only be beautiful but also built to last for generations. This philosophy continues to guide every piece we create.

Today, our team of skilled craftspeople and designers work together to create furniture that blends traditional craftsmanship with contemporary aesthetics. We're proud to have furnished thousands of homes across the country with pieces that tell a story.
  `,
  vision: 'To be India\'s most trusted furniture brand, known for quality, design, and customer service.',
  values: [
    'Quality craftsmanship',
    'Innovative design',
    'Customer satisfaction',
    'Environmental responsibility',
    'Fair pricing'
  ],
  teamMembers: [
    {
      name: 'Abhinay Sharma',
      position: 'Founder & CEO',
      imgPath: '/abhinay.jpeg' // Path relative to the public folder
    },
    {
      name: 'Isha Dalal',
      position: 'Head of Design',
      imgPath: '/isha.jpeg' // Path relative to the public folder
    },
    {
      name: 'Devil',
      position: 'Operations Manager',
      imgPath: '/abhinay2.jpeg' // Path relative to the public folder
    }
  ]
};

export const contactUsContent = {
  heading: 'Get in Touch',
  description: 'Have questions or need assistance? We\'re here to help! Reach out to us through any of the methods below or visit one of our showrooms.',
  email: 'panchalabhinay@gmail.com',
  phone: '+91 8358985420',
  address: 'Kushwah Nagar, Indore, Madhya Pradesh - 452015',
  hours: 'Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 6:00 PM',
  showrooms: [
    {
      city: 'Indore',
      address: 'Kushwah nagar, Indore - 452015',
      phone: '+91 83589 85420'
    }
  ],
  socialMedia: {
    facebook: 'https://facebook.com/furniturebypanchal',
    instagram: 'https://instagram.com/furniturebypanchal',
    twitter: 'https://twitter.com/furniturebypanchal'
  }
};

const mockCategories =[
  {
    id: 'cat1',
    title: 'Living Room from api',
    description: 'Stylish and comfortable furniture for your living space',
    slug: 'living-room',
    imgPath: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat2',
    title: 'Bedroom',
    description: 'Elegant and restful furniture for your personal sanctuary',
    slug: 'bedroom',
    imgPath: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat3',
    title: 'Dining Room',
    description: 'Beautiful dining sets for memorable meals with family and friends',
    slug: 'dining-room',
    imgPath: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat4',
    title: 'Office',
    description: 'Professional and ergonomic furniture for your workspace',
    slug: 'office',
    imgPath: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 'cat5',
    title: 'Outdoor',
    description: 'Durable and stylish furniture for your garden or patio',
    slug: 'outdoor',
    imgPath: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  }
];