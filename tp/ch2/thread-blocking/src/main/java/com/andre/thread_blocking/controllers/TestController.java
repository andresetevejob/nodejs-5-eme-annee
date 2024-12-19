package com.andre.thread_blocking.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class TestController {

    @GetMapping("/process")
    public String process() throws InterruptedException {
        //Thread.sleep(10000); // Simule une tâche longue (10 secondes)
        //log.info("done");
        return "Done!";
    }
}