import TravelPlanList from "./TravelPlanList";
import MyPageHeader from "./MyPageHeader";
import TopDestinationsBanner from "./TopDestinationsBanner";

function MyPage() {
  return (
    <>
      <div className="mypage-background"></div>
      <div className="mypage-content-wrapper">
        <MyPageHeader />
        <TopDestinationsBanner />
        <TravelPlanList />
      </div>
    </>
  );
}
export default MyPage;
