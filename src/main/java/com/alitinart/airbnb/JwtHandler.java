package com.alitinart.airbnb;

import com.alitinart.airbnb.models.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;
import org.apache.tomcat.util.codec.binary.Base64;

import java.time.Instant;
import java.util.Date;
import java.util.Map;

public class JwtHandler {

    public JwtHandler() {}

    public String generateJwt(Map<String, String> payload) {
        Dotenv dotenv = Dotenv.load();
        Algorithm algorithm = Algorithm.HMAC256(dotenv.get("ACCESS_TOKEN_SECRET"));

        String token = JWT.create()
                .withPayload(payload)
                .withIssuer("alitinart")
                .withExpiresAt(Date.from(Instant.now().plusSeconds(43200)))
                .sign(algorithm);

        return token;
    }

    public User decodeToken(String authToken) {
        String[] chunks = authToken.split(" ");
        String token = chunks[1];

        String[] tokenChunks = token.split("\\.");

        Dotenv dotenv = Dotenv.load();
        Algorithm algorithm = Algorithm.HMAC256(dotenv.get("ACCESS_TOKEN_SECRET"));

        JWTVerifier verifer = JWT.require(algorithm)
                .withIssuer("alitinart")
                .build();
        try {
            verifer.verify(token);
        } catch (TokenExpiredException e) {
            throw new IllegalStateException("Token Expired");
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Forbidden");
        } catch (JWTDecodeException e) {
            throw new IllegalArgumentException("Forbidden");
        }

        String payload = new String(Base64.decodeBase64(tokenChunks[1]));

        Gson gson = new Gson();
        return gson.fromJson(payload, User.class);
    }
}
