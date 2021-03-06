import React, { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from "next"
import styled from "@emotion/styled"
import { NewCourtItem, Modal } from "~/components/domains"
import { Spacer } from "~/components/uis/atoms"
import { Tab } from "~/components/uis/templates"
import { useNavigationContext } from "~/contexts/hooks"
import managementApi from "~/service/managementApi"
import type { APINewCourt } from "~/types/domains"

type OldNewCourt = Pick<
  APINewCourt,
  | "basketCount"
  | "createdAt"
  | "updatedAt"
  | "longitude"
  | "latitude"
  | "texture"
  | "status"
  | "image"
> & { newCourtId: number; courtName: string }

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_ADMIN_NEWCOURTS")

  const [readyData, setReadyData] = useState<OldNewCourt[]>([])
  const [doneData, setDoneData] = useState<OldNewCourt[]>([])
  const [currentLastId, setCurrentLastId] = useState<number | null>(0)
  const [activeStatus, setActiveStatus] =
    useState<OldNewCourt["status"]>("READY")
  const [isFetching, setIsFetching] = useState(false)
  const [isOpenDenyModal, setIsOpenDenyModal] = useState(false)
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false)

  const loadMore = useCallback(
    async (status: OldNewCourt["status"]) => {
      if (readyData.length === 0 || isFetching || currentLastId === null) {
        return
      }

      try {
        setIsFetching(true)
        const {
          data: { contents, lastId },
        } = await managementApi.getNewCourts(
          status,
          !currentLastId,
          currentLastId
        )
        if (status === "READY") {
          setReadyData((prev) => [...prev, ...contents])
        } else {
          setDoneData((prev) => [...prev, ...contents])
        }
        setCurrentLastId(lastId)
      } catch (error) {
        console.error(error)
      }

      setIsFetching(false)
    },
    [currentLastId, isFetching, readyData.length]
  )

  const getNewCourts = useCallback(
    async (status: OldNewCourt["status"]) => {
      try {
        setIsFetching(true)
        const {
          data: { contents, lastId },
        } = await managementApi.getNewCourts(
          status,
          !currentLastId,
          currentLastId
        )
        if (status === "READY") {
          setReadyData((prev) => [...prev, ...contents])
        } else {
          setDoneData((prev) => [...prev, ...contents])
        }
        setCurrentLastId(lastId)
      } catch (error) {
        console.error(error)
      }

      setIsFetching(false)
    },
    [currentLastId, isFetching, readyData.length]
  )

  const handleClick = (status: OldNewCourt["status"]) => {
    if (activeStatus === status) {
      return
    }

    setCurrentLastId(0)
    setReadyData([])
    setDoneData([])
    setActiveStatus(status)
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getNewCourts(activeStatus)
  }, [activeStatus])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadMore(activeStatus)
          }
        })
      },
      { threshold: 1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, activeStatus, getNewCourts])

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
      <Tab onClick={handleClick}>
        <Tab.Item title="?????? ??????" index="READY">
          <Container>
            <Spacer gap="base">
              {readyData.map((court) => (
                <NewCourtItem
                  key={court.newCourtId}
                  data={court}
                  state="READY"
                  setIsOpenAcceptModal={setIsOpenAcceptModal}
                  setIsOpenDenyModal={setIsOpenDenyModal}
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
        <Tab.Item title="?????? ??????" index="DONE">
          <Container>
            <Spacer gap="base">
              {doneData.map((court) => (
                <NewCourtItem
                  key={court.newCourtId}
                  data={court}
                  state="DONE"
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
      </Tab>
      {readyData.length === 0 ||
        (doneData.length === 0 && <div style={{ flex: 1 }}></div>)}
      <div ref={ref} style={{ height: 10 }}></div>

      <Modal
        visible={isOpenDenyModal}
        onClose={() => setIsOpenDenyModal(false)}
      >
        <Modal.Header>????????? ?????????????????????.</Modal.Header>
      </Modal>

      <Modal
        visible={isOpenAcceptModal}
        onClose={() => setIsOpenAcceptModal(false)}
      >
        <Modal.Header>????????? ?????????????????????.</Modal.Header>
      </Modal>
    </div>
  )
}

export default NewCourtsPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: ${({ theme }) => theme.gaps.base};
`
