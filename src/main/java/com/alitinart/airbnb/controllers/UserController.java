package com.alitinart.airbnb.controllers;

import com.alitinart.airbnb.Response;
import com.alitinart.airbnb.models.User;
import com.alitinart.airbnb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin()
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/login")
    private Response loginUser(@RequestBody User user) {
        String token = this.userService.loginUser(user);

        HashMap<String, String> data = new HashMap<>();
        data.put("token", token);

        return new Response("User Logged In", null, 200, data);
    }

    @PostMapping(path = "/register")
    private Response registerUser(@RequestBody User user) {
        this.userService.registerUser(user);
        return new Response("User Registered", null, 200, null);
    }

    @GetMapping
    private Response getAllUsers() {
        List<User> users = this.userService.getAllUsers();
        HashMap<String, List<User>> data = new HashMap<>();
        data.put("users", users);

        return new Response("All Users", null, 200, data);
    }

    @GetMapping(path = "/{id}")
    private Response getUserById(@PathVariable("id") String userId) {
        User user = this.userService.getUserById(userId);
        HashMap<String, User> data = new HashMap<>();
        data.put("user", user);

        return new Response("User Found", null, 200, data);
    }

    @GetMapping(path = "/email")
    private Response getUserByEmail(@RequestParam("email") String email) {
        User user = this.userService.getUserByEmail(email);
        HashMap<String, User> data = new HashMap<>();
        data.put("user", user);

        return new Response("User Found", null, 200, data);
    }

    @DeleteMapping(path = "/{id}")
    private Response deleteUserById(@PathVariable("id") String userId, @RequestHeader("Authorization") String authToken) {
        this.userService.deleteUserById(userId, authToken);

        return new Response("User Deleted", null, 200, null);
    }

    @DeleteMapping
    private Response deleteUserByEmail(@RequestParam("email") String email, @RequestHeader("Authorization") String authToken) {
        this.userService.deleteUserByEmail(email, authToken);

        return new Response("User Deleted", null, 200, null);
    }

    @PatchMapping
    private Response updateUser(@RequestBody User user, @RequestHeader("Authorization") String authToken) {
        this.userService.updateUser(user, authToken);
        HashMap<String, User> data = new HashMap<>();
        data.put("updatedUser", user);

        return new Response("User Updated", null, 200, data);
    }
}