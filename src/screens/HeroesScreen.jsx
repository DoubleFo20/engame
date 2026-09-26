import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";

export default function HeroesScreen({
  characters = [],
  onSelectHero,
}) {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const roles = ["All", "Tank", "Fighter", "Assassin", "Mage", "Carry", "Support"];

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      const matchRole =
        selectedRole === "All" ||
        (c.role && c.role.toLowerCase().includes(selectedRole.toLowerCase()));
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.role && c.role.toLowerCase().includes(search.toLowerCase()));
      return matchRole && matchSearch;
    });
  }, [characters, selectedRole, search]);

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden">
      {/* Header & Search */}
      <header className="px-5 pt-4 pb-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">ROV Champions</h1>
            <p className="text-xs text-slate-400 font-medium">{characters.length} heroes with English vocabulary</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
            {filtered.length} Shown
          </span>
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by hero name or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500 transition-all"
          />
        </div>

        {/* Role Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {roles.map((r) => {
            const isSelected = selectedRole === r;
            return (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200/80 hover:text-slate-700"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </header>

      {/* Hero Grid */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm font-medium">No heroes found matching &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((hero) => {
              const hotspotCount = hero.hotspots?.length || 0;
              return (
                <button
                  key={hero.id}
                  onClick={() => onSelectHero(hero)}
                  className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl overflow-hidden text-left shadow-xs hover:shadow-sm transition-all group flex flex-col active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={hero.img}
                      alt={hero.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {hero.role}
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                        {hero.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-0.5">
                        <BookOpen size={11} className="text-blue-500" />
                        <span>{hotspotCount} Words</span>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
