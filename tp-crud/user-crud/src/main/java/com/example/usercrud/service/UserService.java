package com.example.usercrud.service;

import com.example.usercrud.model.User;
import com.example.usercrud.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> findAll() {
        return repo.findAll();
    }

    public User findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User create(User u) {
        return repo.save(u);
    }

    public User update(Long id, User u) {
        User existing = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existing.setNom(u.getNom());
        existing.setEmail(u.getEmail());
        existing.setAge(u.getAge());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
