package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //https://stackoverflow.com/questions/67353793/what-does-jsonignorepropertieshibernatelazyinitializer-handler-do
    // This annotation is used to ignore properties that will cause issues with serialization, particularly with lazy loading in Hibernate.
    @JsonIgnoreProperties({
            "transactionList", "password", "hibernateLazyInitializer", "handler"
    })
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_budget_user"))
    private User user;

    @Column(name = "needs_value")
    private double needsValue;

    @Column(name = "wants_value")
    private double wantsValue;

    @Column(name = "savings_value")
    private double savingsValue;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getNeedsValue() {
        return needsValue;
    }

    public void setNeedsValue(double needsValue) {
        this.needsValue = needsValue;
    }

    public double getWantsValue() {
        return wantsValue;
    }

    public void setWantsValue(double wantsValue) {
        this.wantsValue = wantsValue;
    }

    public double getSavingsValue() {
        return savingsValue;
    }

    public void setSavingsValue(double savingsValue) {
        this.savingsValue = savingsValue;
    }
}
