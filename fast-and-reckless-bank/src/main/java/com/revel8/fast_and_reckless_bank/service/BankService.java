package com.revel8.fast_and_reckless_bank.service;

import com.revel8.fast_and_reckless_bank.model.Account;
import com.revel8.fast_and_reckless_bank.model.Transfer;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class BankService {

    private final Map<Long, Account> accounts = new ConcurrentHashMap<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public Account createAccount(String owner, double initialBalance) {
        long id = nextId.getAndIncrement();
        Account account = new Account(id, owner, initialBalance);
        accounts.put(id, account);
        return account;
    }

    public Account getAccount(long id) {
        return accounts.get(id);
    }

    public Collection<Account> getAllAccounts() {
        return accounts.values();
    }

    public Account deposit(long accountId, double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive");
        Account account = accounts.get(accountId);
        if (account == null) throw new IllegalArgumentException("Account not found");

        account.setBalance(account.getBalance() + amount);
        return account;
    }

    public Account withdraw(long accountId, double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Withdrawal must be positive");
        Account account = accounts.get(accountId);
        if (account == null) throw new IllegalArgumentException("Account not found");
        if (account.getBalance() < amount) throw new IllegalArgumentException("Insufficient funds");

        account.setBalance(account.getBalance() - amount);
        return account;
    }

    public void transfer(long fromId, long toId, double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Transfer must be positive");

        Account from = accounts.get(fromId);
        Account to = accounts.get(toId);

        if (from == null || to == null) throw new IllegalArgumentException("Account not found");
        if (from.getBalance() < amount) throw new IllegalArgumentException("Insufficient funds");

        // Update balances
        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        Transfer trans = new Transfer(fromId, toId, amount);
        from.newOutgoingTransfer(trans);
    }
}
