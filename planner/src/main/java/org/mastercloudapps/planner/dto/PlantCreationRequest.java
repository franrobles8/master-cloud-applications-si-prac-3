package org.mastercloudapps.planner.dto;

public class PlantCreationRequest {
	
	private Long id;
	private String city;
	
	public PlantCreationRequest(Long id, String city) {
		super();
		this.id = id;
		this.city = city;
	}

	public PlantCreationRequest() {
		
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
	
	@Override
    public String toString() {
        return "EoloPlantCreationRequest{" +
                	"id=" + id + "," +
                	"city='" + city + "\'" +
                "}";
    }

}
