package org.mastercloudapps.toposervice.configuration;

import org.mastercloudapps.toposervice.model.City;
import org.mastercloudapps.toposervice.repository.CityRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Flux;

@Configuration
public class DataLoader {

    @Bean
    ApplicationRunner init(CityRepository repository) {
        Object[][] cities = { { "Zaragoza", "flat" }, { "Vigo", "flat" }, { "Santander", "mountain" }, };
        return args -> {
            repository.deleteAll()
            .thenMany(Flux.just(cities)
            .map(array -> {
                return new City((String) array[0], (String) array[1]);
            })
            .flatMap(repository::save)).thenMany(repository.findAll()).subscribe();
        };

    }
}
