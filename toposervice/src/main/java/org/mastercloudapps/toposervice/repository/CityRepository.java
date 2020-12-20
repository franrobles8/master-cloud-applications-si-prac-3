package org.mastercloudapps.toposervice.repository;

import org.mastercloudapps.toposervice.model.City;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CityRepository extends ReactiveMongoRepository<City, String> {
    Mono<City> findByName(String name);
}
