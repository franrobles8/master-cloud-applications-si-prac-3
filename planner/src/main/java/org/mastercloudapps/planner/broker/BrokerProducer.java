package org.mastercloudapps.planner.broker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import org.mastercloudapps.planner.dto.PlantCreationProgress;

@Component
public class BrokerProducer {

	private Logger log = LoggerFactory.getLogger(BrokerProducer.class);
	
	@Autowired
	RabbitTemplate rabbitTemplate;
	
	@Value("${broker.creationprogress.queue}")
	private String progressQueue;
	
	public void send(PlantCreationProgress progress) {

		log.info("publish: '" + progress.toString() + "'");
		rabbitTemplate.convertAndSend(progressQueue, progress);
	}	
	
}
