import { useEffect, useState } from 'react';
import { TrendingUp, Radio, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { listings, channels } from '../data';

export const Dashboard: React.FC = () => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateStats(true), 100);
  }, []);

  const totalListings = listings.length;
  const publishedListings = listings.filter(l => l.status === 'published').length;
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
  const totalContacts = listings.reduce((sum, l) => sum + l.contacts, 0);
  const activeChannels = channels.filter(c => c.enabled).length;

  const stats = [
    {
      label: 'Всего объявлений',
      value: totalListings,
      icon: '🏠',
      change: '+12%',
      up: true,
      bgGradient: 'from-blue-950 to-slate-900',
      iconBg: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-800/50'
    },
    {
      label: 'Опубликовано',
      value: publishedListings,
      icon: '⚡',
      change: '+8%',
      up: true,
      bgGradient: 'from-emerald-950 to-slate-900',
      iconBg: 'from-emerald-600 to-emerald-700',
      borderColor: 'border-emerald-800/50'
    },
    {
      label: 'Просмотры',
      value: totalViews.toLocaleString(),
      icon: '👁️',
      change: '+23%',
      up: true,
      bgGradient: 'from-purple-950 to-slate-900',
      iconBg: 'from-purple-600 to-purple-700',
      borderColor: 'border-purple-800/50'
    },
    {
      label: 'Обращения',
      value: totalContacts,
      icon: '💬',
      change: '+15%',
      up: true,
      bgGradient: 'from-amber-950 to-slate-900',
      iconBg: 'from-amber-600 to-amber-700',
      borderColor: 'border-amber-800/50'
    },
  ];

  const recentActivity = [
    { action: 'Публикация', target: '2-комн. квартира, 65 м²', channel: 'Авито', time: '5 мин назад', status: 'success', icon: '🏠' },
    { action: 'Публикация', target: '2-комн. квартира, 65 м²', channel: 'ЦИАН', time: '5 мин назад', status: 'success', icon: '🏢' },
    { action: 'Публикация', target: '1-комн. квартира, 42 м²', channel: 'TG: Недвижимость МСК', time: '1 час назад', status: 'success', icon: '💬' },
    { action: 'Просмотр', target: '3-комн. квартира, 98 м²', channel: 'Яндекс.Недвижимость', time: '2 часа назад', status: 'info', icon: '👁️' },
    { action: 'Публикация', target: 'Коммерческое помещение', channel: 'TG: Элитная недвижимость', time: '3 часа назад', status: 'success', icon: '🏪' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 border border-blue-800/30 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="inline-block">👋</span>
            Добро пожаловать!
          </h1>
          <p className="text-slate-300 text-lg">Вот что происходит с вашими объявлениями сегодня</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-xl p-5 border ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
              animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.iconBg} flex items-center justify-center shadow-lg text-xl`}>
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                <ArrowUpRight size={14} />
                {stat.change}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              📊 Последняя активность
            </h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Смотреть все →
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">
                    {activity.action}: {activity.target}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Radio size={12} className="text-blue-500" />
                    {activity.channel}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels Summary */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            🌐 Площадки
          </h2>

          <div className="space-y-3">
            {channels.slice(0, 6).map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{channel.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">{channel.name}</p>
                  {channel.subscribers && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <TrendingUp size={10} className="text-emerald-500" />
                      {channel.subscribers.toLocaleString()} подписчиков
                    </p>
                  )}
                </div>
                <div className={`w-3 h-3 rounded-full ${channel.enabled ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Активных: <span className="font-bold text-emerald-400">{activeChannels}</span> из {channels.length}
              </p>
              <div className="flex -space-x-2">
                {channels.filter(c => c.enabled).slice(0, 3).map((ch, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs">
                    {ch.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 border border-blue-800/30 rounded-xl p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400 rounded-full translate-x-10 -translate-y-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500 rounded-full -translate-x-20 translate-y-20 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Zap className="text-amber-400" size={28} />
              Быстрая публикация
            </h3>
            <p className="text-slate-300 text-lg">
              Создайте объявление и опубликуйте его на всех площадках одним кликом
            </p>
          </div>

          <button className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-900/50 transform hover:scale-105 whitespace-nowrap flex items-center gap-2">
            <span className="text-xl group-hover:rotate-12 transition-transform">✨</span>
            Новое объявление
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};