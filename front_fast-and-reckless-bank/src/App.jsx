import { useState, useEffect } from 'react';
import { api } from './services/api';
import CreateAccountForm from './components/CreateAccountForm/CreateAccountForm';
import AccountsList from './components/AccountsList/AccountsList';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransferForm from './components/TransferForm/TransferForm';
import TransferHistory from './components/TransferHistory/TransferHistory';
import './App.css';

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadAccounts = () => {
    setLoading(true);
    api.getAllAccounts()
      .then(setAccounts)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadAccounts, []);

  const handleOperation = (operation, ...args) => {
    operation(...args)
      .then(() => {
        setError('');
        loadAccounts();
        setRefreshTrigger(prev => prev + 1);
      })
      .catch((error) => setError(error.message));
  };

  const toggleAccountSelection = (accountId) => {
    setSelectedAccountId(selectedAccountId === accountId ? null : accountId);
  };

  return (
    <div className="app">
      <h1>Fast & Reckless Bank</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="two-columns">
        <div className="left-column">
          <CreateAccountForm onCreateAccount={(owner, balance) => 
            handleOperation(api.createAccount, owner, balance)
          } />

          <TransactionForm 
            accounts={accounts}
            onDeposit={(id, amount) => handleOperation(api.deposit, id, amount)}
            onWithdraw={(id, amount) => handleOperation(api.withdraw, id, amount)}
          />

          <TransferForm 
            accounts={accounts}
            onTransfer={(fromId, toId, amount) => 
              handleOperation(api.transfer, fromId, toId, amount)
            }
          />
        </div>

        <div className="right-column">
          <AccountsList 
            accounts={accounts}
            loading={loading}
            onAccountSelect={toggleAccountSelection}
            selectedAccountId={selectedAccountId}
          />

          <TransferHistory 
            selectedAccountId={selectedAccountId}
            accounts={accounts}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
}
