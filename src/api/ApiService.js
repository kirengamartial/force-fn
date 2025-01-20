const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export  const apiService = {
    // Generic fetch wrapper with auth
    fetchWithAuth: async (endpoint, options = {}) => {
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      });
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    },
  
    // Account endpoints
    getAccount: (id) => apiService.fetchWithAuth(`/accounts/${id}`),
    createAccount: (data) => apiService.fetchWithAuth('/accounts', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateAccount: (id, data) => apiService.fetchWithAuth(`/accounts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    deleteAccount: (id) => apiService.fetchWithAuth(`/accounts/${id}`, {
      method: 'DELETE'
    }),
  
    // Category endpoints
    getCategory: (id) => apiService.fetchWithAuth(`/categories/${id}`),
    createCategory: (data) => apiService.fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateCategory: (id, data) => apiService.fetchWithAuth(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    deleteCategory: (id) => apiService.fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE'
    }),
  
    // Transaction endpoints
    getTransaction: (id) => apiService.fetchWithAuth(`/transactions/${id}`),
    createTransaction: (accountId, data) => apiService.fetchWithAuth(`/transactions/${accountId}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateTransaction: (id, data) => apiService.fetchWithAuth(`/transactions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    deleteTransaction: (id) => apiService.fetchWithAuth(`/transactions/${id}`, {
      method: 'DELETE'
    }),
  
    // Budget endpoints
    getBudget: (id) => apiService.fetchWithAuth(`/budgets/${id}`),
    createBudget: (data) => apiService.fetchWithAuth('/budgets', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateBudget: (id, data) => apiService.fetchWithAuth(`/budgets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    deleteBudget: (id) => apiService.fetchWithAuth(`/budgets/${id}`, {
      method: 'DELETE'
    })
  };