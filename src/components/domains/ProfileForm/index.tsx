import type { ChangeEvent } from "react"
import { useCallback, useRef, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import {
  BottomFixedButton,
  PositionsPicker,
  ProficiencyPicker,
  BasketballLoading,
  LeadToLoginModal,
} from "~/components/domains"
import { Text, Button, Spacer, Upload } from "~/components/uis/atoms"
import { Toast, Label, Avatar } from "~/components/uis/molecules"
import { Input } from "~/components/uis/organisms"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useAuthContext } from "~/contexts/hooks"
import useForm from "~/hooks/useForm"
import type { Error } from "~/hooks/useForm"
import { userApi } from "~/service"
import type { Keyof } from "~/types/common"
import type { APIUser, proficiencyType } from "~/types/domains"
import type { positionType } from "~/types/domains/user"
import { appendImageFileToFormData } from "~/utils"

const LENGTH_LIMIT_NICKNAME = 15
const LENGTH_LIMIT_DESCRIPTION = 25

const ProfileForm = () => {
  const {
    authProps,
    deleteMyProfileImage,
    updateMyProfileImage,
    updateMyProfile,
  } = useAuthContext()

  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)

  const [profileImage, setProfileImage] = useState<string | null>(
    DEFAULT_PROFILE_IMAGE_URL
  )
  const [isOpenDefaultImageModal, setIsOpenDefaultImageModal] = useState(false)
  const [isOpenEditConfirmModal, setIsOpenEditConfirmModal] = useState(false)

  const profileImageRef = useRef<HTMLInputElement>(null)

  const { values, errors, isLoading, setValues, handleSubmit } = useForm<
    Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">,
    HTMLButtonElement
  >({
    initialValues: {
      nickname: "",
      description: "",
      proficiency: null,
      positions: [],
    },
    onSubmit: async (values) => {
      if (authProps.currentUser) {
        const profileImageInputRef = profileImageRef?.current ?? null
        const editedProfileImageFiles = profileImageInputRef?.files ?? null
        const editedProfileImage = editedProfileImageFiles
          ? appendImageFileToFormData(editedProfileImageFiles[0], "image")
          : null

        try {
          if (editedProfileImage) {
            await updateMyProfileImage(editedProfileImage)
          }
          await updateMyProfile(values)
          router.replace(`/user/${authProps.currentUser.id}`)
          Toast.show("??????????????? ????????? ????????? ??????????????????. ????", 3000)
        } catch (error) {
          console.error(error)
        }
      }
    },
    validate: ({ nickname, description, positions, proficiency }) => {
      const errors: Error<
        Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">
      > = {}

      if (!nickname) {
        errors.nickname = "???????????? ????????? ??? ????????????."
      }
      if (nickname.length > LENGTH_LIMIT_NICKNAME) {
        errors.nickname = `${LENGTH_LIMIT_NICKNAME}??? ????????? ??????????????????.`
      }
      if (description !== null) {
        if (description.length > LENGTH_LIMIT_DESCRIPTION) {
          errors.description = `${LENGTH_LIMIT_DESCRIPTION}??? ????????? ??????????????????.`
        }
      }
      if (!proficiency) {
        errors.proficiency = "???????????? ??????????????????."
      }
      if (positions.length < 1) {
        errors.positions = "????????? 2??? ?????? ????????? ??????????????????."
      }

      return { ...errors }
    },
  })

  const getMyProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getMyProfile()
      const { description, nickname, positions, proficiency, profileImage } =
        data.user

      setValues({
        description,
        nickname,
        positions,
        proficiency,
      })

      setProfileImage(profileImage)

      setIsFetching(false)
    } catch (error) {
      console.error(error)
    }
  }, [setValues])

  useEffect(() => {
    getMyProfile()
  }, [getMyProfile])

  const handleChangeProficiency = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const proficiency = target.value as Keyof<typeof proficiencyType>
      setValues((prev) => ({ ...prev, proficiency }))
    },
    []
  )

  const handleChangePositions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedPosition = e.target.value as Keyof<typeof positionType>

      setValues((prev) => {
        switch (selectedPosition) {
          case "C":
          case "PF":
          case "PG":
          case "SF":
          case "SG":
            return {
              ...prev,
              positions: [prev.positions[1], selectedPosition],
            }
          case "TBD":
            return { ...prev, positions: [selectedPosition] }
          default:
            return { ...prev }
        }
      })
    },
    []
  )

  if (isFetching || isLoading) {
    return (
      <div style={{ height: "90vh" }}>
        <BasketballLoading />
      </div>
    )
  }

  return (
    <div>
      <form>
        <Center>
          <Spacer gap="xs">
            <UploadableArea
              inputRef={profileImageRef}
              onChangeFileSrc={(fileSrc) => setProfileImage(fileSrc)}
            >
              <Avatar
                isEdit
                src={profileImage || DEFAULT_PROFILE_IMAGE_URL}
                shape="circle"
                __TYPE="Avatar"
              />
            </UploadableArea>
            {profileImage && (
              <Button
                onClick={() => setIsOpenDefaultImageModal(true)}
                type="button"
                secondary
              >
                ?????? ????????? ???????????? ????????????
              </Button>
            )}
          </Spacer>
        </Center>
        <Container gap="md" type="vertical">
          <div>
            <Input
              autoFocus
              label="?????????"
              type="text"
              name="nickname"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={values.nickname}
              isRequired
              placeholder="15??? ????????? ???????????? ??????????????????"
              max={LENGTH_LIMIT_NICKNAME + 1}
            />
            <LetterCount>
              {values.nickname.length}/{LENGTH_LIMIT_NICKNAME}
            </LetterCount>
            <ErrorMessage size="sm" block>
              {errors.nickname}
            </ErrorMessage>
          </div>
          <div>
            <Input
              label="?????? ???????????? ??????????????????"
              type="text"
              name="description"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={values.description ?? ""}
              placeholder="ex) ?????? ?????? ?????????????????? ??????, ?????? ???????????? ????????????. ????????? ???????????????."
              max={LENGTH_LIMIT_DESCRIPTION + 1}
            />
            <LetterCount>
              {values.description ? values.description.length : 0}/
              {LENGTH_LIMIT_DESCRIPTION}
            </LetterCount>
            <ErrorMessage size="sm" block>
              {errors.description}
            </ErrorMessage>
          </div>
          <div>
            <Label isRequired>?????????</Label>
            <PositionsPicker
              selectedValue={values.positions}
              onChange={handleChangePositions}
            />
            <ErrorMessage size="sm" block>
              {errors.positions}
            </ErrorMessage>
          </div>
          <div>
            <Label isRequired>?????????</Label>
            <ProficiencyPicker
              selectedValue={values.proficiency}
              onChange={handleChangeProficiency}
            />
            <ErrorMessage size="sm" block>
              {errors.proficiency}
            </ErrorMessage>
          </div>
        </Container>
        <BottomFixedButton
          disabled={!!Object.keys(errors).length}
          type="submit"
          onClick={() => setIsOpenEditConfirmModal(true)}
        >
          ????????? ?????? ????????????
        </BottomFixedButton>
      </form>

      <LeadToLoginModal
        headerContent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            ?????? ????????? ???????????? ??????????????????????
          </div>
        }
        isOpen={isOpenDefaultImageModal}
        cancel={{
          content: "??????",
          handle: () => {
            setIsOpenDefaultImageModal(false)
          },
        }}
        confirm={{
          content: "????????????",
          handle: async () => {
            try {
              await deleteMyProfileImage()
              setIsOpenDefaultImageModal(false)
              setProfileImage(null)
            } catch (error) {
              console.error(error)
            }
          },
        }}
      />

      <LeadToLoginModal
        headerContent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            ???????????? ??????????????????????
          </div>
        }
        isOpen={isOpenEditConfirmModal}
        cancel={{
          content: "??????",
          handle: () => {
            setIsOpenEditConfirmModal(false)
          },
        }}
        confirm={{
          content: "?????? ????????????",
          handle: (e) => {
            try {
              handleSubmit(e)
              setIsOpenEditConfirmModal(false)
              router.replace("/user/edit")
            } catch (error) {
              console.error(error)
            }
          },
        }}
      />
    </div>
  )
}

export default ProfileForm

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled(Spacer)`
  padding: ${({ theme }) => `30px ${theme.previousTheme.gaps.base} 120px`};
`

const UploadableArea = styled(Upload)`
  text-align: center;
`

const LetterCount = styled(Text)`
  ${({ theme }) => css`
    &.error {
      color: ${theme.previousTheme.colors.red.strong};
    }
  `}
`

const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    text-align: right;
    flex-grow: 1;
    color: ${theme.previousTheme.colors.red.strong};
  `}
`
