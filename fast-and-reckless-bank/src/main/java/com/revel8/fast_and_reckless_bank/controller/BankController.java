package com.revel8.fast_and_reckless_bank.controller;

import com.revel8.fast_and_reckless_bank.model.Account;
import com.revel8.fast_and_reckless_bank.model.Transfer;
import com.revel8.fast_and_reckless_bank.service.BankService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class BankController {

    private final BankService bankService;

    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @PostMapping("/accounts")
    public Map<String, Long> createAccount(@RequestBody Map<String, Object> request) {
        try {
            String owner = (String) request.get("owner");
            double initialBalance = ((Number) request.get("initialBalance")).doubleValue();

            var account = bankService.createAccount(owner, initialBalance);

            return Map.of("id", account.getId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request: " + e.getMessage());
        }
    }

    @GetMapping("/accounts")
    public Collection<Account> getAllAccounts() {
        return bankService.getAllAccounts();
    }

    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable long id) {
        Account account = bankService.getAccount(id);
        if (account == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found");
        }
        return account;
    }

    @PostMapping("/accounts/{id}/deposit")
    public void deposit(@PathVariable long id, @RequestBody Map<String, Object> request) {
        try {
            double amount = ((Number) request.get("amount")).doubleValue();
            bankService.deposit(id, amount);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request: " + e.getMessage());
        }
    }

    @PostMapping("/accounts/{id}/withdraw")
    public void withdraw(@PathVariable long id, @RequestBody Map<String, Object> request) {
        try {
            double amount = ((Number) request.get("amount")).doubleValue();
            bankService.withdraw(id, amount);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request: " + e.getMessage());
        }
    }

    @PostMapping("/transfer")
    public void transfer(@RequestBody Map<String, Object> request) {
        try {
            long fromId = ((Number) request.get("fromId")).longValue();
            long toId = ((Number) request.get("toId")).longValue();
            double amount = ((Number) request.get("amount")).doubleValue();

            bankService.transfer(fromId, toId, amount);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request: " + e.getMessage());
        }
    }

    @GetMapping("/accounts/{id}/transfers")
    public List<Transfer> getAccountTransfers(@PathVariable long id) {
        Account account = bankService.getAccount(id);
        if (account == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found");
        }
        return account.getLastOutgoing();
    }
}