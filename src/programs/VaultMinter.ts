// Soroban Smart Contract Interface for AssetNest Vault Management
// This contract enables equitable finance through decentralized portfolio management

export interface VaultData {
  id: string;
  name: string;
  ticker: string;
  manager: string;
  totalValue: bigint;
  sharePrice: bigint;
  totalShares: bigint;
  adminFee: bigint; // in basis points (1/10000)
  performanceFee: bigint; // in basis points (1/10000)
  createdAt: bigint;
  isActive: boolean;
}

export interface InvestmentData {
  vaultId: string;
  investor: string;
  shares: bigint;
  investedAt: bigint;
  lastClaimedAt: bigint;
}

export interface SorobanVaultContract {
  // Vault Management
  createVault: (
    name: string,
    ticker: string,
    adminFee: bigint,
    performanceFee: bigint
  ) => Promise<string>;
  
  // Investment Operations
  investInVault: (
    vaultId: string,
    amount: bigint
  ) => Promise<bigint>;
  
  withdrawFromVault: (
    vaultId: string,
    shares: bigint
  ) => Promise<bigint>;
  
  // Vault Management
  updateVaultFees: (
    vaultId: string,
    adminFee: bigint,
    performanceFee: bigint
  ) => Promise<void>;
  
  pauseVault: (vaultId: string) => Promise<void>;
  resumeVault: (vaultId: string) => Promise<void>;
  
  // Data Queries
  getVaultData: (vaultId: string) => Promise<VaultData>;
  getInvestmentData: (vaultId: string, investor: string) => Promise<InvestmentData>;
  getVaultBalance: (vaultId: string) => Promise<bigint>;
  
  // Fee Collection
  collectAdminFees: (vaultId: string) => Promise<bigint>;
  collectPerformanceFees: (vaultId: string) => Promise<bigint>;
}

// Soroban Contract Addresses (Testnet)
export const SOROBAN_CONTRACTS = {
  VAULT_MANAGER: "CCXZ6NJ2QDX2XX2ACQN43X3XSNXQTLY2HX3RXKX64MJ4W2TQBM42Y3XG",
  TOKEN_WRAPPER: "CDLZFC3SJ5ZT7XDRGRM64XH5ALHJLNH2QK4QMT7E2XBF2J5XT4VK3XG",
  FEE_COLLECTOR: "CDLZFC3SJ5ZT7XDRGRM64XH5ALHJLNH2QK4QMT7E2XBF2J5XT4VK3XG"
};

// Soroban Network Configuration
export const SOROBAN_NETWORKS = {
  TESTNET: {
    networkPassphrase: "Test SDF Network ; September 2015",
    rpcUrl: "https://soroban-testnet.stellar.org",
    horizonUrl: "https://horizon-testnet.stellar.org"
  },
  MAINNET: {
    networkPassphrase: "Public Global Stellar Network ; September 2015",
    rpcUrl: "https://soroban-mainnet.stellar.org",
    horizonUrl: "https://horizon.stellar.org"
  }
};

// Contract ABI for Soroban
export const VAULT_CONTRACT_ABI = {
  name: "AssetNestVault",
  version: "1.0.0",
  functions: [
    {
      name: "create_vault",
      inputs: [
        { name: "name", type: "string" },
        { name: "ticker", type: "string" },
        { name: "admin_fee", type: "u32" },
        { name: "performance_fee", type: "u32" }
      ],
      outputs: [{ name: "vault_id", type: "string" }]
    },
    {
      name: "invest",
      inputs: [
        { name: "vault_id", type: "string" },
        { name: "amount", type: "i128" }
      ],
      outputs: [{ name: "shares", type: "i128" }]
    },
    {
      name: "withdraw",
      inputs: [
        { name: "vault_id", type: "string" },
        { name: "shares", type: "i128" }
      ],
      outputs: [{ name: "amount", type: "i128" }]
    },
    {
      name: "get_vault_data",
      inputs: [{ name: "vault_id", type: "string" }],
      outputs: [{ name: "vault_data", type: "VaultData" }]
    }
  ]
};