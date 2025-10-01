import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './TransferHistory.css';

export default function TransferHistory({ selectedAccountId, accounts, refreshTrigger }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOwner = (id) => accounts.find(acc => acc.id === id)?.owner || `#${id}`;

  useEffect(() => {
    if (!selectedAccountId) return;
    
    setLoading(true);
    api.getAccount(selectedAccountId)
      .then(account => setTransfers(account.lastOutgoing || []))
      .catch(() => setTransfers([]))
      .finally(() => setLoading(false));
  }, [selectedAccountId, refreshTrigger]);

  if (!selectedAccountId) {
    return (
      <section>
        <h2>Transfer History</h2>
        <div>
          <p>Click on any account above to view its transfer history</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>History - Account #{selectedAccountId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transfers.length === 0 ? (
        <p>No transfers yet</p>
      ) : (
        <div className="transfers">
          {transfers.filter(t => t && t.amount !== undefined && t.to !== undefined).map((t, i) => (
            <div key={i} className="transfer">
              <div>
                <span className="transfer-number">#{i + 1}</span>
                <strong>${t.amount.toFixed(2)}</strong>
                <span> to {getOwner(t.to)}</span>
              </div>
              <small>{new Date(t.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}