package org.mastercloudapps.planner.dto;

public class TopoRequest {
	
	private String city;
	
	public TopoRequest(String city) {
		this.city = city;
	}
	
	public TopoRequest() {

	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
	
}
