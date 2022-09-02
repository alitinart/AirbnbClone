package com.alitinart.airbnb.services;

import com.alitinart.airbnb.JwtHandler;
import com.alitinart.airbnb.models.User;
import com.alitinart.airbnb.repositories.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public String loginUser(User user) {
        Optional<User> isUser = this.userRepo.findUserByEmail(user.getEmail());

        if(isUser.isEmpty()) {
            throw new IllegalStateException("No user with that email");
        }

        if(!BCrypt.checkpw(user.getPassword(), isUser.get().getPassword())) {
            throw new IllegalArgumentException("Password is not correct");
        }

        try {
            JwtHandler generator = new JwtHandler();
            ObjectMapper mapObject = new ObjectMapper();
            Map hashedUser = mapObject.convertValue(isUser.get(), Map.class);

            return generator.generateJwt(hashedUser);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public void registerUser(User user) {
        Optional<User> isUser = this.userRepo.findUserByEmail(user.getEmail());

        if(isUser.isPresent()) {
            throw new IllegalArgumentException("There is already a user with that email");
        }

        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        User newUser = new User(user.getEmail(), user.getFullName(),  hashedPassword);

        this.userRepo.save(newUser);
    }

    public List<User> getAllUsers() {
        return this.userRepo.findAll();
    }

    public User getUserById(String id) {
        Optional<User> isUser = this.userRepo.findById(id);
        if(isUser.isEmpty()) {
            throw new IllegalStateException("No user found with that id");
        }

        return isUser.get();
    }

    public User getUserByEmail(String email) {
        Optional<User> isUser = this.userRepo.findUserByEmail(email);
        if(isUser.isEmpty()) {
            throw new IllegalStateException("No user found with that email");
        }

        return isUser.get();
    }

    public void deleteUserById(String id, String authToken) {
        Optional<User> isUser = this.userRepo.findById(id);
        if(isUser.isEmpty()) {
            throw new IllegalStateException("No user found with that id");
        }

        User user = new JwtHandler().decodeToken(authToken);;
        if(!Objects.equals(isUser.get().getId(), user.getId())) {
            throw new IllegalCallerException("Forbidden");
        }

        this.userRepo.delete(isUser.get());
    }


    public void deleteUserByEmail(String email, String authToken) {
        Optional<User> isUser = this.userRepo.findUserByEmail(email);
        if(isUser.isEmpty()) {
            throw new IllegalStateException("No user found with that email");
        }

        User user = new JwtHandler().decodeToken(authToken);;
        if(!Objects.equals(isUser.get().getId(), user.getId())) {
            throw new IllegalCallerException("Forbidden");
        }

        this.userRepo.delete(isUser.get());
    }

    public void updateUser(User updatedUser, String authToken) {
        User user = new JwtHandler().decodeToken(authToken);;
        if(!Objects.equals(updatedUser.getEmail(), user.getEmail())) {
            throw new IllegalCallerException("Forbidden");
        }

        this.userRepo.save(updatedUser);
    }
}
