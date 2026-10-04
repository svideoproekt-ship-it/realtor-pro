export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  address: string;
  images: string[];
  type: 'sale' | 'rent';
  propertyType: 'apartment' | 'house' | 'commercial';
  status: 'draft' | 'published' | 'archived';
  channels: Channel[];
  createdAt: string;
  views: number;
  contacts: number;
}

export interface Channel {
  id: string;
  name: string;
  type: 'board' | 'telegram';
  icon: string;
  color: string;
  subscribers?: number;
  enabled: boolean;
}

export interface PublishResult {
  channelId: string;
  status: 'success' | 'pending' | 'error';
  message: string;
  timestamp: string;
}