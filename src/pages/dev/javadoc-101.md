---
layout: '../../layouts/BlogPost.astro'
title:  JavaDoc 첫 걸음

pubDate: 2022-06-10T21:54:28.000Z


---

## In brief, 

JavaDoc은 Java 소스 코드의 주석으로부터 HTML 포맷으로 코드에 대한 문서를 생성하는 툴

- JavaDoc 툴은 JDK에 포함되어 있음

## How to write JavaDoc

`/**` 로 시작해야 함!

    1. 일반 한 줄 코멘트
    // 
    
    2. 일반 여러 줄 코멘트
    /* 
     * 
     */ 
    
    3. JavaDoc!
    /** 
     * 
     */
    

### 구성

JavaDoc은 `코멘트`와 `block tags(@)`로 구성되어 있음

    /** 
     * Hero is the main entity . . . 
     * 
     * Please see the {@link com.baeldung.javadoc.Person} class\
     * @author Captain America 
     */ 
    public class SuperHero extends Person { // fields and methods }
    

### 몇 가지 `block tags(@)`

- *`@param`*  메소드 파라미터나 들어올 것이 예상되는 input에 대한 정보
- *`@return`* 리턴 (예상) 값
- *`@see`* 뒤에 링크를 생성함. `@link`와 비슷하지만 link와 같이 인라인 링크가 아닌 reference와 같은 형식으로 제시됨
- *`@since`*  어떤 버전에 이 클래스/필드/메소드가 추가되었는지 명시
- *`@version`*  소프트웨어 버전을 명시, `%I%` 나  `%G%`  매크로와 같이 쓰임
- *`@throws`*  던질만한 예외를 미리 명시해줌
- *`@deprecated`*  왜, 언제 deprecate되었는지, 대체제는 무엇인지에 대한 정보를 제공

## How to generate?

JDK에 포함된 command line tool 혹은 gradle 이용해 생성 가능

    $ javadoc -d doc src/*  # -d 옵션을 통해 문서 생성 위치 지정 가능
    
    $ ./gradlew javadoc

## Notable points

- JavaDoc은 private field에 대한 문서는 생성하지 않음. 단 -private 옵션을 추가하면 가능

## Reference

- [Javadocs | IntelliJ IDEA](https://www.jetbrains.com/help/idea/working-with-code-documentation.html)
- [Introduction to JavaDoc | Baeldung](https://www.baeldung.com/javadoc)
