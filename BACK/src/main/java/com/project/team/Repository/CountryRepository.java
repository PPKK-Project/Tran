package com.project.team.Repository;

import com.project.team.Entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country,Long> {

    Optional<Country> findByCountryCode(String countryCode);
    // Country 코드가 이미 존재하는지 확인하기 위한 메서드
    boolean existsByCountryCode(String countryCode);

}
