package org.mastercloudapps.planner.dto;

public class PlantCreationProgressBuilder {

	private Long id;
	private String city;
	private int progress;
	private boolean completed;
	private String planning;
	
	public PlantCreationProgressBuilder id(Long id) {
        this.id = id;
        return this;
    }
	
	public PlantCreationProgressBuilder city(String city) {
        this.city = city;
        return this;
    }
	
	public PlantCreationProgressBuilder progress(int progress) {
        this.progress = progress;
        return this;
    }
	
	public PlantCreationProgressBuilder completed(boolean completed) {
        this.completed = completed;
        return this;
    }
	
	public PlantCreationProgressBuilder planning(String planning) {
        this.planning = planning;
        return this;
    }
	
	public PlantCreationProgress build() {
		return new PlantCreationProgress(id, city, progress, completed, planning);
	}
}
