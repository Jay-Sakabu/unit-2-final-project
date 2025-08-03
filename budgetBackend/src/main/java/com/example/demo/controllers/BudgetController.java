package com.example.demo.controllers;

import com.example.demo.models.Budget;
import com.example.demo.repositories.BudgetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Added CORS support for local development
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/budget")
public class BudgetController {
    private final BudgetRepository budgetRepository;

    public BudgetController(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    //GET endpoint to retrieve the budget for a specific user
    @GetMapping("/budget")
    public ResponseEntity<Budget> getBudget(@RequestParam Integer userId) {
        return budgetRepository.findByUserId(userId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    // POST endpoint to set or update the budget for a specific user
    // If the budget already exists for the user, it will be updated; otherwise, a new budget will be created
    @PostMapping("/budget")
    public Budget setBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }

    // NO DELETE endpoint, as budgets are not typically deleted but rather updated or reset
}


