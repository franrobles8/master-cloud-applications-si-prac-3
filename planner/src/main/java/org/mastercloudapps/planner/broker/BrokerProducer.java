package org.mastercloudapps.planner.broker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.mastercloudapps.planner.dto.PlantCreationProgress;

@Component
public class BrokerProducer {

	private Logger log = LoggerFactory.getLogger(BrokerProducer.class);

	@Autowired
	RabbitTemplate rabbitTemplate;

	@Autowired
	ObjectMapper objectMapper;

	@Value("${broker.creationprogress.queue}")
	private String progressQueue;

	public void send(PlantCreationProgress progress) {
		try {

			String jsonProgress = objectMapper.writeValueAsString(progress);
			log.info("publish: '" + progress.toString() + "'");
			Message message = MessageBuilder.withBody(jsonProgress.getBytes())
					.setContentType(MessageProperties.CONTENT_TYPE_JSON).build();
			rabbitTemplate.convertAndSend(progressQueue, message);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

}
