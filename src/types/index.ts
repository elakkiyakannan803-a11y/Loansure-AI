export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  employmentType: string;
  monthlyIncome: number;
  loanPreference: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface EligibilityResult {
  estimatedAmount: number;
  interestRateMin: number;
  interestRateMax: number;
  estimatedEMI: number;
  suggestedTenure: number;
  status: 'Potentially Eligible' | 'Eligible' | 'Not Eligible' | 'Review Required';
  factors: { label: string; status: 'positive' | 'warning' | 'negative'; detail: string }[];
}

export interface BankBranch {
  id: string;
  bankName: string;
  branchName: string;
  category: 'Banks' | 'NBFCs' | 'Financial Institutions';
  address: string;
  city: string;
  distance: number;
  loanTypes: string[];
  interestRateMin: number;
  interestRateMax: number;
  eligibilitySummary: string;
  openingHours: string;
  phone: string;
}

export interface LoanScheme {
  id: string;
  name: string;
  category: string;
  purpose: string;
  eligibleUsers: string;
  loanRangeMin: number;
  loanRangeMax: number;
  interestRate: string;
  requiredDocuments: string[];
  eligibilityCriteria: string[];
}

export interface LoanApplication {
  id: string;
  loanType: string;
  lender: string;
  requestedAmount: number;
  applicationDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Documents Required' | 'Approved' | 'Rejected';
  tenure: number;
  interestRate: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  required: boolean;
  uploaded: boolean;
  uploadDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}
