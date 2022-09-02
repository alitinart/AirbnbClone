package com.alitinart.airbnb.repositories;

import com.alitinart.airbnb.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    @Query("{email:'?0'}")
    Optional<User> findUserByEmail(String email);
}
