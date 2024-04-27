import { useCountdown } from "../../../utils";

const LimitedCrateBoxHeader = ({ item }) => {
  const { diffTimeData } = useCountdown(item.endDate);
  return (
    <div className="rounded-t-2xl bg-primary text-dark w-full text-center p-2 xs:py-4 xs:px-4 min-[500px]:px-6 font-medium line-clamp-1">
      {item._id ? diffTimeData.diffDay : 0} days{" "}
      {item._id ? diffTimeData.diffHour : 0} hours{" "}
      {item._id ? diffTimeData.diffMin : 0} mins{" "}
      {item._id ? diffTimeData.diffSec : 0} secs left
    </div>
  );
};

export default LimitedCrateBoxHeader;
