const TECH_STACK = [
  {
    name: "Java",
    level: "Lo domino",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    level: "Lo domino",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Godot",
    level: "Lo domino",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
  },
  {
    name: "HTML",
    level: "En aprendizaje",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    level: "En aprendizaje",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    level: "En aprendizaje",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "SQL",
    level: "En aprendizaje",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
];

const renderTechStack = () => {
  const container = document.getElementById("techStack");
  container.innerHTML = TECH_STACK.map(
    (tech) => `
      <div class="col-md-6 col-lg-4">
        <div class="tech-card">
          <img src="${tech.icon}" alt="${tech.name}" loading="lazy" />
          <div>
            <p class="tech-level">${tech.level}</p>
            <h3>${tech.name}</h3>
          </div>
        </div>
      </div>
    `
  ).join("");
};

const renderAbout = (entries) => {
  const textContainer = document.getElementById("aboutText");
  const carouselInner = document.getElementById("aboutCarouselInner");
  const subtitle = document.getElementById("aboutSubtitle");

  textContainer.innerHTML = entries
    .map(
      (entry) => `
        <article>
          <h3>${entry.title}</h3>
          <p>${entry.description}</p>
        </article>
      `
    )
    .join("");

  carouselInner.innerHTML = entries
    .map((entry, index) => {
      return `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${entry.image}" class="d-block w-100" alt="${entry.subtitle ?? "Sobre mí"}" />
        </div>
      `;
    })
    .join("");

  subtitle.textContent = entries[0]?.subtitle || "";

  const carouselElement = document.getElementById("aboutCarousel");
  if (carouselElement && entries.length > 1) {
    carouselElement.addEventListener("slide.bs.carousel", (event) => {
      subtitle.textContent = entries[event.to]?.subtitle || "";
    });
  }
};

const renderProjects = (entries) => {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = entries
    .map((project) => {
      const techTags = project.technologies || [];
      return `
        <div class="col-md-6 col-lg-4">
          <article class="project-card" tabindex="0">
            <img src="${project.image}" alt="${project.name}" loading="lazy" />
            <div class="mt-3">
              <p class="project-status">${project.status}</p>
              <h3>${project.name}</h3>
            </div>
            <div class="project-details">
              <div class="mb-2">
                ${techTags
          .map((tech) => `<span class="project-pill">${tech}</span>`)
          .join("")}
              </div>
              <p>${project.description}</p>
            </div>
          </article>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });
    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("expanded");
      }
    });
  });
};

const renderCertificates = (entries) => {
  const wrapper = document.getElementById("certificatesWrapper");
  wrapper.innerHTML = entries
    .map((cert) => `
      <article class="cert-card glass-card">
        <div class="cert-image">
          <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
        </div>
        <div class="cert-content">
          <p class="eyebrow">${cert.organization}</p>
          <h3>${cert.title}</h3>
          <p>${cert.description}</p>
        </div>
      </article>
    `)
    .join("");
};

const loadSection = (data, renderer, errorContainerId) => {
  try {
    if (!data) {
      throw new Error("Datos no encontrados");
    }
    renderer(data);
  } catch (error) {
    console.error("Error loading section:", error);
    const container = document.getElementById(errorContainerId);
    if (container) {
      const fallback = document.createElement("p");
      fallback.className = "text-danger";
      fallback.textContent = "No se pudo cargar la información. Revisa los archivos en la carpeta data.";
      container.appendChild(fallback);
    }
  }
};

const init = () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderTechStack();

  loadSection(SOBRE_MI, renderAbout, "aboutText");
  loadSection(PROYECTOS, renderProjects, "projectsGrid");
  loadSection(CERTIFICADOS, renderCertificates, "certificatesWrapper");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", init);
