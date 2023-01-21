---
layout: '../../layouts/BlogPost.astro'
title:  코드숨 7주차 과정 회고

pubDate: 2022-07-24T02:58:27.000Z

draft: true

---

# Lesson learned

### `@Bean` 어노테이션에 관하여 ([리뷰 링크](https://github.com/CodeSoom/spring-week7-assignment-1/pull/70/files#r925529464))

Bean은 애플리케이션의 여러 객체 중, 스프링 IoC 컨테이너에 의해 직접 초기화되고, 매니징되는 객체들을 일컫는 말이다. 스프링 프레임워크는 Dependency Injection를 통해 IoC principle을 쉽게 구성할 수 있게 해준다. DI는 객체를 생성할 때 객체가 의존하고 있는 다른 객체를 생성자 or 팩토리 메소드에 정의하는 식으로 구현이 된다. 스프링 컨테이너는 여러 객체들(beans)을 생성해놓고 저장해두었다가, 다른 객체를 생성할 때 필요한 경우 beans를 생성자에 주입해주는 역할을 수행한다. `@Bean`은 method에 붙는 어노테이션으로, JavaConfig가 이 어노테이션을 만나면 메소드를 실행하고 리턴 값을 bean으로 등록한다.

### `@Configuration` 어노테이션에 관하여 ([리뷰 링크](https://github.com/CodeSoom/spring-week7-assignment-1/pull/70/files#r925529762))

`@Configuration`은 클래스에 붙는 annotation으로, 해당 클래스에서 1개 이상의 `@Bean` 어노테이션이 붙은 메소드가 있음을 나타낸다. `@configuration`이 붙은 클래스는 `AnnotationConfigApplicationContext` 혹은 `AnnotationConfigWebApplicationContext에` 의해 부트스트랩된다.

### `BCryptPasswordEncoder`에 관하여 ([리뷰 링크](https://github.com/CodeSoom/spring-week7-assignment-1/pull/70/files#r925531071))

`BCryptPasswordEncoder`는 spring security의 `PasswordEncoder` 인터페이스의 한 구현체로, `bcrypt` 해시 함수를 이용한 encode 기능을 제공한다. `bcrypt` 해시 함수를 이용한 암호화는 decode가 불가능한 encode 기능을 제공한다.

# Thoughts

이번 주는 Spring security에 대한 프로젝트를 진행했다. 사실 거의 진행을 못 했다. (핑계를 대자면..) 아샬님의 강의를 듣고 나서도 스프링 시큐리티의 동작 방식에 대해 잘 이해하지 못하겠더라. 인터넷을 통해 이것저것 자료를 찾아보았는데, 그래도 잘 이해가 가지 않았다. '그래.. `WebSecurityConfigurerAdapter`를 `extends`하고, `configure()` 메소드를 오버라이드해서 인자로 받은 HttpSecurity 타입의 http를 적절하게 세팅하면... 근데 내가 지금 뭘 하고 있는 거지?' 스프링 시큐리티가 HTTP 요청을 중간에 가로채 authenticate 과정을 수행해준다는 어렴풋한 이해 외에는 아무것도 모르는 채로 코드만 베끼고 있다는 생각이 들었다. 

효능감이 떨어져서 그런지 코드숨을 진행하기가 힘들었다. 이번 주는 거의 코드를 작성하지 못한 채로 끝이 났다. 종립님께서도 리뷰할 건덕지가 없으시니... `@Bean`과 `@Configuration` 어노테이션에 대한 리뷰를 남겨주셨다. 그냥 어렴풋이 짐작만 하고 있었던 역할을 주석을 찾아보면서 공부했다. 이렇게라도 효능감을 높이고 싶었다.. 
