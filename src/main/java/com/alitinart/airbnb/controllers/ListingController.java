package com.alitinart.airbnb.controllers;

import com.alitinart.airbnb.Response;
import com.alitinart.airbnb.models.Listing;
import com.alitinart.airbnb.services.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/listings")
@CrossOrigin()
public class ListingController {

    private final ListingService listingService;

    @Autowired
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
        public Response getAllListings() {
        List<Listing> listings = this.listingService.getAllListings();
        HashMap<String, List<Listing>> data = new HashMap<>();
        data.put("listings", listings);

        return new Response("All Listings", null, 200, data);
    }

    @GetMapping(path = "/author")
    public Response getAuthorListings(@RequestParam String authorId) {
        List<Listing> listings = this.listingService.getListingsByAuthor(authorId);
        HashMap<String, List<Listing>> data = new HashMap<>();
        data.put("listings", listings);

        return new Response("Author Listings", null, 200, data);
    }

    @GetMapping("/{id}")
    public Response getListingById(@PathVariable("id") String id) {
        Listing listing = this.listingService.getListingById(id);
        HashMap<String, Listing> data = new HashMap<>();
        data.put("listing", listing);

        return new Response("Listing Found", null, 200, data);
    }

    @PostMapping
    public Response createListing(@RequestBody Listing listing, @RequestHeader(value="Authorization") String authToken) {
        this.listingService.saveListing(listing,authToken);
        HashMap<String, Listing> data = new HashMap<>();
        data.put("listing", listing);

        return new Response("Listing Saved", null, 200, data);
    }

    @PatchMapping
    public Response updateListing(@RequestBody Listing listing, @RequestHeader(value="Authorization") String authToken) {
        this.listingService.saveListing(listing, authToken);
        HashMap<String, Listing> data = new HashMap<>();
        data.put("listing", listing);

        return new Response("Listing Updated", null, 200, data);
    }

    @DeleteMapping(path = "/{id}")
    public Response deleteListing(@PathVariable("id") String id, @RequestHeader(value="Authorization") String authToken) {
        this.listingService.deleteListingById(id, authToken);

        return new Response("Listing Deleted", null, 200, null);
    }
}
