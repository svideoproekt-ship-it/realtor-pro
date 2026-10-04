import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, ToggleLeft, ToggleRight, Users } from 'lucide-react';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Площадки</h1>
          <p className="text-slate-500 mt-1">Управление каналами публикации объявлений</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={18} />
          Добавить площадку
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">Всего площадок</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{channelList.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">Активных</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{channelList.filter(c => c.enabled).length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">Охват аудитории</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {telegramChannels.filter(c => c.enabled).reduce((s, c) => s + (c.subscribers || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Board Channels */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          📋 Доски объявлений
        </h2>
        <div className="space-y-3">
          {boardChannels.map(channel => (
            <div key={channel.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="text-2xl">{channel.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700">{channel.name}</p>
                <p className="text-xs text-slate-400">Доска объявлений</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {channel.enabled ? (
                    <ToggleRight size={28} className="text-blue-600" />
                  ) : (
                    <ToggleLeft size={28} />
                  )}
                </button>
                <button
                  onClick={() => removeChannel(channel.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {boardChannels.length === 0 && (
            <p className="text-center text-slate-400 py-6">Нет подключённых досок объявлений</p>
          )}
        </div>
      </div>

      {/* Telegram Channels */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          💬 Telegram каналы и чаты
        </h2>
        <div className="space-y-3">
          {telegramChannels.map(channel => (
            <div key={channel.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="text-2xl">{channel.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700">{channel.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Users size={12} />
                  <span>{channel.subscribers?.toLocaleString() || 0} подписчиков</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {channel.enabled ? (
                    <ToggleRight size={28} className="text-blue-600" />
                  ) : (
                    <ToggleLeft size={28} />
                  )}
                </button>
                <button
                  onClick={() => removeChannel(channel.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {telegramChannels.length === 0 && (
            <p className="text-center text-slate-400 py-6">Нет подключённых Telegram каналов</p>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Добавить площадку</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Тип площадки</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewChannelType('board')}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      newChannelType === 'board' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    📋 Доска
                  </button>
                  <button
                    onClick={() => setNewChannelType('telegram')}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      newChannelType === 'telegram' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    💬 Telegram
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  {newChannelType === 'telegram' ? 'Ссылка на канал/чат' : 'Название площадки'}
                </label>
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder={newChannelType === 'telegram' ? '@channel_name' : 'Название'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={addChannel}
                className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
