import { Cake, UtensilsCrossed, Building2, PartyPopper, Flower2, Sparkles, type LucideIcon } from 'lucide-react';

export type Service = {
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  image: string;
  features: string[];
  longDesc: string;
};

export const services: Service[] = [
  {
    icon: Cake,
    title: 'Grand Weddings',
    shortDesc: 'From mandap to mandapaya, we craft dream weddings with breathtaking decor and flawless execution.',
    image: '/service-wedding.jpg',
    features: [
      'Mandap & stage decoration with floral arrangements',
      'Complete venue transformation and lighting',
      'Wedding planning and coordination',
      'Reception setup and guest management',
      'Multi-cuisine wedding catering',
      'Photography and entertainment coordination',
    ],
    longDesc: 'Your wedding day deserves nothing less than perfection. We transform venues into breathtaking spaces with exquisite mandap decorations, floral arches, chandelier lighting, and every detail that makes a wedding truly grand. From the first haldi ceremony to the final reception, our team handles it all.',
  },
  {
    icon: Flower2,
    title: 'Thread Ceremonies',
    shortDesc: 'Traditional ceremonies with authentic decorations, floral arrangements, and cultural precision.',
    image: '/service-thread-ceremony.png',
    features: [
      'Traditional marigold and flower decorations',
      'Sacred ritual setup with authentic items',
      'Kalash and puja thali arrangements',
      'Traditional South Indian / North Indian catering',
      'Family seating and stage arrangement',
      'Cultural music and ceremony coordination',
    ],
    longDesc: 'Thread ceremonies are sacred occasions that deserve authentic, respectful execution. We specialize in traditional decorations with marigolds, banana leaves, and floral arrangements that honor centuries of cultural tradition. Our team ensures every ritual element is perfectly placed.',
  },
  {
    icon: PartyPopper,
    title: 'Birthday Parties',
    shortDesc: 'Themed birthday celebrations with creative decorations, entertainment, and delicious treats.',
    image: '/service-party.png',
    features: [
      'Themed balloon and prop decorations',
      'Custom birthday backdrops and photo booths',
      'Cake table and dessert station setup',
      'Kids entertainment and games coordination',
      'Birthday catering with kid-friendly menu',
      'Party favors and return gift arrangements',
    ],
    longDesc: 'Every birthday is a milestone worth celebrating in style. Whether it is a first birthday, a sweet sixteen, or a milestone jubilee, we create themed celebrations with stunning balloon arrangements, creative backdrops, and delicious catering that delights guests of all ages.',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    shortDesc: 'Professional conferences, product launches, and corporate galas managed end-to-end.',
    image: '/service-corporate.jpg',
    features: [
      'Conference and seminar room setup',
      'Stage, audio-visual, and lighting arrangements',
      'Corporate catering and coffee break service',
      'Product launch and brand activation events',
      'Award ceremony and annual day celebrations',
      'Guest registration and hospitality management',
    ],
    longDesc: 'Professional events demand professional execution. We manage corporate conferences, product launches, annual days, and corporate galas with precision. From AV setup and stage design to premium catering and guest hospitality, we ensure your brand shines at every corporate gathering.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering Services',
    shortDesc: 'Our strongest suit — multi-cuisine catering with authentic flavors that delight every guest.',
    image: '/service-catering.png',
    features: [
      'North Indian, South Indian, Chinese & Continental cuisine',
      'Live food counters and chaat stations',
      'Elegant buffet and plated service options',
      'Customized menus for dietary preferences',
      'Premium presentation and food styling',
      'Trained service staff and on-site kitchen setup',
    ],
    longDesc: 'Catering is the heart of our business and our greatest pride. Our chefs craft authentic multi-cuisine menus using fresh ingredients and time-honored recipes. From live dosa counters to elegant buffet spreads, every dish is prepared with passion and presented with style that leaves guests raving.',
  },
  {
    icon: Sparkles,
    title: 'Private Ceremonies',
    shortDesc: 'Intimate gatherings and private celebrations tailored to your unique vision and style.',
    image: '/service-house-warming.png',
    features: [
      'Intimate dinner party setups',
      'Custom theme and decor for private events',
      'Personalized catering menus',
      'Ambient lighting and table styling',
      'Music and entertainment arrangements',
      'Guest experience and hospitality management',
    ],
    longDesc: 'Some celebrations are best kept intimate. Whether it is a family reunion, an anniversary dinner, or a private gathering of close friends, we create warm, personalized experiences. Every detail from table settings to ambient lighting is curated to match your unique vision.',
  },
];
