import React, { useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, Users } from 'lucide-react';
import { channels as initialChannels } from '../data';
import { Channel } from '../types';

export const Channels: React.FC = () => {
  const [channelList, setChannelList] = useState<Channel[]>(initialChannels);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelType, setNewChannelType] = useState<'board' | 'telegram'>('telegram');

  const toggleChannel = (id: string) => {
    setChannelList(prev => prev.map(ch =>
      ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
    ));
  };

  const removeChannel = (id: string) => {
    setChannelList(prev => prev.filter(ch => ch.id !== id));
  };

  const addChannel = () => {
    if (!newChannelName.trim()) return;
    const newCh: Channel = {
      id: Date.now().toString(),
      name: newChannelName,
      type: newChannelType,
      icon: newChannelType === 'telegram' ? '💬' : '📋',
      color: newChannelType === 'telegram' ? '#0088CC' : '#666',
      subscribers: newChannelType === 'telegram' ? 0 : undefined,
      enabled: true,
    };
    setChannelList(prev => [...prev, newCh]);
    setNewChannelName('');
    setShowAddModal(false);
  };

  const boardChannels = channelList.filter(c => c.type === 'board');
  const telegramChannels = channelList.filter(c => c.type === 'telegram');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Площадки</h1>
          <p className="text-slate-400 mt-1">Управление каналами публикации объявлений</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={18} />
          Добавить площадку
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Всего площадок', value: channelList.length, color: 'text-white' },
          { label: 'Активных', value: channelList.filter(c => c.enabled).length, color: 'text-emerald-400' },
          { label: 'Охват аудитории', value: telegramChannels.filter(c => c.enabled).reduce((s, c) => s + (c.subscribers || 0), 0).toLocaleString(), color: 'text-white' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">📋 Доски объявлений</h2>
        <div className="space-y-3">
          {boardChannels.map(channel => (
            <div key={channel.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
              <span className="text-2xl">{channel.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200">{channel.name}</p>
                <p className="text-xs text-slate-500">Доска объявлений</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleChannel(channel.id)} className="text-slate-500 hover:text-blue-400 transition-colors">
                  {channel.enabled ? <ToggleRight size={28} className="text-blue-500" /> : <ToggleLeft size={28} />}
                </button>
                <button onClick={() => removeChannel(channel.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {boardChannels.length === 0 && <p className="text-center text-slate-500 py-6">Нет подключённых досок объявлений</p>}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">💬 Telegram каналы и чаты</h2>
        <div className="space-y-3">
          {telegramChannels.map(channel => (
            <div key={channel.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
              <span className="text-2xl">{channel.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200">{channel.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Users size={12} />
                  <span>{channel.subscribers?.toLocaleString() || 0} подписчиков</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleChannel(channel.id)} className="text-slate-500 hover:text-blue-400 transition-colors">
                  {channel.enabled ? <ToggleRight size={28} className="text-blue-500" /> : <ToggleLeft size={28} />}
                </button>
                <button onClick={() => removeChannel(channel.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {telegramChannels.length === 0 && <p className="text-center text-slate-500 py-6">Нет подключённых Telegram каналов</p>}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Добавить площадку</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Тип площадки</label>
                <div className="flex gap-3">
                  {['board', 'telegram'].map(type => (
                    <button
                      key={type}
                      onClick={() => setNewChannelType(type as any)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        newChannelType === type ? 'bg-blue-600/15 border-blue-600 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {type === 'board' ? '📋 Доска' : '💬 Telegram'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  {newChannelType === 'telegram' ? 'Ссылка на канал/чат' : 'Название площадки'}
                </label>
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder={newChannelType === 'telegram' ? '@channel_name' : 'Название'}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-800 transition-colors">Отмена</button>
              <button onClick={addChannel} className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};