import { useCallback, useEffect, useMemo, useState } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { Spacer, Image, Text } from "~/components/uis/atoms"
import { useReservationContext } from "~/contexts/hooks"
import { useResize } from "~/hooks"
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect"
import { getTimezoneIndexFromDate } from "~/utils/date"
import { TimeBlockUnit, ActionTimeBlockUnit, Header } from "./TimeBlockUnits"
import TimeRangeSelector from "./TimeRangeSelector"

const timeSlotIndexMap: { [key in string]: number } = {
  dawn: 0,
  morning: 12,
  afternoon: 24,
  night: 35,
}

interface Props {
  isToday: boolean
  timeSlot: string
  onModalOpen: () => void
  onModalClose: () => void
}

const TimeTable = ({ isToday, timeSlot, onModalOpen, onModalClose }: Props) => {
  const {
    reservation: {
      step,
      timeTable,
      startIndex,
      endIndex,
      existedReservations,
      selectedReservationId,
    },
    handleSelectReservation,
    handleSetCurrentBlock,
    handleSetTime,
  } = useReservationContext()

  const currentTimeIndex = useMemo(
    () => (isToday ? getTimezoneIndexFromDate(dayjs()) : null),
    [isToday]
  )

  const [isInitialized, setIsInitialized] = useState(false)
  const [height, setHeight] = useState(0)

  const ref = useResize<HTMLDivElement>((rect) => {
    setHeight(rect.width)
  })

  const handleClickReservationMarker = useCallback(
    (reservationId: number) => {
      if (step === 1) {
        onModalOpen()
        handleSelectReservation(reservationId)
      }
    },
    [step, onModalOpen, handleSelectReservation]
  )

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetWidth)
    }
  }, [ref])

  useEffect(() => {
    if (height !== 0) {
      setIsInitialized(true)
    }
  }, [height])

  useEffect(() => {
    const el = document.querySelector("#scrolled-container")

    if (timeSlot && el && isInitialized) {
      setTimeout(
        () =>
          el.scrollTo({
            left: 0,
            top: timeSlotIndexMap[timeSlot as string] * height,
            behavior: "smooth",
          }),
        200
      )
    }
  }, [isInitialized])

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <Header />
      <S.TimeTableContainer>
        <ActionTimeBlockUnit
          rowRef={ref}
          height={height}
          previous
          disabled={isToday}
          onClose={onModalClose}
        />
        {timeTable.map((item: any, index: number) => (
          <TimeBlockUnit
            key={index}
            height={height}
            index={index}
            reservationCount={item.peopleCount}
            ballCount={item.ballCount}
            hasReservation={item.hasReservation}
            selected={startIndex === index}
            step={step}
            onClick={(index) => {
              onModalOpen()
              if (step === 1) {
                handleSetCurrentBlock(index)
              } else {
                handleSetTime(index)
              }
            }}
            disabled={
              isToday &&
              currentTimeIndex !== null &&
              index < currentTimeIndex + 1
            }
          />
        ))}
        {step === 2 && (
          <TimeRangeSelector
            unit={height}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
        {existedReservations.map(
          ({ reservationId, startIndex, endIndex }: any) => (
            <>
              {step === 2 && selectedReservationId === reservationId ? null : (
                <S.ReservationMarker
                  key={reservationId}
                  width={height}
                  height={height * (endIndex - startIndex + 1)}
                  top={height * (startIndex + 1)}
                  left={height}
                  selected={reservationId === selectedReservationId}
                  onClick={() => handleClickReservationMarker(reservationId)}
                >
                  <Spacer type="horizontal" gap="xxs" align="center">
                    <ImageWrapper>
                      <Image
                        unoptimized
                        src="/assets/basketball/only_ball_500.gif"
                        alt="basketball"
                      />
                    </ImageWrapper>
                    <Label block strong>
                      ??? ??????
                    </Label>
                  </Spacer>
                </S.ReservationMarker>
              )}
            </>
          )
        )}
        <ActionTimeBlockUnit height={height} next onClose={onModalClose} />
      </S.TimeTableContainer>
    </div>
  )
}

export default TimeTable

const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`

const ImageWrapper = styled.div`
  width: 44px;
  height: 44px;

  img {
    width: 100%;
    height: 100%;
  }
`

const S = {
  TimeTableContainer: styled.div`
    position: relative;
  `,

  ReservationMarker: styled.div<any>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    ${({ top, left, width, height, selected, theme }) => css`
      top: ${top}px;
      left: ${left}px;
      width: ${width}px;
      height: ${height}px;
      border: ${selected && `8px solid ${theme.colors.slam.orange.strong}`};
    `};
    background-color: ${({ theme }) => theme.colors.gray900};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadiuses.lg};
    box-sizing: border-box;
    text-align: center;
    filter: ${({ theme }) => theme.filter.dropShadow};
  `,
}
