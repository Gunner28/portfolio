import Sidebar from "@/components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:mx-auto lg:flex lg:max-w-6xl lg:justify-between lg:gap-12 lg:px-12 xl:px-16">
      <Sidebar />
      <main className="relative z-10 px-6 sm:px-10 lg:px-0 lg:w-[54%]">
        {children}
      </main>
    </div>
  );
}
