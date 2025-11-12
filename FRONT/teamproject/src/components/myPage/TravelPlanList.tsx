import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type TravelPlan = {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "ongoing" | "completed";
};

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("jwt")?.replace("Bearer ", "");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

const getTravelPlanList = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/travels`,
    getAxiosConfig()
  );
  console.log(response.data);
  return response.data;
};
function TravelPlanList() {
  // QueryClient 인스턴스를 가져옵니다.
  const queryClient = useQueryClient();

  // 여행 목록을 가져오는 쿼리
  const { data, error, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getTravelPlanList,
  });

  // 여행 계획을 삭제하는 뮤테이션(mutation) 정의
  const deleteMutation = useMutation({
    mutationFn: (planId: number) => {
      return axios.delete(
        `${import.meta.env.VITE_BASE_URL}/travels/${planId}`,
        getAxiosConfig()
      );
    },
    // 뮤테이션 성공 시
    onSuccess: () => {
      console.log("삭제 성공! 여행 목록을 다시 불러옵니다.");
      // 'plans' 쿼리를 무효화하여 데이터를 새로고침합니다.
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  if (isLoading) {
    return <span>Loading....</span>;
  }

  if (error) {
    return <span> 마이페이지를 불러오는데 실패했습니다.😱</span>;
  } else {
    return (
      <div className="travel-plan-list-container">
        <h2 className="list-header">나의 여행 계획</h2>
        {data.length === 0 ? (
          <p className="no-plans-message">
            아직 계획된 여행이 없습니다. 새로운 여행을 계획해보세요!
          </p>
        ) : (
          <div className="plan-cards-grid">
            {data.map((plan) => (
              <div key={plan.id} className="travel-plan-card">
                <div className="plan-card-content">
                  <h3 className="plan-card-title">{plan.title}</h3>
                  <p className="plan-card-destination">{plan.countryCode}</p>
                  <p className="plan-card-dates">
                    {plan.startDate} ~ {plan.endDate}
                  </p>
                  <div className="plan-card-actions">
                    <button className="plan-card-button edit-button">
                      수정
                    </button>
                    <button
                      className="plan-card-button delete-button"
                      onClick={() => deleteMutation.mutate(plan.id)}
                    >
                      삭제
                    </button>
                    <button className="plan-card-button share-button">
                      공유
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default TravelPlanList;
