import CompletedReservations from "@components/Reservations/CompletedReservations";
import UpcomingReservations from "@components/Reservations/UpcomingReservations";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigationContext } from "@contexts/hooks";

const Reservations: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const menuTab = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          다가올 예약
        </li>
      ),
      tabContent: <UpcomingReservations />,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          지난 예약
        </li>
      ),
      tabContent: <CompletedReservations />,
    },
  ];

  return (
    <>
      <div>
        <TabStyle>
          {menuTab.map((section, index) => {
            return section.tabTitle;
          })}
        </TabStyle>
        <div>{menuTab[activeIndex].tabContent}</div>
      </div>
    </>
  );
};

const TabStyle = styled.div`
  .is-active {
    color: red;
  }
`;

export default Reservations;