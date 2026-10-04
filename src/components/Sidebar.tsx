import React from 'react';
import { LayoutDashboard, FileText, Radio, PlusCircle, Settings, LogOut, Building2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { id: 'listings', label: 'Объявления', icon: FileText },
  { id: 'create', label: 'Создать', icon: PlusCircle },
  { id: 'channels', label: 'Площадки', icon: Radio },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-800
        text-white z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">RealtorPro</h1>
              <p className="text-xs text-slate-400">Управление объявлениями</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
              АИ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Алексей Иванов</p>
              <p className="text-xs text-slate-400">Агент PRO</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all">
            <LogOut size={18} />
            <span>Выйти</span>
          </button>
        </div>
      </aside>
    </>
  );
};
