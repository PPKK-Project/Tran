import React from 'react';
import { Map } from '@vis.gl/react-google-maps';

const MyMapComponent = () => {
    
  // 지도의 초기 중심 좌표와 확대/축소 레벨 설정
  const defaultCenter = { lat: 35.1796, lng: 129.0756 }; 
  const defaultZoom = 12; // 도시를 잘 보여주기 위해 줌 레벨을 12로 변경했습니다.
  return (
    <Map 
      defaultCenter={defaultCenter} 
      defaultZoom={defaultZoom} 
      gestureHandling={'greedy'} // 모바일 환경에서 지도를 쉽게 조작하도록 설정
      // mapId={'YOUR_MAP_ID'}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MyMapComponent;