---
layout: '../../layouts/BlogPost.astro'
title:  "JAVA parseInt() vs. valueOf() 무엇을 써야할까?"

pubDate: 2022-06-12T05:56:41.000Z


---

Java로 코드를 작성하다보면, 문자열 타입의 숫자(`"123"`)을 숫자 타입으로 바꾸어야 할 필요성이 생긴다. 이때 사용하는 것이 java.lang 패키지 `Integer` 클래스의 `parseInt()`와 `valueOf()` 메소드다. 둘 중 무엇을 쓰더라도 에러가 발생하지 않기 때문에 신경쓰지 않기 쉽지만 실은 두 메소드는 서로 다른 방식으로 동작하며 결정적인(!) 차이가 있다. 이 차이에 대해 알아보면서 `Integer` 클래스가 코드 레벨에서 어떻게 구현되어 있는지 알아보자.

### What is `Integer` class?

`Integer` 클래스는 Java primitive type인 `int`를 래핑해 object로 제공한다. 즉, `int` 타입의 `value`를 사용하기 편리하도록 메소드가 딸린 클래스로 제공하는 것이다. 이를 '박싱된 기본 타입'이라고 부르기도 한다.  `Integer` 타입의 오브젝트는 오직 하나의 필드(`value`)를 가지고 있으며, 그 타입은 `int`이다. `Integer` 클래스는 `toString()`, `toHexString()`, `getChar()`, `compare()` (이외에도 여러가지) 메소드를 제공하며 `parseInt()`와 `valueOf()`도 여기에 포함된다.

```java
public final class Integer extends Number implements Comparable<Integer> {
    ...
    private final int value;
    ...
}
```

Integer 클래스는 오직 하나의 필드, int 타입의 value를 가지고 있다.

### How `parseInt()` implemented?

```java
public static int parseInt(String s, int radix)  
            throws NumberFormatException  
{  
    if (s == null) {  
        throw new NumberFormatException("null");  
    }  
    
    if (radix < Character.MIN_RADIX) {  // Character.MIN_RADIX == 2
        throw new NumberFormatException("radix " + radix +  
                                        " less than Character.MIN_RADIX");  
    }  
    
    if (radix > Character.MAX_RADIX) {  // Character.MAX_RADIX == 36
        throw new NumberFormatException("radix " + radix +  
                                        " greater than Character.MAX_RADIX");  
    }  
    
    boolean negative = false;  
    int i = 0, len = s.length();  
    int limit = -Integer.MAX_VALUE;  
    
    if (len > 0) {  
        char firstChar = s.charAt(0);  
        if (firstChar < '0') { // Possible leading "+" or "-"  
            if (firstChar == '-') {  
                negative = true;  
                limit = Integer.MIN_VALUE;  
            } else if (firstChar != '+') {  
                throw NumberFormatException.forInputString(s);  
            }  
    
            if (len == 1) { // Cannot have lone "+" or "-"  
                throw NumberFormatException.forInputString(s);  
            }  
            i++;  
        }  
        int multmin = limit / radix;  
        int result = 0;  
        while (i < len) {  
            // Accumulating negatively avoids surprises near MAX_VALUE  
            int digit = Character.digit(s.charAt(i++), radix);  
            if (digit < 0 || result < multmin) {  
                throw NumberFormatException.forInputString(s);  
            }  
            result *= radix;  
            if (result < limit + digit) {  
                throw NumberFormatException.forInputString(s);  
            }  
            result -= digit;  
        }  
        return negative ? result : -result;  
    } else {  
        throw NumberFormatException.forInputString(s);  
    }  
}
    
```

매우 자주 쓰이고 유명한 메소드임에도 구현은 생각보다 길지 않다는 점이 주목할만 하다. 하지만 많은 것들이 그렇듯, 단순해보이는 로직 안에 많은 고민이 녹아있다! 

로직의 흐름을 개념 단위로 묶어 살펴보면 다음과 같다.

1. 잘못된 input의 경우 early return 한다 (input이 null이거나 radix 범위 이상)
2. input 스트링의 처음부터 마지막까지 한 글자씩 받아온다.
3. 한 글자씩 숫자로 변환하며 radix를 곱해 result에 누적해나간다.
4. 첫 글자가 '-' 부호로 시작했다면 마지막에 '-'를 붙이고, 아니라면 그냥 리턴한다.
5. `parseInt()` 메소드는 최종적으로 primitive type인 `int` 타입을 리턴한다. 

추가로, 코드를 자세히 살펴보면 몇 가지 재미있는 점이 있었다.

- `MAX_RADIX`가 36으로 정해져있었다. `MIN_RADIX`는 2로 고정된 것이 어느정도 납득이 가지만, `MAX_RADIX`는 왜 하필이면 36이어야 했을까? 이는 십진법이 숫자 10개와 알파벳 26개로 나타낼 수 있는 character가 총 36개만 존재하기 때문이다. 37진법 숫자를 표기하기 위해서는 36개 이외에 새로운 문자를 도입해 37번째 숫자를 표현할 수 있어야한다.
- `parseInt()`는 문자열의 맨 앞부터 한 자리씩 `String.charAt()`으로 받아와 digit으로 변환(`Character.digit()`), radix를 곱한 이후에, 0에서 **누적해서 빼도록** 되어있다. 그리고 마지막에 첫 character가 '-' 부호로 시작했는지 여부에 따라 누적 차감한 결과값에 다시 '-'를 씌우도록 되어있다. 왜 0에서 더해나가는 식으로 구현되지 않았을까? 이는 int 값의 범위가 symmetric하지 않기 때문이다. 가장 작은 int 값은 -2147483648인데 반해, 가장 큰 int 값은 2147483647이기 때문에, 0에서부터 더해나가는 방식으로는 -2147483648을 표현할 수 없다.

### How `valueOf()` implemented?

```java
public static Integer valueOf(String s, int radix) throws NumberFormatException {  
    return Integer.valueOf(parseInt(s,radix));  
}

public static Integer valueOf(int i) {  
    if (i >= IntegerCache.low && i <= IntegerCache.high)  
        return IntegerCache.cache[i + (-IntegerCache.low)];  
    return new Integer(i);  
}
```

`valueOf()`는 `parseInt()`를 이용해 받아온 `int` 타입의 결과물을 `Integer` 오브젝트로 변환해 리턴하는 식으로 구현되어 있다. 이 과정에서 메모리를 효과적으로 사용하기 위해 매번 새로운 Integer 오브젝트를 생성하는 것이 아닌 IntegerCache를 이용해 오브젝트를 재활용하는 모습이 흥미롭다.

### 그렇다면 언제 무엇을 써야할까?

둘은 결국 같은 로직 (`parseInt()`)을 통해 숫자(int, Integer)로 변환되기 때문에 parsing으로 인한 성능의 차이는 거의 없을 것이라 말할 수 있다. 다른 점은 최종적으로 반환되는 형태가 primitive 타입인 `int`냐, wrapper class인 `Integer`냐 뿐이다. 결국 이 질문은 다음과 같이 바뀐다.

> '도대체 어떤 상황에서 `int` (혹은 `Integer`) 타입을 사용해야 하는가?'

### 선택에 도움을 받기 위해 몇 가지를 비교해보자.

**Q. 표현할 수 있는 숫자 크기에 차이가 있는가?**
A. Integer 클래스 안의 value 역시 int 타입이기 때문에 표현할 수 있는 크기는 같다.

**Q. 사용하는 용도에 차이가 있는가?**
A. 큰 틀에서 용도의 차이는 보이지 않는다. 오히려 `Integer` 오브젝트의 경우 함께 딸린 메소드를 활용해 더 유연하게 사용할 수 있다는 장점이 있다.

**Q. 프로그래머가 별도로 신경써야할 점이 있는가?**
A. 없다. Java는 primitive value(`int`)가 상응하는 wrapper class의 오브젝트(`Integer`)로 자동으로 변환되는 `Autoboxing` 기능을 제공한다(반대의 경우 `Unboxing`이라고 한다). 프로그래머는 `int` 타입과 `Integer` 타입이 호환되지 않는 것을 우려하지 않아도 된다.

**Q. 퍼포먼스에 영향을 미치는가?**
A. Primitive type인 `int`는 메모리 4 byte를 차지하는 데에 반해, wrapper object인 `Integer`는 16 byte를 차지한다. 하드웨어가 발전한 요즘 무시할만한 크기인 것으로 보인다. `Integer` object를 생성하는 데에 드는 오버헤드는 `IntegerCache`를 이용해 개선 가능해보인다.

### 결론

결과적으로 바이트 단위로 메모리를 아껴야 하는 환경이 아니라면 `int`와 `Integer` 중 무엇을 쓰든 상관이 없어보인다. 오히려 `Integer`를 사용하는 것이 더 나은 개발 경험을 제공할 것이므로 `Integer` 사용을 권장해야하는 것이 아닐까 싶기도하다. **하지만.. 정말 그럴까?**

### 진짜 결론

`java.lang` 패키지의 `Integer` 클래스를 직접 구현한 Josh Bloch는 그 유명한 [이펙티브 자바] 책의 저자이기도 한데, 그는 책의 <아이템61: 박싱된 기본 타입보다는 기본 타입을 사용하라>에서 **`Integer`와 같이 박싱된 기본 타입보다는 `int` 같은 기본 타입을 사용할 것을 권한다.** 왜 그럴까? 이는 다음 포스팅에서 알아보자. 

### Reference

- [[Stack Overflow] Why does the Integer.parseInt() algorithm calculate negative result finally in sum](https://stackoverflow.com/questions/40167218/why-does-the-integer-paseint-algorithm-calculate-negative-result-finally-in-su)
- [[Stack Overflow] Why is there a Radix limit in JAVA](https://stackoverflow.com/questions/8106209/why-is-there-a-java-radix-limit)
