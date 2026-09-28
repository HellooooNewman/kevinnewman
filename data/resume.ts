// Resume content: single source of truth for the home page.
// Rewritten for the 2026 job hunt: professional framing, typos fixed.

export const intro = {
  name: "Kevin Newman",
  tagline: "Full Stack Developer",
  location: "Remote · Canada",
  headline:
    "Payments and billing on the web, field-tech apps on mobile, and the odd Nintendo 64 game.",
  body: [
    "I'm a full stack developer with 10+ years of experience shipping software, from payment platforms and customer portals to 3D marketing apps and hybrid mobile products.",
    "Away from work I'm a game jam regular, always tinkering on a side project (and playing too much Age of Empires II: DE).",
  ],
  // Kept as split parts so contact components can format the address for
  // screen and print without duplicating it in the content data.
  emailUser: "kevin",
  emailDomain: "kevinnewman.ca",
  resumePdf: "/assets/pdf/Kevin Newman · Full Stack Developer.pdf",
  now: [
    {
      text: "Building CondoPulse, a status platform for condo buildings",
      href: "/projects/condopulse/",
    },
    {
      text: "Rewriting an ISP field-tech app in React Native at Sonar",
      href: "#job-sonar-software",
    },
    {
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

export const lastUpdated = "September 2026";

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
    "RxJS",
    "C / C++",
    ".NET",
    "Redis",
    "SQLite",
    "REST APIs",
    "MCP servers",
    "Docker",
    "CI/CD",
    "Azure / AWS",
    "Three.js / Babylon.js",
    "Unity",
    "Blender",
    "Figma",
    "Adobe Creative Cloud",
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
      "Three products over five years: the field-tech mobile app, payments and billing on the core platform, and the customer portal.",
    sections: [
      {
        heading: "Mobile: Field Tech",
        points: [
          "Sole developer of the app ISP installers use to manage jobs, tickets and inventory",
          "Built its offline sync so technicians keep working without a connection",
          "Rebuilt it from Flutter in React Native and TypeScript, and now building white-label versions on the same codebase",
          "Shipped card scanning for on-site payments, signed contracts, iOS Live Activities and the mobile CI/CD pipeline",
        ],
      },
      {
        heading: "Core Platform",
        points: [
          "Co-built SonarPay's disbursements, disputes, card verification and refunds on Payrix with one other developer, starting on the front end and now working full stack",
          "Built flexible 30-day billing with proration alongside the same developer, released behind feature flags",
          "Built Print-to-Mail with another developer, one of a set of white-label add-ons like SMS that customers can turn on à la carte",
          "Split 35+ global frontend services into explicit imports, fixing circular dependencies and webpack memory issues",
          "Built an AST-based code generator for type-safe enums used across the codebase",
        ],
      },
      {
        heading: "Customer Portal",
        points: [
          "Rebuilt the subscriber payment flow with auto-pay and multi-currency, and now rebuilding the rest of the portal",
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
