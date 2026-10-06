import React, { useState } from 'react';
import { Search, MoreVertical, Eye, MessageSquare, ExternalLink, Archive } from 'lucide-react';
import { listings as initialListings } from '../data';
import { Listing } from '../types';

export const Listings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredListings = initialListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    const matchesType = filterType === 'all' || listing.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: Listing['status']) => {
    switch (status) {
      case 'published': return <span className="px-2.5 py-1 text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-md">Опубликовано</span>;
      case 'draft': return <span className="px-2.5 py-1 text-xs font-medium bg-amber-950 text-amber-400 border border-amber-800 rounded-md">Черновик</span>;
      case 'archived': return <span className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 rounded-md">Архив</span>;
    }
  };

  const getTypeLabel = (type: Listing['type']) => type === 'sale' ? 'Продажа' : 'Аренда';

  const formatPrice = (price: number, type: string) => {
    const formatted = price.toLocaleString('ru-RU');
    return type === 'rent' ? `${formatted} ₽/мес` : `${formatted} ₽`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Объявления</h1>
          <p className="text-slate-400 mt-1">Управление вашими объектами недвижимости</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
          + Создать объявление
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Поиск по названию или адресу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="all">Все статусы</option>
              <option value="published">Опубликовано</option>
              <option value="draft">Черновик</option>
              <option value="archived">Архив</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="all">Все типы</option>
              <option value="sale">Продажа</option>
              <option value="rent">Аренда</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${listing.type === 'sale' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-purple-950 text-purple-400 border border-purple-800'}`}>
                    {getTypeLabel(listing.type)}
                  </span>
                  {getStatusBadge(listing.status)}
                </div>
                <h3 className="text-base font-semibold text-slate-100 truncate">{listing.title}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{listing.address}</p>
              </div>
              <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3 text-sm">
              <span className="text-slate-400">{listing.area} м²</span>
              {listing.rooms > 0 && <span className="text-slate-400">{listing.rooms} комн.</span>}
              <span className="text-lg font-bold text-white">{formatPrice(listing.price, listing.type)}</span>
            </div>

            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{listing.description}</p>

            <div className="flex items-center gap-1.5 mb-4 flex-wrap">
              {listing.channels.map((channel) => (
                <span key={channel.id} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-400">
                  {channel.icon} {channel.name.split(':')[0].trim()}
                </span>
              ))}
              {listing.channels.length === 0 && (
                <span className="text-xs text-slate-600 italic">Не опубликовано</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Eye size={14} /> {listing.views}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MessageSquare size={14} /> {listing.contacts}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-950/50 rounded-lg transition-colors" title="Просмотр">
                  <ExternalLink size={16} />
                </button>
                <button className="p-2 text-slate-500 hover:text-amber-400 hover:bg-amber-950/50 rounded-lg transition-colors" title="Архивировать">
                  <Archive size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-xl border border-slate-800 border-dashed">
          <div className="text-4xl mb-3 opacity-50">🏠</div>
          <p className="text-slate-300 font-medium">Объявления не найдены</p>
          <p className="text-sm text-slate-500 mt-1">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
};