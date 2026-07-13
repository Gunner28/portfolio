import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex items-center gap-6">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
