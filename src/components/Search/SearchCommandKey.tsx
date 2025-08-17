import { Command } from "lucide-react";

export function SearchCommandKey() {
  return (
    <div className="hidden lg:flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-300 rounded px-1.5 py-0.5">
      <Command className="h-3 w-3" />
      <span>+ K</span>
    </div>
  );
}