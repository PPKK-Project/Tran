package com.project.team.Repository;


import com.project.team.Entity.Country;
import com.project.team.Entity.Tip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipRepository extends JpaRepository<Tip, Long> {

    Optional<Tip> findByCountry(Country country);
}