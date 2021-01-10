package org.mastercloudapps.planner.service;

import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import org.mastercloudapps.planner.weatherservice.WeatherServiceGrpc.WeatherServiceBlockingStub;
import org.mastercloudapps.planner.weatherservice.WeatherServiceOuterClass.GetWeatherRequest;
import org.mastercloudapps.planner.weatherservice.WeatherServiceOuterClass.Weather;

import net.devh.boot.grpc.client.inject.GrpcClient;

@Service
public class WeatherService {

	private Logger log = LoggerFactory.getLogger(WeatherService.class);

	@GrpcClient("weatherServer")
	private WeatherServiceBlockingStub client;

	@Async
	public CompletableFuture<Weather> getWeather(String city) {

		GetWeatherRequest request = GetWeatherRequest.newBuilder().setCity(city).build();

		log.info("Executing weather request for city {}...", city);
		Weather response = this.client.getWeather(request);

		return CompletableFuture.completedFuture(response);
	}

}
