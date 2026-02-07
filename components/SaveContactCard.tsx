interface SaveContactCardProps {
  onSave?: () => void;
}

export function SaveContactCard({ onSave }: SaveContactCardProps) {
  return (
    <div className="glass-card flex items-center justify-between gap-4 rounded-2xl p-5">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-white">Save Contact</h3>
        <p className="text-sm text-slate-400">Add directly to phonebook</p>
      </div>
      <button
        onClick={onSave}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-600"
      >
        <span className="material-symbols-outlined">person_add</span>
      </button>
    </div>
  );
}
