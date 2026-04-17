export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ========== navbar ========== */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold cursor-pointer tracking-tight">
          HireMind
        </h1>
      </div>

      {/* ========== content ========== */}
      <main className="flex-1">{children}</main>

      {/* ========== footer ========== */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        Built with intent, not just code.
      </footer>
    </div>
  );
}
