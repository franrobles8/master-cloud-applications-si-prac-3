package org.mastercloudapps.planner.broker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.mastercloudapps.planner.dto.PlantCreationProgress;
import org.mastercloudapps.planner.dto.PlantCreationRequest;
import org.mastercloudapps.planner.dto.TopoResponse;
import org.mastercloudapps.planner.service.TopoService;
import org.mastercloudapps.planner.service.WeatherService;
import org.mastercloudapps.planner.weatherservice.WeatherServiceOuterClass.Weather;

import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BrokerConsumer {

	private final static int PROGRESS_INITIAL = 0;
	private final static int PROGRESS_REQUESTS_SENT = 25;
	private final static int PROGRESS_COMPLETED = 100;

	private final static int MIN_WAIT = 1;
	private final static int MAX_WAIT = 3;

	private boolean weather = false;
	private boolean topography = false;

	private Logger log = LoggerFactory.getLogger(BrokerConsumer.class);

	ObjectMapper mapper = new ObjectMapper();

	PlantCreationProgress plantCreationProgress;

	@Autowired
	TopoService topoService;

	@Autowired
	WeatherService weatherService;

	@Autowired
	BrokerProducer producer;

	@RabbitListener(queues = "${broker.creationrequest.queue}", ackMode = "AUTO")
	public void received(String message) {

		log.info("Message received: {}", message);

		try {

			PlantCreationRequest request = mapper.readValue(message, PlantCreationRequest.class);

			this.plantCreationProgress = new PlantCreationProgress(request.getId(), request.getCity(), PROGRESS_INITIAL,
					false, request.getCity());
			this.process();

		} catch (JsonMappingException e) {
			log.error("Json Mapping Error {}: {}", message, e.getMessage());
		} catch (JsonProcessingException e) {
			log.error("Json Processing Error {}: {}", message, e.getMessage());
		}
	}

	public void process() {
		CompletableFuture<TopoResponse> topography = topoService.getLandscape(plantCreationProgress.getCity());
		CompletableFuture<Weather> weather = weatherService.getWeather(plantCreationProgress.getCity());

		this.requestsSentToServices();
		producer.send(this.getCreationProgress());

		CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(topography, weather);

		weather.thenRun(() -> {
			this.weatherResponseReceived(weather.join().getWeather());
			producer.send(this.getCreationProgress());
		});

		topography.thenRun(() -> {
			this.topographyResponseReceived(topography.join().getLandscape());
			producer.send(this.getCreationProgress());
		});

		combinedFuture.thenRun(() -> {
			this.bothResponsesReceived();
			producer.send(this.getCreationProgress());
		});
	}

	private void requestsSentToServices() {
		this.plantCreationProgress.setProgress(PROGRESS_REQUESTS_SENT);
		log.info("Progress: {}% Requests sent to the services", this.plantCreationProgress.getProgress());
	}

	private PlantCreationProgress getCreationProgress() {
		this.plantCreationProgress.setPlanning(this.getPlanningResult(this.plantCreationProgress.isCompleted()));

		if (this.isCompleted()) {
			int randomProcessTime = new Random().ints(MIN_WAIT, MAX_WAIT + 1).findFirst().getAsInt();
			log.info("Random process time for completed plant creation for id {} is {} second(s)",
					this.plantCreationProgress.getId(), randomProcessTime);
			try {
				TimeUnit.SECONDS.sleep(randomProcessTime);
			} catch (InterruptedException e) {
				log.error(e.getMessage());
			}

		}
		return this.plantCreationProgress;
	}

	private void weatherResponseReceived(String weather) {
		this.plantCreationProgress.setProgress(this.plantCreationProgress.getProgress() + 25);
		this.plantCreationProgress.setPlanning(this.plantCreationProgress.getPlanning() + "-" + weather);
		log.info("Progress: {}% Result received from weather service: {}", this.plantCreationProgress.getProgress(),
				weather);
		this.setWeather(true);
	}

	private void topographyResponseReceived(String topography) {
		this.plantCreationProgress.setProgress(this.plantCreationProgress.getProgress() + 25);
		this.plantCreationProgress.setPlanning(this.plantCreationProgress.getPlanning() + "-" + topography);
		log.info("Progress: {}% Result received from topography service: {}", this.plantCreationProgress.getProgress(),
				topography);
		this.setTopography(true);
	}

	private void bothResponsesReceived() {
		this.plantCreationProgress.setProgress(this.plantCreationProgress.getProgress() + 25);
		this.plantCreationProgress.setCompleted(true);
	}

	private boolean isCompleted() {
		boolean completed = this.plantCreationProgress.getProgress() == PROGRESS_COMPLETED;
		if (completed) {
			log.info("Progress: {}% Completed", this.plantCreationProgress.getProgress());
		}
		return completed;
	}

	private String getPlanningResult(boolean completed) {

		if (!completed) {
			log.info("No planning generated because progress is not completed");
			return this.plantCreationProgress.getPlanning();
		} else if (this.cityStartsByCharPreviousM()) {
			log.info("Planning value: {}", this.plantCreationProgress.getPlanning().toLowerCase());
			return this.plantCreationProgress.getPlanning().toLowerCase();
		} else {
			log.info("Planning value: {}", this.plantCreationProgress.getPlanning().toUpperCase());
			return this.plantCreationProgress.getPlanning().toUpperCase();
		}
	}

	private boolean cityStartsByCharPreviousM() {
		return this.plantCreationProgress.getCity().toLowerCase().charAt(0) <= 'm' ? true : false;
	}

	public boolean getWeather() {
		return this.weather;
	}

	public void setWeather(boolean weather) {
		this.weather = weather;
	}

	public boolean getTopography() {
		return this.topography;
	}

	public void setTopography(boolean topography) {
		this.topography = topography;
	}
}
