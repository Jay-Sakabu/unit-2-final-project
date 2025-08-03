package com.example.demo.controllers;

import com.example.demo.models.Transaction;
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

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Integer id, @RequestBody Transaction transaction) {
        transaction.setId(id);
        return transactionRepository.save(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Integer id) {
        transactionRepository.deleteById(id);
    }
}
