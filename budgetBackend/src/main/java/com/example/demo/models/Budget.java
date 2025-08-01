package com.example.demo.models;

import jakarta.persistence.*;

@Entity
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
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
