package com.zmylong;

import java.security.SecureRandom;
import java.util.Base64;

public class JwtSecretGenerator {
    public static void main(String[] args) {
        byte[] secretBytes = new byte[64]; // 512비트
        new SecureRandom().nextBytes(secretBytes);
        String secret = Base64.getEncoder().encodeToString(secretBytes);
        System.out.println("Generated JWT Secret:1 ");
        System.out.println(secret);
    }
}

