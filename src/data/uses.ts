// The Toolkit (/uses) — hardware, software, and daily instruments. Edit freely.
export type Tool = {
  name: string;
  detail?: string;
};

export type ToolGroup = {
  group: string;
  items: Tool[];
};

export const uses: ToolGroup[] = [
  {
    group: "The Desk",
    items: [
      { name: "MacBook Pro — Apple Silicon (M2 Max)", detail: "The machine Dev-Pulse was built to watch." },
      { name: "macOS + Linux", detail: "Daily driver plus lab environments." },
    ],
  },
  {
    group: "Instruments of Analysis",
    items: [
      { name: "Python", detail: "Pandas, NumPy, Scikit-learn — the everyday kit." },
      { name: "R", detail: "For when statistics wants its native tongue." },
      { name: "SQL", detail: "Questions, asked properly." },
      { name: "Jupyter", detail: "Where experiments start." },
    ],
  },
  {
    group: "Vision & Learning",
    items: [
      { name: "TensorFlow & Keras", detail: "Model building and training." },
      { name: "OpenCV", detail: "Computer vision workhorse." },
    ],
  },
  {
    group: "Telling the Story",
    items: [
      { name: "Tableau & Power BI", detail: "Dashboards stakeholders actually read." },
      { name: "Matplotlib & Seaborn", detail: "Figures for the write-ups." },
      { name: "Streamlit", detail: "From script to app in an afternoon." },
    ],
  },
  {
    group: "This Site",
    items: [
      { name: "Next.js + TypeScript + Tailwind", detail: "The study's timber and joinery." },
      { name: "Claude Code", detail: "Pair-builder in residence." },
      { name: "Vercel", detail: "Keeps the lamps lit." },
    ],
  },
];
