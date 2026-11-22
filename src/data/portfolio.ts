import type { IconName } from "@/lib/icons";

/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *  Every piece of text on the site lives in this file.
 *  Replace the placeholder values below with your own.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Types ─────────────────────────────────────────────────── */

export interface Project {
  id: number;
  title: string;
  /** One-liner shown on the project card. */
  description: string;
  /** Display labels for the project's stack. */
  tech: string[];
  /** Screenshot in `public/`. */
  image: string;
  /** Long write-up shown in the project modal; blank lines separate paragraphs. */
  information?: string;
  /** Extra screenshots for the gallery/carousel. */
  images?: string[];
  /** Feature list shown in the project modal. */
  features?: { feature: string; description: string }[];

  businessPage? : string 
  websiteLink? : string 
}



export interface Stat {
  value: number;
  /** Optional text after the number, e.g. "+" or "k". */
  suffix?: string;
  label: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon?: IconName;
}

/* ── Identity & global metadata ────────────────────────────── */

export const site = {
  name: "Krelian Quimson",
  initials: "KQ",
  /** How the name breaks across lines in the giant hero headline. */
  heroLines: ["Krelian", "Quimson"],
  role: "Full-stack Web Developer · Agentic AI Developer",
  tagline:
    "I build web and mobile products end to end — MERN on the stack, agentic AI where it earns its place.",
  /** 2×2 portrait shown in the hero. */
  photo: "/portfolio/2x2.jpg",
  /** Résumé files: `preview` is displayed in the modal, `pdf` is downloaded. */
  resume: {
    preview: "/portfolio/resume.jpg",
    pdf: "/portfolio/resume.pdf",
  },
  version: "v2026.1",
  availability: {
    available: true,
    label: "Available for work",
    note: "Open to freelance and full-time roles",
  },
  location: {
    city: "Alabang, Muntinlupa City, PH",
    coordinates: "14.4169° N, 121.0437° E",
    /** IANA time zone used for the live clocks. */
    timeZone: "Asia/Manila",
    timeZoneLabel: "GMT+8",
  },
  email: "krelianquimson@gmail.com",
  /** Used in the <title> and meta description. */
  seoDescription:
    "Portfolio of Krelian Quimson — full-stack web developer and agentic AI developer based in Alabang, Muntinlupa City, Philippines.",
} as const;

/* ── Hero copy ─────────────────────────────────────────────── */

export const hero = {
  intro:
    "I'm a full-stack developer from Alabang. Since 2024 I've shipped more than 15 web and mobile applications for small and local businesses — handling the planning, architecture, build and deployment myself.",
  /** Short facts shown in the strip under the headline. */
  facts: [
    { label: "Focus", value: "Full-stack · MERN · Agentic AI" },
    { label: "Freelance", value: "15+ builds since 2024" },
    { label: "Education", value: "BSIT, NCST — 2027" },
  ],
} as const;

/* ── Navigation ────────────────────────────────────────────────
 * The order here sets the section numbers: (01), (02), …
 * The `id` must match the section's anchor; don't change ids
 * unless you also rename the section.
 */
export const navigation = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
] as const;

/* ── (02) Projects ─────────────────────────────────────────── */

export const project1stBatch: Project = {
  id: 1,
  title: "Development of a Web-Based Integrated Management Platform for Tattoo Services with Decision Support System, 3D Tattoo Customization, Smart Pricing System and Mobile Application in Cavite",
  description:
    "An all-in-one platform that connects tattoo artists and clients. Clients can book sessions online and preview tattoos on an editable 3D character model that fits their body type, or on their own uploaded photo. Artists get booking and business management, a built-in tattoo editor, design generator, stencil generator, website builder, social media post editor, inventory tracking, and smart pricing.",
  tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
  image: "/capstone/inksight.png",
  websiteLink : "https://inksight-tattoo.vercel.app/",
  images : [
    "/capstone/inksight1.png",
    "/capstone/inksight2.png",
    "/capstone/inksight3.png",
    "/capstone/inksight4.png",
    "/capstone/inksight5.png",
    "/capstone/inksight6.png",
     "/capstone/inksight7.png",
    "/capstone/inksight8.png",
     "/capstone/inksight9.png",
    "/capstone/inksight10.png",
     "/capstone/inksight11.png",
    "/capstone/inksight12.png",
     "/capstone/inksight13.png",
    "/capstone/inksight14.png",
     "/capstone/inksight15.png",
    "/capstone/inksight16.png",
  ],
  features: [
    {
      feature: "Editable 3D Character Model",
      description:
        "Clients can customize a 3D character model to fit their own body type, including adjustments to its proportions, so the tattoo preview looks as close as possible to the real result.",
    },
    {
      feature: "3D Tattoo Placement",
      description:
        "Clients can select a tattoo design from the platform or upload their own, then place, resize, and rotate it on the 3D character model.",
    },
    {
      feature: "Photo-Based Tattoo Preview",
      description:
        "Clients can upload their own photo and place a tattoo directly on their body in the image.",
    },
    {
      feature: "Online Tattoo Booking",
      description:
        "Clients can book tattoo sessions online with their chosen artist, including a home service option where the artist comes to the client.",
    },
    {
      feature: "Smart Pricing",
      description:
        "Analyzes a tattoo design and suggests a price range, helping artists quote clients faster and more consistently.",
    },
    {
      feature: "Built-in Tattoo Editor",
      description:
        "A Photoshop-like editor lets artists create and refine tattoo designs inside the platform.",
    },
    {
      feature: "Tattoo Design Generator",
      description:
        "Helps artists quickly produce new tattoo design ideas.",
    },
    {
      feature: "Stencil Generator",
      description:
        "Converts tattoo designs into stencils that are ready for use.",
    },
    {
      feature: "Website Builder",
      description:
        "A WordPress-like builder allows artists to create their own portfolio website.",
    },
    {
      feature: "Social Media Post Editor",
      description:
        "A Canva-like editor with ready-made templates where artists only need to change the content.",
    },
    {
      feature: "Booking and Business Management",
      description:
        "Artists can manage bookings and daily business processes from one dashboard.",
    },
    {
      feature: "Inventory Management",
      description:
        "Tracks supplies and automatically deducts items as they are used.",
    },
    {
      feature: "Artist Location Map",
      description:
        "An interactive map shows the pinned locations of all artists, making it easy for clients to find one nearby.",
    },
    {
      feature: "Chat System",
      description:
        "A built-in chat lets clients and artists discuss ideas, designs, and booking details.",
    },
    {
      feature: "Video Call",
      description:
        "Artists and clients can hold consultations through video call without meeting in person.",
    },
    {
      feature: "Virtual World",
      description:
        "Clients can explore an interactive virtual world within the platform for entertainment.",
    },
  ],
}

export const project2ndBatch: Project[] = [

{
  id: 1,
  title: "Online Motorcycle Rental Booking and Management System",
  businessPage : "https://www.facebook.com/share/1aYPHYPodE/",
  websiteLink : "https://www.islandwheelscoron.com/",
  description:
    "A web-based platform for a motorcycle rental business where clients can browse and book motorcycles online. It includes an inquiry and chat system, email notifications for booking status updates, and an admin dashboard for managing motorcycles, schedules, and pricing with data visualization for tracking business performance.",
  tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
  image: "/projects/motor.png",
  information: `
The system allows clients to book motorcycles online without having to visit the shop. Customers can browse the available motorcycles, check rental prices and schedules, and submit a booking request in just a few steps. If they have questions before booking, they can send an inquiry or talk directly with the business through the built-in chat system.

To keep clients updated, the system sends email notifications and reminders about their booking status, such as when a booking is received, confirmed, or approaching its rental date. This reduces missed pickups and keeps communication between the business and its customers clear and consistent.

On the admin side, the business owner can manage the motorcycle fleet, set rental schedules, and update pricing from one dashboard. The system also provides data visualization, such as charts for bookings, revenue, and motorcycle usage, helping the owner track performance and make better decisions for the business.
  `,
},



{
  id: 4,
  title: "Multi-Branch Restaurant POS and Management System",
  businessPage : "https://www.facebook.com/share/1Dv9vd2xub/",
  description:
    "A POS and management system for restaurants with a mobile POS for cashiers and a web-based dashboard for managers and admins. It supports ingredient inventory tracking, multi-branch management, ingredient shipping between branches, menu management, split billing, and table timers for unlimited promos like unli wings and samgyup.",
  tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Express.js", "React Native"],
  image: "/projects/barracks.png",
  information: `
The system is built for restaurants and food businesses, with separate interfaces for each role. Cashiers use a mobile-friendly POS to take orders and process payments quickly at the counter or table. Managers and admins use the web-based dashboard to oversee operations, manage the menu, and monitor activity across the business.

The POS includes features designed for real restaurant needs. Cashiers can split bills among customers, and table timers can be started for unlimited promos such as unli chicken wings and samgyup, so staff can easily track how long each table has been dining and when its time is up.

Behind the scenes, the system tracks ingredient inventory so managers always know what stock is available and what needs to be restocked. It supports multi-branch management, allowing admins to oversee several branches from one place, and ingredients can be shipped from one branch to another with the transfer recorded in the system. This keeps stock balanced across branches, reduces waste, and gives owners a clear view of their entire operation.
  `,
},

]

export const project3rdBatch: Project[] = [
  {
    id: 1,
    title: "AI-Powered PDF to Reviewer and Quiz Generator System",
    description:
      "A web app that uses AI to turn PDF files into a structured Q&A reviewer. Users can customize the generated output before saving, then take personalized quizzes based on the saved reviewer. The quiz allows filtering, skipping questions, and choosing between input and multiple-choice modes. After completing a quiz, users get a visual breakdown of their performance including correct, wrong, and skipped answers.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
    image: "/projects/reviewersystem.png",
    information: `
The system allows users to generate reviewers easily. It can automatically create questions and answers from uploaded PDF files using AI. Users can upload multiple PDF files at once, and the system will process them into a well-organized reviewer. Before saving, users can modify the output by editing, adding, or removing questions. Once finalized, the reviewer is automatically saved to the database.

After saving a reviewer, users can take personalized quizzes based on the content. The quiz questions are shuffled each time for variety. Users can filter questions to focus on specific topics or scope. If unsure, users also have the option to pass a question. The system offers flexible answer input, allowing either text-based answers or multiple-choice selections.

To help users track their performance, the system provides a detailed quiz result summary. After each quiz, users can view a visual performance chart (such as a pie chart), along with the total number of correct, wrong, and passed questions. This helps learners easily monitor their progress and focus on areas for improvement.
    `,
  },
  {
    id: 2,
    title: "Tenant-Landlord Rental Platform",
    description:
      "A platform that connects tenants and landlords with map integration for property listings and real-time chat. Landlords can list and manage rentals, while tenants can browse, apply, and chat instantly.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    image: "/projects/tenant-landlord.png",
    information: `
Landlord Features:
Landlords can post their properties with images and detailed information to attract potential tenants. They have the ability to set the exact property location on the map and manage all their listings, including editing or deleting posts. Landlords can also accept rent requests from tenants, respond to messages, and update their account information as needed.

Tenant Features:
Tenants can view all available property listings and see them displayed on the map for easier location tracking. They can send private messages to landlords, bookmark and like property posts, and apply to rent a property. Additional features include reporting landlord posts, editing account details, tracking the status of their rental applications, and viewing landlord profiles.

Admin Features:
Admins are responsible for maintaining the platform's integrity. They can ban inappropriate property posts and user accounts, manage reports submitted by users, and verify landlord accounts for authenticity. An admin dashboard is provided to efficiently oversee and manage all platform activities.
    `,
  },
  {
    id: 3,
    title: "Online Clothing Store E-commerce System",
    description:
      "An online clothing store with monthly and product sales monitoring, allowing the admin to track the performance of each product and overall shop sales. It also comes with a printable sales report generator and product management for adding, editing, and deleting products.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"],
    image: "/projects/syara.png",
    information: `
Customer Features:
Customers can browse all available products, place orders, and use the add-to-cart feature. They can view the available colors and check the stock for each size of a product. Customers can also track their order status, if the order is Pending, Processing, or To Ship.

Admin Features:
The admin can manage products by adding, editing, and deleting items. Admins can also add multiple variations of a product (e.g., the same t-shirt in different colors). They can restock products and see indicators for out-of-stock items.

The system includes a dashboard with charts showing monthly sales and monthly best-selling products. It can also generate printable sales reports for both monthly sales and top-selling items.

Admins can view the full transaction history and are responsible for updating the order status—from Accepting Pending Orders to Processing and then to To Ship.
    `,
  },


  {
    id: 4,
    title: "QR-Based Inventory and Borrowing Management System for Mindanao State University",
    description:
      "A web-based inventory system for the Mindanao State University main office to manage school tools and equipment. Every item is assigned a scannable QR code for fast tracking, supports distribution to departments, and includes a borrowing system that records student transactions from release to return.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"],
    image: "/projects/schoolInventory.png",
    information: `
  The system helps the main office of Mindanao State University manage all of the school's tools and equipment in one place. Administrators can add, update, and monitor inventory items, and distribute them to different departments as needed. Every item is assigned a unique QR code, which can be scanned to instantly view its details, current location, and status, making tracking fast and reliable.

  The system also includes a borrowing feature for students. Students can borrow items, and each transaction is recorded, including who borrowed the item, when it was borrowed, and when it was returned. Scanning an item's QR code makes it easy to process borrowing and returns without manual encoding or paper logs.

  With all records stored in a central database, the main office can easily track where each item is, who is using it, and which items are available, in use, or overdue. This reduces lost equipment, minimizes paperwork, and gives administrators a clear view of the school's inventory at any time.
    `,
  },

  {
    id: 5,
    title: "Barangay Documents Request System",
    description:
      "A system that allows residents to request barangay documents online without visiting the barangay hall. Residents can track their request status, receive email notifications, and view request history. The barangay admin can manage requests, update statuses, and track transaction history.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"],
    image: "/projects/barangayrequest.png",
    information: `
Residents can request barangay documents online, such as barangay clearance, business permit, barangay residency, and more. They can choose to pick up the document at the barangay office or have it delivered to their home once it's ready.

There is a notification section where residents can track the status of their requests—whether it's "Pending," "Processing," or "Completed." Every time the status changes, it is shown in the notification section, and an email is automatically sent to the resident's Gmail account with the updated status.

Admins can view and manage all document requests. They are responsible for updating the status of each request (Approve, Reject, Process, Complete). Admins can also see which documents are ready for pickup or delivery, view the full request history, and track the earnings from document requests.
    `,
  },



  {
      id: 6,
      title: "Quiz Management System",
      description: "This secure quiz-taking system is designed to help teachers manage quizzes effectively while preventing student cheating. It features an anti-cheating mechanism that automatically submits a quiz and flags it if a student switches tabs or leaves the quiz window. Teachers can create quizzes with time limits, set deadlines, view and filter student scores, and track overall performance. Meanwhile, students can view available quizzes, take them within the given time, and review their quiz history to monitor their progress.",
      tech: ["php", "mysql", "bootstrap"],
      image: "/projects/quizsystem.png",
    
    

      information : `
System Overview
This secure quiz-taking system is designed to prevent cheating and enhance overall quiz management. One of its key features is the anti-cheating mechanism: students are not allowed to switch tabs during a quiz. If a student attempts to Alt+Tab or navigate away from the quiz window, the system will automatically submit their quiz and flag it with a cheating status. This status is visible to the teacher for transparency and accountability.

For Teachers
Teachers have full control over quiz creation and management. They can create quizzes with customizable time limits, deadlines, and subject tags. After students complete the quizzes, teachers can view all student scores and track their performance. To make evaluation easier, the system includes filtering options that help teachers sort and analyze student data efficiently.

For Students
Students can access and view all quizzes assigned to them by their teachers. Each quiz comes with a clear time limit and must be completed within the specified window. Once completed, students can review their quiz history, including past scores and performance metrics, allowing them to monitor their progress over time.
      `
    },


    {
      id: 7,
      title: "Pharmacy Sales and Stock Monitoring System",
      description: "A pharmacy management system that helps store owners manage products, suppliers, and sales. It tracks inventory levels, it has indicator when items need restocking, and generates printable sales reports. The system streamlines daily operations by keeping all product, supplier, and sales information in one platform.",
      tech: ["react", "next.js", "node js", "mongo db", "tailwind", "express js"],
      image: "/projects/pharmachy.png",
     
     
      information : `
The system is designed to efficiently manage a pharmacy store. It includes product management, allowing the admin to add, edit, or delete medicines and other pharmacy items. The system also has a supplier management feature, where the admin can manage supplier information and track incoming deliveries.

For sales management, the system records all transactions and generates detailed sales reports. It also provides a printable sales report for easy documentation and record-keeping. The system helps track inventory levels and can identify which products are running low, ensuring the admin knows when to restock medicines and other essential items.

With this pharmacy management system, store owners can streamline daily operations, monitor product availability, and keep track of both sales and supplier transactions—all in one platform.
    `
    },











 {
      id: 8,
      title: "Fastfood Ordering Platform",
      description: "A food ordering platform where users can register as business owners or customers. Business owners can manage their stores and products, while customers can browse and order from available businesses. The platform also includes an admin dashboard to oversee transactions and earnings.",
      tech: ["php", "mysql", "bootstrap"],
      image: "/projects/fastfood.png",
      
     
      information : `
The platform offers a range of features tailored for business owners, customers, and admins. Business owners can create and manage their business listings by adding, editing, or removing them as needed. They can also customize their business profiles, including updating the name, logo, and availability. Additionally, they have control over their product menus, allowing them to add, update, or delete items. A dedicated dashboard provides insights into their business performance, sales, and other key metrics, while a transaction history section enables them to track all past orders and transactions.


For customers, the platform supports account management, allowing users to edit their profile details and update their profile pictures. They can browse a list of available businesses, view menus, and place orders. Their past purchases are recorded in an order history section for easy tracking.


Admins have access to a centralized dashboard where they can monitor all business activities and user contributions. They also handle revenue management, earning a percentage from every sale made through the platform.
      `
    },


    {
      id: 9,
      title: "Restaurant POS System",
      description: "A POS system for restaurants to streamline order management, track sales, monitor inventory levels, and generate reports. This system allows restaurant owners to efficiently manage their menu, keep track of stock availability, and gain insights into daily and monthly sales performance.",
      tech: ["java", "swing", "mysql"],
      image: "/projects/resto.png",
     
     
      information : `
 POS system for restaurants is designed to streamline order management, monitor inventory, track sales, and generate insightful reports. It enables restaurant owners to efficiently manage their menu, monitor stock availability, and gain valuable insights into daily and monthly sales performance. With features like menu management, users can easily add, edit, or remove products from the menu. The system also offers real-time stock tracking to help maintain adequate inventory levels and prevent shortages. Additionally, it provides detailed sales tracking with customizable reports and stores a history of receipts and past transactions, ensuring smooth operations and informed decision-making.
      `
    },


     {
      id: 10,
      title: "POS with Barcode Scanner and Ai Assistant Chatbot ",
      description: "A POS system with a barcode scanner and an AI assistant chatbot that can answer all questions related to your business. It also includes product management and daily sales monitoring.",
      tech: ["python", "pyqt", "mysql"],
      image: "/projects/posscanner.png",

      information : `
The admin has a dashboard to view daily and total sales of the shop. They can manage products by adding, editing, or deleting items, and monitor product stock levels.

The system includes a powerful AI assistant chatbot that can answer all questions related to the system. The admin can ask things like "What are the top-selling products?" or "Which day had the highest sales?" and get instant answers. The chatbot helps the admin understand what’s going on in the business at any time.

There is also a sales report section to monitor daily sales, a notification section that alerts the admin when items are out of stock, and a receipt history for reviewing past transactions.


The cashier can scan product barcodes, just like in a grocery store. After each transaction, a receipt is generated, and the stock is automatically reduced based on the quantity bought. The cashier can also view receipt history.

      `
    },
    




    {
      id: 11,
      title: "Employee Salary Deduction Monitoring System",
      description: "A system that manages employee information, including tax and loans. It automatically calculates the total deductions from each employee’s salary. The system also generates an Excel sheet for the employee's monthly tax and loan records.  ",
      tech: ["react", "next.js", "node js", "mongo db", "tailwind", "express js"],
      image: "/projects/employee.png",

      information : `
A system that can manage employee data, allowing you to add, edit, and delete employees. After adding an employee, you can set their tax and loan details. The system automatically generates an Excel file that contains each employee's tax and loan records. It also calculates the total deductions for each employee, making it easy to monitor their deductions.
      `
    },


    {
      id: 12,
      title: "Book Swap Platform",
      description: "A platform where users can post books they have already read and receive book swap requests from others user. Users can browse available books, send swap requests, and connect with fellow readers. The book owner has full control over which request to accept, making book exchanges simple and convenient.",
      tech: ["php", "mysql", "bootstrap"],
      image: "/projects/book.png",

      information : `
The platform provides several features for users to facilitate book swapping. Users can post books they’ve finished reading and are willing to swap. They can also set up a wishlist of books they want to receive. When someone is interested in a swap, users can receive and review the swap requests, then choose which request they want to accept. To help finalize the details, users can chat with one another directly. Additionally, the platform allows users to track the status of each swap request, including whether it is pending, accepted, completed, or rejected.
      `
    }, 


    {
      id: 13,
      title: "POS System with sales and Inventory Monitoring",
      description: "A POS system that can manage orders, track weekly sales, monitor inventory levels, and generate reports. This system allows business owners to efficiently manage their menu, keep track of stock availability, and gain insights into daily and weekly sales performance",
      tech: ["python", "pyqt", "mysql"],
      image: "/projects/pastry.png",

      information : `
The admin can manage products by adding, editing, deleting, or viewing them and filter products based on category. The admin has a dashboard to see the shop’s daily and weekly sales performance. The admin can also manage cashiers and view all receipt history. There's a notification section where the system automatically alerts the admin if a product is low on stock or out of stock.

The cashier can handle customer orders, generate receipts, and view transaction history. The cashier can also check if an item is out of stock and filter products based on its category. When a customer places an order, the stock of the item is automatically reduced based on the quantity purchased.

      `
    },



    {
      id: 14,
      title: "Cafe Kiosk Ordering System",
      description: "A self-ordering kiosk system for café stores that allows customers to place orders before proceeding to the cashier. Orders automatically appear on the cashier’s screen, where they can update the order status in real time.",
      tech: ["java", "swing", "mysql",],
      image: "/projects/cafe.png",
      information : `
The self-ordering kiosk system for café stores streamlines the ordering process by allowing customers to browse the menu and place orders directly at a kiosk before proceeding to payment. Once an order is placed, it instantly appears on the cashier’s dashboard, where the staff can manage and update the order status in real time—marking them as Paid, Canceled, To Pick Up, or Completed. The system also features automatic ingredient tracking and stock control, preventing orders if necessary ingredients are unavailable. When an order is placed, the system deducts the corresponding ingredients from inventory automatically (e.g., ordering Black Coffee reduces quantities of coffee beans and sugar). Additionally, the admin has control over product management, enabling updates to product names and prices, and can easily replenish ingredient stock through the integrated restock system.
      `
    },


    {
      id: 15,
      title: "Canteen Reservasion System",
      description: "This food reservation system allows students to reserve meals in advance while enabling canteen staff to efficiently manage food items, stock, and reservation orders. Canteen staff can update the menu, monitor stock levels, accept or reject orders, and track pickup schedules. Students can create accounts, place orders, and track their order status, making the process more convenient and organized for both sides.",
      tech: ["php", "mysql", "bootstrap"],
      image: "/projects/cafeteria.png",
      information : `
This food reservation system is designed to streamline the ordering process for both students and canteen staff. It allows students to conveniently reserve their meals ahead of time, reducing wait times and ensuring availability. At the same time, it helps the canteen manage operations more efficiently by organizing product listings, monitoring stock, and handling orders systematically.

For canteen staff, the system offers tools to add, edit, or delete food items, ensuring the menu is always up to date. They can also manage stock availability to prevent over-ordering and view all incoming reservations. Each reservation can be accepted or rejected, and staff can track specific pickup details such as date and time to ensure smooth order fulfillment.

Students, on the other hand, can register an account and browse available food items. They can place reservation orders in advance and keep track of their order status through clearly defined stages—Pending, Accepted, or Completed. This gives them greater control and visibility over their orders, making the food reservation experience more convenient and reliable.
      `
    },


];

/* ── (04) Stack ────────────────────────────────────────────── */

export interface StackItem {
  label: string;
  /** Brand mark key from `@/lib/icons`; omitted where no icon exists. */
  icon?: IconName;
}

export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: "Frontend",
    items: [
      { label: "JavaScript", icon: "javascript" },
      { label: "React.js", icon: "react" },
      { label: "Next.js", icon: "nextjs" },
      { label: "React Native", icon: "react" },
      { label: "HTML", icon: "html" },
      { label: "CSS", icon: "css" },
      { label: "Tailwind CSS", icon: "tailwindcss" },
      { label: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    group: "Backend",
    items: [
      { label: "Node.js", icon: "nodejs" },
      { label: "Express.js", icon: "express" },
      { label: "Laravel", icon: "laravel" },
      { label: "MongoDB", icon: "mongodb" },
      { label: "MySQL", icon: "mysql" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "TypeScript", icon: "typescript" },
      { label: "PHP", icon: "php" },
      { label: "Java", icon: "java" },
      { label: "Python", icon: "python" },
      { label: "RESTful API", icon: "openapi" },
    ],
  },
  {
    group: "AI & Tooling",
    items: [
      { label: "AI Agents" },
      { label: "AI Integration" },
      { label: "MCP", icon: "mcp" },
      { label: "Claude Code", icon: "claude" },
      { label: "Version Control", icon: "git" },
    ],
  },
];

/* ── (04) Gallery ───────────────────────────────────────────
 * Bump the width/height here if you replace an image with one of a
 * different size, so the browser can reserve the right space.
 */

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const gallery: GalleryImage[] = [
  { src: "/gallery/img1.jpg", alt: "Gallery image 1", width: 672, height: 322 },
  { src: "/gallery/img2.jpg", alt: "Gallery image 2", width: 720, height: 1070 },
  { src: "/gallery/img3.jpg", alt: "Gallery image 3", width: 2048, height: 2048 },
  { src: "/gallery/img4.jpg", alt: "Gallery image 4", width: 720, height: 644 },
  { src: "/gallery/img5.jpg", alt: "Gallery image 5", width: 1536, height: 2048 },
  { src: "/gallery/img6.jpg", alt: "Gallery image 6", width: 1899, height: 1079 },
  { src: "/gallery/img7.jpg", alt: "Gallery image 7", width: 2048, height: 1536 },
  { src: "/gallery/img8.jpg", alt: "Gallery image 8", width: 720, height: 666 },
  { src: "/gallery/img9.jpg", alt: "Gallery image 9", width: 720, height: 940 },
  { src: "/gallery/img10.jpg", alt: "Gallery image 10", width: 2016, height: 930 },
  { src: "/gallery/img11.jpg", alt: "Gallery image 11", width: 2032, height: 1790 },
  { src: "/gallery/img12.jpg", alt: "Gallery image 12", width: 720, height: 900 },
  { src: "/gallery/img13.jpg", alt: "Gallery image 13", width: 720, height: 1280 },
  { src: "/gallery/img14.jpg", alt: "Gallery image 14", width: 1536, height: 2048 },
  { src: "/gallery/img15.jpg", alt: "Gallery image 15", width: 1206, height: 1206 },
];

/* ── Marquee ticker (scrolling strip below the hero) ─────────
 * Mirrors the stack section: every technology, with its icon.
 */
export const marquee = {
  primary: stack.flatMap((group) => group.items),
};

/* ── (01) Experience ─────────────────────────────────────────
 * Two chapters only, because the story is the shift itself:
 * handwritten code in 2024–2025, agent-directed code from 2026 on.
 */

/** Sits directly under the section title. */
export const experienceIntro =
  "I've been freelancing since 2024 — 2+ years of hands-on experience as a full-stack developer, with more than 15 web and mobile apps shipped for clients. I take each project from start to finish: talking with the client, planning the app and database, building the front and back end, testing, then deploying and maintaining it. Because I work directly with clients, the technical decisions, the deadlines and the fixes are all on me, from the first call to the live release.";

export const experience: ExperienceItem[] = [
  {
    period: "2024 — 2025",
    role: "Manual Coding",
    company: "Freelance Developer",
    location: "Alabang, Muntinlupa City",
    description:
      "I built every feature by hand — writing the code, wiring the front end to the back end, and debugging until the app worked as intended.",
  },
  {
    period: "2026 — Present",
    role: "Agentic Coding",
    company: "Freelance Developer",
    location: "Alabang, Muntinlupa City",
    description:
      "I plan each feature, give clear steps to AI coding agents, then review, fix and test the code before shipping it.",
  },
];

/* ── Experience stats (shown next to the intro) ───────────── */

export const experienceStats: Stat[] = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Freelance projects built" },
];

/* ── (05) Contact ──────────────────────────────────────────── */

export const contact = {
  intro:
    "Tell me a bit about the project — what you need, your timeline and a rough budget. I read every message and reply within two working days.",
};

export const socials: SocialLink[] = [
  {
    label: "Facebook",
    handle: "Krelian Quimson",
    href: "https://www.facebook.com/share/1Hzh1sPJDq/",
    icon: "facebook",
  },
  { label: "TikTok", handle: "@krelq", href: "https://www.tiktok.com/@krelq", icon: "tiktok" },
];

/* ── Footer ────────────────────────────────────────────────── */

export const footer = {
  credit: "Built with Next.js, Tailwind CSS & Framer Motion",
};
