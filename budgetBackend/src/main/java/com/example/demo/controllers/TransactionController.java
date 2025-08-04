package com.example.demo.controllers;

import com.example.demo.models.Transaction;
import com.example.demo.models.User;
import com.example.demo.repositories.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Added CORS support for local development
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public List<Transaction> allByUser(@RequestParam Integer userId) {
        return transactionRepository.findAllByUserId(userId);
    }

    // stub in just enough User info for Hibernate to work
    // (we don't need the full User object here, just the ID)
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction, @RequestParam Integer userId) {
        User user = new User();
        user.setId(userId);
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Integer id, @RequestBody Transaction transaction,
            @RequestParam Integer userId) {
        // ensure the right ID and User gets set
        transaction.setId(id);
        User user = new User();
        user.setId(userId);
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Integer id) {
        transactionRepository.deleteById(id);
    }
}
