package com.example.demo.repositories;

import com.example.demo.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
// Optional is used to handle cases where a budget might not exist for a user, on the frontend we can check if the budget is present before displaying it
// This is mainly for redundancy, as the budget is created and checked on the frontend
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    Optional<Budget> findByUserId(Integer userId);
}
