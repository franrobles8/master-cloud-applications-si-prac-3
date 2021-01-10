package org.mastercloudapps.planner.configuration;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueuesConfiguration {
	
	@Value("${broker.creationrequest.queue}")
	private String requestQueue;
	
	@Value("${broker.creationprogress.queue}")
	private String progressQueue;
			
	@Bean
	public Queue eoloplantCreationRequests() {
		return new Queue(requestQueue, false);
	}

	@Bean
	public Queue eoloplantCreationProgressNotifications() {
		return new Queue(progressQueue, false);
	}
	
}
