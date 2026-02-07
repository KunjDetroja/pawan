interface FloatingDockProps {
  onQrCode?: () => void;
  onShare?: () => void;
}

export function FloatingDock({ onQrCode, onShare }: FloatingDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="glass-dock flex items-center gap-6 rounded-full px-5 py-3 shadow-2xl shadow-blue-900/40">
        <button onClick={onQrCode} className="group flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full bg-white/5 p-2 text-white transition-colors group-hover:bg-white/20">
            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
          </div>
        </button>
        <div className="h-6 w-px bg-white/10" />
        <button onClick={onShare} className="group flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full bg-white/5 p-2 text-white transition-colors group-hover:bg-white/20">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </div>
        </button>
      </div>
    </div>
  );
}
