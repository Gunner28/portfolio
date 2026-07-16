// The study's reading shelf. Edit freely — grouped by status on /bookshelf.
export type BookStatus = "reading" | "read" | "queued";

export type Book = {
  title: string;
  author: string;
  status: BookStatus;
  note?: string; // one-line margin note, optional
};

export const books: Book[] = [
  {
    title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    author: "Aurélien Géron",
    status: "reading",
    note: "The working reference — dog-eared beyond repair.",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
  },
  {
    title: "Storytelling with Data",
    author: "Cole Nussbaumer Knaflic",
    status: "read",
    note: "Changed how I build every dashboard since.",
  },
  {
    title: "Deep Learning",
    author: "Goodfellow, Bengio & Courville",
    status: "queued",
  },
];
