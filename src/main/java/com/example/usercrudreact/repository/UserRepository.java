package com.example.usercrudreact.repository;

import com.example.usercrudreact.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
