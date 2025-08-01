package com.example.demo.repositories;

import com.example.demo.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    // This interface will automatically provide CRUD operations for Budget entities
    // No additional methods are needed unless specific queries are required
}
