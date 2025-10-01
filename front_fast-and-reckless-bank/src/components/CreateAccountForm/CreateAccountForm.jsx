import { useState } from 'react';
import './CreateAccountForm.css';

export default function CreateAccountForm({ onCreateAccount }) {
  const [owner, setOwner] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAccount(owner, parseFloat(balance));
    setOwner('');
    setBalance('');
  };

  return (
    <section>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Owner name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
        <input
          type="number"
          step="1"
          placeholder="Initial balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </section>
  );
}