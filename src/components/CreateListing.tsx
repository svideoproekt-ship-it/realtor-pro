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
    // Simulate publishing
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
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Создать объявление</h1>
        <p className="text-slate-500 mt-1">Заполните информацию и опубликуйте на выбранных площадках</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          {['Информация', 'Площадки', 'Результат'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}
              `}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${step === i + 1 ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Property Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">Информация об объекте</h2>

          {/* Type selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Тип сделки</label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormData(p => ({ ...p, type: 'sale' }))}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  formData.type === 'sale'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                🏷️ Продажа
              </button>
              <button
                onClick={() => setFormData(p => ({ ...p, type: 'rent' }))}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  formData.type === 'rent'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                🔑 Аренда
              </button>
            </div>
          </div>

          {/* Property type */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Тип недвижимости</label>
            <div className="flex gap-3 flex-wrap">
              {[
                { value: 'apartment', label: '🏢 Квартира' },
                { value: 'house', label: '🏠 Дом' },
                { value: 'commercial', label: '🏪 Коммерция' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFormData(p => ({ ...p, propertyType: opt.value as any }))}
                  className={`py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.propertyType === opt.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder="Например: 2-комн. квартира, 65 м²"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Подробное описание объекта..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Price, Area, Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                {formData.type === 'rent' ? 'Арендная плата (₽/мес)' : 'Цена (₽)'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                placeholder="12 500 000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Площадь (м²)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData(p => ({ ...p, area: e.target.value }))}
                placeholder="65"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Комнаты</label>
              <select
                value={formData.rooms}
                onChange={(e) => setFormData(p => ({ ...p, rooms: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="0">Студия</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Адрес</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                placeholder="Город, улица, дом"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Фотографии</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <Camera size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm text-slate-500">Нажмите или перетащите фотографии</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG до 10 МБ</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Далее — Выбор площадок →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Channel Selection */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">Выберите площадки для публикации</h2>
          <p className="text-sm text-slate-500">Объявление будет опубликовано на всех выбранных площадках одновременно</p>

          {/* Boards */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              📋 Доски объявлений
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boardChannels.map(channel => (
                <label
                  key={channel.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedChannels.includes(channel.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xl">{channel.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{channel.name}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Telegram */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              💬 Telegram каналы и чаты
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {telegramChannels.map(channel => (
                <label
                  key={channel.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedChannels.includes(channel.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xl">{channel.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{channel.name}</p>
                    {channel.subscribers && (
                      <p className="text-xs text-slate-400">{channel.subscribers.toLocaleString()} подписчиков</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-600">
              Будет опубликовано на <span className="font-bold text-slate-800">{formData.selectedChannels.length}</span> площадках
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
            >
              ← Назад
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || formData.selectedChannels.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPublishing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Публикация...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Опубликовать
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-slate-800">Публикация завершена!</h2>
            <p className="text-slate-500 mt-1">Ваше объявление отправлено на выбранные площадки</p>
          </div>

          <div className="space-y-2">
            {publishResults.map((result) => {
              const channel = channels.find(c => c.id === result.id);
              return (
                <div key={result.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    result.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {result.status === 'success' ? <Check size={14} /> : '✕'}
                  </div>
                  <span className="text-lg">{channel?.icon}</span>
                  <span className="text-sm font-medium text-slate-700 flex-1">{channel?.name}</span>
                  <span className={`text-xs font-medium ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {result.status === 'success' ? 'Опубликовано' : 'Ошибка'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => { setStep(1); setPublishResults([]); }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Создать ещё
            </button>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
            >
              К объявлениям
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
