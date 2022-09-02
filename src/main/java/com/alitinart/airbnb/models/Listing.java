package com.alitinart.airbnb.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.List;

@Data @Document("listings") @NoArgsConstructor @AllArgsConstructor @Validated
public class Listing {
    @Id
    private String id;

    private String title;
    private Number price;
    private List<Number> ratings;
    private String location;
    private String availableDates;
    private String description;
    private String author;
    private HashMap<String, Number> rooms;
    private List<String> tags;

    public Listing(String title, Number price, List<Number> ratings, String location, String availableDates, String description, String author, HashMap<String, Number> rooms, List<String> tags) {
        this.title = title;
        this.price = price;
        this.ratings = ratings;
        this.location = location;
        this.availableDates = availableDates;
        this.description = description;
        this.author = author;
        this.rooms = rooms;
        this.tags = tags;
    }
}
