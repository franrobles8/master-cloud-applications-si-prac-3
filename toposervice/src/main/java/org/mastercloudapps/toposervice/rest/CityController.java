package org.mastercloudapps.toposervice.rest;


import lombok.AllArgsConstructor;

import org.mastercloudapps.toposervice.exception.CityNotFoundException;
import org.mastercloudapps.toposervice.model.City;
import org.mastercloudapps.toposervice.service.CityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/topographicdetails")
@AllArgsConstructor
public class CityController {

    private CityService cityService;

    @GetMapping (value = "/{name}")
    public Mono<City> getBooks(@PathVariable String name) {
        return this.cityService.findByName(name)
        .switchIfEmpty(Mono.error(CityNotFoundException::new));
    }


}
