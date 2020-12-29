package org.mastercloudapps.toposervice.service;

import lombok.AllArgsConstructor;
import org.mastercloudapps.toposervice.model.City;
import org.mastercloudapps.toposervice.repository.CityRepository;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.concurrent.ThreadLocalRandom;

@AllArgsConstructor
@Service
public class CityService {

    CityRepository cityRepository;

    public Mono<City> findByName(String name) {
        return this.cityRepository.findByName(name).delayElement(Duration.ofSeconds(ThreadLocalRandom.current().nextInt(1,4)));
    }
}
