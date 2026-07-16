// Entries for the hidden journal (unlocks after 10 minutes on the site).
// Add a new entry object to the TOP of the array — newest reads first.
export type JournalEntry = {
  date: string; // shown as the entry heading
  body: string[]; // paragraphs
};

export const journalEntries: JournalEntry[] = [
  {
    date: "Entry the First",
    body: [
      "If you are reading this, you stayed a while — long enough for the lamp to find you.",
      "This page is a work in progress, the way a study is never quite finished. More will be written here in time: notes from projects, things learned, doors that open only to the patient.",
      "Consider this the first of them. Come back later — it grows.",
    ],
  },
];
