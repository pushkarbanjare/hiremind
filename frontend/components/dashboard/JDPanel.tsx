interface JDPanelProps {
  jdText: string;
  setJDText: (value: string) => void;
}

export default function JDPanel({ jdText, setJDText }: JDPanelProps) {
  return (
    <div className="glass-card p-6 h-full">
      <h2 className="text-2xl font-semibold mb-4">Job Description</h2>

      <textarea
        value={jdText}
        onChange={(e) => setJDText(e.target.value)}
        placeholder="Paste Job Description here..."
        className="w-full h-100 rounded-xl bg-white/5 border border-white/10 p-4 outline-none resize-none"
      />
    </div>
  );
}
