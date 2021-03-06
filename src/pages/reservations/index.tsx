import React, { useState, useCallback, useEffect, useRef } from "react"
import type { NextPage } from "next"
import styled from "@emotion/styled"
import { NoItemMessage, ReservationItem } from "~/components/domains"
import { Text, Spacer } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import { reservationApi } from "~/service"

const Reservations: NextPage = () => {
  const { authProps, getMyReservations } = useAuthContext()
  const { reservations: upcomingReservations } = authProps
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_RESERVATIONS")
  useEffect(() => {
    getMyReservations()
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "EXPIRED">("UPCOMING")
  const [expiredReservations, setExpiredReservations] = useState<any[]>([])
  const [currentLastId, setCurrentLastId] = useState<any>()
  const [isFetching, setIsFetching] = useState(false)

  const handleClickExpiredTab = useCallback(async () => {
    setActiveTab("EXPIRED")

    if (currentLastId !== null) {
      const { data } = await reservationApi.getMyExpiredReservations(
        !currentLastId,
        currentLastId
      )
      const { contents, lastId } = data
      setExpiredReservations((prev) => [...prev, ...contents])
      setCurrentLastId(lastId)
    }
  }, [currentLastId])

  const loadMore = useCallback(async () => {
    if (expiredReservations.length !== 0 && currentLastId !== null) {
      const { data } = await reservationApi.getMyExpiredReservations(
        !currentLastId,
        currentLastId
      )
      const { contents, lastId } = data
      setExpiredReservations((prev) => [...prev, ...contents])
      setCurrentLastId(lastId)
    }
  }, [currentLastId, expiredReservations])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setIsFetching(false)
            await loadMore()
            setIsFetching(true)
          }
        })
      },
      { threshold: 1.0 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, loadMore])

  if (!authProps.currentUser) {
    return null
  }

  return (
    <PageContainer>
      <TabContainer>
        <Text
          strong={activeTab === "UPCOMING"}
          onClick={() => setActiveTab("UPCOMING")}
          style={{ cursor: "pointer" }}
        >
          ????????? ??????
        </Text>
        <Text
          strong={activeTab === "EXPIRED"}
          onClick={handleClickExpiredTab}
          style={{ cursor: "pointer" }}
        >
          ?????? ??????
        </Text>
      </TabContainer>
      <TabContentsWrapper>
        {activeTab === "UPCOMING" ? (
          upcomingReservations.length === 0 ? (
            <NoItemMessage
              title="????????? ????????? ?????? ????????? ????"
              type="reservation"
              description="???????????? ??????????????? ?????? ????????? ???????????? ????????????"
              buttonTitle="????????? ????????? ??????"
            />
          ) : (
            <Spacer gap="md">
              {upcomingReservations.map((reservation) => (
                <ReservationItem
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </Spacer>
          )
        ) : expiredReservations.length === 0 ? (
          <NoItemMessage
            title="?????? ????????? ?????? ????????? ????"
            type="reservation"
            description="???????????? ??????????????? ?????? ????????? ???????????? ????????????"
            buttonTitle="????????? ????????? ??????"
          />
        ) : (
          <Spacer gap="md">
            {expiredReservations.map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))}
          </Spacer>
        )}
      </TabContentsWrapper>

      <div ref={ref} style={{ height: 20 }} />
    </PageContainer>
  )
}

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 52px;
  border-bottom: 4px solid ${({ theme }) => theme.previousTheme.colors.gray100};
  margin-top: 16px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 ${({ theme }) => theme.previousTheme.gaps.base};
`

const TabContentsWrapper = styled.div`
  flex: 1;
  margin-top: 16px;
`

export default withRouteGuard("private", Reservations)
