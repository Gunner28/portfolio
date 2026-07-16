// Notes & writing. The /notes section stays hidden until the first note
// lands here AND features.notes is flipped to true in site.ts.
export type Note = {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-08-01"
  summary: string;
  tags: string[];
  body: string[]; // paragraphs
};

export const notes: Note[] = [
  // {
  //   slug: "first-note",
  //   title: "On teaching machines to see pests",
  //   date: "2026-08-01",
  //   summary: "What 75,000 images taught me about data quality.",
  //   tags: ["computer-vision", "lessons"],
  //   body: ["Paragraph one.", "Paragraph two."],
  // },
];
