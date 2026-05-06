// Blog
export interface Toc {
  id: string;
  level: number;
  text: string;
}

export interface Blog {
  id: string;
  markdown: string;
  tags: string[];
  tocs: string[];
  created_at?: string;
  updated_at?: string;
}

export interface BlogInput {
  markdown: string;
  tags: string[];
  tocs: Toc[];
}

// Image (server storage)
export interface Image {
  id: string;
  storage_key: string;
  url: string;
  status?: string;
}

// User
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

// HackMD — fields use snake_case matching API response
export interface HackmdNote {
  id: string;
  title: string;
  tags: string[];
  publish_link: string;
  last_changed_at: string;
}

export interface HackmdTag {
  id: string;
  name: string;
}

// Stock
export interface StockDayAll {
  stock_no: string;
  stock_name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  transaction_count: number;
}

export interface StockBuybackPeriod {
  stock_no: string;
  start_date: string;
  end_date: string;
}

export interface StockChange {
  id: string | number;
  stock_no: string;
  stock_name: string;
  status: string;
  start_date: string;
  start_price: number;
  end_date: string;
  end_price: number;
  change: number;
}

// Auth
export interface AuthUser {
  email: string;
  permissions: string[];
}

export interface Permission {
  id: number;
  resource: string;
  action: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: Permission[];
}

// Member
export interface Member {
  id: number;
  name: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface MemberDetail {
  id: number;
  name: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  providers: string[];
}

// Chat WebSocket messages
export interface ChatMessage {
  id?: number;
  message_type: string;
  content: string;
  from: string;
  to: string;
  created_at?: string;
}

// WS Notification
export type WsEventType = 'stock_completed' | 'stock_failed' | 'blog_created' | 'user_joined' | 'user_left';

export interface WsNotification {
  id: number;
  type: WsEventType;
  data: unknown;
}

export interface WsUserEventData {
  addr: string;
  user_email: string | null;
}

// Raw WS frame from stock notification server
export interface WsMessage {
  type: string;
  data: unknown;
}
