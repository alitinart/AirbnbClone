package com.alitinart.airbnb.services;

import com.alitinart.airbnb.JwtHandler;
import com.alitinart.airbnb.models.Listing;
import com.alitinart.airbnb.models.User;
import com.alitinart.airbnb.repositories.ListingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ListingService {
    private final ListingRepo listingRepo;

    @Autowired
    public ListingService(ListingRepo listingRepo) {
        this.listingRepo = listingRepo;
    }

    public void saveListing(Listing listing, String authToken)  {
        User user = new JwtHandler().decodeToken(authToken);

        if(listing.getAuthor() == null) {
            listing.setAuthor(user.getId());
            this.listingRepo.save(listing);
            return;
        }

        if(!Objects.equals(listing.getAuthor(), user.getId())) {
            throw new IllegalCallerException("Forbidden");
        }

        this.listingRepo.save(listing);
    }

    public List<Listing> getAllListings() {
        return this.listingRepo.findAll();
    }

    public Listing getListingById(String id) {
        Optional<Listing> listing = this.listingRepo.findById(id);
        if(listing.isEmpty()) {
            throw new IllegalStateException("No listing found with that id");
        }

        return listing.get();
    }

    public List<Listing> getListingsByAuthor(String authorId) {
        return this.listingRepo.findListingsByAuthor(authorId);
    }

        public void deleteListingById(String id, String authToken) {
            Optional<Listing> listing = this.listingRepo.findById(id);
        if(listing.isEmpty()) {
            throw new IllegalStateException("No listing found with that id");
        }

        User user = new JwtHandler().decodeToken(authToken);
        if(!Objects.equals(listing.get().getAuthor(), user.getId())) {
            throw new IllegalCallerException("Forbidden");
        }

        this.listingRepo.deleteById(id);
    }
}
