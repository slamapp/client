import type { ReactNode } from "react"
import React, { useMemo, useCallback, useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import { Spacer } from "~/components/uis/atoms"
import Cells from "./Cells"
import type { ContextProps } from "./context"
import { ReservationTableContext } from "./context"
import Divider from "./Divider"
import MoreCellSensor from "./MoreCellSensor"
import "dayjs/locale/ko"

dayjs.locale("ko")

const DATE_QUERY_STRING_FORMAT = "YYYY-MM-DD"

interface Props {
  children: ReactNode
}

const ReservationTable = ({ children }: Props) => {
  const router = useRouter()
  const { courtId, date } = router.query

  const [intersectingTitleCountMap, setIntersectingTitleCountMap] = useState<{
    [date: string]: number
  }>({})

  const dayjsToday = dayjs()
  const dayjsDate = {
    Current: dayjs(`${date}`),
    Min: dayjsToday,
    Max: dayjs(dayjsToday.clone()).add(13, "day"),
  }

  const [dates, setDates] = useState([
    dayjsDate.Current.format(DATE_QUERY_STRING_FORMAT),
  ])
  const vwElementRef = useRef<HTMLDivElement>(null)
  const tableCellHeight = useMemo(
    () => (vwElementRef.current?.clientWidth || 6) / 6,
    [vwElementRef.current?.clientWidth]
  )
  const isReadyTableCellHeight = tableCellHeight > 10

  const replaceNewDate: ContextProps["replaceNewDate"] = useCallback(
    async (option, callback) => {
      if (
        (option === "subtract" && dayjs(dates[0]).isBefore(dayjsDate.Min)) ||
        (option === "add" &&
          dayjs(dates[dates.length - 1]).isAfter(dayjsDate.Max))
      ) {
        if (typeof callback === "function") {
          await callback({ isAddedCells: false })
        }

        return
      }

      if (option === "subtract") {
        setDates((prev) => [
          dayjs(prev[0]).subtract(1, "day").format(DATE_QUERY_STRING_FORMAT),
          ...prev,
        ])
      }
      if (option === "add") {
        setDates((prev) => [
          ...prev,
          dayjs(prev[prev.length - 1])
            .add(1, "day")
            .format(DATE_QUERY_STRING_FORMAT),
        ])
      }
      if (typeof callback === "function") {
        await callback({ isAddedCells: true })
      }
    },
    [dates, dayjsDate.Max, dayjsDate.Min]
  )

  useEffect(() => {
    if (dayjsDate.Current.isBefore(dayjsDate.Min.subtract(1, "day"))) {
      router.replace(
        `/reservations/courts/${courtId}?date=${dayjsDate.Min.format(
          DATE_QUERY_STRING_FORMAT
        )}`
      )
    }

    if (dayjsDate.Current.isAfter(dayjsDate.Max.add(1, "day"))) {
      router.replace(
        `/reservations/courts/${courtId}?date=${dayjsDate.Max.format(
          DATE_QUERY_STRING_FORMAT
        )}`
      )
    }
  }, [date, courtId, router])

  return (
    <ReservationTableContext.Provider
      value={{
        intersectingTitleCountMap,
        setIntersectingTitleCountMap,
        tableCellHeight,
        dates,
        setDates,
        replaceNewDate,
      }}
    >
      <Spacer
        ref={vwElementRef}
        justify="space-between"
        style={{ position: "relative" }}
      >
        {isReadyTableCellHeight ? (
          <>
            <MoreCellSensor.Top />
            {children}
            <MoreCellSensor.Bottom />
          </>
        ) : (
          <>????????? ???????????? ??????????????????.</>
        )}
      </Spacer>
    </ReservationTableContext.Provider>
  )
}

export default ReservationTable

ReservationTable.Divider = Divider
ReservationTable.Cells = Cells
