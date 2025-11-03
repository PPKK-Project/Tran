package com.project.team.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "cuisine_type")
    private String cuisineType;

    private String address;

    @Column(name = "price_level")
    private String priceLevel;

    @Column(name = "business_hours")
    private String businessHours;

    private Double rating;

    private Double latitude;

    private Double longitude;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "travel_id")
    private Travel travel;

}
