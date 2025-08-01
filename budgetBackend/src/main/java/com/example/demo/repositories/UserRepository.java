package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // This interface will automatically provide CRUD operations for User entities
    // No additional methods are needed unless specific queries are required
}
