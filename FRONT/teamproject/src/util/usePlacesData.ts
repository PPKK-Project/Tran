import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export type Place = {
  name: string;
  value: number;
};

const fetchPlaces = async (): Promise<Place[]> => {
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

  return response.data.slice(0, 10)
    .map((item: { ITM_NM: string; DT: string; }) => ({
      name: item.ITM_NM,
      value: Number(item.DT.replace(/,/g, '')) || 0,
    }))
    .sort((a: { value: number }, b: { value: number }) => b.value - a.value);
};

const fetchImageUrls = async (): Promise<string[]> => {
  const fileNames = [
    'place1.webp', 'place2.webp', 'place3.webp', 'place4.webp', 'place5.webp',
    'place6.webp', 'place7.webp', 'place8.webp', 'place9.webp', 'place10.webp'
  ];
  const urlPromises = fileNames.map(fileName => getDownloadURL(ref(storage, `place_cards/${fileName}`)));
  const urls = await Promise.all(urlPromises);
  return urls.filter((url): url is string => url !== null);
};

export function usePlacesData() {
  const placesQuery = useQuery({ queryKey: ['places'], queryFn: fetchPlaces });
  const imagesQuery = useQuery({ queryKey: ['placeImages'], queryFn: fetchImageUrls });

  return { places: placesQuery.data, imageUrls: imagesQuery.data, isLoading: placesQuery.isLoading || imagesQuery.isLoading };
}