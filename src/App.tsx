import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Listings } from './components/Listings';
import { CreateListing } from './components/CreateListing';
import { Channels } from './components/Channels';
import { SettingsPage } from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'listings': return <Listings />;
      case 'create': return <CreateListing />;
      case 'channels': return <Channels />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Дашборд';
      case 'listings': return 'Объявления';
      case 'create': return 'Создать';
      case 'channels': return 'Площадки';
      case 'settings': return 'Настройки';
      default: return '';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Быстрый поиск..."
                className="bg-transparent text-sm outline-none w-40 lg:w-56 text-slate-600 placeholder-slate-400"
              />
            </div>

            <button className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-xs font-bold text-white cursor-pointer">
              АИ
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );