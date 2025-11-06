import axios from "axios";
import { useEffect, useState } from "react";
import Content from "./Content";

type Place = {
  name: string,
  value: number
}

function Place() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('');
  const handleCountry = (name: string) => {
    setCountry(name);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/kosis/openapi/Param/statisticsParameterData.do`, {
          params: {
            method: 'getList',
            apiKey: import.meta.env.VITE_KOSIS_KEY,
            itmId: '13103136548T1+13103136548T2+13103136548T3+13103136548T4+13103136548T5+13103136548T6+13103136548T7+13103136548T8+13103136548T9+13103136548T10+13103136548T11+',
            objL1: 'ALL',
            format: 'json',
            jsonVD: 'Y',
            prdSe: 'Y',
            startPrdDe: '2024',
            endPrdDe: '2024',
            orgId: '113',
            tblId: 'DT_113_STBL_1031852'
          }
        });
        const data: Place[] = response.data.slice(0, 10)
          .map(item => ({
            name: item.ITM_NM,
            value: Number(item.DT.replace(/,/g, '')) || 0,
          }))
          .sort((a, b) => b.value - a.value);
        setPlaces(data);
      } catch (error) {
        console.error("데이터 로딩 실패: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  if (loading) return <div className="status-message">데이터를 불러오는 중입니다...</div>;
  if (places.length === 0) return <div className="status-message">표시할 데이터가 없습니다.</div>;
  return (
    <>
      <div className="place-container">
        <div className="header-section">
          <h2 className="header-title">인기 여행지 TOP 10</h2>
          <p className="header-subtitle">한국인들이 가장 사랑하는 목적지</p>
        </div>
        <div className="card-grid">
          {places.map((place, index) => (
            <div key={place.name} onClick={() => handleCountry(place.name)} className="place-card">
              <div
                className="card-background"
                style={{ backgroundImage: `url()` }}
              ></div>
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
      <Content country={country} />
    </>
  );
}

export default Place;