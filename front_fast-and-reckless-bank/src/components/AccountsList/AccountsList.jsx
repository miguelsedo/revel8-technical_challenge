import './AccountsList.css';

export default function AccountsList({ accounts, loading, onAccountSelect, selectedAccountId }) {
  if (loading) return <section><h2>Accounts</h2><p>Loading...</p></section>;

  return (
    <section>
      <h2>Accounts</h2>
      <div className="accounts">
        {accounts.map(account => (
          <div 
            key={account.id} 
            className={`account ${selectedAccountId === account.id ? 'selected' : ''}`}
            onClick={() => onAccountSelect(account.id)}
          >
            <h3>#{account.id}</h3>
            <p>{account.owner}</p>
            <p>${account.balance.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}