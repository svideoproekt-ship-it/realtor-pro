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
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'from-blue-400 to-cyan-400',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Опубликовано',
      value: publishedListings,
      icon: '⚡',
      change: '+8%',
      up: true,
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'from-green-400 to-emerald-400',
      borderColor: 'border-green-200'
    },
    {
      label: 'Просмотры',
      value: totalViews.toLocaleString(),
      icon: '👁️',
      change: '+23%',
      up: true,
      bgGradient: 'from-purple-50 to-fuchsia-50',
      iconBg: 'from-purple-400 to-fuchsia-400',
      borderColor: 'border-purple-200'
    },
    {
      label: 'Обращения',
      value: totalContacts,
      icon: '💬',
      change: '+15%',
      up: true,
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'from-orange-400 to-amber-400',
      borderColor: 'border-orange-200'
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
      {/* Header с градиентом */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-400/30 rounded-full translate-x-20 translate-y-20"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-300/20 rounded-full"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="inline-block animate-bounce">👋</span>
            Добро пожаловать, Алексей!
          </h1>
          <p className="text-blue-100 text-lg">Вот что происходит с вашими объявлениями сегодня</p>
        </div>
      </div>

      {/* Stats Grid с анимацией */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${stat.borderColor} ${
              animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300 text-2xl`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
                stat.up ? 'text-green-700 bg-green-100 border border-green-200' : 'text-red-700 bg-red-100 border border-red-200'
              }`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Последняя активность
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Смотреть все →
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {activity.action}: {activity.target}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Radio size={12} className="text-blue-500" />
                    {activity.channel}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500 animate-pulse' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels Summary */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            Площадки
          </h2>

          <div className="space-y-3">
            {channels.slice(0, 6).map((channel, i) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{channel.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{channel.name}</p>
                  {channel.subscribers && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <TrendingUp size={10} className="text-green-500" />
                      {channel.subscribers.toLocaleString()} подписчиков
                    </p>
                  )}
                </div>
                <div className={`w-3 h-3 rounded-full ${channel.enabled ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Активных: <span className="font-bold text-green-600">{activeChannels}</span> из {channels.length}
              </p>
              <div className="flex -space-x-2">
                {channels.filter(c => c.enabled).slice(0, 3).map((ch, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs">
                    {ch.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300/40 rounded-full translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-400/30 rounded-full -translate-x-20 translate-y-20"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Zap className="animate-pulse" size={28} />
              Быстрая публикация
            </h3>
            <p className="text-indigo-100 text-lg">
              Создайте объявление и опубликуйте его на всех площадках одним кликом
            </p>
          </div>

          <button className="group px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:from-yellow-400 hover:to-orange-400 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap flex items-center gap-2">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            Новое объявление
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>