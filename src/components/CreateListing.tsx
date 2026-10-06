import React, { useState } from 'react';
import { Camera, MapPin, Check, Send, Loader2 } from 'lucide-react';
import { channels } from '../data';

export const CreateListing: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResults, setPublishResults] = useState<{ id: string; status: string }[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    rooms: '1',
    address: '',
    type: 'sale' as 'sale' | 'rent',
    propertyType: 'apartment' as 'apartment' | 'house' | 'commercial',
    selectedChannels: channels.filter(c => c.enabled).map(c => c.id),
  });

  const toggleChannel = (channelId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedChannels: prev.selectedChannels.includes(channelId)
        ? prev.selectedChannels.filter(id => id !== channelId)
        : [...prev.selectedChannels, channelId]
    }));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const results = formData.selectedChannels.map(id => ({
        id,
        status: Math.random() > 0.1 ? 'success' : 'error'
      }));
      setPublishResults(results);
      setIsPublishing(false);
      setStep(3);
    }, 2500);
  };

  const boardChannels = channels.filter(c => c.type === 'board');
  const telegramChannels = channels.filter(c => c.type === 'telegram');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Создать объявление</h1>
        <p className="text-slate-400 mt-1">Заполните информацию и опубликуйте на выбранных площадках</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          {['Информация', 'Площадки', 'Результат'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${step > i + 1 ? 'bg-emerald-600 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}
              `}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${step === i + 1 ? 'text-blue-400 font-medium' : 'text-slate-500'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-5">
          <h2 className="text-lg font-semibold text-slate-100">Информация об объекте</h2>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Тип сделки</label>
            <div className="flex gap-3">
              {['sale', 'rent'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData(p => ({ ...p, type: t as any }))}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                    formData.type === t
                      ? 'bg-blue-600/15 border-blue-600 text-blue-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {t === 'sale' ? '🏷️ Продажа' : '🔑 Аренда'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Тип недвижимости</label>
            <div className="flex gap-3 flex-wrap">
              {[
                { value: 'apartment', label: '🏢 Квартира' },
                { value: 'house', label: '🏠 Дом' },
                { value: 'commercial', label: '🏪 Коммерция' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData(p => ({ ...p, propertyType: opt.value as any }))}
                  className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                    formData.propertyType === opt.value
                      ? 'bg-blue-600/15 border-blue-600 text-blue-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder="Например: 2-комн. квартира, 65 м²"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Подробное описание объекта..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                {formData.type === 'rent' ? 'Арендная плата (₽/мес)' : 'Цена (₽)'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                placeholder="12 500 000"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Площадь (м²)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData(p => ({ ...p, area: e.target.value }))}
                placeholder="65"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Комнаты</label>
              <select
                value={formData.rooms}
                onChange={(e) => setFormData(p => ({ ...p, rooms: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="0">Студия</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Адрес</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                placeholder="Город, улица, дом"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Фотографии</label>
            <div className="border-2 border-dashed border-slate-800 rounded-lg p-8 text-center hover:border-slate-700 hover:bg-slate-950/50 transition-colors cursor-pointer">
              <Camera size={32} className="mx-auto text-slate-600 mb-2" />
              <p className="text-sm text-slate-400">Нажмите или перетащите фотографии</p>
              <p className="text-xs text-slate-600 mt-1">PNG, JPG до 10 МБ</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Далее — Выбор площадок →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-5">
          <h2 className="text-lg font-semibold text-slate-100">Выберите площадки для публикации</h2>
          <p className="text-sm text-slate-400">Объявление будет опубликовано на всех выбранных площадках одновременно</p>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">📋 Доски объявлений</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boardChannels.map(channel => (
                <label
                  key={channel.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.selectedChannels.includes(channel.id)
                      ? 'bg-blue-600/15 border-blue-600'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                    className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900 bg-slate-800"
                  />
                  <span className="text-xl">{channel.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">{channel.name}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">💬 Telegram каналы и чаты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {telegramChannels.map(channel => (
                <label
                  key={channel.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.selectedChannels.includes(channel.id)
                      ? 'bg-blue-600/15 border-blue-600'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                    className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900 bg-slate-800"
                  />
                  <span className="text-xl">{channel.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">{channel.name}</p>
                    {channel.subscribers && (
                      <p className="text-xs text-slate-500">{channel.subscribers.toLocaleString()} подписчиков</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
            <p className="text-sm text-slate-400">
              Будет опубликовано на <span className="font-bold text-slate-200">{formData.selectedChannels.length}</span> площадках
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              ← Назад
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || formData.selectedChannels.length === 0}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPublishing ? (
                <><Loader2 size={18} className="animate-spin" /> Публикация...</>
              ) : (
                <><Send size={18} /> Опубликовать</>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-5">
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-white">Публикация завершена!</h2>
            <p className="text-slate-400 mt-1">Ваше объявление отправлено на выбранные площадки</p>
          </div>

          <div className="space-y-2">
            {publishResults.map((result) => {
              const channel = channels.find(c => c.id === result.id);
              return (
                <div key={result.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    result.status === 'success' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                  }`}>
                    {result.status === 'success' ? <Check size={14} /> : '✕'}
                  </div>
                  <span className="text-lg">{channel?.icon}</span>
                  <span className="text-sm font-medium text-slate-200 flex-1">{channel?.name}</span>
                  <span className={`text-xs font-medium ${result.status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.status === 'success' ? 'Опубликовано' : 'Ошибка'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => { setStep(1); setPublishResults([]); }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Создать ещё
            </button>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              К объявлениям
            </button>
          </div>
        </div>
      )}
    </div>
  );
};