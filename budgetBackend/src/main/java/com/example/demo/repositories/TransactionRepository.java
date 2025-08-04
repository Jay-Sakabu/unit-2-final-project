package com.example.demo.repositories;

import com.example.demo.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// The FindByUserId method is used to get all transactions for a specific user. On the frontend we only ever want to show transactions for the logged-in user
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findAllByUserId(Integer userId);
}
