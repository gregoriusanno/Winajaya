import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState, useEffect } from "react";
import ClockGroup from "../Com Header/ClockGroup";
import AnimatedButton from "../Design/AnimatedButton";

const AntrianHeader = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto px-4 py-4 pr-4 pl-4 md:px-10 flex justify-between items-center max-w-[390px] md:max-w-none">
      {/* Back Button dengan icon yang lebih menarik */}
      <AnimatedButton
        onClick={() => navigate(-1)}
        className="w-[41px] h-[41px] rounded-full flex items-center justify-center outline outline-2 outline-[#EEF1F7]"
      >
        <animated-icons
          src="https://animatedicons.co/get-icon?name=Arrow%20Left&style=minimalistic&token=fa13e0db-49ee-4fc6-88d0-609496daffac"
          trigger="loop"
          attributes='{"variationThumbColour":"#000000","variationName":"Dark","variationNumber":4,"numberOfGroups":2,"strokeWidth":1.5,"backgroundIsGroup":true,"defaultColours":{"group-1":"#000000FF","group-2":"#000000","background":"#000000"}}'
          height="30"
          width="30"
        ></animated-icons>
      </AnimatedButton>

      {/* Current Time Display */}
      <ClockGroup />
    </div>
  );
};

export default AntrianHeader;
