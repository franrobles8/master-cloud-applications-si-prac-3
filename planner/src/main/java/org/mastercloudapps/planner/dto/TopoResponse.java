package org.mastercloudapps.planner.dto;

public class TopoResponse {

	private String id;
	private String landscape;
	
	public TopoResponse(String id, String landscape) {
		this.id = id;
		this.landscape = landscape;
	}

	public TopoResponse() {
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLandscape() {
		return landscape;
	}

	public void setLandscape(String landscape) {
		this.landscape = landscape;
	}	
	
}
