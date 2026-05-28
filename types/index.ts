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

export interface BlogPaginatedResponse {
  total: number;
  page: number;
  per_page: number;
  data: Blog[];
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
  id: number;
  trade_date: string;
  stock_code: string;
  stock_name: string;
  trade_volume: number | null;
  trade_amount: number | null;
  open_price: number | null;
  high_price: number | null;
  low_price: number | null;
  close_price: number | null;
  price_change: number | null;
  transaction_count: number | null;
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

export interface StockChangePaginatedResponse {
  data: StockChange[];
  total: number;
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

// WS online connection
export interface WsConnection {
  addr: string;
  user_email: string | null;
}

// Setting
export interface Setting {
  key: string;
  value: string;
  description: string;
}

// Audit Log
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface AuditLog {
  id: number;
  user_email: string;
  method: string;
  path: string;
  query: string | null;
  status_code: number;
  created_at: string;
}

// Log
export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface Log {
  id: number;
  level: LogLevel;
  message: string;
  target: string;
  file: string;
  line: number;
  created_at: string;
}
