import React, { useState } from 'react';
import { User, Bell, Key, Palette, Globe, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: 'Алексей Иванов',
    email: 'alexey@realtor.ru',
    phone: '+7 (999) 123-45-67',
    company: 'Агентство "ДомМечты"',
    notifications: {
      email: true,
      push: true,
      telegram: true,
      publishAlerts: true,
    },
    autoPublish: true,
    defaultChannels: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Настройки</h1>
        <p className="text-slate-500 mt-1">Управление профилем и параметрами приложения</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Профиль
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
              АИ
            </div>
            <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">Изменить фото</button>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Имя</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Телефон</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Компания</label>
              <input
                type="text"
                value={settings.company}
                onChange={(e) => setSettings(p => ({ ...p, company: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Bell size={20} className="text-purple-600" />
          Уведомления
        </h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => {
            const labels: Record<string, string> = {
              email: 'Email уведомления',
              push: 'Push-уведомления',
              telegram: 'Уведомления в Telegram',
              publishAlerts: 'Оповещения о публикации',
            };
            return (
              <div key={key} className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-700">{labels[key]}</span>
                <button
                  onClick={() => setSettings(p => ({
                    ...p,
                    notifications: { ...p.notifications, [key]: !p.notifications[key as keyof typeof p.notifications] }
                  }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${value ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`}
                    style={{ transform: value ? 'translateX(22px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Publishing Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Globe size={20} className="text-green-600" />
          Публикация
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Автопубликация</p>
              <p className="text-xs text-slate-400">Автоматически публиковать на всех активных площадках</p>
            </div>
            <button
              onClick={() => setSettings(p => ({ ...p, autoPublish: !p.autoPublish }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.autoPublish ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow-sm"
                style={{ transform: settings.autoPublish ? 'translateX(22px)' : 'translateX(0)' }}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Площадки по умолчанию</p>
              <p className="text-xs text-slate-400">Использовать стандартный набор площадок для новых объявлений</p>
            </div>
            <button
              onClick={() => setSettings(p => ({ ...p, defaultChannels: !p.defaultChannels }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.defaultChannels ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow-sm"
                style={{ transform: settings.defaultChannels ? 'translateX(22px)' : 'translateX(0)' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Key size={20} className="text-orange-600" />
          API ключи
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Telegram Bot Token</label>
            <input
              type="password"
              value="•••••••••••••••••••••"
              readOnly
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Авито API Key</label>
            <input
              type="password"
              value="•••••••••••••••••••••"
              readOnly
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-6 py-3 font-medium rounded-xl transition-all flex items-center gap-2 ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? (
            <>✓ Сохранено</>
          ) : (
            <>
              <Save size={18} />
              Сохранить настройки
            </>
          )}
        </button>
      </div>
    </div>
  );
};
