package com.alitinart.airbnb.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

@Data @Document("users") @NoArgsConstructor @AllArgsConstructor @Validated
public class User {
    @Id
    private String id;

    private String email;
    private String fullName;
    private String password;

    public User(String email, String fullName, String password) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
