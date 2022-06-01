[![Netlify Status](https://api.netlify.com/api/v1/badges/87c0390f-8dbe-4a17-bfc3-966c79692a93/deploy-status)](https://app.netlify.com/sites/slamsapp/deploys)
[![Node.js CI](https://github.com/slamapp/client/actions/workflows/publish.yml/badge.svg)](https://github.com/slamapp/client/actions/workflows/publish.yml)

<div align="center"><img src="https://user-images.githubusercontent.com/84858773/147056456-b9bf8e99-0b5b-46fe-bd86-01e9cba8e6ca.png" width="250px"></div>

<div align="center">
<div>같이 농구할 사람이 없다고?<br />나랑 슬램하러 가자 ⛹🏻‍♀️</div>
<div><a href="https://slams.app/">👉 https://slams.app 👈</a></div>
<br>
<div><img src="https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/emotion-C43BAD?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"></div>

</div>

<br>

# 🏀 프로젝트 소개

*Slam*은 길거리 농구인들이 쉽고 빠르게 게임할 수 있도록 주변 농구장의 인원 현황을 제공하는 커뮤니티 웹앱 서비스입니다.

<br>

## ❓ 기획 배경

길거리 농구를 하러 나가고 싶어도 현재 가려는 농구장에 사람이 몇 명인지 알 수 없다는 기존 문제점을 해결하기 위해 ‘슬램’ 프로젝트를 시작했습니다.

<br>

## 📝 요구사항 명세

💁‍ [요구사항 명세 보러가기](https://github.com/slamapp/client/wiki/%EC%8A%AC%EB%9E%A8-%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD-%EB%AA%85%EC%84%B8)

<br>

## 🧾 기능 요약

### 사용자

- 지도 뷰에서 가려는 농구장을 찾아 원하는 시간대에 해당 농구장을 방문할 거라고 약속을 하고, 약속한 시간대에 본인 외에 몇 명이 더 예약했는지 이미지로 구분하여 현황을 알 수 있습니다.
- 사용자는 지도에 자주 가는 농구장 정보가 없다면 직접 새 농구장 정보를 추가할 수 있습니다.
- 자주 가는 농구장을 즐겨찾기에 등록할 수 있습니다.
- 슬램에서 만난 다른 유저들의 프로필을 확인할 수 있고, 팔로우해 친목을 다질 수 있습니다.
- 내 프로필에서 간단한 정보(숙련도, 선호 포지션 등)를 기입하여 자신을 나타낼 수 있습니다.

### 관리자

- 관리자는 사용자가 추가 제안한 새 농구장 목록 중 처리 대기 중인 항목, 처리 완료된 항목별로 편하고 빠르게 조회하고, 승인과 거절을 할 수 있습니다.

<br>

## 🎯 타겟 유저

- 동네 기반으로 길거리 농구를 즐기고 싶은 사람
- 쉽고 빠르게 농구를 하고 싶은 사람

<br>

그럼 우리 다같이 슬램 하러 가볼까요? 🏃‍♂️

<br>

# 👨‍👩‍👧‍👧 팀원 소개

|                          종현(마누)                           |                           영주(리키)                           |
| :-----------------------------------------------------------: | :------------------------------------------------------------: |
| ![Manu](https://avatars.githubusercontent.com/u/61593290?v=4) | ![Ricky](https://avatars.githubusercontent.com/u/15336672?v=4) |
|            [manudeli](https://github.com/manudeli)            |          [yungjurick](https://github.com/yungjurick)           |

<br>

# 👨‍👩‍👧‍👧 전 팀원

|                           정희(한나)                           |                           세림(앤)                           |                          경희(노체)                           |
| :------------------------------------------------------------: | :----------------------------------------------------------: | :-----------------------------------------------------------: |
| ![Hanna](https://avatars.githubusercontent.com/u/68159627?v=4) | ![Ann](https://avatars.githubusercontent.com/u/33405125?v=4) | ![koby](https://avatars.githubusercontent.com/u/84858773?v=4) |
|           [grighth12](https://github.com/grighth12)            |          [Parkserim](https://github.com/Parkserim)           |              [limkhl](https://github.com/limkhl)              |

<br>

# ✨ 주요 기능 및 페이지 소개

📌 [자세한 기능이 보고 싶다면? Slam wiki에서 확인하세요!](https://github.com/slamapp/client/wiki)

| 스플래시                                                                                                                                                | 로그인 페이지                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147068207-5cdef085-b432-4abc-927c-f99436960530.gif" width="300px" /></p> | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147070340-9e6bcb8b-e127-44df-a7d8-09a9d0370284.png" width="300px"  /></p> |
| <li>splash 화면</li>                                                                                                                                    | <li>카카오 소셜 로그인</li> <li>로그인, 로그아웃</li>                                                                                                    |

| 탐색 페이지                                                                                                                                                                                                                   | 새 농구장 추가 페이지                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147075206-9eb4c87a-74b2-4570-9f97-d9bcc02bb9ec.gif" width="300px"/></p>                                                                        | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147076714-be09e5f3-7ebd-4709-ba4f-07583d15b1a3.gif" width="300px" /></p> |
| <li>현재 날짜와 시간 기준</li> <li>확대,축소 가능</li> <li> 날짜와 시간대 선택 가능</li> <li>참여자 수에 따른 농구공 변화</li> <li>농구공에 즐겨찾기, 예약 표시</li> <li>농구장 정보 상세 보기</li> <li>예약 페이지 이동</li> | <li>새 농구장 추가 가능</li><li>지도에서 위치 마커</li><li>새 농구장 추가 validation</li>                                                               |

| 예약 페이지                                                                                                                                            | 예약 목록 페이지                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147082187-d29a72f6-c163-4c2f-8268-f920efde7a41.gif" width="300px"/></p> | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147079726-ef9907e6-8f45-4f9e-888c-0279f4064203.gif" width="300px"/></p> |
| <li>예약 생성</li><li>예약 수정, 취소</li>                                                                                                             | <li>예약 목록 조회</li> <li>다가올 예약, 지난 예약</li><li>확성기 기능</li><li>참여한 유저 정보 조회</li>                                              |

| 즐겨찾기 페이지                                                                                                                                        | 카카오톡 공유하기                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147082565-980dcce3-a4a6-4ba0-b4d8-3d8587d16b19.png" width="300px"/></p> | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147075427-caa39619-c9df-4773-8cde-d7e521530eae.png" width="300px"/></p> |
| <li>즐겨찾는 농구장 목록</li><li>즐겨찾기 삭제 기능</li> <li>카카오맵 위치</li>                                                                        | <li>해당 농구장 카카오톡 공유</li>                                                                                                                     |

| 프로필 페이지                                                                                                                                          | 프로필 편집 페이지                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147077776-f5d6e874-7efb-45e8-9a41-53e4dff3622f.jpg" width="300px"/></p> | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147078391-90d9022d-9bf9-4a2d-8d40-a707d9b1f49d.gif" width="300px"/></p> |
| <li>내 프로필 조회</li><li>다른 유저 프로필 조회</li>                                                                                                  | <li>프로필 편집 validation</li> <li>기본 이미지로 변경 가능</li>                                                                                       |

| 관리자 페이지                                                                                                                                           | 알림 페이지                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147078821-289bad97-815b-4657-ab3d-ba6abdec289f.gif" width="300px" /></p> | <p align="center"><img src="https://user-images.githubusercontent.com/84858773/147082497-922b3e48-4180-4b4b-bac4-a913a0853b8d.jpg" width="300px" /></p> |
| <li>사용자가 추가한 새 농구장 목록 관리</li><li>목록 조회(무한 스크롤)</li><li>새 농구장 승인 및 거절</li>                                              | <li>알림 목록 조회</li> <li>상단 네비게이션 뱃지로 갯수 확인</li>                                                                                       |

<br>

# ⚡ 프로젝트 실행 방법

node v16.13.0
yarn

```bash
yarn cache clean
yarn
yarn dev
```

<br>

# 🔗 Server Git Repo

[Slam Server](https://github.com/prgrms-web-devcourse/slam-server)
