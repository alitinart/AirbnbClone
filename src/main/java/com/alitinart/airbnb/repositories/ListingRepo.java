package com.alitinart.airbnb.repositories;

import com.alitinart.airbnb.models.Listing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ListingRepo extends MongoRepository<Listing, String> {

    @Query("{author: '?0'}")
    List<Listing> findListingsByAuthor(String author);
}
