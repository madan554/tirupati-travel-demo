/**
 * Customer-facing content for the travel demo.
 * Replace the agency name, contact details, packages, prices and copy here.
 * Prices are samples for presentation and are labelled as such in the UI.
 * Do not put internal service-proposal fees in this file.
 */

export type Localized = { en: string; te: string };

export type VehicleId = "sedan" | "suv" | "tempo";

export type ItineraryStop = {
  time: Localized;
  title: Localized;
  detail: Localized;
};

export type TravelPackage = {
  slug: string;
  title: Localized;
  duration: Localized;
  price: number;
  priceUnit: Localized;
  image: string;
  imageAlt: Localized;
  gallery: { src: string; alt: Localized }[];
  summary: Localized;
  description: Localized;
  includes: Localized[];
  excludes: Localized[];
  itinerary: ItineraryStop[];
};

export const site = {
  agencyName: { en: "Sri Padmavathi Travels", te: "శ్రీ పద్మావతి ట్రావెల్స్" } satisfies Localized,
  tagline: {
    en: "Tirupati · Tirumala · Beyond",
    te: "తిరుపతి · తిరుమల · ఆవల",
  } satisfies Localized,
  heroImageAlt: {
    en: "Tirumala Venkateswara Temple",
    te: "తిరుమల వెంకటేశ్వర ఆలయం",
  } satisfies Localized,
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  email: "hello@sripadmavathitravels.in",
  address: {
    en: "18, TP Area, Near Tirupati Railway Station, Tirupati, Andhra Pradesh 517501",
    te: "18, టి.పి. ఏరియా, తిరుపతి రైల్వే స్టేషన్ దగ్గర, తిరుపతి, ఆంధ్రప్రదేశ్ 517501",
  } satisfies Localized,
  hours: { en: "5:30 AM – 10:00 PM", te: "ఉదయం 5:30 – రాత్రి 10:00" } satisfies Localized,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Tirupati+Railway+Station+Andhra+Pradesh",
};

export const vehicles: {
  id: VehicleId;
  name: Localized;
  seats: number;
  blurb: Localized;
}[] = [
  {
    id: "sedan",
    name: { en: "Sedan", te: "సెడాన్" },
    seats: 4,
    blurb: {
      en: "A quiet car for couples and small families.",
      te: "జంటలు మరియు చిన్న కుటుంబాలకు నిశ్శబ్దమైన కారు.",
    },
  },
  {
    id: "suv",
    name: { en: "SUV", te: "ఎస్‌యూవీ" },
    seats: 6,
    blurb: {
      en: "More room for people and luggage.",
      te: "ప్రయాణికులకు మరియు సామానుకు ఎక్కువ స్థలం.",
    },
  },
  {
    id: "tempo",
    name: { en: "Tempo Traveller", te: "టెంపో ట్రావెలర్" },
    seats: 12,
    blurb: {
      en: "One vehicle for a larger family or group.",
      te: "పెద్ద కుటుంబం లేదా గుంపు కోసం ఒకే వాహనం.",
    },
  },
];

const dayItinerary = {
  tirumala: [
    {
      time: { en: "Morning", te: "ఉదయం" },
      title: {
        en: "Pickup from Tirupati railway station or airport",
        te: "తిరుపతి రైల్వే స్టేషన్ లేదా విమానాశ్రయం నుంచి పికప్",
      },
      detail: {
        en: "The driver meets you at Tirupati railway station or Renigunta Airport. A hotel pickup in Tirupati can be added when you enquire.",
        te: "డ్రైవర్ తిరుపతి రైల్వే స్టేషన్ లేదా రేణిగుంట విమానాశ్రయంలో కలుస్తారు. విచారణలో తిరుపతి హోటల్ పికప్ కూడా చేర్చవచ్చు.",
      },
    },
    {
      time: { en: "Day", te: "పగలు" },
      title: { en: "Tirumala visit", te: "తిరుమల సందర్శన" },
      detail: {
        en: "Drive up to Tirumala for the temple visit. Time on the hill follows the darshan you have already arranged.",
        te: "ఆలయ సందర్శన కోసం తిరుమలకు వెళ్తాం. కొండపై సమయం మీరు ఏర్పాటు చేసుకున్న దర్శనాన్ని బట్టి ఉంటుంది.",
      },
    },
    {
      time: { en: "Afternoon", te: "మధ్యాహ్నం" },
      title: { en: "Sri Padmavathi Temple, Tiruchanur", te: "శ్రీ పద్మావతి ఆలయం, తిరుచానూరు" },
      detail: {
        en: "Continue to Sri Padmavathi Ammavari Temple at Tiruchanur.",
        te: "తిరుచానూరులోని శ్రీ పద్మావతి అమ్మవారి ఆలయానికి వెళ్తాం.",
      },
    },
    {
      time: { en: "Evening", te: "సాయంత్రం" },
      title: {
        en: "Drop at station, airport or hotel",
        te: "స్టేషన్, విమానాశ్రయం లేదా హోటల్‌ వద్ద డ్రాప్",
      },
      detail: {
        en: "Return to Tirupati railway station, Renigunta Airport, or your hotel.",
        te: "తిరుపతి రైల్వే స్టేషన్, రేణిగుంట విమానాశ్రయం లేదా మీ హోటల్‌కు తిరిగి చేరుస్తాం.",
      },
    },
  ] satisfies ItineraryStop[],
};

export const packages: TravelPackage[] = [
  {
    slug: "tirupati-tirumala",
    title: { en: "Tirupati – Tirumala Temple Tour", te: "తిరుపతి – తిరుమల ఆలయ టూర్" },
    duration: { en: "1 Day", te: "1 రోజు" },
    price: 2499,
    priceUnit: { en: "per car", te: "ఒక కారుకు" },
    image: "/images/tirumala.jpg",
    imageAlt: {
      en: "Gopurams of the Tirumala Venkateswara Temple",
      te: "తిరుమల వెంకటేశ్వర ఆలయ గోపురాలు",
    },
    gallery: [
      {
        src: "/images/tirumala.jpg",
        alt: {
          en: "A view of the Tirumala Venkateswara Temple",
          te: "తిరుమల వెంకటేశ్వర ఆలయ దృశ్యం",
        },
      },
      {
        src: "/images/padmavathi.jpg",
        alt: {
          en: "Main gopuram of the Padmavathi temple at Tiruchanur",
          te: "తిరుచానూరు పద్మావతి ఆలయ ప్రధాన గోపురం",
        },
      },
      {
        src: "/images/hills.jpg",
        alt: { en: "Tirupati hills in the evening", te: "సాయంత్రం తిరుపతి కొండలు" },
      },
    ],
    summary: {
      en: "A private cab for Tirumala and Sri Padmavathi Temple at Tiruchanur, with pickup from the station or airport.",
      te: "స్టేషన్ లేదా విమానాశ్రయం నుంచి పికప్‌తో తిరుమల మరియు తిరుచానూరు శ్రీ పద్మావతి ఆలయానికి ప్రైవేట్ క్యాబ్.",
    },
    description: {
      en: "The day is paced around your darshan. You travel in a private vehicle with a driver who handles the ghat road, the Tiruchanur stop, and the evening drop.",
      te: "రోజు మీ దర్శనం చుట్టూ సాగుతుంది. ఘాట్ రోడ్డు, తిరుచానూరు ఆగు మరియు సాయంత్రం డ్రాప్ చూసే డ్రైవర్‌తో ప్రైవేట్ వాహనంలో ప్రయాణిస్తారు.",
    },
    includes: [
      {
        en: "Private air-conditioned vehicle for the day",
        te: "రోజంతా ప్రైవేట్ ఎయిర్ కండిషన్డ్ వాహనం",
      },
      { en: "Driver for the listed route", te: "ఈ మార్గానికి డ్రైవర్" },
      {
        en: "Pickup and drop at Tirupati railway station, Renigunta Airport, or a Tirupati hotel",
        te: "తిరుపతి రైల్వే స్టేషన్, రేణిగుంట విమానాశ్రయం లేదా తిరుపతి హోటల్ వద్ద పికప్ మరియు డ్రాప్",
      },
    ],
    excludes: [
      { en: "Darshan and special-entry tickets", te: "దర్శనం మరియు స్పెషల్ ఎంట్రీ టికెట్లు" },
      { en: "Meals", te: "భోజనం" },
      { en: "Accommodation", te: "వసతి" },
    ],
    itinerary: dayItinerary.tirumala,
  },
  {
    slug: "srikalahasti-kanipakam",
    title: { en: "Srikalahasti – Kanipakam", te: "శ్రీకాళహస్తి – కాణిపాకం" },
    duration: { en: "1 Day", te: "1 రోజు" },
    price: 3199,
    priceUnit: { en: "per car", te: "ఒక కారుకు" },
    image: "/images/kalahasti.jpg",
    imageAlt: {
      en: "Srikalahasti temple gopuram with Kannappa Hill behind it",
      te: "కన్నప్ప కొండ నేపథ్యంలో శ్రీకాళహస్తి ఆలయ గోపురం",
    },
    gallery: [
      {
        src: "/images/kalahasti.jpg",
        alt: {
          en: "Srikalahasti temple and Kannappa Hill",
          te: "శ్రీకాళహస్తి ఆలయం మరియు కన్నప్ప కొండ",
        },
      },
      {
        src: "/images/kanipakam.jpg",
        alt: { en: "Gopuram of the Kanipakam temple", te: "కాణిపాకం ఆలయ గోపురం" },
      },
    ],
    summary: {
      en: "A one-day private cab to Srikalahasti and the Kanipakam Vinayaka temple, starting from Tirupati.",
      te: "తిరుపతి నుంచి శ్రీకాళహస్తి మరియు కాణిపాకం వినాయక ఆలయానికి ఒక రోజు ప్రైవేట్ క్యాబ్.",
    },
    description: {
      en: "A calm day circuit for guests who want both temples without changing vehicles. The order can be reversed if you prefer Kanipakam first.",
      te: "వాహనం మార్చకుండా రెండు ఆలయాలు చూడాలనుకునే అతిథులకు ప్రశాంతమైన రోజు మార్గం. కాణిపాకం ముందు కావాలంటే క్రమం మార్చవచ్చు.",
    },
    includes: [
      { en: "Private vehicle and driver for the day", te: "రోజంతా ప్రైవేట్ వాహనం మరియు డ్రైవర్" },
      { en: "Pickup and drop in Tirupati", te: "తిరుపతిలో పికప్ మరియు డ్రాప్" },
      {
        en: "Stops at Srikalahasti and Kanipakam",
        te: "శ్రీకాళహస్తి మరియు కాణిపాకం వద్ద ఆగులు",
      },
    ],
    excludes: [
      { en: "Temple tickets, where a fee applies", te: "రుసుము ఉన్న చోట ఆలయ టికెట్లు" },
      { en: "Meals", te: "భోజనం" },
    ],
    itinerary: [
      {
        time: { en: "Morning", te: "ఉదయం" },
        title: { en: "Pickup in Tirupati", te: "తిరుపతిలో పికప్" },
        detail: {
          en: "Start from your Tirupati hotel, the railway station, or Renigunta Airport.",
          te: "మీ తిరుపతి హోటల్, రైల్వే స్టేషన్ లేదా రేణిగుంట విమానాశ్రయం నుంచి ప్రారంభం.",
        },
      },
      {
        time: { en: "Day", te: "పగలు" },
        title: { en: "Srikalahasti temple", te: "శ్రీకాళహస్తి ఆలయం" },
        detail: {
          en: "Visit Srikalahasteeswara Temple. Time at the temple is yours to set.",
          te: "శ్రీకాళహస్తీశ్వర ఆలయ దర్శనం. ఆలయంలో సమయం మీ అవసరం మేరకు.",
        },
      },
      {
        time: { en: "Afternoon", te: "మధ్యాహ్నం" },
        title: { en: "Kanipakam Vinayaka temple", te: "కాణిపాకం వినాయక ఆలయం" },
        detail: {
          en: "Continue to Kanipakam for the Vinayaka temple.",
          te: "వినాయక ఆలయం కోసం కాణిపాకం వెళ్తాం.",
        },
      },
      {
        time: { en: "Evening", te: "సాయంత్రం" },
        title: { en: "Return to Tirupati", te: "తిరుపతికి తిరిగి రావడం" },
        detail: {
          en: "Drop at your hotel, the railway station, or the airport.",
          te: "హోటల్, రైల్వే స్టేషన్ లేదా విమానాశ్రయం వద్ద డ్రాప్.",
        },
      },
    ],
  },
  {
    slug: "chennai-mahabalipuram",
    title: { en: "Chennai – Mahabalipuram", te: "చెన్నై – మహాబలిపురం" },
    duration: { en: "3 Nights / 4 Days", te: "3 రాత్రులు / 4 రోజులు" },
    price: 8999,
    priceUnit: { en: "per car", te: "ఒక కారుకు" },
    image: "/images/mahabalipuram.jpg",
    imageAlt: {
      en: "The Shore Temple at Mahabalipuram beside the sea",
      te: "సముద్రం పక్కన మహాబలిపురం షోర్ టెంపుల్",
    },
    gallery: [
      {
        src: "/images/mahabalipuram.jpg",
        alt: { en: "Shore Temple, Mahabalipuram", te: "షోర్ టెంపుల్, మహాబలిపురం" },
      },
    ],
    summary: {
      en: "A four-day private cab plan from Tirupati toward Chennai and the Mahabalipuram shore temples.",
      te: "తిరుపతి నుంచి చెన్నై మరియు మహాబలిపురం తీర దేవాలయాల వైపు నాలుగు రోజుల ప్రైవేట్ క్యాబ్ ప్రణాళిక.",
    },
    description: {
      en: "This sample plan keeps one vehicle and driver with you for the journey. Hotels, meals and monument tickets are arranged separately, so the fare stays easy to explain.",
      te: "ఈ నమూనా ప్రణాళికలో ప్రయాణమంతా ఒకే వాహనం మరియు డ్రైవర్ ఉంటారు. హోటళ్లు, భోజనం మరియు స్మారక టికెట్లు విడిగా ఏర్పాటు అవుతాయి, కాబట్టి ధర స్పష్టంగా ఉంటుంది.",
    },
    includes: [
      {
        en: "Private vehicle and driver for the four days",
        te: "నాలుగు రోజులు ప్రైవేట్ వాహనం మరియు డ్రైవర్",
      },
      {
        en: "Driving between Tirupati, Chennai and Mahabalipuram on the sample route",
        te: "నమూనా మార్గంలో తిరుపతి, చెన్నై మరియు మహాబలిపురం మధ్య ప్రయాణం",
      },
    ],
    excludes: [
      { en: "Hotels and meals", te: "హోటళ్లు మరియు భోజనం" },
      { en: "Monument and temple tickets", te: "స్మారక మరియు ఆలయ టికెట్లు" },
    ],
    itinerary: [
      {
        time: { en: "Day 1", te: "మొదటి రోజు" },
        title: { en: "Tirupati to Chennai", te: "తిరుపతి నుంచి చెన్నై" },
        detail: {
          en: "Depart Tirupati and reach Chennai. The evening is free.",
          te: "తిరుపతి నుంచి బయలుదేరి చెన్నై చేరుకుంటారు. సాయంత్రం ఖాళీ.",
        },
      },
      {
        time: { en: "Day 2", te: "రెండవ రోజు" },
        title: { en: "Chennai at an easy pace", te: "నెమ్మదిగా చెన్నై" },
        detail: {
          en: "A relaxed city day. Tell us which temples or neighbourhoods you want to include.",
          te: "నెమ్మదైన నగర రోజు. ఏ ఆలయాలు లేదా ప్రాంతాలు కావాలో చెప్పండి.",
        },
      },
      {
        time: { en: "Day 3", te: "మూడవ రోజు" },
        title: { en: "Mahabalipuram", te: "మహాబలిపురం" },
        detail: {
          en: "Drive to the shore temple and the monument site, then return to Chennai.",
          te: "షోర్ టెంపుల్ మరియు స్మారక ప్రాంతానికి వెళ్లి చెన్నైకు తిరిగి వస్తాం.",
        },
      },
      {
        time: { en: "Day 4", te: "నాలుగవ రోజు" },
        title: { en: "Drop in Chennai or toward Tirupati", te: "చెన్నైలో లేదా తిరుపతి వైపు డ్రాప్" },
        detail: {
          en: "End at a Chennai hotel, station or airport, or begin the return toward Tirupati.",
          te: "చెన్నై హోటల్, స్టేషన్ లేదా విమానాశ్రయం వద్ద ముగించండి, లేదా తిరుపతి వైపు తిరుగు ప్రయాణం ప్రారంభించండి.",
        },
      },
    ],
  },
];

export function getPackage(slug: string | undefined) {
  return packages.find((item) => item.slug === slug);
}

export const reasons: { id: string; title: Localized; body: Localized }[] = [
  {
    id: "vehicles",
    title: { en: "Comfortable vehicles", te: "సౌకర్యవంతమైన వాహనాలు" },
    body: {
      en: "Air-conditioned sedans, SUVs and a tempo traveller, chosen for the size of the group.",
      te: "గుంపు పరిమాణానికి తగిన ఎయిర్ కండిషన్డ్ సెడాన్, ఎస్‌యూవీ మరియు టెంపో ట్రావెలర్.",
    },
  },
  {
    id: "drivers",
    title: { en: "Experienced drivers", te: "అనుభవజ్ఞులైన డ్రైవర్లు" },
    body: {
      en: "Drivers who know the Tirumala ghat road, station pickups and local timings.",
      te: "తిరుమల ఘాట్ రోడ్డు, స్టేషన్ పికప్‌లు మరియు స్థానిక సమయాలు తెలిసిన డ్రైవర్లు.",
    },
  },
  {
    id: "flexible",
    title: { en: "Flexible tour packages", te: "అనుకూల టూర్ ప్యాకేజీలు" },
    body: {
      en: "Change the route, the pace and the stops so the day suits your group.",
      te: "మీ గుంపుకు తగ్గట్టు మార్గం, వేగం మరియు ఆగే చోట్లు మార్చుకోండి.",
    },
  },
  {
    id: "booking",
    title: { en: "Easy booking", te: "సులభమైన బుకింగ్" },
    body: {
      en: "Send an enquiry from the website, or continue the same conversation on WhatsApp.",
      te: "వెబ్‌సైట్ నుంచి విచారణ పంపండి, లేదా అదే సంభాషణను వాట్సాప్‌లో కొనసాగించండి.",
    },
  },
  {
    id: "support",
    title: { en: "Customer support", te: "కస్టమర్ సపోర్ట్" },
    body: {
      en: "Reach the desk by phone or WhatsApp while you are still planning the trip.",
      te: "ప్రయాణం ప్లాన్ చేస్తున్నప్పుడే ఫోన్ లేదా వాట్సాప్ ద్వారా డెస్క్‌ను సంప్రదించండి.",
    },
  },
  {
    id: "pricing",
    title: { en: "Transparent pricing", te: "పారదర్శక ధరలు" },
    body: {
      en: "Sample fares are shown before you enquire. The confirmed quote says what is included.",
      te: "విచారణకు ముందే నమూనా ధరలు కనిపిస్తాయి. ధృవీకరించిన కోట్‌లో ఏమి చేరి ఉందో ఉంటుంది.",
    },
  },
];

export const about = {
  body: {
    en: "Sri Padmavathi Travels is the sample name for this presentation. The page shows how a Tirupati desk can offer private cabs and planned visits to Tirumala, Tiruchanur, Srikalahasti and Kanipakam, plus longer drives toward Chennai and Mahabalipuram.",
    te: "ఈ ప్రదర్శనకు శ్రీ పద్మావతి ట్రావెల్స్ ఒక నమూనా పేరు. తిరుమల, తిరుచానూరు, శ్రీకాళహస్తి మరియు కాణిపాకం సందర్శనలతో పాటు చెన్నై, మహాబలిపురం వైపు దీర్ఘ ప్రయాణాలను ఒక తిరుపతి డెస్క్ ఎలా చూపించవచ్చో ఈ పేజీ చెబుతుంది.",
  } satisfies Localized,
  points: [
    {
      en: "Temple circuits arranged around the darshan time you already hold",
      te: "మీ దగ్గర ఉన్న దర్శన సమయం చుట్టూ ఆలయ మార్గాలు",
    },
    {
      en: "Pickups from the railway station, Renigunta Airport, or a Tirupati hotel",
      te: "రైల్వే స్టేషన్, రేణిగుంట విమానాశ్రయం లేదా తిరుపతి హోటల్ నుంచి పికప్",
    },
    {
      en: "Day tours and multi-day cab plans on the same website",
      te: "ఒకే వెబ్‌సైట్‌లో ఒక రోజు టూర్లు మరియు బహుళ రోజుల క్యాబ్ ప్రణాళికలు",
    },
  ] satisfies Localized[],
};

export const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { en: "How can I book a tour?", te: "టూర్ ఎలా బుక్ చేయాలి?" },
    a: {
      en: "Send the enquiry form, or use the travel assistant, with your name, travel date and group size. The desk confirms the vehicle on the phone or WhatsApp. This demo keeps the enquiry on the page and does not submit it to a live booking system.",
      te: "మీ పేరు, ప్రయాణ తేదీ మరియు గుంపు పరిమాణంతో విచారణ ఫారం పంపండి, లేదా ట్రావెల్ అసిస్టెంట్‌ను ఉపయోగించండి. డెస్క్ ఫోన్ లేదా వాట్సాప్‌లో వాహనాన్ని ధృవీకరిస్తుంది. ఈ డెమో విచారణను పేజీలోనే ఉంచుతుంది. లైవ్ బుకింగ్ వ్యవస్థకు పంపదు.",
    },
  },
  {
    q: { en: "Are airport pickups available?", te: "విమానాశ్రయ పికప్ ఉందా?" },
    a: {
      en: "Yes. Pickups can be arranged from Renigunta Airport and Tirupati railway station, or from a hotel in Tirupati. Add the pickup point in your enquiry.",
      te: "అవును. రేణిగుంట విమానాశ్రయం, తిరుపతి రైల్వే స్టేషన్ లేదా తిరుపతిలోని హోటల్ నుంచి పికప్ ఏర్పాటు చేయవచ్చు. విచారణలో పికప్ చోటు చేర్చండి.",
    },
  },
  {
    q: { en: "Can I customize a package?", te: "ప్యాకేజీని మార్చుకోవచ్చా?" },
    a: {
      en: "Yes. Tell us the temples, the pace and the number of days. The sample packages are starting points.",
      te: "అవును. ఆలయాలు, వేగం మరియు రోజుల సంఖ్య చెప్పండి. నమూనా ప్యాకేజీలు ప్రారంభ బిందువులు.",
    },
  },
  {
    q: { en: "Which vehicles are available?", te: "ఏ వాహనాలు అందుబాటులో ఉన్నాయి?" },
    a: {
      en: "A sedan for up to 4 guests, an SUV for up to 6, and a tempo traveller for larger groups. The fleet panel on this page is a simulated demo.",
      te: "4 మంది వరకు సెడాన్, 6 మంది వరకు ఎస్‌యూవీ, పెద్ద గుంపులకు టెంపో ట్రావెలర్. ఈ పేజీలోని ఫ్లీట్ ప్యానెల్ అనుకరణ డెమో.",
    },
  },
  {
    q: { en: "Are darshan tickets included?", te: "దర్శన టికెట్లు చేరి ఉన్నాయా?" },
    a: {
      en: "No. Darshan and special-entry tickets are booked separately through the official Tirumala Tirupati Devasthanams channels.",
      te: "లేదు. దర్శనం మరియు స్పెషల్ ఎంట్రీ టికెట్లు అధికారిక తిరుమల తిరుపతి దేవస్థానం మార్గాల ద్వారా విడిగా బుక్ చేసుకోవాలి.",
    },
  },
];

export const testimonials: {
  id: string;
  quote: Localized;
  guest: Localized;
  trip: Localized;
}[] = [
  {
    id: "station",
    quote: {
      en: "The sedan was comfortable, and the driver knew exactly where to meet us at the railway station.",
      te: "సెడాన్ సౌకర్యంగా ఉంది. రైల్వే స్టేషన్‌లో ఎక్కడ కలవాలో డ్రైవర్‌కు సరిగ్గా తెలుసు.",
    },
    guest: { en: "Sample guest, Hyderabad", te: "నమూనా అతిథి, హైదరాబాద్" },
    trip: { en: "Tirupati–Tirumala day tour", te: "తిరుపతి–తిరుమల ఒక రోజు టూర్" },
  },
  {
    id: "pace",
    quote: {
      en: "We wanted Tirumala in the morning and Tiruchanur in the afternoon. The day plan was easy to follow.",
      te: "ఉదయం తిరుమల, మధ్యాహ్నం తిరుచానూరు కావాలనుకున్నాం. రోజు ప్రణాళిక అనుసరించడం సులభం.",
    },
    guest: { en: "Sample guest, Bengaluru", te: "నమూనా అతిథి, బెంగళూరు" },
    trip: { en: "Temple day with Tiruchanur", te: "తిరుచానూరుతో ఆలయ దినం" },
  },
  {
    id: "whatsapp",
    quote: {
      en: "The enquiry started on the website, and the rest of the details came through on WhatsApp.",
      te: "విచారణ వెబ్‌సైట్‌లో మొదలైంది. మిగతా వివరాలు వాట్సాప్‌లో వచ్చాయి.",
    },
    guest: { en: "Sample guest, Chennai", te: "నమూనా అతిథి, చెన్నై" },
    trip: { en: "Family cab from the airport", te: "విమానాశ్రయం నుంచి కుటుంబ క్యాబ్" },
  },
];

export type FleetStatus = "on-trip" | "available";

export const fleet: {
  id: string;
  plate: string;
  vehicleId: VehicleId;
  driver: Localized;
  status: FleetStatus;
  etaMin: number | null;
  x: number;
  y: number;
}[] = [
  {
    id: "ravi",
    plate: "AP 03 AB 2148",
    vehicleId: "sedan",
    driver: { en: "Ravi", te: "రవి" },
    status: "on-trip",
    etaMin: 6,
    x: 61,
    y: 40,
  },
  {
    id: "suresh",
    plate: "AP 03 EF 1094",
    vehicleId: "tempo",
    driver: { en: "Suresh", te: "సురేష్" },
    status: "on-trip",
    etaMin: 18,
    x: 28,
    y: 68,
  },
  {
    id: "meena",
    plate: "AP 03 JK 7732",
    vehicleId: "suv",
    driver: { en: "Meena", te: "మీనా" },
    status: "on-trip",
    etaMin: 11,
    x: 76,
    y: 58,
  },
  {
    id: "lakshmi",
    plate: "AP 03 CD 8821",
    vehicleId: "suv",
    driver: { en: "Lakshmi", te: "లక్ష్మి" },
    status: "available",
    etaMin: null,
    x: 44,
    y: 62,
  },
  {
    id: "kiran",
    plate: "AP 03 GH 4410",
    vehicleId: "sedan",
    driver: { en: "Kiran", te: "కిరణ్" },
    status: "available",
    etaMin: null,
    x: 48,
    y: 72,
  },
];

export const mapPlaces: { id: string; x: number; y: number; label: Localized }[] = [
  { id: "airport", x: 16, y: 80, label: { en: "Renigunta Airport", te: "రేణిగుంట విమానాశ్రయం" } },
  { id: "tirupati", x: 40, y: 66, label: { en: "Tirupati", te: "తిరుపతి" } },
  { id: "alipiri", x: 55, y: 46, label: { en: "Alipiri", te: "ఆలిపిరి" } },
  { id: "tirumala", x: 72, y: 16, label: { en: "Tirumala", te: "తిరుమల" } },
];

export const photoCredits: { label: string; author: string; license: string; href: string }[] = [
  {
    label: "Tirumala",
    author: "Nikhilb239",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tirumala_090615.jpg",
  },
  {
    label: "Tirumala Venkateswara Temple",
    author: "Adityamadhav83",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:A_View_of_Tirumala_Venkateswara_Temple.JPG",
  },
  {
    label: "Srikalahasti and Kannappa Hill",
    author: "రవిచంద్ర",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:View_of_Srikalahasti_gopuram_and_kannappa_hill.jpg",
  },
  {
    label: "Kanipakam temple",
    author: "IM3847",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Galipgopuram_of_Kanipakam_temple_(May_2019)_2.jpg",
  },
  {
    label: "Shore Temple, Mahabalipuram",
    author: "Anandavinash",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Mahabalipuram_-_Shore_Temple.jpg",
  },
  {
    label: "Tirupati hills",
    author: "Sindhukiran",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tirupathi_Hills_evening_View.jpg",
  },
  {
    label: "Padmavathi temple, Tiruchanur",
    author: "Bhaskaranaidu",
    license: "CC BY 2.5",
    href: "https://commons.wikimedia.org/wiki/File:Main_gopuram_of_padmavati_ammavaari_temple_tirucanuru.JPG",
  },
];
