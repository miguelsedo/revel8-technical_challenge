import { useState } from 'react';
import './TransactionForm.css';

export default function TransactionForm({ accounts, onDeposit, onWithdraw }) {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransaction = (fn) => {
    fn(parseInt(accountId), parseFloat(amount));
    setAmount('');
    setAccountId('');
  };

  const isDisabled = !accountId || !amount;

  return (
    <section>
      <h2>Deposit/Withdraw</h2>
      <div className="form-row">
        <select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
          <option value="">Select Account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              #{account.id} - {account.owner}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => handleTransaction(onDeposit)} disabled={isDisabled}>
          Deposit
        </button>
        <button onClick={() => handleTransaction(onWithdraw)} disabled={isDisabled}>
          Withdraw
        </button>
      </div>
    </section>
  );
}