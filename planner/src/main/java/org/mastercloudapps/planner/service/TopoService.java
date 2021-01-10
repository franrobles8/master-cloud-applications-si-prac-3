package org.mastercloudapps.planner.service;

import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.mastercloudapps.planner.dto.TopoRequest;
import org.mastercloudapps.planner.dto.TopoResponse;

@Service
public class TopoService {

	@Value("${toposervice.url}")
	private String topoServiceUrl;
	
	private Logger log = LoggerFactory.getLogger(TopoService.class);
	
	@Async
    public CompletableFuture<TopoResponse> getLandscape(String city) {
		log.info("Topo request for city {}...", city);
		TopoRequest request = new TopoRequest(city);
		
        TopoResponse response = new RestTemplate().getForObject(
        		getEndpointUrl(request),
        		TopoResponse.class);
        
        return CompletableFuture.completedFuture(response);
    }
	
	private String getEndpointUrl(TopoRequest request) {
		String url = topoServiceUrl + "/" + request.getCity();
		log.info("topoService url: {}", url);
		return url;
	}
	
}
