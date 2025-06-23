import { ModeToggle } from "../components/darkMode/mode-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <div className="fixed bottom-4 right-4 z-50 md:block">
        <ModeToggle />
      </div>
    </div>
  );
}