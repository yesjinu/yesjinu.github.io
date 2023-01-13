---
layout: '../../layouts/BlogPost.astro'
title: 코드숨 2주차 과정 회고

pubDate: 2022-06-19T00:25:38.000Z


---

# Lesson learned

### 팀으로 함께 일하는 방법

- 새롭게 추가한 dependency의 설명을 PR 리뷰 형태로 달면 좋다. 가능하면 장점과 함께, dependency를 없앨 때 예상되는 우려점도 함께 적어주자. ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r895653085))
- 프로젝트의 전체 구조를 설명하는 그림을 최상단 README에 포함하면 좋다. 어떤 레이어에서 어떤 객체(DTO, DAO, VO, entity, etc.)가 생성되어 어느 레이어까지 전달되는지. 각 레이어의 책임은 어디까지인지. 왜 이렇게 레이어가 나뉘어야 하는지 ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r895656090))
- 리뷰를 남길 때에는, 내 주장의 근거가 되는 레퍼런스까지 함께 남겨주면 좋다. 이렇게 함으로써 단순히 코드 취향의 문제가 아닌 객관적으로 더 나은 선택을 하는 데에 도움을 받을 수 있다. ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r895656798))

### 개발, 코드

- 정적 팩토리 메소드에는 특별한 네이밍 컨벤션이 있다! ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r896744470))
- Entity라는 단어에는 생각보다 심오한 의미가 포함되어 있다! ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r896747190))
- 에러 메시지에 에러가 발생한 맥락을 포함하면 좋다. ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r900082602))
- 원하는 기능을 제공하는 클래스가 없으면 만들어서 쓸 수도 있다. ([해당 리뷰1](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r899053831), [해당 리뷰2](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r899053831))
- Gradle dependency의 종류 알고 쓰자. `implementation`? `runtimeOnly`? `developmentOnly`? ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r899052083))

### 그 외

- 리뷰에 `@`을 사용하면 해당 이름을 가진 github 유저에게 알림이 간다😥. 코드임을 표시하는 '`' 기호를 함께 달자 ([해당 리뷰](https://github.com/CodeSoom/spring-week2-assignment-1/pull/87#discussion_r900079074))

# 개인적 감상 

- 이번 주에는 퇴근 후에 운동과 코드숨 과제하는 데에만 시간을 썼다. 밤 11시까지 책이나 코드를 읽고 나면 눈이 침침하고, 뇌를 더이상 쓰고 싶지 않다는 느낌을 받기도 했지만, 마음만은 뿌듯했다. 정말로 Java/Spring을, 더 나아가 백엔드 개발을 잘하고 싶었기 때문이다.
- 나는 지금껏 개발 실력을 '코드를 작성하는 것'에만 초점을 맞춰왔다. 복잡한 코드를 잘 작성하는 능력을 기르기만 하면, 무언가를 뚝딱 만들어낼 수 있는 테크닉을 공부하기만 하면, 금세 '잘하는' 개발자로 인정받을 수 있을 것이라 생각했다.
- 종립님의 피드백을 받으면서 '잘하는' 개발자는 어떤 사람일까 생각해보게 됐다.

# 어떤 사람이 '잘하는' 개발자? 

### 백엔드 개발의 기본적인 컨셉을 이해하고 있는 사람

습관처럼 사용하는 `@Entity`, `@Repository` 어노테이션. 각각 어떤 의미를 담고 있을까? Controller, Service, Persistence 레이어로 나누어 서버 아키텍쳐를 구성하는 `Layered architecture`. 이 구조를 차용하면 어떤 장점이 있고 또 어떤 단점이 있을까? 

개발 튜토리얼을 따라하는 것만으로도 돌아가는 코드를 작성하는 것은 어렵지 않다. 하지만, 이름에 함축되어 생략된 '컨셉'을 이해한다면, 백엔드 아키텍쳐의 레이어를 분리하는 의도와 그 장단점을 이해할 수 있다면, 보다 나은 코드를 작성할 수 있을 것이다.

### 좋은 프로덕트란 무엇인가에 대해 고민하는 사람

> 예외 메시지를 작성할 때 이렇게 하는 방법도 있습니다. 
> 
> "task를 찾지 못했기 때문에, task를 수정하지 못했습니다." 
> 
> 어떤 작업이 실패하게 되었는지도 설명해주는 거죠. 어쩌면 누군가는 새벽 3시에 끝날 디버깅을 이 메시지 덕분에 새벽 1시에 끝내고 집에 가게 될지도 모릅니다.

나는 'ID를 찾지 못했습니다' 정도로 작성한 예외 메시지를 종립님께서 수정해주셨다. 기술만 생각하는 사람에게 '좋은 예외 메시지를 작성하는 것'은 '수준 높은 아키텍쳐를 설계하는 것'에 비해 덜 대단해 보인다. 하지만 유저에게는 잘 짜여진 아키텍쳐보다 친절한 에러 메시지 하나가 더 많은 도움을 줄 수 있다. 좋은 프로덕트는 유저를 헷갈리게 하지 않는다. 좋은 개발자는 좋은 프로덕트를 만드는 사람이다.

### 함께 일하기 좋은 사람

미디어를 통해 비춰지는 개발자는 컴퓨터와만 대화하는 사회 부적응자처럼 묘사되지만, 실은 여느 직장인처럼 '함께 일할 수 있는 능력'(co-work-ability?)이 매우 중요한 직종이다. 

내가 작성한 `코드`, 남긴 `commit message`, 만든 `PR description`은 모두 **동료와 글로 나누는 대화**다. 개발자라면 누구든 하는 이 활동들을 '으레 하는 행동'으로 생각하는지, '**대화**'라고 생각하는지에 따라 메시지의 내용이 달라진다. 당연하게도, '이 글을 다른 사람이 읽을 것'이라는 생각을 가지고 메시지를 남길 때에야 말로, 이해하기 쉬운 글이 적힌다.
