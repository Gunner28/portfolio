// Central site configuration. Flip a feature flag to false and its section,
// nav entry, palette command, and sitemap entry all disappear together.
export const site = {
  url: "https://portfolio-kappa-teal-68.vercel.app",
  title: "Gagan Purushotham — Data Scientist & AI Engineer",
  description:
    "Portfolio of Gagan Purushotham — data science, machine learning, and computer vision projects. Based in Melbourne, Australia.",
  lastPolished: "2026-07-16",
};

export const features = {
  archive: true, // /archive — full project index table
  now: true, // /now — what I'm up to lately
  bookshelf: true, // /bookshelf — the study's reading shelf
  notes: false, // /notes — writing; flips on when the first note lands in writing.ts
};
