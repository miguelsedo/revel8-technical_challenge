const BASE_URL = 'http://localhost:8080/api';

const request = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || `Request failed: ${response.status}`);
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        throw new Error(`Request failed: ${response.status}`);
      } else {
        throw parseError;
      }
    }
  }
  return response.text().then(text => text ? JSON.parse(text) : null);
};

export const api = {
  getAllAccounts: () => request('/accounts'),
  
  getAccount: (accountId) => request(`/accounts/${accountId}`),
  
  createAccount: (owner, initialBalance) => 
    request('/accounts', {
      method: 'POST',
      body: JSON.stringify({ owner, initialBalance })
    }),

  deposit: (accountId, amount) =>
    request(`/accounts/${accountId}/deposit`, {
      method: 'POST',
      body: JSON.stringify({ amount })
    }),

  withdraw: (accountId, amount) =>
    request(`/accounts/${accountId}/withdraw`, {
      method: 'POST',
      body: JSON.stringify({ amount })
    }),

  transfer: (fromId, toId, amount) =>
    request('/transfer', {
      method: 'POST',
      body: JSON.stringify({ fromId, toId, amount })
    }),

  getAccountTransfers: (accountId) => 
    request(`/accounts/${accountId}/transfers`)
};