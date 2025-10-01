import { useState } from 'react';
import './TransferForm.css';

export default function TransferForm({ accounts, onTransfer }) {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSpamming, setIsSpamming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransfer(parseInt(fromId), parseInt(toId), parseFloat(amount));
    setFromId('');
    setToId('');
    setAmount('');
  };

  const isDisabled = !fromId || !toId || !amount || fromId === toId;

  return (
    <section>
      <h2>Transfer Money</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <select value={fromId} onChange={(e) => setFromId(e.target.value)}>
          <option value="">From Account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              #{account.id} - {account.owner}
            </option>
          ))}
        </select>
        <select value={toId} onChange={(e) => setToId(e.target.value)}>
          <option value="">To Account</option>
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
        <button type="submit" disabled={isDisabled}>
          Transfer
        </button>
        <button 
          type="button" 
          onClick={async () => {
            setIsSpamming(true);
            for (let i = 0; i < 25; i++) {
              onTransfer(parseInt(fromId), parseInt(toId), parseFloat(amount));
              await new Promise(resolve => setTimeout(resolve, 50));
            }
            setIsSpamming(false);
          }}
          disabled={isDisabled || isSpamming}
          style={{backgroundColor: '#ff6b35', fontSize: '12px'}}
        >
          {isSpamming ? '🔄 Spamming...' : '🚀 SPAM 25x (for testing purposes)'}
        </button>
      </form>
    </section>
  );
}