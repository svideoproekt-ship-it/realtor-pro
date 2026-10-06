import React, { useState } from 'react';
import { User, Bell, Key, Globe, Save } from 'lucide-react';

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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Настройки</h1>
        <p className="text-slate-400 mt-1">Управление профилем и параметрами приложения</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-500" />
          Профиль
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-300">
              АИ
            </div>
            <button className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-medium">Изменить фото</button>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['name', 'email', 'phone', 'company'].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block capitalize">
                  {field === 'name' ? 'Имя' : field === 'email' ? 'Email' : field === 'phone' ? 'Телефон' : 'Компания'}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  value={settings[field as keyof typeof settings]}
                  onChange={(e) => setSettings(p => ({ ...p, [field]: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Bell size={20} className="text-purple-500" />
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
                <span className="text-sm text-slate-300">{labels[key]}</span>
                <button
                  onClick={() => setSettings(p => ({
                    ...p,
                    notifications: { ...p.notifications, [key]: !p.notifications[key as keyof typeof p.notifications] }
                  }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div 
                    className="w-5 h-5 bg-slate-200 rounded-full absolute top-0.5 transition-transform shadow-sm"
                    style={{ transform: value ? 'translateX(22px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Globe size={20} className="text-emerald-500" />
          Публикация
        </h2>
        <div className="space-y-4">
          {[
            { key: 'autoPublish', title: 'Автопубликация', desc: 'Автоматически публиковать на всех активных площадках' },
            { key: 'defaultChannels', title: 'Площадки по умолчанию', desc: 'Использовать стандартный набор площадок для новых объявлений' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-300">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings[item.key as keyof typeof settings] ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <div 
                  className="w-5 h-5 bg-slate-200 rounded-full absolute top-0.5 transition-transform shadow-sm"
                  style={{ transform: settings[item.key as keyof typeof settings] ? 'translateX(22px)' : 'translateX(0)' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Key size={20} className="text-amber-500" />
          API ключи
        </h2>
        <div className="space-y-4">
          {['Telegram Bot Token', 'Авито API Key'].map((label) => (
            <div key={label}>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">{label}</label>
              <input
                type="password"
                value="•••••••••••••••••••••"
                readOnly
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-6 py-3 font-medium rounded-lg transition-all flex items-center gap-2 ${
            saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? (<>✓ Сохранено</>) : (<><Save size={18} /> Сохранить настройки</>)}
        </button>
      </div>
    </div>
  );
};