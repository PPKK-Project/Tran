import { useNavigate, useParams } from "react-router-dom";
import { useTravelData } from "../../hooks/useTravelData";
import { useEffect, useState } from "react";

function BasicPlan() {
  const {travelId} = useParams<{travelId: string}>();
  const navigate = useNavigate();
  const {travelInfo, updateTravelInfo, isLoading} = useTravelData(travelId);

  const [form, setForm] = useState({
    title: "",
    departure: "",
    headcount: 1,
    startDate: "",
    endDate: "",
  });

  // 데이터가 로드되면 폼 초기값 설정
  useEffect(() => {
    if(travelInfo) {
      setForm({
        title: travelInfo.title,
        departure: travelInfo.departure || "서울", // 기본값
        headcount: travelInfo.headcount || 1,
        startDate: travelInfo.startDate || "",
        endDate: travelInfo.endDate || "",
      });
    }
  }, [travelInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "headcount" ? parseInt(value) || 1 : value,
    }))
  };

  const handleSave = () => {
    if(!form.title.trim()) {
      alert("여행 제목을 입력해주세요.");
      return;
    }
    if(!form.startDate || !form.endDate) {
      alert("여행 기간을 설정해주세요.");
      return;
    }

    // API 호출
    updateTravelInfo({
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      departure: form.departure,
      headcount: form.headcount,
    });
  };

  const handleNext = () => {
    // 저장 후 일정 계획 페이지로 이동
    handleSave();
    navigate(`/travel/${travelId}/itinerary`);
  };

  if (isLoading) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          여행 기본 정보 설정
        </h2>

        <div className="space-y-6">
          {/* 1. 여행 제목 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              여행 제목
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="이번 여행의 멋진 이름을 지어주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* 2. 출발지 & 인원 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                출발지
              </label>
              <input
                type="text"
                name="departure"
                value={form.departure}
                onChange={handleChange}
                placeholder="예: 인천공항, 서울역"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                여행 인원
              </label>
              <input
                type="number"
                name="headcount"
                value={form.headcount}
                onChange={handleChange}
                min={1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* 3. 여행 기간 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                가는 날
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                오는 날
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              저장하기
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition-all hover:shadow-lg"
            >
              저장하고 일정 짜러가기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicPlan;