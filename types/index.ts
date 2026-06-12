// Portfolio
export interface HistoryRecord {
  date: string;
  close: number;
  adjusted_cost: number;
  pnl: number;
  pnl_pct: number;
}

export interface PortfolioEntry {
  id: string;
  member_id: number;
  stock_code: string;
  buy_date: string;
  cost_per_share: number;
  shares: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioEntryInput {
  stock_code: string;
  buy_date: string;
  cost_per_share: number;
  shares: number;
}

export interface PortfolioSummaryEntry extends PortfolioEntry {
  stock_name: string;
  current_price: number | null;
  current_value: number | null;
  pnl: number | null;
  pnl_pct: number | null;
}

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

// Torrent
export type TorrentStatus = 'pending' | 'downloading' | 'completed' | 'failed';

export interface TorrentFile {
  index: number;
  path: string;
  size: number;
}

// 即時進度（不存 DB，僅進行中任務的詳情 API 與 WS 推播帶）
export interface TorrentLive {
  progress: number;
  progress_bytes: number;
  total_bytes: number;
  down_speed: string;
  peers: number;
}

export interface Torrent {
  id: number;
  info_hash: string;
  magnet_uri: string;
  name: string | null;
  status: TorrentStatus;
  total_size: number | null;
  files: TorrentFile[] | null;
  error: string | null;
  created_by: string;
  created_at: string;
  completed_at: string | null;
  live?: TorrentLive;
}

export interface TorrentPaginatedResponse {
  data: Torrent[];
  total: number;
}

export interface TorrentDownloadLink {
  file_index: number;
  path: string;
  size: number;
  url: string;
  expires_at: string;
}

export interface TorrentProgressEvent extends TorrentLive {
  id: number;
  name: string;
}

export interface TorrentCompletedEvent {
  id: number;
  name: string;
  total_size: number;
}

export interface TorrentFailedEvent {
  id: number;
  name: string;
  reason: string;
}

// Setting
export interface Setting {
  key: string;
  value: string;
  description: string;
  category: string;
}

export type SettingsResponse = Record<string, Setting[]>;

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
