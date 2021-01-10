package org.mastercloudapps.planner.broker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import org.mastercloudapps.planner.dto.PlantCreationRequest;
import org.mastercloudapps.planner.manager.PlantCreationManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BrokerConsumer {
	
	private Logger log = LoggerFactory.getLogger(BrokerConsumer.class);	
	
	ObjectMapper mapper = new ObjectMapper();
	
	PlantCreationManager manager;
	
	@RabbitListener(queues = "${broker.creationrequest.queue}", ackMode = "AUTO")
	public void received(String message) {
		
		log.info("Message received: {}", message);
		
		try {
			
			PlantCreationRequest request = mapper.readValue(message, PlantCreationRequest.class);
			manager = new PlantCreationManager(request.getId(), request.getCity());
			manager.process();
			
	        	
		} catch (JsonMappingException e) {
			log.error("Json Mapping Error {}: {}", message, e.getMessage());
		} catch (JsonProcessingException e) {
			log.error("Json Processing Error {}: {}", message, e.getMessage());
		}		
	}

}
