package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// FindByEmail is the easiest way to check if a user exists during login and registration, additionally it will be the most unique identifier for users apart from their ID
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
