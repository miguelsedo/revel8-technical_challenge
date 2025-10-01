package com.revel8.fast_and_reckless_bank.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Account {
    private final long id;
    private final String owner;
    private double balance;
    private final List<Transfer> lastOutgoing = new ArrayList<>();

    public Account(long id, String owner, double balance) {
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }

    public void newOutgoingTransfer(Transfer t) {
        lastOutgoing.add(t);
        if (lastOutgoing.size() > 50) {
            lastOutgoing.remove(0);
        }
    }
}
