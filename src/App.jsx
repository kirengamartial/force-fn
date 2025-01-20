import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Receipt, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Tags
} from 'lucide-react';

import { apiService } from './api/ApiService';
import Card from './components/Card';
import Button from './components/Button';
import Modal from './components/Modal';
import TransactionForm from './components/forms/TransactionForm';
import AccountForm from './components/forms/AccountForm';
import CategoryForm from './components/forms/CategoryForm';
import BudgetForm from './components/forms/BudgetForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data functions
  // We need separate functions to fetch all items and individual items
const fetchAccounts = async () => {
  try {
    const response = await apiService.fetchWithAuth('/accounts');  // Fetch all accounts
    setAccounts(response);
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await apiService.fetchWithAuth('/categories');  // Fetch all categories
    setCategories(response);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const fetchTransactions = async () => {
  try {
    const response = await apiService.fetchWithAuth('/transactions');  // Fetch all transactions
    setTransactions(response);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  }
};

const fetchBudgets = async () => {
  try {
    const response = await apiService.fetchWithAuth('/budgets');  // Fetch all budgets
    setBudgets(response);
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
  }
};

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    fetchTransactions();
    fetchBudgets();
  }, []);

  // Form submission handlers
  const handleAccountSubmit = async (data) => {
    try {
      if (selectedItem) {
        await apiService.updateAccount(selectedItem.id, data);
      } else {
        await apiService.createAccount(data);
      }
      setShowAccountDialog(false);
      setSelectedItem(null);
      fetchAccounts();
    } catch (error) {
      console.error('Failed to save account:', error);
    }
  };

  const handleTransactionSubmit = async (data) => {
    try {
      if (selectedItem) {
        await apiService.updateTransaction(selectedItem.id, data);
      } else {
        await apiService.createTransaction(data.accountId, data);
      }
      setShowTransactionDialog(false);
      setSelectedItem(null);
      fetchTransactions();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleCategorySubmit = async (data) => {
    try {
      if (selectedItem) {
        await apiService.updateCategory(selectedItem.id, data);
      } else {
        await apiService.createCategory(data);
      }
      setShowCategoryDialog(false);
      setSelectedItem(null);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleBudgetSubmit = async (data) => {
    try {
      if (selectedItem) {
        await apiService.updateBudget(selectedItem.id, data);
      } else {
        await apiService.createBudget(data);
      }
      setShowBudgetDialog(false);
      setSelectedItem(null);
      fetchBudgets();
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      switch (type) {
        case 'account':
          await apiService.deleteAccount(id);
          fetchAccounts();
          break;
        case 'transaction':
          await apiService.deleteTransaction(id);
          fetchTransactions();
          break;
        case 'category':
          await apiService.deleteCategory(id);
          fetchCategories();
          break;
        case 'budget':
          await apiService.deleteBudget(id);
          fetchBudgets();
          break;
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  // Render functions for different tabs
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${accounts.reduce((sum, acc) => sum + Number(acc.balance), 0).toLocaleString()}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Spending</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${transactions
                  .filter(t => t.type === 'expense')
                  .reduce((sum, t) => sum + Number(t.amount), 0)
                  .toLocaleString()}
              </p>
            </div>
            <Receipt className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Income</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${transactions
                  .filter(t => t.type === 'income')
                  .reduce((sum, t) => sum + Number(t.amount), 0)
                  .toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Budgets</p>
              <p className="text-2xl font-semibold text-gray-900">{budgets.length}</p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <Button onClick={() => { setSelectedItem(null); setShowTransactionDialog(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2">Date</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Account</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="py-3">{transaction.description}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {transaction.type === 'expense' ? (
                        <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      ${Number(transaction.amount).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3">{categories.find(c => c.id === transaction.categoryId)?.name}</td>
                  <td className="py-3">{accounts.find(a => a.id === transaction.accountId)?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderAccounts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <Button onClick={() => { setSelectedItem(null); setShowAccountDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map(account => (
          <Card key={account.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-2xl font-semibold">${Number(account.balance).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedItem(account);
                    setShowAccountDialog(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => handleDelete('account', account.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Recent transactions</span>
              <span>
                {transactions.filter(t => t.accountId === account.id).length}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <Button onClick={() => { setSelectedItem(null); setShowTransactionDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2">Date</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Account</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="py-3">{transaction.description}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {transaction.type === 'expense' ? (
                        <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      ${Number(transaction.amount).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3">{categories.find(c => c.id === transaction.categoryId)?.name}</td>
                  <td className="py-3">{accounts.find(a => a.id === transaction.accountId)?.name}</td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          setSelectedItem(transaction);
                          setShowTransactionDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => handleDelete('transaction', transaction.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={() => { setSelectedItem(null); setShowCategoryDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <Card key={category.id}>
            <div className="flex justify-between items-start">
              <div className="flex items-center">
              <Tags className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedItem(category);
                    setShowCategoryDialog(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => handleDelete('category', category.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Transaction count</span>
                <span>{transactions.filter(t => t.categoryId === category.id).length}</span>
              </div>
              {budgets.find(b => b.categoryId === category.id) && (
                <div className="flex justify-between mt-1">
                  <span>Monthly budget</span>
                  <span>${Number(budgets.find(b => b.categoryId === category.id).amount).toLocaleString()}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBudgets = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Budgets</h2>
        <Button onClick={() => { setSelectedItem(null); setShowBudgetDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map(budget => {
          const categoryTransactions = transactions.filter(
            t => t.categoryId === budget.categoryId && t.type === 'expense'
          );
          const totalSpent = categoryTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
          const percentageUsed = (totalSpent / Number(budget.amount)) * 100;
          
          return (
            <Card key={budget.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{budget.name}</h3>
                  <p className="text-2xl font-semibold">
                    ${Number(budget.amount).toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal"> / month</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setSelectedItem(budget);
                      setShowBudgetDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => handleDelete('budget', budget.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Category</span>
                  <span>{categories.find(c => c.id === budget.categoryId)?.name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Spent this month</span>
                  <span>${totalSpent.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      percentageUsed > 100
                        ? 'bg-red-500'
                        : percentageUsed > 80
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 h-16">
            {['overview', 'accounts', 'transactions', 'categories', 'budgets'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'accounts' && renderAccounts()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'budgets' && renderBudgets()}

        {/* Modals */}
        <Modal
          isOpen={showAccountDialog}
          onClose={() => {
            setShowAccountDialog(false);
            setSelectedItem(null);
          }}
          title={selectedItem ? 'Edit Account' : 'New Account'}
        >
          <AccountForm
            account={selectedItem}
            onSubmit={handleAccountSubmit}
            onCancel={() => {
              setShowAccountDialog(false);
              setSelectedItem(null);
            }}
          />
        </Modal>

        <Modal
          isOpen={showTransactionDialog}
          onClose={() => {
            setShowTransactionDialog(false);
            setSelectedItem(null);
          }}
          title={selectedItem ? 'Edit Transaction' : 'New Transaction'}
        >
          <TransactionForm
            transaction={selectedItem}
            accounts={accounts}
            categories={categories}
            onSubmit={handleTransactionSubmit}
            onCancel={() => {
              setShowTransactionDialog(false);
              setSelectedItem(null);
            }}
          />
        </Modal>

        <Modal
          isOpen={showCategoryDialog}
          onClose={() => {
            setShowCategoryDialog(false);
            setSelectedItem(null);
          }}
          title={selectedItem ? 'Edit Category' : 'New Category'}
        >
          <CategoryForm
            category={selectedItem}
            onSubmit={handleCategorySubmit}
            onCancel={() => {
              setShowCategoryDialog(false);
              setSelectedItem(null);
            }}
          />
        </Modal>

        <Modal
          isOpen={showBudgetDialog}
          onClose={() => {
            setShowBudgetDialog(false);
            setSelectedItem(null);
          }}
          title={selectedItem ? 'Edit Budget' : 'New Budget'}
        >
          <BudgetForm
            budget={selectedItem}
            categories={categories}
            onSubmit={handleBudgetSubmit}
            onCancel={() => {
              setShowBudgetDialog(false);
              setSelectedItem(null);
            }}
          />
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;