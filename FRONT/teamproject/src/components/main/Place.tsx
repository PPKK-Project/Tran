import { useState } from "react";
import Content from "./Content";
import { usePlacesData } from "../../util/usePlacesData";

export type Place = {
  name: string,
  value: number
}

type Country = {
  country_name: string,
  rank: number
}

function Place() {
  const { places, imageUrls, isLoading } = usePlacesData();
  const [country, setCountry] = useState<Country>({ country_name: '일본', rank: 1 });

  const handleCountry = (name: string, rank: number) => {
    setCountry({ country_name: name, rank: rank });
  }

  if (isLoading) return <div className="status-message">데이터를 불러오는 중입니다...</div>;
  if (!places || !imageUrls || places.length === 0) return <div className="status-message">표시할 데이터가 없습니다.</div>;

  return (
    <>
      <div className="place-container">
        <div className="header-section">
          <h2 className="header-title">인기 여행지 TOP 10</h2>
          <p className="header-subtitle">한국인들이 가장 사랑하는 목적지</p>
        </div>
        <div className="card-grid">
          {places.map((place, index) => (
            <div key={place.name} onClick={() => handleCountry(place.name, index + 1)} className="place-card">
              <div 
                className={`card-background`}
                style={{ backgroundImage: `url(${imageUrls[index]})` }}
              />
              <div className="card-overlay">
                <span className="card-rank">
                  #{index + 1}
                </span>
                <span className="card-title">
                  {place.name}
                </span>
                <span className="card-value">
                  방문률: {place.value.toLocaleString()}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Content
        country_name={country.country_name}
        rank={country.rank} />
    </>
  );
}

export default Place;