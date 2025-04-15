// src/app/studio/layout.tsx

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
