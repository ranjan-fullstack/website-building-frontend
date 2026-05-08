import { useState } from "react";
import "../styles/Template.css";
import { freeTemplatePrompts } from "../data/templateData";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";

const companyWhatsAppNumber = "917995590740";

const imageUrl = (query, width = 1200, height = 850) => {
  const keywords = query
    .split(",")
    .map((word) => word.trim().replace(/\s+/g, "-"))
    .filter(Boolean)
    .join(",");
  const lock = Array.from(keywords).reduce(
    (total, letter) => total + letter.charCodeAt(0),
    0
  );

  return `/logo.png?template=${lock}&w=${width}&h=${height}`;
};

const templateSites = {
  "local-business": {
    name: "SmartFix Local Services",
    initials: "SF",
    type: "Local service in Cuttack",
    tagline: "Repairs, installation and home support near you",
    hero: "Fast local repair service you can trust",
    subtext:
      "Book reliable AC repair, electrical work and appliance service with clear pricing and quick WhatsApp response.",
    about:
      "SmartFix Local Services helps homes and small shops solve everyday repair problems without confusion. Our team explains the work, shares the cost upfront and reaches your location on time.",
    sectionTitle: "Home and shop support, handled by trained technicians",
    galleryTitle: "Service photos that make the business feel real",
    contactLead:
      "Send your issue on WhatsApp and we will suggest the next step before visiting.",
    phone: "+91 98765 43210",
    address:
      "Plot 18, College Square Road, Near Ravenshaw University, Cuttack, Odisha 753003",
    timings: "Mon - Sat: 9:30 AM - 8:30 PM | Sunday: Emergency calls only",
    badges: ["Affordable", "Trusted", "Since 2015", "Doorstep Service"],
    metrics: ["450+ jobs done", "Same day visit", "Local technicians"],
    services: [
      ["AC Repair", "Cooling issue, gas filling, servicing and installation support."],
      ["Electrical Work", "Switches, wiring, fans, lights and small electrical repairs."],
      ["Appliance Service", "Washing machine, fridge and basic home appliance support."],
      ["Shop Maintenance", "Quick repair support for local shops and small offices."],
    ],
    testimonials: [
      ["Sanjay Behera", "Technician arrived on time and repaired our AC properly."],
      ["Mitali Das", "Very clear pricing and good behaviour. I booked through WhatsApp."],
      ["Rohit Nayak", "Useful service for small shop electrical work."],
    ],
    images: [
      imageUrl("home,repair,technician,india"),
      imageUrl("air,conditioner,repair,technician"),
      imageUrl("electrician,tools,repair"),
      imageUrl("appliance,repair,service"),
    ],
    colors: ["#0f766e", "#102033", "#e6fffb"],
  },
  gym: {
    name: "Iron Pulse Gym",
    initials: "IP",
    type: "Fitness gym in Bhubaneswar",
    tagline: "Strength training, weight loss and personal coaching",
    hero: "Train stronger with coaches who guide every step",
    subtext:
      "Join a clean, energetic gym with modern equipment, simple plans and WhatsApp support for trial bookings.",
    about:
      "Iron Pulse Gym is made for students, professionals and fitness beginners who want real progress. Our trainers help with workout plans, posture and daily motivation.",
    sectionTitle: "Memberships and coaching for real fitness goals",
    galleryTitle: "A gym layout with energy, equipment and transformation proof",
    contactLead:
      "Message us to book a free visit, ask plan prices or check trainer availability.",
    phone: "+91 99887 76655",
    address:
      "2nd Floor, Kalinga Market Complex, Patia, Bhubaneswar, Odisha 751024",
    timings: "Mon - Sat: 5:30 AM - 10:00 PM | Sunday: 7:00 AM - 12:00 PM",
    badges: ["Affordable Plans", "Certified Trainers", "Since 2016", "Trial Available"],
    metrics: ["100+ members", "6 trainers", "Flexible batches"],
    services: [
      ["Strength Training", "Weight machines, free weights and guided workout plans."],
      ["Weight Loss Plan", "Simple fitness routines with practical diet guidance."],
      ["Personal Training", "One-to-one coaching for posture, stamina and results."],
      ["Monthly Membership", "Starter, quarterly and yearly plans for every budget."],
    ],
    testimonials: [
      ["Rahul Mishra", "Trainers explain every exercise. I feel more confident now."],
      ["Ananya Sahu", "Clean gym, good equipment and safe environment."],
      ["Vikash Panda", "Lost weight with a simple plan and regular follow-up."],
    ],
    images: [
      imageUrl("gym,fitness,weights"),
      imageUrl("personal,trainer,gym"),
      imageUrl("treadmill,fitness,gym"),
      imageUrl("strength,training,gym"),
    ],
    colors: ["#ef4444", "#18181b", "#fff1f2"],
  },
  coaching: {
    name: "BrightPath Academy",
    initials: "BA",
    type: "Coaching centre in Kolkata",
    tagline: "School tuition and exam preparation with clear guidance",
    hero: "Focused coaching that helps students learn with confidence",
    subtext:
      "Admissions open for Class 8 to 12, foundation batches and weekly tests. Parents can enquire directly on WhatsApp.",
    about:
      "BrightPath Academy keeps learning simple and structured. Students get regular practice, doubt clearing and personal attention from experienced teachers.",
    sectionTitle: "Courses designed for marks, concepts and confidence",
    galleryTitle: "Academic images for classroom, tests and student success",
    contactLead:
      "Ask for batch timings, fees or a free demo class through WhatsApp.",
    phone: "+91 91234 56780",
    address:
      "27B, Lake Road, Near Kalighat Metro, Kolkata, West Bengal 700029",
    timings: "Mon - Sat: 8:00 AM - 8:00 PM | Sunday: Test series only",
    badges: ["Demo Class", "Trusted Teachers", "Since 2015", "Small Batches"],
    metrics: ["96% top score", "Weekly tests", "Parent updates"],
    services: [
      ["Class 10 Tuition", "Maths, science and English support with regular tests."],
      ["Class 11-12 Science", "Physics, chemistry and biology concept coaching."],
      ["Foundation Batch", "Early preparation for competitive exam confidence."],
      ["Doubt Clearing", "Extra support for weak topics and revision planning."],
    ],
    testimonials: [
      ["Riya Sen", "Teachers explain in simple English and Bengali. My marks improved."],
      ["Arjun Dutta", "Weekly tests helped me understand my weak chapters."],
      ["Parent of Sneha", "Good communication and regular updates on progress."],
    ],
    images: [
      imageUrl("indian,classroom,students,coaching"),
      imageUrl("teacher,classroom,students"),
      imageUrl("study,books,exam"),
      imageUrl("students,learning,classroom"),
    ],
    colors: ["#2563eb", "#172554", "#eff6ff"],
  },
  architect: {
    name: "LineForm Studio",
    initials: "LF",
    type: "Architecture studio in Pune",
    tagline: "Architecture and interiors for homes and commercial spaces",
    hero: "Thoughtful spaces designed for modern living",
    subtext:
      "Plan your home, office or boutique space with practical layouts, elegant interiors and smooth consultation.",
    about:
      "LineForm Studio blends clean design with practical construction knowledge. We help clients visualise spaces clearly before work begins.",
    sectionTitle: "Design support from first idea to final plan",
    galleryTitle: "Project imagery for interiors, facades and planned spaces",
    contactLead:
      "Share your plot, room or renovation idea and book a consultation on WhatsApp.",
    phone: "+91 97654 32109",
    address:
      "Office 304, Baner Biz Park, Baner Road, Pune, Maharashtra 411045",
    timings: "Mon - Sat: 10:00 AM - 7:00 PM | Sunday: By appointment",
    badges: ["Premium Design", "Trusted Studio", "Since 2017", "Consultation"],
    metrics: ["25+ projects", "2D and 3D plans", "Site coordination"],
    services: [
      ["Home Architecture", "Modern plans for independent houses and villas."],
      ["Interior Design", "Practical interiors for living rooms, kitchens and bedrooms."],
      ["Office Design", "Clean layouts for clinics, studios and small offices."],
      ["Consultation", "Layout review, material guidance and design direction."],
    ],
    testimonials: [
      ["Neha Kulkarni", "They made our home plan practical and beautiful."],
      ["Amit Patil", "Very professional drawings and smooth communication."],
      ["Rohini Shah", "Good ideas for a small apartment renovation."],
    ],
    images: [
      imageUrl("modern,architecture,home,india"),
      imageUrl("interior,design,living,room"),
      imageUrl("architect,desk,plans"),
      imageUrl("modern,building,facade"),
    ],
    colors: ["#a16207", "#1c1917", "#fef3c7"],
  },
  "mobile-shop": {
    name: "Smart Mobile Hub",
    initials: "SM",
    type: "Mobile shop in Cuttack",
    tagline: "Mobiles, accessories and repairs in one trusted local shop",
    hero: "Latest smartphones, accessories and quick repairs near you",
    subtext:
      "Buy genuine phones, useful accessories and reliable repair service. Message us on WhatsApp for price, stock or repair enquiry.",
    about:
      "Since 2015, Smart Mobile Hub has helped local customers buy the right phone, protect it with quality accessories and repair it without stress.",
    sectionTitle: "Everything your phone needs, handled in one place",
    galleryTitle: "Products, repairs and local walk-ins shown clearly",
    contactLead:
      "Send a photo of your phone issue or ask for today's model price.",
    phone: "+91 98765 43210",
    address:
      "Shop No. 12, Bapuji Market, Near Badambadi Bus Stand, Cuttack, Odisha 753009",
    timings: "Mon - Sat: 10:00 AM - 9:00 PM | Sunday: 11:00 AM - 6:00 PM",
    badges: ["Affordable", "Trusted", "Since 2015", "Genuine Products"],
    metrics: ["1000+ customers", "Same day repairs", "Bill and warranty"],
    services: [
      ["New Smartphones", "Samsung, Vivo, Oppo, Redmi, Realme and more with bill."],
      ["Mobile Accessories", "Chargers, earphones, covers, glass and power banks."],
      ["Fast Repairs", "Screen, battery, charging, speaker and software issues."],
      ["Exchange Offers", "Upgrade your old phone with fair local exchange value."],
    ],
    testimonials: [
      ["Rakesh Sahoo", "My phone display was changed the same day. Good price."],
      ["Priya Nayak", "I contacted on WhatsApp and they kept the charger ready."],
      ["Amit Das", "Bought a Vivo phone here. Genuine product and proper bill."],
    ],
    images: [
      imageUrl("smartphone,mobile,shop"),
      imageUrl("phone,repair,tools"),
      imageUrl("mobile,accessories,store"),
      imageUrl("smartphone,display,store"),
    ],
    colors: ["#0f766e", "#102033", "#e6fffb"],
  },
  "cosmetic-shop": {
    name: "Glow Beauty Store",
    initials: "GB",
    type: "Beauty shop in Bhubaneswar",
    tagline: "Skincare, makeup and beauty essentials at local prices",
    hero: "Beauty products, skincare and makeup ready for pickup",
    subtext:
      "Shop trusted beauty brands, daily skincare items and bridal kits. Send your product enquiry on WhatsApp.",
    about:
      "Glow Beauty Store helps customers choose the right skincare and makeup without pressure. We keep useful products, local favourites and budget-friendly options.",
    sectionTitle: "Beauty essentials for everyday use and special occasions",
    galleryTitle: "Product images for skincare, makeup and beauty counters",
    contactLead:
      "Ask for product availability, shades, prices or bridal kit options.",
    phone: "+91 93456 78120",
    address:
      "Unit 4 Market, Near Ram Mandir Square, Bhubaneswar, Odisha 751001",
    timings: "Mon - Sat: 10:30 AM - 8:30 PM | Sunday: 11:00 AM - 5:00 PM",
    badges: ["Affordable", "Trusted Brands", "Since 2018", "WhatsApp Orders"],
    metrics: ["500+ customers", "Daily essentials", "Gift packs"],
    services: [
      ["Skincare", "Face wash, creams, sunscreen, serums and daily care products."],
      ["Makeup", "Lipstick, foundation, eyeliner, kajal and compact products."],
      ["Hair Care", "Shampoo, conditioner, oil and styling basics."],
      ["Beauty Kits", "Bridal, festive and gifting kits for every budget."],
    ],
    testimonials: [
      ["Smita Rath", "Good collection and they helped me choose the right shade."],
      ["Pooja Das", "Affordable skincare products and quick WhatsApp reply."],
      ["Ankita Sahu", "Nice behaviour and genuine beauty items."],
    ],
    images: [
      imageUrl("cosmetics,beauty,store"),
      imageUrl("skincare,products,shelf"),
      imageUrl("makeup,lipstick,cosmetics"),
      imageUrl("beauty,shop,products"),
    ],
    colors: ["#db2777", "#3b0a2a", "#fdf2f8"],
  },
  "hardware-shop": {
    name: "Shree Hardware & Tools",
    initials: "SH",
    type: "Hardware shop in Chennai",
    tagline: "Tools, fittings, paints and construction essentials",
    hero: "All hardware materials and tools in one trusted shop",
    subtext:
      "Get quality tools, plumbing items, electrical materials and paints at fair local prices. Call or WhatsApp for availability.",
    about:
      "Shree Hardware & Tools supports home owners, contractors and small repair teams with dependable stock and practical guidance.",
    sectionTitle: "Construction and repair products ready when you need them",
    galleryTitle: "Specific visuals for tools, fittings and hardware shelves",
    contactLead:
      "Send your material list on WhatsApp and we will confirm stock quickly.",
    phone: "+91 94444 32110",
    address:
      "No. 48, Arcot Road, Near Vadapalani Metro, Chennai, Tamil Nadu 600026",
    timings: "Mon - Sat: 9:00 AM - 8:30 PM | Sunday: 10:00 AM - 2:00 PM",
    badges: ["Affordable", "Contractor Trusted", "Since 2015", "Bulk Orders"],
    metrics: ["800+ customers", "Bulk supply", "Quality tools"],
    services: [
      ["Hand & Power Tools", "Drills, cutters, screwdrivers, hammers and tool kits."],
      ["Plumbing Items", "Pipes, taps, fittings, valves and bathroom accessories."],
      ["Paint Materials", "Paints, brushes, rollers, tapes and finishing products."],
      ["Electrical Items", "Wires, switches, sockets, lights and safety basics."],
    ],
    testimonials: [
      ["Karthik R", "All materials available and they suggest good alternatives."],
      ["Manoj Kumar", "Good rates for contractor orders and fast packing."],
      ["Priya Nair", "Helpful staff for home repair purchases."],
    ],
    images: [
      imageUrl("hardware,tools,shop"),
      imageUrl("power,tools,hardware"),
      imageUrl("paint,brushes,hardware"),
      imageUrl("plumbing,pipes,hardware"),
    ],
    colors: ["#f97316", "#1f2937", "#fff7ed"],
  },
  "tiles-shop": {
    name: "Royal Tiles Gallery",
    initials: "RT",
    type: "Tiles showroom in Hyderabad",
    tagline: "Wall tiles, floor tiles and premium flooring designs",
    hero: "Stylish tiles and flooring for your dream space",
    subtext:
      "Explore modern wall tiles, floor tiles and premium designs for homes, kitchens, bathrooms and commercial spaces.",
    about:
      "Royal Tiles Gallery helps customers compare designs, finishes and budgets before choosing tiles for their home or project.",
    sectionTitle: "Tile collections for every room and every budget",
    galleryTitle: "Specific visuals for floors, walls and showroom displays",
    contactLead:
      "Send your room size or design preference and get tile suggestions on WhatsApp.",
    phone: "+91 90123 45678",
    address:
      "Plot 62, Miyapur Main Road, Near Metro Station, Hyderabad, Telangana 500049",
    timings: "Mon - Sat: 10:00 AM - 8:00 PM | Sunday: 11:00 AM - 4:00 PM",
    badges: ["Affordable", "Premium Designs", "Since 2017", "Home Visits"],
    metrics: ["300+ projects", "Wall and floor tiles", "Design guidance"],
    services: [
      ["Floor Tiles", "Vitrified, ceramic and anti-skid floor tile options."],
      ["Wall Tiles", "Kitchen, bathroom and feature wall tile collections."],
      ["Premium Designs", "Marble-look, wooden-look and designer tile ranges."],
      ["Project Supply", "Bulk tile supply for homes, shops and apartments."],
    ],
    testimonials: [
      ["Suresh Reddy", "Great showroom collection and helpful design suggestions."],
      ["Nisha Rao", "Found beautiful bathroom tiles within our budget."],
      ["Imran Khan", "Good support for quantity calculation and delivery."],
    ],
    images: [
      imageUrl("tiles,showroom,flooring"),
      imageUrl("bathroom,tiles,design"),
      imageUrl("floor,tiles,interior"),
      imageUrl("tile,samples,showroom"),
    ],
    colors: ["#0ea5e9", "#0f172a", "#e0f2fe"],
  },
  "electronics-shop": {
    name: "Smart Electronics World",
    initials: "SE",
    type: "Electronics store in Visakhapatnam",
    tagline: "TVs, appliances and home electronics with local support",
    hero: "Latest electronics and appliances at best local prices",
    subtext:
      "Buy TVs, refrigerators, washing machines and kitchen appliances with warranty, offers and easy WhatsApp enquiries.",
    about:
      "Smart Electronics World helps families compare models, prices and warranty details before buying electronics for home or business.",
    sectionTitle: "Home appliances and electronics with genuine warranty",
    galleryTitle: "Store visuals for TVs, appliances and product displays",
    contactLead:
      "Ask for today's price, EMI options or model availability on WhatsApp.",
    phone: "+91 90909 11888",
    address:
      "Dwaraka Nagar Main Road, Near RTC Complex, Visakhapatnam, Andhra Pradesh 530016",
    timings: "Mon - Sat: 10:00 AM - 9:00 PM | Sunday: 11:00 AM - 6:00 PM",
    badges: ["Best Offers", "Trusted Store", "Since 2014", "Warranty Support"],
    metrics: ["1200+ customers", "Easy EMI", "Brand warranty"],
    services: [
      ["Smart TVs", "LED, 4K and smart TVs from popular brands."],
      ["Refrigerators", "Single door, double door and energy-saving models."],
      ["Washing Machines", "Top load, front load and semi-automatic options."],
      ["Kitchen Appliances", "Mixer, microwave, induction and small electronics."],
    ],
    testimonials: [
      ["Vamsi Krishna", "Good TV offer and delivery support was quick."],
      ["Deepika P", "They explained refrigerator models clearly before purchase."],
      ["Naveen Rao", "Genuine products with proper bill and warranty."],
    ],
    images: [
      imageUrl("electronics,store,appliances"),
      imageUrl("television,showroom,electronics"),
      imageUrl("washing,machine,appliance,store"),
      imageUrl("refrigerator,appliance,store"),
    ],
    colors: ["#7c3aed", "#1e1b4b", "#f5f3ff"],
  },
  "medical-clinic": {
    name: "CarePlus Clinic",
    initials: "CP",
    type: "Medical clinic in Bangalore",
    tagline: "Family healthcare, checkups and appointment support",
    hero: "Trusted healthcare for you and your family",
    subtext:
      "Consult experienced doctors for general health, checkups and follow-ups. Book appointments quickly on WhatsApp.",
    about:
      "CarePlus Clinic offers patient-friendly consultation for everyday health needs. We keep timings clear, appointments simple and care personal.",
    sectionTitle: "Clinic services for families, children and regular care",
    galleryTitle: "Clean medical visuals for doctors, clinic and patient care",
    contactLead:
      "Send a WhatsApp message to book an appointment or ask clinic timings.",
    phone: "+91 98860 54321",
    address:
      "No. 21, 5th Main Road, HSR Layout Sector 6, Bangalore, Karnataka 560102",
    timings: "Mon - Sat: 9:00 AM - 1:00 PM, 5:00 PM - 8:30 PM | Sunday: Closed",
    badges: ["Trusted Doctor", "Family Care", "Since 2013", "Appointments"],
    metrics: ["2000+ patients", "Family care", "Clean clinic"],
    services: [
      ["General Consultation", "Common fever, cough, digestion and health concerns."],
      ["Health Checkups", "Basic checkups, BP monitoring and follow-up advice."],
      ["Child & Family Care", "Practical care for children, adults and seniors."],
      ["Follow-up Support", "Appointment reminders and simple WhatsApp coordination."],
    ],
    testimonials: [
      ["Meera Iyer", "Doctor listens patiently and explains medicine clearly."],
      ["Ramesh Gowda", "Clean clinic and easy appointment booking."],
      ["Asha N", "Good family clinic near our home."],
    ],
    images: [
      imageUrl("doctor,clinic,india"),
      imageUrl("medical,clinic,doctor"),
      imageUrl("stethoscope,healthcare"),
      imageUrl("clinic,reception,healthcare"),
    ],
    colors: ["#0891b2", "#164e63", "#ecfeff"],
  },
};

const getTemplateFromHash = (hash) => {
  const cleanedHash = hash.replace(/^#?\/?/, "");
  const parts = cleanedHash.split("/");
  const slug = parts[parts.length - 1];

  return (
    freeTemplatePrompts.find((template) => template.slug === slug) ||
    freeTemplatePrompts.find((template) => template.slug === "mobile-shop") ||
    freeTemplatePrompts[0]
  );
};

const getWhatsAppHref = (site) => {
  const message = encodeURIComponent(
    `Hi, I saw the ${site.name} website template preview and want to create a website for my business.`
  );
  return `https://wa.me/${companyWhatsAppNumber}?text=${message}`;
};

const scrollToTemplateSection = (event, sectionId) => {
  event.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const TemplatePreview = ({
  backHref = "#/templates",
  chooseError = "",
  chooseLabel = "Choose this template",
  embedded = false,
  hash,
  isChoosing = false,
  onChooseTemplate,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [leadError, setLeadError] = useState("");
  const [isSendingLead, setIsSendingLead] = useState(false);
  const selectedTemplate = getTemplateFromHash(hash);
  const site = templateSites[selectedTemplate.slug] || templateSites["mobile-shop"];
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

  const createLeadAndOpenWhatsApp = async () => {
    setLeadError("");

    if (!isAuthenticated) {
      window.localStorage.setItem(
        "webmitra_pending_whatsapp",
        JSON.stringify({
          hash,
          siteName: site.name,
          templateSlug: selectedTemplate.slug,
          templateTitle: selectedTemplate.title,
        })
      );
      window.location.hash = "#/login";
      return;
    }

    setIsSendingLead(true);

    try {
      await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          name: user?.name,
          phone: "Not provided",
          template: selectedTemplate.title,
        }),
      });

      window.location.href = getWhatsAppHref(site);
    } catch (error) {
      setLeadError(error.message);
    } finally {
      setIsSendingLead(false);
    }
  };

  return (
    <div
      className="template-page business-template"
      data-embedded={embedded ? "true" : "false"}
      style={{
        "--template-accent": site.colors[0],
        "--template-ink": site.colors[1],
        "--template-soft": site.colors[2],
      }}
    >
      <header className="template-header">
        <a
          className="template-brand"
          href="#home"
          aria-label={`${site.name} home`}
          onClick={(event) => scrollToTemplateSection(event, "home")}
        >
          <span className="template-brand-mark">{site.initials}</span>
          <span>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </a>

        <nav className="template-nav" aria-label="Main navigation">
          <a href="#services" onClick={(event) => scrollToTemplateSection(event, "services")}>
            Services
          </a>
          <a href="#gallery" onClick={(event) => scrollToTemplateSection(event, "gallery")}>
            Gallery
          </a>
          <a href="#contact" onClick={(event) => scrollToTemplateSection(event, "contact")}>
            Contact
          </a>
        </nav>

        <div className="template-header-actions">
          <a className="template-back-link" href={backHref}>
            Back
          </a>
          <a className="template-call-pill" href={phoneHref}>
            Call Now
          </a>
        </div>
      </header>

      <main>
        <section className="business-hero" id="home">
          <div className="business-hero-copy">
            <p className="template-kicker">{site.type}</p>
            <h1>{site.hero}</h1>
            <p>{site.subtext}</p>

            <div className="template-actions">
              {onChooseTemplate ? (
                <button
                  className="template-btn template-btn-dark"
                  disabled={isChoosing}
                  type="button"
                  onClick={() => onChooseTemplate(selectedTemplate)}
                >
                  {isChoosing ? "Saving..." : chooseLabel}
                </button>
              ) : null}
              <button
                className="template-btn template-btn-whatsapp"
                disabled={isSendingLead}
                type="button"
                onClick={createLeadAndOpenWhatsApp}
              >
                {isSendingLead ? "Creating lead..." : "WhatsApp Now"}
              </button>
              <a className="template-btn template-btn-light" href={phoneHref}>
                Call Now
              </a>
            </div>

            {chooseError ? <p className="template-choice-error">{chooseError}</p> : null}
            {leadError ? <p className="template-choice-error">{leadError}</p> : null}

            <div className="trust-badge-row">
              {site.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <div className="business-hero-media">
            <img src={site.images[0]} alt={`${site.name} hero visual`} />
            <div className="hero-offer-card">
              <strong>Quick enquiry</strong>
              <span>Ask price, availability, timing or appointment on WhatsApp.</span>
            </div>
          </div>
        </section>

        <section className="template-section about-section" id="about">
          <p className="template-kicker">About us</p>
          <h2>A local business website that builds trust quickly</h2>
          <p>{site.about}</p>
          <div className="about-metrics">
            {site.metrics.map((metric) => (
              <span key={metric}>
                <strong>{metric}</strong>
                Clear proof for local customers
              </span>
            ))}
          </div>
        </section>

        <section className="template-section" id="services">
          <p className="template-kicker">Services & products</p>
          <h2>{site.sectionTitle}</h2>
          <div className="service-grid">
            {site.services.map(([title, text]) => (
              <article className="service-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <button type="button" onClick={createLeadAndOpenWhatsApp}>
                  Enquire on WhatsApp
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="template-section gallery-section" id="gallery">
          <p className="template-kicker">Image gallery</p>
          <h2>{site.galleryTitle}</h2>
          <div className="gallery-grid">
            {site.images.map((src, index) => (
              <img src={src} alt={`${site.name} gallery ${index + 1}`} key={src} />
            ))}
          </div>
        </section>

        <section className="template-section testimonial-section">
          <p className="template-kicker">Customer reviews</p>
          <h2>Realistic reviews that reduce doubt and increase enquiries</h2>
          <div className="testimonial-grid">
            {site.testimonials.map(([name, text]) => (
              <article className="testimonial-card" key={name}>
                <p>&quot;{text}&quot;</p>
                <strong>{name}</strong>
                <span>Verified local customer</span>
              </article>
            ))}
          </div>
        </section>

        <section className="template-section contact-section" id="contact">
          <div className="contact-copy">
            <p className="template-kicker">Contact</p>
            <h2>Call or WhatsApp before you visit</h2>
            <p>{site.contactLead}</p>

            <div className="contact-details">
              <p>
                <strong>Phone:</strong> {site.phone}
              </p>
              <p>
                <strong>Address:</strong> {site.address}
              </p>
              <p>
                <strong>Timings:</strong> {site.timings}
              </p>
            </div>

            <div className="template-actions">
              <button
                className="template-btn template-btn-whatsapp"
                disabled={isSendingLead}
                type="button"
                onClick={createLeadAndOpenWhatsApp}
              >
                {isSendingLead ? "Creating lead..." : "WhatsApp Now"}
              </button>
              <a className="template-btn template-btn-dark" href={phoneHref}>
                Call Now
              </a>
            </div>
          </div>

          <div className="template-contact-form-card">
            <p className="template-kicker">Quick enquiry form</p>
            <h3>Send your requirement</h3>
            <form className="template-contact-form">
              <label>
                Your name
                <input type="text" placeholder="Enter your name" autoComplete="name" />
              </label>
              <label>
                Phone number
                <input type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
              </label>
              <label>
                What do you need?
                <select defaultValue="">
                  <option value="" disabled>
                    Select enquiry type
                  </option>
                  {site.services.map(([title]) => (
                    <option value={title} key={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Message
                <textarea placeholder="Write your message here" rows="4"></textarea>
              </label>
              <button
                className="template-btn template-btn-whatsapp"
                disabled={isSendingLead}
                type="button"
                onClick={createLeadAndOpenWhatsApp}
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="template-footer">
        <div className="template-footer-brand">
          <span className="template-brand-mark">WM</span>
          <div>
            <strong>WebMitra</strong>
            <p>Affordable business websites for Indian local shops and services.</p>
          </div>
        </div>

        <div className="template-footer-about">
          <h3>About this {selectedTemplate.title} template</h3>
          <p>{site.about}</p>
        </div>

        <div className="template-footer-links">
          <h3>Quick links</h3>
          <a href="#services" onClick={(event) => scrollToTemplateSection(event, "services")}>
            Services
          </a>
          <a href="#gallery" onClick={(event) => scrollToTemplateSection(event, "gallery")}>
            Gallery
          </a>
          <a href="#contact" onClick={(event) => scrollToTemplateSection(event, "contact")}>
            Contact
          </a>
        </div>

        <div className="template-footer-social">
          <h3>Follow us</h3>
          <div className="social-icon-row">
            <a href="https://facebook.com" aria-label="Facebook">
              <span>f</span>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <span>◎</span>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <span>x</span>
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <span>▶</span>
            </a>
          </div>
        </div>
      </footer>

      {!embedded ? (
        <button
          className="sticky-whatsapp"
          disabled={isSendingLead}
          type="button"
          onClick={createLeadAndOpenWhatsApp}
        >
          WhatsApp Now
        </button>
      ) : null}
    </div>
  );
};

export default TemplatePreview;
