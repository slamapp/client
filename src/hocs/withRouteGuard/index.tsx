import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useAuthContext } from "~/contexts/hooks"
import { useLocalToken } from "~/hooks/domain"

// TODO: Version2에서 private / prevented RedirectPath Props로 받아오도록 변경하기
const privateRedirectPath = "/courts"
const preventedRedirectPath = "/"

type RouteOption = "private" | "prevented"

const withRouteGuard = (option: RouteOption, Page: NextPage) => {
  return () => {
    const { authProps } = useAuthContext()
    const [localToken] = useLocalToken()
    const router = useRouter()
    const { pathname } = router

    useEffect(() => {
      if (router.isReady) {
        switch (option) {
          case "private":
            if (localToken) {
              router.replace({ pathname: `${pathname}`, query: router.query })
            } else {
              router.replace(privateRedirectPath)
            }
            break
          case "prevented":
            if (localToken) {
              router.replace(preventedRedirectPath)
            } else {
              router.replace({ pathname: `${pathname}`, query: router.query })
            }
            break
          default:
            break
        }
      }
    }, [localToken])

    console.log(authProps.currentUser)

    return <Page />
  }
}

export default withRouteGuard
