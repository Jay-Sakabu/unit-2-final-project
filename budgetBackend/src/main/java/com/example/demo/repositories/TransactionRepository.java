package com.example.demo.repositories;

import com.example.demo.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    // This interface will automatically provide CRUD operations for Transaction entities
    // No additional methods are needed unless specific queries are required
}
