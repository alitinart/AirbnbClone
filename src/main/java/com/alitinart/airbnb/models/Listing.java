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

    private String locationName;
    private Number price;
    private List<Number> ratings;
    private String availableDates;
    private String description;
    private String author;
    private List<String> images;
    private HashMap<String, Number> rooms;
//    private List<String> tags;

    public Listing(String locationName, Number price, List<Number> ratings, String availableDates, String description, String author, HashMap<String, Number> rooms
//            , List<String> tags
    ) {
        this.locationName = locationName;
        this.price = price;
        this.ratings = ratings;
        this.availableDates = availableDates;
        this.description = description;
        this.author = author;
        this.rooms = rooms;
//        this.tags = tags;
    }

}
