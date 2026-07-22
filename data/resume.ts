// Resume content: single source of truth for the home page.
// Rewritten for the 2026 job hunt: professional framing, typos fixed.

export const intro = {
  name: "Kevin Newman",
  tagline: "Full Stack Developer",
  location: "Remote · Canada",
  headline: "I build web and mobile products, end to end.",
  body: [
    "I'm a full stack developer with 10+ years of experience shipping software, from payment platforms and customer portals to 3D marketing apps and hybrid mobile products.",
    "Away from work I'm a game jam regular, always tinkering on a side project (and playing too much Age of Empires II: DE).",
  ],
  // Kept as split parts so the address never appears assembled in the
  // HTML/bundle - see components/EmailButton.tsx.
  emailUser: "kevin",
  emailDomain: "kevinnewman.ca",
  resumePdf: "/assets/pdf/KevinNewmanResume.pdf",
  stats: [
    { value: "10+", label: "years shipping software" },
    { value: "Web · Mobile · Desktop · N64", label: "platforms shipped on" },
  ],
  now: [
    {
      icon: "🛰",
      text: "Building CondoPulse, a status platform for condo buildings",
      href: "/projects/condopulse/",
    },
    {
      icon: "📱",
      text: "Rewriting an ISP field-tech app in React Native at Sonar",
      href: "#job-sonar-software",
    },
    {
      icon: "🎮",
      text: "Pandemonium, a souls-like for the Nintendo 64",
      href: "/projects/pandemonium/",
    },
  ],
  social: {
    github: "https://github.com/HellooooNewman",
    linkedin: "https://www.linkedin.com/in/helloooonewman",
    twitter: "https://twitter.com/Helloooo_Newman",
    itch: "https://helloooonewman.itch.io",
  },
};

// Two tiers: the curated stack I work in daily, then everything else.
export const skills = {
  core: [
    "TypeScript",
    "React",
    "React Native",
    "Vue",
    "Node.js",
    "Laravel (PHP)",
    "PostgreSQL",
    "GraphQL",
  ],
  also: [
    "Angular",
    "Flutter",
    "HTML5",
    "CSS3/Sass",
    "Three.js",
    "Babylon",
    "RxJS",
    "Electron",
    "Ionic",
    "C",
    "C++",
    "C#",
    ".NET",
    "Redis",
    "MongoDB",
    "MySQL",
    "REST APIs",
    "MCP servers",
    "Docker",
    "CircleCI",
    "Jenkins",
    "Octopus",
    "Git",
    "Figma",
    "Illustrator",
    "Photoshop",
    "After Effects",
    "Premiere",
    "Unity",
    "Blender",
    "Azure",
    "DigitalOcean",
    "AWS",
  ],
};

export interface JobSection {
  heading: string;
  points: string[];
}

export interface Job {
  employer: string;
  employerLink: string;
  logo: string;
  title: string;
  employmentType: "Full-time" | "Contract";
  period: string;
  location: string;
  summary?: string;
  sections?: JobSection[];
  points: string[];
  technology: string;
}

export const jobs: Job[] = [
  {
    employer: "Sonar Software",
    employerLink: "https://sonar.software",
    logo: "/assets/company-logos/sonar.svg",
    title: "Software Engineer → Senior Software Engineer",
    employmentType: "Full-time",
    period: "Jan 2021 – Present",
    location: "Remote",
    summary:
      "Full-stack and mobile engineer spanning three products over 5 years: sole developer of the field-technician mobile apps, payments/billing owner on the core web platform, and feature developer on the customer self-service portal.",
    sections: [
      {
        heading: "Mobile: Field Tech (Flutter → React Native)",
        points: [
          "Sole developer of Sonar's offline-first field-technician mobile app in Flutter (886 commits, versions 0.13→0.16), used by ISP installers to manage jobs, tickets, inventory, and provisioning",
          "Architected an offline-first sync engine (mutation queue with retry/backoff, connectivity detection, and a Drift/SQLite local database with a multi-version migration path), enabling technicians to work without connectivity",
          "Led a ground-up Flutter rewrite to Riverpod state management and a repository pattern, consolidating three data-mutation patterns into one documented standard",
          "Rebuilt the app from the ground up in modern React Native (RN 0.79, TypeScript, React Navigation 7, Apollo GraphQL, Redux Toolkit) with a redesigned UI and full light/dark theming across ~17 screens (2025–2026)",
          "Currently building white-label sales and customer-portal app variants for ISP clients on the same React Native foundation",
          "Shipped high-value field features: credit-card scanning for on-site payments, handwritten-signature contracts, iOS Live Activities for job tracking, global search, and a technician dashboard",
          "Integrated Calix SMx provisioning and Auth0 SSO with MFA; built the mobile CI/CD pipeline (Azure Pipelines + GitHub Actions, Fastlane, ConfigCat flags) and a Patrol end-to-end test suite with full internationalization",
        ],
      },
      {
        heading: "Core Platform: Payments & Billing",
        points: [
          "Owned the SonarPay payments domain end to end: disbursements, disputes, AVS/CVV/3DS verification, and void/refund/reverse-payment workflows across multiple processors (Payrix, ProPay)",
          "Delivered Flexible / 30-Day Billing: configurable service-period offsets, bill-day vs. invoice-day logic, proration, and delinquency calculations, rolled out behind feature flags",
          "Drove a frontend de-globalization refactor converting 35+ global services to explicit imports/singletons, resolving circular-dependency and webpack memory issues and modernizing the unit-test suite",
          "Built a code-generation pipeline for type-safe enums (with translation integration) reused across the entire codebase, plus the mobile-app login backend (Auth0, FCM push notifications)",
          "Rebuilt the account overview into a permission-aware, user-customizable dashboard, and shipped RADIUS session tooling, SAML/Active Directory auth, and Print-to-Mail invoice batching",
        ],
      },
      {
        heading: "Customer Portal",
        points: [
          "Overhauled the subscriber payment experience: billing summaries, auto-pay UX, multi-currency support, and Stripe integration updates",
          "Implemented NACHA compliance and Canadian bank-routing support, plus credit-card-processor gating and multi-language (French) localization",
        ],
      },
    ],
    points: [],
    technology:
      "TS, Vue, PHP, Laravel, GraphQL, PostgreSQL, Flutter/Dart, Riverpod, Drift/SQLite, React Native, Redux Toolkit, Apollo, Auth0, Azure Pipelines, GitHub Actions, Fastlane, Docker",
  },
  {
    employer: "Xello",
    employerLink: "https://xello.world",
    logo: "/assets/company-logos/xello.svg",
    title: "Full Stack Web Developer",
    employmentType: "Full-time",
    period: "Jan 2019 – Jan 2021",
    location: "Toronto, CA",
    points: [
      "Maintained and evolved a micro-frontend shell application orchestrating web-component-based modules",
      "Migrated legacy AngularJS components, services, and unit tests to Angular and Jest",
      "Localized the product for the UK market, adapting flows to a different school system",
      "Improved performance of existing SQL queries and authored new stored procedures",
    ],
    technology:
      "TS, SCSS, Angular, NgRx, RxJS, .NET, SQL, Slack API, Jest, Jenkins, Octopus, Azure",
  },
  {
    employer: "Wuzzals",
    employerLink: "https://wuzzals.com",
    logo: "/assets/company-logos/Wuzzals.svg",
    title: "Full Stack Web Developer",
    employmentType: "Contract",
    period: "Oct 2018 – Jan 2020",
    location: "Toronto, CA",
    points: [
      "Sole developer maintaining and extending the Laravel + Vue platform for a personalized children's-book company",
      "Automated the book-cover creation pipeline with Photoshop Action scripts and dynamic image resizing",
      "Refactored components for reusability and improved site-wide performance and design",
      "Launched comic books as a new product line and introduced a Trello workflow adopted company-wide",
      "Managed support for users, writers, artists, and teachers",
    ],
    technology: "Laravel, Vue, Photoshop scripting",
  },
  {
    employer: "Trailerworks",
    employerLink: "https://www.trailerworksstudio.com/",
    logo: "/assets/company-logos/trailerworks.svg",
    title: "Full Stack Web Developer",
    employmentType: "Contract",
    period: "Aug 2018 – Jan 2019",
    location: "Toronto, CA",
    points: [
      "Built the company's interim and final marketing sites in React",
      "Wrote technical estimates for client RFPs",
      "Managed the existing Magento e-commerce store",
      "Launched a Shopify storefront for honey produced on site",
    ],
    technology: "React, Magento, Shopify",
  },
  {
    employer: "Grassriots",
    employerLink: "https://grassriots.com",
    logo: "/assets/company-logos/Grassriots.png",
    title: "Full Stack Web Developer",
    employmentType: "Contract",
    period: "Mar 2018 – Jul 2018",
    location: "Toronto, CA",
    points: [
      "Cut campaign delivery time from over a month to about ten days by streamlining the development workflow",
      "Rebuilt the Webpack configuration, improving build reliability, performance, and developer speed",
      "Added multilingual support with languages easy to add or remove",
      "Modernized the codebase from ES5 prototypes to ES6 classes",
      "Delivered campaigns for UNICEF Canada, World Vision, Ecojustice, and Cystic Fibrosis Canada",
    ],
    technology: "JS (ES6), Webpack, Babel",
  },
  {
    employer: "GE",
    employerLink: "http://www.gegridsolutions.com/",
    logo: "/assets/company-logos/GE.png",
    title: "Frontend Developer",
    employmentType: "Contract",
    period: "Oct 2017 – Feb 2018",
    location: "Markham, CA",
    points: [
      "Built interactive 3D marketing apps in Babylon.js for GE Healthcare, Energy, and Grid Solutions",
      "Prototyped and benchmarked modern frontend frameworks against GE's in-house Haxe stack to guide platform decisions",
      "Rebuilt a Flash-based conference showcase as an HTML5 Vue app shipping to web and desktop (Electron) with offline storage",
    ],
    technology: "Babylon.js, Vue, Electron, Haxe",
  },
  {
    employer: "Indegene",
    employerLink: "https://www.indegene.com",
    logo: "/assets/company-logos/Indegene.png",
    title: "Frontend Developer",
    employmentType: "Full-time",
    period: "Feb 2017 – Oct 2017",
    location: "Oakville, CA",
    points: [
      "Developed Angular 2 components and themed an Ionic 3 hybrid web/Android app for the pharma industry",
      "Designed backend microservices in collaboration with the Java Spring team",
      "Implemented Redux state management and custom offline state handling for Android",
      "Internationalized the app and maintained support down to Android 3.0 tablets",
      "Interviewed and onboarded new hires",
    ],
    technology: "Angular 2, Ionic 3, Redux, Java Spring",
  },
  {
    employer: "Digital Echidna",
    employerLink: "https://northern.co/echidna/",
    logo: "/assets/company-logos/echidna.png",
    title: "Full Stack Web Developer",
    employmentType: "Full-time",
    period: "Feb 2015 – Feb 2017",
    location: "London, CA",
    points: [
      "Delivered front-end themes and custom back-end modules across Drupal client sites",
      "Built Python scrapers for content migration and maintained a CodeIgniter application",
      "Represented the company at Drupal 8 code sprints in Ohio and Toronto",
      "Built sites to meet AODA accessibility standards",
      "Onboarded co-ops, interns, and new hires",
    ],
    technology: "Drupal 7/8, PHP, Python, CodeIgniter",
  },
];

export const education = [
  { program: "Interactive Media Specialist", school: "Fanshawe College", year: "2014–2015" },
  { program: "3D Character Design & Animation", school: "Fanshawe College", year: "2013–2014" },
  { program: "Interactive Media Design", school: "Fanshawe College", year: "2011–2013" },
];
