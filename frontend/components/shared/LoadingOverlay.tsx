interface Props {
  text: string;
}

export default function LoadingOverlay({ text }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
      <div className="glass-card p-10 text-center">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="mt-6 text-2xl font-semibold">{text}</h2>
        <p className="text-gray-400 mt-3">This may take a few seconds...</p>
      </div>
    </div>
  );
}
