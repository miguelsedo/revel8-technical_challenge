package com.revel8.fast_and_reckless_bank.model;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class Transfer {
    private final Long from;
    private final Long to;
    private final double amount;
    private final LocalDateTime timestamp;

    public Transfer(Long from, Long to, double amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
    }
}
