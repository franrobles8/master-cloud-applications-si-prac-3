package org.mastercloudapps.planner.dto;

public class PlantCreationProgress {

	private Long id;
	private String city;
	private int progress;
	private boolean completed;
	private String planning;
	
	public PlantCreationProgress(Long id, String city, int progress, boolean completed, String planning) {
		super();
		this.id = id;
		this.city = city;
		this.progress = progress;
		this.completed = completed;
		this.planning = planning;
	}

	public PlantCreationProgress() {
		
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

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		this.progress = progress;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public String getPlanning() {
		return planning;
	}

	public void setPlanning(String planning) {
		this.planning = planning;
	}

	@Override
    public String toString() {
        return "EoloPlantCreationProgress{" +
                	"id=" + id + "," +
                	"city='" + city + "\'," +
                	"progress=" + progress + "," +
                	"completed=" + completed + "," +
                	"planning='" + planning + "\'" +
                "}";
    }
	
}
