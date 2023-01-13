---
layout: '../../layouts/BlogPost.astro'
title:  코드숨 5주차 과정 회고

pubDate: 2022-07-10T05:05:34.000Z


---

# `Lesson learned`

### Lombok annotaion에 관하여

- 몇 annotation은 위험하기로 악명이 높다. 특히 `@AllArgsConstructor`는 예상하지 못한 문제를 일으킬 수 있다. `@AllArgsConstructor`는 class에 선언된 field 순서대로 constructor를 생성한다. 때문에 모종의 이유로 클래스에 나열된 field의 '순서'가 변경되었을 때, 겉으로 드러나지 않게(implicit하게) constructor의 argument 순서도 변경된다는 점이 문제가 될 수 있다. 순서가 뒤바뀐 argument의 타입이 달랐던 경우에는, 기존에 constructor를 호출하던 곳에서 타입 불일치가 일어나 IDE에서 경고를 띄우겠지만, 하필이면 순서가 바뀐 argument가 같은 타입이었다면 IDE에서 경고를 띄우지 않고 어물쩡 넘어가버리는 문제가 생길 수 있다. ([Review link](https://github.com/CodeSoom/spring-week5-assignment-1/pull/69#discussion_r913740190))
- 팀 내에서 Constructor-based DI를 수행할 때 constructor를 일일이 만드는 대신 `@RequiredConstructor`를 쓰는 것이 어떻겠냐는 의견이 나왔다. 찬성하는 측과 반대하는 측 각각 합당한 이유를 댔다. 'Explicit하게 주입되는 의존성을 확인하는 것이 좋지 않겠느냐' vs. 'DI는 비즈니스 로직의 핵심이 아니고, final 필드를 통해 주입되는 의존성을 확인할 수 있다'는 의견이 맞붙었다. 당시에는 직관에 의존해 '도입해도 무리가 없을 것 같다'는 판단을 내렸다. ([Review link](https://github.com/CodeSoom/spring-week5-assignment-1/pull/69#discussion_r916762339))

### 기술 결정을 내리는 것에 관하여.

- `@RequiredCosntructor`에 대한 도입을 고려할 때도 그랬지만, 기술에 대한 새로운 의사결정을 내릴 때마다 직관에 의존하는 방법은 한계가 있어보인다. 적어도 몇 가지 고려사항은 있어야 하지 않을까하는 생각. 종립님과 대화를 나누는 중에 나왔던 기준들에 대해 적어본다.

- 첫째로, 도입했을 때 코드를 읽기 더 좋아지는가?

- 코드는 한 번 쓰이고 여러 번 읽힌다. 때문에 읽기에 좋은 코드를 작성하는 것이 매우 중요하다.
- 그렇다면 '읽기에 좋은 코드'의 기준은 무엇인가? 내가 작성한 코드를 처음보는 사람이 30분 안에 기능을 수정해야 한다고 가정해보자. 이 사람이 코드를 이해하는 데에 무리가 없을지를 기준으로 삼으면 좋을 것이다.

- 둘째로, 쓸 수 없는 상황이 되어 들어내게 되었을 때 작업이 지나치게 많아지지는 않는가?

- 어떤 라이브러리/기술/툴은 코드와 너무 강하게 결합된 나머지, 쓸 수 없는 상황이 되어도 들어내기 어려워지기도 한다. 처음으로 라이브러리/툴을 도입하기 이전에, 들어내야하는 상황을 미리 준비한다면 도입을 보류하거나, 더 나은 방식의 도입을 생각할 수 있을 것이다.

### 
패키지 구조와 단일책임원칙(SRP)에 관하여.

- 종립님은 패키지를 나누는 기준으로** "유지보수하는 사람(운영업무를 받아서 30분 안에 처리해야 하는 사람)이 이 기능을 찾아서 고치려면 어떻게 찾아들어가게 될까"**를 생각해볼 것을 권했다. 코드를 읽고 이해하는 것 이전에 '코드가 어디에 있을지 찾는 것'도 일이다. 예측한 가능한 곳에 코드가 있도록 만들어야 한다. 그 방법의 하나로 'Controller 하나가 URI 하나를 담당하게 하고 && 패키지 경로를 그대로 URI로 사용한다'는 규칙을 사용할 수도 있다. ([관련 링크](https://johngrib.github.io/wiki/article/hierarchical-controller-package-structure/#%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC%EC%97%90-%EA%B3%84%EC%B8%B5%ED%98%95-%ED%8C%A8%ED%82%A4%EC%A7%80-%EA%B5%AC%EC%84%B1), )
- 하나의 패키지, 하나의 클래스, 하나의 메소드는 '단 하나'의 책임을 맡아, 이를 수행해야 한다. 회사의 CEO가 되었다고 생각해보자. 여러 전문 분야를 가진 사람들이 모아 함께 일하면서 프로덕트를 만들어나가는 것처럼, 코드 설계 역시 **"협력하는 객체를 어떻게 분리할 것인지"** 고민해보는 것이 좋다. 종립님의 조언은 이 역시 **회사를 운영하는 관점에서 생각하면 좋다**는 것. 프로젝트와 회사의 구조가 닮아있다는 사실에 주목하면, 몇 가지 통찰을 얻을 수 있다. 예컨대, 회사 규모에 따라 조직 구조가 달라지는 것처럼, 코드 베이스의 크기에 따라 적합한 아키텍쳐의 형태가 서로 달라질 것이라는 것.

### 인터페이스를 활용하는 것에 관하여.

- 서버의 controller는 DTO(ex. `UserDTO`)를 적절한 형태(ex. `User`)로 가공해 service 로직에 넘기게 된다. 이때 호출되는 service 로직에 따라 `User`에서 가져다 쓰고싶은 필드가 달라질 수 있다. 예컨데 `userService.register()`를 호출하는 것이라면 `User`의 `name`, `age` 필드가, `userService.delete()`를 호출하는 것이라면 `User`의  `password` 필드가 필요한 식이다. 이때 `register()`와 `delete()` 메소드에 User 타입을 곧바로 넘겨도 괜찮지만 Java의 interface를 활용하면 더 좁은 범위의 타입만을 통과시키는 코드를 작성할 수도 있다.
- 예컨대, `UserRegisterRequest`라는 인터페이스를 만들고 `getName()`과 `getAge()`를 지정하는 식이다. 자연스럽게 `UserDeleteRequest`의 인터페이스는 `getPassword()`가 될 것이다. `User` 클래스는 `UserRegisterRequest`와 `UserDeleteRequest`를 `implements`하게 만들고 `userService.register()`는 `UserRegisterRequest` 타입만을 인자로 받도록, `userService.delete()`는 `UserDeleteRequest` 타입만을 인자로 받도록 한다.
- 이렇게 되면 메소드의 이름과 인자 이름이 스스로를 충분히 설명하게 되고, 사용자 등록에 무엇이 필요한지는 인터페이스 내부에 캡슐화되게 된다. Controller에서 Service 메소드에 `User`를 그대로 넘겨줘도 서비스 로직에서는 `User`를 알지 못하게 되고, 인터페이스만을 알게 할 수 있다.
