import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/main.scss";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 📄 DATA FROM PDF
// ============================================

// IT Services Trends (2025) - From PDF Page 03
const IT_TRENDS_DATA = [
  {
    name: "AI & Automation",
    description:
      "Artificial Intelligence and automation are revolutionizing IT operations, enabling predictive maintenance, intelligent ticketing, and automated workflows that reduce manual effort by up to 70%.",
  },
  {
    name: "Cloud & Hybrid IT",
    description:
      "Organizations are adopting hybrid cloud strategies, combining on-premises infrastructure with multiple cloud providers for optimal flexibility, cost-efficiency, and disaster recovery.",
  },
  {
    name: "Cybersecurity First",
    description:
      "With cyber threats evolving rapidly, security is now embedded at every layer of IT infrastructure, featuring zero-trust architecture, AI-powered threat detection, and continuous monitoring.",
  },
  {
    name: "Outcome-Based Approach",
    description:
      "IT services are shifting from traditional SLAs to outcome-based models, focusing on business results, user experience, and measurable ROI rather than just uptime metrics.",
  },
  {
    name: "24/7 Tech Support",
    description:
      "Round-the-clock support with AI-powered chatbots, remote monitoring, and global follow-the-sun models ensure instant response and minimal downtime for critical business operations.",
  },
];

// Backup & Recovery Trends (2025) - From PDF Page 03
const BACKUP_TRENDS_DATA = [
  {
    name: "Hybrid Backup Models",
    description:
      "Combining on-premises backup appliances with cloud storage provides the best of both worlds: fast local recovery and off-site disaster protection with unlimited scalability.",
  },
  {
    name: "Immutable Backups",
    description:
      "Write-once-read-many (WORM) technology creates ransom-proof backups that cannot be encrypted or deleted, ensuring data can always be recovered even after a cyberattack.",
  },
  {
    name: "DRaaS Adoption",
    description:
      "Disaster Recovery as a Service (DRaaS) is becoming mainstream, offering enterprise-grade recovery capabilities with RTOs under 15 minutes and automated failover testing.",
  },
  {
    name: "Endpoint Protection",
    description:
      "With remote work permanent, backup strategies now include comprehensive endpoint protection, ensuring laptops, mobile devices, and edge locations are backed up automatically.",
  },
  {
    name: "Fast Recovery SLAs",
    description:
      "Modern businesses demand near-instant recovery with RTOs measured in minutes, not hours. Advanced technologies like instant VM recovery and granular file restoration are now standard.",
  },
];

// Services - From PDF Pages 05-09
const SERVICES = [
  {
    icon: "fa-server",
    title: "IT Infrastructure Management",
    shortDesc: "End-to-end management of your IT infrastructure",
    fullDesc:
      "We provide end-to-end management of your IT infrastructure, including server setup, network administration, system monitoring, and maintenance to ensure high availability, security, and optimal performance. Our proactive approach minimizes downtime, maximizes efficiency, and supports your business growth with scalable, reliable technology solutions.",
    details: [
      "Server Setup & Configuration",
      "Network Administration",
      "24/7 System Monitoring",
      "Proactive Maintenance",
      "High Availability Solutions",
      "Scalable Infrastructure",
    ],
  },
  {
    icon: "fa-database",
    title: "Database Managed Services",
    shortDesc: "Comprehensive database management and optimization",
    fullDesc:
      "We offer comprehensive database management services, including installation, configuration, performance tuning, and regular maintenance to ensure data integrity, security, and high availability. Our proactive monitoring and continuous optimization help minimize downtime, enhance system performance, and support seamless business operations through scalable and reliable data solutions.",
    details: [
      "Database Installation & Configuration",
      "Performance Tuning",
      "24/7 Monitoring",
      "Security & Backup",
      "High Availability",
      "Continuous Optimization",
    ],
  },
  {
    icon: "fa-shield-alt",
    title: "Backup Managed Services",
    shortDesc: "Enterprise-grade backup and disaster recovery",
    fullDesc:
      "We offer comprehensive backup managed services that include automated backups, secure encrypted storage, disaster recovery, and regular testing to ensure data integrity and availability at all times. As a Commvault Premier Partner, we leverage industry-leading technologies to deliver proactive, scalable solutions that minimize data loss, reduce downtime, and help your business remain resilient and compliant.",
    details: [
      "Automated Backups",
      "Encrypted Storage",
      "Disaster Recovery",
      "24/7 Monitoring & Support",
      "Data Integrity Assurance",
      "Compliance Management",
    ],
    partners: ["Commvault (Premier Partner)", "Veeam", "Arctera"],
  },
  {
    icon: "fa-cloud",
    title: "Cloud Managed Services",
    shortDesc: "End-to-end cloud solutions across major platforms",
    fullDesc:
      "We deliver end-to-end cloud managed services, including deployment, monitoring, optimization, and security across leading platforms such as Microsoft Azure, Amazon Web Services (AWS), and Google Cloud. As trusted partners, we provide enterprise-grade cloud solutions that are scalable, secure, and cost-effective.",
    details: [
      "Cloud Deployment & Migration",
      "24/7 Monitoring",
      "Security & Compliance",
      "Cost Optimization",
      "Performance Tuning",
      "Disaster Recovery",
    ],
    partners: ["Microsoft Azure", "AWS", "Metallic"],
  },
];

// Partners - From PDF Pages 09-10
const PARTNERS = [
  {
    name: "Commvault",
    logo: "/logos/partners/commvault.png",
    url: "https://www.commvault.com",
    badge: "Premier Partner",
  },
  {
    name: "Veeam",
    logo: "/logos/partners/veeam.png",
    url: "https://www.veeam.com",
    badge: null,
  },
  {
    name: "Metallic",
    logo: "/logos/partners/metallic.jpeg",
    url: "https://www.metallic.com",
    badge: null,
  },
  {
    name: "Nutanix",
    logo: "/logos/partners/Nutanix.jpeg",
    url: "https://www.nutanix.com",
    badge: null,
  },
];

// Customers - From PDF Pages 11-12 (your actual logo files)
const CUSTOMERS = [
  { name: "Volksara", file: "volksara" },
  { name: "Flipkart", file: "flipkart" },
  { name: "KPMG", file: "kpmg" },
  { name: "Wind World", file: "wwil" },
  { name: "Fortis", file: "fortis" },
  { name: "NTT", file: "NTT" }, // Capital NTT for your logo file
  { name: "Kinsfolk", file: "kinsfolk" },
  { name: "Endurance", file: "endurance" },
  { name: "Paramaah", file: "paramaah" },
  { name: "Netweb", file: "netweb" },
  { name: "NxtGen", file: "nxtgen" },
  { name: "Shree Naman", file: "shreenaman" },
  { name: "Servcloud", file: "servcloud" },
];

// ============================================
// 🌍 THREE.JS SCENE
// ============================================
class Scene3D {
  constructor() {
    this.canvas = document.getElementById("webgl-canvas");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.objects = [];
    this.clock = new THREE.Clock();
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.position.set(0, 2, 15);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(10, 20, 15);
    this.scene.add(directional);

    this.createObjects();
    this.animate();
    this.handleResize();
    this.handleMouseMove();
  }

  createObjects() {
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
    ];
    const colors = [0x6366f1, 0x14b8a6, 0xf59e0b];

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity: 0.7,
        clearcoat: 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35 - 20,
      );

      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
        },
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y,
        originalX: mesh.position.x,
      };

      this.scene.add(mesh);
      this.objects.push(mesh);
    }
  }

  handleMouseMove() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = this.clock.getElapsedTime();

    this.camera.position.x += (this.mouseX * 3 - this.camera.position.x) * 0.05;
    this.camera.position.y +=
      (2 + this.mouseY * 2 - this.camera.position.y) * 0.05;
    this.camera.lookAt(0, 0, 0);

    this.objects.forEach((obj) => {
      obj.rotation.x += obj.userData.rotationSpeed.x;
      obj.rotation.y += obj.userData.rotationSpeed.y;
      obj.rotation.x += this.mouseY * 0.01;
      obj.rotation.y += this.mouseX * 0.01;
      obj.position.y =
        obj.userData.originalY +
        Math.sin(time * obj.userData.floatSpeed + obj.userData.floatOffset) *
          0.8;
    });

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  triggerPulse() {
    gsap.to(this.objects, {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      stagger: 0.05,
    });
  }
}

// ============================================
// 🎬 UI MANAGER
// ============================================
class UIManager {
  constructor(scene3D) {
    this.scene3D = scene3D;
    this.init();
  }

  init() {
    this.createParticles();
    this.populateContent();
    this.setupTrendInteractions();
    this.setupModal();
    this.setupScrollProgress();
    this.setupBackToTop();
    this.setupThemeToggle(); // ✅ Fixed dark mode toggle
    this.setupCounters();
    this.hideLoader();
    this.setupNavigation();
    this.setupForm();
    this.setupScrollAnimations();
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  createParticles() {
    const container = document.getElementById("particles");
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 15 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      container.appendChild(particle);
    }
  }

  populateContent() {
    // Services
    const servicesContainer = document.getElementById("services-container");
    SERVICES.forEach((service, index) => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <div class="service-icon"><i class="fas ${service.icon}"></i></div>
        <h3>${service.title}</h3>
        <p>${service.shortDesc}</p>
        <button class="btn btn-secondary" onclick="app.ui.openModal(${index})" style="margin-top:1rem;">
          <i class="fas fa-arrow-right"></i> Learn More
        </button>
        ${service.partners?.length ? `<p class="partners-tag"><strong>Partners:</strong> ${service.partners.join(", ")}</p>` : ""}
      `;
      servicesContainer.appendChild(card);
    });

    // Partners
    const partnersContainer = document.getElementById("partners-container");
    PARTNERS.forEach((partner) => {
      const div = document.createElement("div");
      div.className = "partner-logo";
      div.innerHTML = `
        <a href="${partner.url}" target="_blank" rel="noopener">
          <img src="${partner.logo}" alt="${partner.name}" loading="lazy">
          ${partner.badge ? `<span class="badge">${partner.badge}</span>` : ""}
          <span>${partner.name}</span>
        </a>
      `;
      partnersContainer.appendChild(div);
    });

    // Customers (with fallback for .png/.jpeg)
    const customersContainer = document.getElementById("customers-container");
    CUSTOMERS.forEach((customer) => {
      const div = document.createElement("div");
      div.className = "customer-logo";
      div.innerHTML = `
        <img src="/logos/customers/${customer.file}.png" 
             alt="${customer.name}" 
             loading="lazy" 
             onerror="this.onerror=null; this.src='/logos/customers/${customer.file}.jpeg'">
        <span>${customer.name}</span>
      `;
      customersContainer.appendChild(div);
    });

    // IT Trends
    const itTrends = document.getElementById("it-trends");
    IT_TRENDS_DATA.forEach((trend, index) => {
      const tag = document.createElement("div");
      tag.className = "trend-tag";
      tag.textContent = trend.name;
      tag.dataset.index = index;
      tag.dataset.type = "it";
      itTrends.appendChild(tag);
    });

    // Backup Trends
    const backupTrends = document.getElementById("backup-trends");
    BACKUP_TRENDS_DATA.forEach((trend, index) => {
      const tag = document.createElement("div");
      tag.className = "trend-tag";
      tag.textContent = trend.name;
      tag.dataset.index = index;
      tag.dataset.type = "backup";
      backupTrends.appendChild(tag);
    });
  }

  setupTrendInteractions() {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("trend-tag")) return;

      const type = e.target.dataset.type;
      const index = parseInt(e.target.dataset.index);
      const data = type === "it" ? IT_TRENDS_DATA : BACKUP_TRENDS_DATA;
      const trend = data[index];

      e.target
        .closest(".trend-list")
        .querySelectorAll(".trend-tag")
        .forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");

      const infoDiv = document.getElementById(`${type}-trend-info`);
      infoDiv.classList.remove("show");
      setTimeout(() => {
        infoDiv.innerHTML = `<h4>${trend.name}</h4><p>${trend.description}</p>`;
        infoDiv.classList.add("show");
      }, 200);
    });
  }

  setupModal() {
    const modal = document.getElementById("serviceModal");
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("modalClose");

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active"))
        closeModal();
    });
  }

  openModal(index) {
    const service = SERVICES[index];
    const modal = document.getElementById("serviceModal");

    document.getElementById("modalIcon").innerHTML =
      `<i class="fas ${service.icon}"></i>`;
    document.getElementById("modalTitle").textContent = service.title;
    document.getElementById("modalBody").innerHTML = `
      <p>${service.fullDesc}</p>
      <h4 style="margin:1.5rem 0 1rem;color:#6366f1;">Key Features:</h4>
      <ul>${service.details.map((d) => `<li>${d}</li>`).join("")}</ul>
      ${service.partners?.length ? `<h4 style="margin:1.5rem 0 1rem;color:#6366f1;">Partners:</h4><p>${service.partners.join(", ")}</p>` : ""}
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  setupScrollProgress() {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      document.getElementById("scrollProgress").style.width =
        (scrollTop / docHeight) * 100 + "%";
    });
  }

  setupBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 500) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      },
      { passive: true },
    );

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ✅ FIXED: Dark Mode Toggle Function
  setupThemeToggle() {
    const btn = document.getElementById("themeToggle");
    const icon = btn?.querySelector("i");

    if (!btn || !icon) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Apply saved theme or system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-mode");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    // Toggle click handler
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");

      // Update icon
      if (isDark) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }

      // Optional: Add subtle animation feedback
      gsap.fromTo(
        btn,
        { scale: 0.9 },
        { scale: 1, duration: 0.2, ease: "power2.out" },
      );
    });
  }

  setupCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            gsap.to(entry.target, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: "power2.out",
              onUpdate: function () {
                entry.target.innerHTML = Math.ceil(
                  parseFloat(this.targets()[0].innerHTML),
                );
              },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  hideLoader() {
    gsap.to(".loader-progress", {
      width: "100%",
      duration: 1.2,
      onComplete: () => {
        gsap.to("#loader", {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            document.getElementById("loader").classList.add("hidden");
            this.animateHero();
          },
        });
      },
    });
  }

  animateHero() {
    gsap.from(".hero-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
    });
    gsap.from(".hero-title", { y: 40, opacity: 0, duration: 0.8, delay: 0.4 });
    gsap.from(".hero-subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
    });
    gsap.from(".hero-cta .btn", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.8,
    });
  }

  setupNavigation() {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");

    navToggle?.addEventListener("click", () => {
      navLinks?.classList.toggle("active");
      hamburger?.classList.toggle("active");
    });

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(
          link.getAttribute("href").slice(1),
        );
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          navLinks?.classList.remove("active");
          hamburger?.classList.remove("active");
          this.scene3D?.triggerPulse();
        }
      });
    });

    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) =>
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`,
              ),
            );
          }
        });
      },
      { rootMargin: "-50% 0px" },
    ).observe(sections[0]);

    window.addEventListener(
      "scroll",
      () => {
        document
          .getElementById("navbar")
          ?.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true },
    );
  }

  setupForm() {
    // Formspree handles submission - just add visual feedback
    const form = document.getElementById("contact-form");
    form?.addEventListener("submit", () => {
      const btn = form.querySelector("button");
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    });
  }

  setupScrollAnimations() {
    gsap.utils
      .toArray(
        ".service-card, .partner-logo, .customer-logo, .insight-card, .contact-card, .stat-card",
      )
      .forEach((elem, i) => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 90%" },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
        });
      });
  }
}

// ============================================
// 🚀 INITIALIZE
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const scene3D = new Scene3D();
  const ui = new UIManager(scene3D);
  window.app = { ui };
  console.log("✨ KuhuGrantha Website Loaded");
});
