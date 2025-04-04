export interface Transaction {
  id: number;
  coin_id: number;
  amount: number;
  transaction_date: string;
  seller_id: number | null;
  seller_name: string | null;
  buyer_id: number;
  buyer_name: string;
  bit1: number;
  bit2: number;
  bit3: number;
  value: number;
  computedBitSlow: string;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

export interface ValueRangeFilter {
  min: number;
  max: number;
}

export interface Coin {
  coin_id: number;
  hash: string;
  value: number;
  bit1: number;
  bit2: number;
  bit3: number;
  owner_name?: string | null;
  client_id?: number | null;
}

export interface CoinsTableProps {
  coins: Coin[];
  onBuySuccess: () => void;
  currentUserName?: string;
  updateCoin: (updatedCoin: Coin) => void;
}

export interface TransactionTableRowProps {
  transaction: Transaction;
  isLast: boolean;
}

export interface TransactionFiltersProps {
  dateRangeFilter: DateRangeFilter;
  setDateRangeFilter: (filter: DateRangeFilter) => void;
  valueRangeFilter: ValueRangeFilter;
  setValueRangeFilter: (filter: ValueRangeFilter) => void;
  buyerNameFilter: string;
  setBuyerNameFilter: (filter: string) => void;
  sellerNameFilter: string;
  setSellerNameFilter: (filter: string) => void;
}

export interface PaginationProps {
  itemsPerPage: number;
  setItemsPerPage?: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
}

export interface LoadingIndicatorProps {
  loadingTime: number;
}

export interface GenerateCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (value: number) => Promise<void>;
}

export interface ErrorDisplayProps {
  error: Error;
}

export interface CoinHistoryModalProps {
  coinId: number;
  onClose: () => void;
}

export interface CoinFiltersProps {
  filter: "all" | "available" | "owned";
  setFilter: (filter: "all" | "available" | "owned") => void;
  currentUserId?: number;
}

export interface UseRegisterPageProps {
  setError: (name: string, error: { type: string; message: string }) => void;
}

export interface UseRegisterPageResult {
  isSubmitting: boolean;
  serverError: string;
  handleRegister: (data: any) => Promise<void>;
}

export interface ProfileData {
  name: string;
  transactions: number;
  coinsOwned: number;
  totalValue: number;
}

export interface UseMarketplacePageProps {
  refreshCoins: () => Promise<void>;
  addCoin?: (newCoin: Coin) => void;
}

export interface UseMarketplacePageResult {
  showGenerateModal: boolean;
  setShowGenerateModal: React.Dispatch<React.SetStateAction<boolean>>;
  remainingCombinations: number;
  setRemainingCombinations: React.Dispatch<React.SetStateAction<number>>;
  handleGenerate: (value: number) => Promise<void>;
}

export interface UseLogoutResult {
  logout: () => Promise<void>;
}

export interface UseLoginPageResult {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: (data: { email: string; password: string }) => Promise<void>;
}

export interface UseCoinsTableProps {
  coins: Coin[];
  onBuySuccess: (updatedCoins?: Coin[]) => void;
  currentUserName?: string;
  updateCoin: (updatedCoin: Coin) => void;
  refreshCoins?: () => void; // Add this

}

export interface UseCoinsTableResult {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  filter: "all" | "available" | "owned";
  setFilter: (newFilter: "all" | "available" | "owned") => void; // Modified line
  selectedCoinId: number | null;
  setSelectedCoinId: React.Dispatch<React.SetStateAction<number | null>>;
  handleBuy: (coinId: number) => Promise<void>;
  totalPages: number;
  paginatedCoins: Coin[];
  filteredCoins: Coin[];
}

export interface TransactionHistory {
  id: number;
  buyer_name: string;
  seller_name?: string;
  transaction_date: string;
  amount: number;
}
