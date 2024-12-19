package com.andre.thread_blocking;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ClientSimulator {
    public static void main(String[] args) {
        String targetUrl = "http://localhost:8080/api/process";
        int numRequests = 50; // Nombre de requêtes à envoyer

        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < numRequests; i++) {
            executor.execute(() -> {
                try {
                    HttpURLConnection connection = (HttpURLConnection) new URL(targetUrl).openConnection();
                    connection.setRequestMethod("GET");
                    int responseCode = connection.getResponseCode();
                    System.out.println("Response Code: " + responseCode);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }

        executor.shutdown();
    }
}
