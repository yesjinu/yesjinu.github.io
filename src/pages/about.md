---
layout: "../layouts/BlogPost.astro"
title: "노진우, Jinu Noh"
updatedDate: "2023/01/14"
heroImage: "/about-me.jpeg"
---

# Contacts 📬
- Email: [yes.jinu@gmail.com](mailto:yes.jinu@gmail.com)
- Github: [github.com/yesjinu](https://www.github.com/yesjinu)
- LinkedIn: [노진우, Jinu Noh](https://www.linkedin.com/in/jinu-noh-59a770185/) 

---
# Introduce 🙋🏻‍♂️

- 데브시스터즈의 신설 P2E 프로젝트의 초기 멤버로 합류해 개발팀 워크 프로세스를 셋업하고, Java & Spring boot 기반 웹 서버 아키텍쳐를 설계했습니다.
- 베이글코드에서 Typescript & express 기반 게임 서버를 개발/운영(MAU 100만 명, DAU 20만 명)했습니다.
- 두 회사에서 모두, 신설 팀의 초기 멤버로 합류해 개발팀 워크 프로세스를 셋업하고, 아키텍쳐 설계에 참여한 경험이 있습니다.

---
# Work Experiences 👨‍🚀

> ### 데브시스터즈 (2022.01 ~ 2022.11) 
> <u>블록체인 기반 신규 프로젝트, 시장 상황 악화로 사업 중단</u>

### 서비스 프로토타입 개발
- Java/Spring Boot 기반, 웹 백엔드 설계 및 구현
  - User journey map 기반 백엔드 설계 ([링크](https://yesjinu.fly.dev/ghost/#/editor/post/629383ae3fe3ba020b16e914/))
  - Domain Driven Design 도입, 각 도메인이 독립 확장 가능하도록 구현
- CI/CD 자동화
  - Github actions 이용, PR이 머지되면 자동으로 빌드 후 배포되는 yaml 스크립트 작성
- Next.js 12 & Tailwindcss 기반, 웹 프론트엔드 작업
  - 어드민 웹사이트, NFT 민팅 웹사이트, 플립필드 법인 소개 웹사이트, 마켓플레이스 웹사이트 설계 및 구현
### 개발팀 리딩
- Git flow, 코드 리뷰 문화 도입
  - 개발팀(3인)에 Git flow를 기반으로 한 브랜치 관리 전략 도입
  - 코드 리뷰를 통해 팀원 모두가 성장할 수 있는 환경을 만듦
- 스프린트/회고 도입, 진행
  - 티켓 기반으로 업무를 분해하고 할당해 팀의 업무 진행 정도를 가시화
  - 스프린트/회고를 도입하고 진행해 개발자, 기획자, 디자이너(총 5명)가 함께 일할 수 있는 환경을 만듦

### 팀 빌딩 및 업무 방식 주도적 개선
- 회의록 템플릿 제작
  - 회의의 어젠다가 불분명하고, 회의 이후에 후속 액션이 취해지지 않는 것에 대해 이슈 레이징. 회의록 템플릿을 제작하고 팀원들의 지지를 받아 정착시킴
- 팀 전체의 블록체인 도메인 지식 향상 노력
  - 슬랙에 익명 질문 채널(`#ask-stupid-question`)을 개설하고, 팀 위키에 `[블록체인 용어사전]`을 만들어 팀원들이 블록체인 도메인에 대한 지식을 부끄러움없이 질문하고 공유하는 문화를 만듦


> ### 베이글코드 (2020.12 ~ 2022.01)
> <u>MAU 100만 명, DAU 20만 명의 소셜카지노 모바일 게임 서비스</u>

### 플랫폼 설계/구현/배포
- NestJS & Typescript 기반, 플랫폼 설계/구현
  - 로그인/인증, 결제 검증 서버의 설계/구현에 참여. 현재 신규 런칭 게임에 적용(응답 지연 P50 39ms, P99 53ms)
- 프로젝트 빌드/배포를 자동화 GitLab CI/CD 구축 (링크)
- 서비스 안정성을 높이는 유닛 테스트 도입 및 자동화
  - Jest를 사용해 구현된 서비스에 유닛, E2E 테스트 도입, 추후 리팩토링 작업에 큰 도움이 됨. 테스트는 빌드 과정 중 자동화 처리.
- 팀 내 통일된 개발환경 Docker-compose 작성
  - 서비스의 의존 관계가 복잡해짐에 따라 로컬 개발환경을 통일할 필요. Docker-compose 파일을 작성했고 팀의 표준 환경으로 정착
- EKS 인프라를 관리 오브젝트 환경설정 파일(yaml) 유지/보수
  - 시니어 개발자가 구성해놓은 아키텍쳐 명세에 맞게 오브젝트 환경설정 파일을 작성/수정하고 kubectl을 이용해 배포함

### 개발환경 구축
- 신설 팀의 주 개발 언어/프레임워크 선택에 참여
- 개발 생산성을 높이기 위한 초기 개발환경 구축 (링크) 

### 인프라/백오피스 개선
- Down time 없이 DB 스키마 변경 (AWS RDS 환경)
  - 수행 결과를 세미나를 통해 발표, 위키로 정리해 공유함 (하단 서술)
- 단위 A/B 테스트를 2개 이상 혼합 테스트 위한 백오피스 기능 개발

### 게임 서버 개발/배포/운영
- Node.js & Typescript 기반, 인앱 이벤트 게임 서버 파트 개발
  - 게임 기획자, 클라이언트 개발자, 테크니컬 아티스트와 협업. 좋은 평가를 받아 다음 배포 버전에 해당 피쳐 라이브함
- 안정적인 서버 운영을 위한 에러 로그 트래킹 및 트러블 슈팅
  - 주기적으로 On-Call 배정되어 장애 대응을 담당함
- 레거시 Javascript 코드를 Typescript로 마이그레이션 진행


---
# Skills 🛠
<!-- 여기에 DDD, AWS solutions architect 들어가면 좋을듯 -->
- Back-End: Java/Spring Boot, TS/JS/Express/NestJS, AWS(EC2, EKS, RDS)
- Front-End: React/Next.js, Tailwindcss
- Database: MySQL, Redis
- DevOps: CI/CD, Docker

---
# Education 🎓
- <b>포스텍</b>, 컴퓨터공학/화학공학 (2014.03 ~ 2021.08)

---
# Projects & Personal Experiences 👩‍🌾
- [POSTECH 제34대 학부 총학생회장](https://times.postech.ac.kr/news/articleView.html?idxno=21424) (2020.01 ~ 2020.12)
  - 8명의 국장단, 40명의 집행국원과 함께 학교 학생 사이의 의견을 조율하는 창구 역할 수행
  - 코로나19로 인한 비대면 전환의 시점에 중요하다고 생각되는 일들을 발굴해 완수
    - 군복무 중 온라인 강좌를 통한 학점 이수가 가능하도록 학칙을 개정
    - 오래된 교내 학습관리시스템(LMS) 플랫폼을, 오픈소스 기반의 moodle로 교체
    - 코로나로 인한 비대면 장기화를 고려해 관련 총학생회칙을 개정
    - 온라인 POSTECH-KAIST 학생대제전을 추진

---
# Presentation & Article 🎁

- [네이버 커넥트 부스트캠프](https://boostcamp.connect.or.kr/) 웹 백엔드 리뷰어 (2022.09 ~ 2022.10)
  - 네이버 커넥트 재단에서 운영하는 개발자 양성 과정에 웹 백엔드 리뷰어로 활동
  - Node.js/express를 기반 코드 리뷰 및 멘토링 진행
- 오픈소스 구조 분석 세미나 (2021.06 ~ 2021.07)
  - 개발자 커뮤니티에 속해 오픈소스의 실행 구조를 분석하는 세미나에 참여
  - Node.js 프로젝트의 실행 구조에 대한 세미나를 진행
- [다운 타임 없는 DB 스키마 변경](https://drive.google.com/file/d/1DkewV7Syt-qsR9PXIlHkw2Q9iM0VKVzO/view) (2021.06)
  - 사내 개발팀 세미나에서 발표자를 맡아, 라이브 중인 서비스의 DB 스키마를 alter한 경험을 공유
  - 테스트 과정에서 겪었던 트러블슈팅 경험을 팀원들에 공유하는 것을 목표로 함
- git똥차게 배우는 git/github 강의 (2020.09 ~ 2021.02)
  - git/github을 활용하는 방법에 대한 강의를 제작해 배포
  - 교내 오픈 강좌 플랫폼에 등록되어, 교내 구성원 교육에 활용됨