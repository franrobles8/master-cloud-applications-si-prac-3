package org.mastercloudapps.toposervice.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cities")
@Getter
@Setter
public class City {

    @Id
    @JsonIgnore
    private String id;
    @NonNull private String name;
    @NonNull private String landscape;

    public City(String name, String landscape) {
        this.name = name;
        this.landscape = landscape;
    }
    
}
