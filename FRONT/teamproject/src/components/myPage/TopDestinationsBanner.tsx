import { usePlacesData } from "../../util/usePlacesData";

function TopDestinationsBanner() {
  const { places, imageUrls } = usePlacesData();

  if (!places || !imageUrls) return null; // 데이터가 없으면 렌더링하지 않음

  return (
    <div className="destinations-banner-container">
      <div className="destinations-list">
        <div className="destinations-inner-wrapper">
          {[...places, ...places].map((place, index) => (
            <div key={index} className="destination-card">
              <div
                className="card-background"
                style={{ backgroundImage: `url(${imageUrls[(index % 10)]})` }}
              />
              <div className="card-overlay">
                <span className="card-rank">#{(index % 10) + 1}</span>
                <span className="card-title">{place.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopDestinationsBanner;
