export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type Project = {
  slug: string; // URL: /projects/<slug>
  name: string;
  year: string;
  status: ProjectStatus;
  featured: boolean; // featured = shown on the home page
  blurb: string; // one-paragraph card text
  description: string[]; // longform paragraphs for the detail page
  highlights: string[]; // bullet achievements for the detail page
  stack: string[];
  github?: string;
  link?: string; // live demo, if any
  writeup?: string; // external article/report, if any
};

/*
 * ── Adding a project ────────────────────────────────────────────────
 * Copy this template, fill it in, drop it into the array below.
 * The detail page, archive row, home card (if featured), sitemap
 * entry, and command-palette hit are all generated from it.
 *
 * {
 *   slug: "my-new-project",
 *   name: "My New Project",
 *   year: "2026",
 *   status: "in-progress",
 *   featured: true,
 *   blurb: "One tight paragraph for the card.",
 *   description: ["Longer paragraph one.", "Paragraph two."],
 *   highlights: ["Did X with Y, improving Z by N%."],
 *   stack: ["Python"],
 *   github: "https://github.com/Gunner28/my-new-project",
 *   link: "",
 * },
 * ────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    slug: "dev-pulse",
    name: "Dev-Pulse: Custom Mac Hardware Monitor",
    year: "2026",
    status: "in-progress",
    featured: true,
    blurb:
      "A real-time telemetry dashboard engineered to monitor Apple Silicon (M2 Max) performance — live CPU/GPU core tracking and process resource management, bridging AI theory and system-level engineering.",
    description: [
      "Dev-Pulse is a live hardware telemetry dashboard for Apple Silicon, built to answer a simple question: what is this machine actually doing right now? It samples CPU and GPU core utilisation, memory pressure, and per-process resource consumption in real time and renders them as a continuously updating dashboard.",
      "The prototype is built with Python and Streamlit, with a collector layer that polls macOS system interfaces and a presentation layer tuned for information density without clutter. It began as a tool for watching model-training runs strain the machine, and grew into a general system-observability project.",
    ],
    highlights: [
      "Live per-core CPU/GPU tracking on Apple Silicon (M2 Max) with process-level resource attribution.",
      "Streamlit dashboard architecture with a decoupled sampling layer, keeping UI latency low while polling continuously.",
      "Bridges AI theory and system-level engineering — built to observe model-training workloads in the wild.",
    ],
    stack: ["Python", "Streamlit", "macOS"],
    github: "https://github.com/Gunner28",
    link: "",
  },
  {
    slug: "pest-detection",
    name: "AI-Powered Pest Detection",
    year: "2025",
    status: "shipped",
    featured: true,
    blurb:
      "Trained on 75,000 pest images for scalable classification in agricultural monitoring. Reached ~88% accuracy distinguishing beneficial vs. harmful species, with AI-driven treatment recommendations improving crop protection precision by ~25%.",
    description: [
      "An end-to-end computer-vision system for agricultural pest management: classify what is in the field, decide whether it helps or harms the crop, and recommend a proportionate treatment. The model was trained on a corpus of 75,000 pest images spanning beneficial and harmful species.",
      "Beyond classification, the system delivers treatment recommendations calibrated to the detected species mix, replacing blanket spraying with targeted intervention — better for yield, cost, and the beneficial insects that blanket approaches kill off.",
    ],
    highlights: [
      "~88% classification accuracy across beneficial vs. harmful species on held-out data.",
      "AI-driven treatment recommendations improved crop-protection precision by ~25%.",
      "Cut manual pest-assessment effort by ~40% by translating CV research into a field-usable tool.",
      "CNN architecture with a data-processing pipeline handling 75K images.",
    ],
    stack: ["Computer Vision", "CNNs", "Python", "TensorFlow"],
    github: "https://github.com/Gunner28",
    link: "",
  },
  {
    slug: "payroll-system",
    name: "Payroll Management System",
    year: "2023",
    status: "shipped",
    featured: true,
    blurb:
      "A secure web-based payroll platform automating salary processing, role-based authentication, and encrypted records — cutting manual payroll effort by ~50% and lookup time by ~60%.",
    description: [
      "A full payroll platform for routine HR operations: salary processing, historical payroll and attendance retrieval, and reporting dashboards — behind role-based access control with encrypted records for sensitive fields.",
      "Three user roles (employee, HR manager, administrator) see strictly scoped views of the same centralised employee database, and reporting dashboards give HR managers salary-trend visibility that used to require manual spreadsheet work.",
    ],
    highlights: [
      "Automated salary processing cut manual payroll effort by ~50%.",
      "Centralised employee database cut record lookup time by ~60%.",
      "Role-based authentication and data encryption across 3 user roles.",
      "Reporting dashboards improved monthly review efficiency by ~30%.",
    ],
    stack: ["Web", "Security", "Database", "SQL"],
    github: "https://github.com/Gunner28",
    link: "",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
