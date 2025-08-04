package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

/*
*           This controller handles user registration and login.
*           Passwords are hashed using BCrypt before being stored in the database.
*           On login, the provided password is compared against the stored hash.
*           On the frontend, the user object is stored in localStorage to maintain session state, in a future iteration
*           That will be changed to using JWTs or sessions for better security.
*/


// Added CORS support for local development
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  // Injected for password encoding

    public UserController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Duplicates aren't strictly prohibited, but handle them to avoid collisions
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User incoming) {
        if (userRepository.findByEmail(incoming.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already in use");
        }
        incoming.setPassword(passwordEncoder.encode(incoming.getPassword()));
        User saved = userRepository.save(incoming);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        Optional<User> opt = userRepository.findByEmail(creds.get("email"));
        if (opt.isPresent() &&
                passwordEncoder.matches(creds.get("password"), opt.get().getPassword())) {
            return ResponseEntity.ok(opt.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }
}