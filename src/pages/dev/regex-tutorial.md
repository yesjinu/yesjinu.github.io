---
layout: '../../layouts/BlogPost.astro'
title: Regex로 당신의 검색에 날개를 달아주세요

pubDate: 2021-10-31T11:37:25.000Z


---

## 1. Intro.

정규표현식(Regular expression, Regex)에 관한 재미있는 일화*가 있어 소개한다. 1972년, 벨 연구소에 다음과 같은 문의 전화가 왔다고 한다.

> **“휴대용 계산기를 거꾸로 들면 숫자 중 일부가 글자가 된다는 것을 알게 됐습니다. 예를 들면, 3은 E가 되고, 7은 L이 되죠. 계산기를 거꾸로 들었을 때 만들 수 있는 단어가 어떤 것들이 있는지 알아봐주실 수 있을까요?”**

당시 벨 연구소에서 일하던 브라이언 커닝햄(주석)은 계산기를 거꾸로 들었을 때 만들어질 수 있는 알파벳이 B, E, H, I, L, O, S 임을 확인하고, 키보드 앞에 앉아 다음과 같은 명령어를 입력했다고 한다. `grep '^[behilos]*$' /usr/dict/web2`

/usr/dict/web2 파일은 Webster’s Second International 사전에 등재된 234,936 개의 단어를 모두 포함하고 있는 파일이다. 커닝햄은 순식간에 계산기를 뒤집어 만들 수 있는 263개의 단어를 찾아낼 수 있었고, 그 단어 목록을 프린터로 출력해 전화를 걸었던 이에게 보내주었다고 한다.

위와 같은 특수한 상황이 아니더라도, 코드를 작성하다보면 특정한 **패턴**을 찾고싶은 경우가 생긴다. 찾고싶은 텍스트가 있다면 `Cmd(Ctrl) + F`로 쉽게 찾아낼 수 있겠지만, 패턴은 그렇지 않다. **'알파벳 B, E, H, I, L, O, S 로만 이루어진 단어'를 어떻게 검색할 것인가?** 정규표현식으로는 가능하다. 정규표현식은 당신의 검색에 날개를 달아준다. 그 문법을 배워보자.

## 2. How to use?

### 1) 표기

Regex 리터럴은 슬래시(“/”)로 감싸 표현한다. `/찾고싶은_패턴/` 과 같이 표현하는 식이다. 간결한 표기를 위해, 아래 글에서는 슬래시를 생략하기로 한다.

- 패턴을 ‘인자’로 넘기는 경우에는 슬래시를 생략한다. 위의 예시에서 grep에도 인자를 넘길 때, 슬래시를 생략하고 패턴만 문자열로 만들어 넘겼다. Visual Studio Code도 regex 검색을 지원하는데, 이 역시 슬래시 없이 문자열만 입력하도록 되어있다.
- 리터럴의 마지막 슬래시 오른쪽에 `flag`를 붙이기도 하는데, `/abc/i` 와 같이 표현하는 식이다. 이는 "case-insensitive하게 검색하라"는 의미가 된다. `i` 이외에도 `g` (global 전역 검색) `m` (multiline 다중행) 등이 있다. ([링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions#%ED%94%8C%EB%9E%98%EA%B7%B8%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%9C_%EA%B3%A0%EA%B8%89%EA%B2%80%EC%83%89))

### 2) 단순 패턴

단순 패턴은 문자열을 있는 그대로 대응시키고 싶을 때 사용한다. 우리가 일반적으로 사용하는 검색 방식과 같다. ‘abc’라는 패턴은 문자열에서 정확히 ‘abc’라는 문자가 모두 함께, 순서대로 나타나야 대응된다.

### 3) 특수 문자

Regex는 특수 문자를 사용할 때 빛을 발한다. 문법과 함께 예시를 보면서 이해해보도록 하자.

**그룹**

- `cat|dog` : 'cat' 혹은 'dog'에 해당하는 문자열에 매칭된다.
- `[]` : 문자셋(Character Set)으로 대괄호 안의 어떤 문자와도 대응된다.
- `s[ae]t` : 'sat', 'set'에 해당하는 문자열에 매칭된다.
- `s[a-e]t` : Dash(-)를 사이에 쓰면 범위를 나타내게 되어 'sat', 'sbt', 'sct', 'sdt', 'set'에 매칭되게 된다.
- `[^a-e]` : 대괄호([])와 hat(^)을 같이 사용하면 a-e에 해당하지  않는 모든 문자에 매칭된다. 'sft', 'sgt' 등에 매칭된다.
- `()` : 매칭된 문자열을 '그룹'으로 만들어 '저장'한다.

**문자**

- `\d` : 0부터 9까지의 숫자에 매칭된다.
- `\w` : `[a-zA-Z0-9_]`와 같다. 'a'부터 'z'까지, 'A'부터 'Z'까지, 숫자 0부터 9까지에 매칭된다.
- `\s` : 스페이스 바, 탭, 라인 브레이크에 매칭된다.
- `.` : 라인 브레이크를 제외한 모든 문자에 매칭된다. 마침표를 검색하고 싶으면  .와 같이 검색하면 된다.

**개수 Quantifier**

- `?` : 0 ~ 1개. `ca?t`은 'ct', 'cat'에 매칭된다.
- `+` : 1 ~ n개. `ca+t`은 'cat', 'caat', 'caaat', 'caaaat' ... 에 매칭된다
- `*` : 0 ~ n개. `ca*t`은 'ct', 'cat', 'caat', 'caaat', ... 에 매칭된다.
- `{n}` : n개. `ca{3}t`은 'caaat'에 매칭된다.
- `{a, b}` : a ~ b개.  `ca{1, 3}t`은 'cat', 'caat', 'caaat'에 매칭된다.

**이 외**

- `^` : 라인의 첫 시작에 매칭된다.
- `$` : 라인의 마지막에 매칭된다.

## 3. Example

Regex는 아무리 설명을 읽어도, 실제로 작성하기 전까지는 감이 오지 않는다. 작성한 regex에 매칭되는 문자열을 실시간으로 확인해볼 수 있는 [웹사이트](https://regexr.com/)를 켜놓고, 실습해보도록 하자.

**특정 문자만 매칭하기**

    (MATCH) can  
    (MATCH) man  
    (MATCH) fan  
    (SKIP)  dan  
    (SKIP)  ran  
    (SKIP)  pan 
    --------- 
    [cmf]an      # 문자셋을 사용해 c, m, f로 시작하는 문자열만 매칭된다.
    [^drp]an     # 문자셋과 ^을 함께 사용해 d, r, p로 시작하는 단어는 제하고 매칭된다.

반복되는 문자 매칭하기

    (MATCH) wazzzzzzup 
    (MATCH) wazzzup 
    (SKIP)  wazup 
    --------- 
    waz{2,}up     # quantifier를 이용. 두번째 인자를 생략하면 제한 없이 매칭된다.

    (MATCH) aaaabccc
    (MATCH) aabbbbc
    (MATCH) aacc
    (SKIP)  a
    ---------
    a+b*c+      # a: 1개 이상, b: 0개 이상, c: 1개 이상인 경우 매칭되는 패턴이다.

공백 매칭하기(MATCH) 

    (MATCH) 1. abc
    (MATCH) 2.   abc
    (MATCH) 3.      abc
    (SKIP)  4.abc
    ---------
    \d\.\s+abc   # 숫자 온점 이후에 공백이 1개 이상 포함된 문자열만 매칭된다.
                 # 앞에서부터 차례로 읽으면 된다.
                 # \d(숫자)\.(온점)\s+(공백이 1개 이상)abc(단순 패턴)

시작과 끝에 매칭하기

    (MATCH) Mission: successful 
    (SKIP)  Last Mission: unsuccessful 
    (SKIP)  Next Mission: successful upon capture of target 
    ---------
    ^Mission: successful$  # ^와 $ 사이의 패턴이 정확히 라인의 시작과 끝에 매칭된다.

그룹 매칭하기(MATCH)  

    (MATCH) Mission: successful 
    (SKIP)  Last Mission: unsuccessful 
    (SKIP)  Next Mission: successful upon capture of target 
    ---------
    ^Mission: successful$  # ^와 $ 사이의 패턴이 정확히 라인의 시작과 끝에 매칭된다.
                           # 이것 역시 앞에서부터 차례로 읽으면 된다.
                           # ^(라인 시작)file(단순 패턴).+(모든 문자가 1개 이상)\.(온점)pdf(단순 패턴)$(라인 끝)
    

## 4. Outro.

Regex와 관련한 유명한 농담이 있다.

> ***어떤 사람들은 문제에 맞닥뜨렸을 때 ‘정규표현식을 이용해서 해결해야지’ 생각하곤 한다. 오래지않아, 그들은 이제 문제가 2개가 되었음을 깨닫는다.***

Regex는 생각만큼 쉽게 익숙해지지 않는다. 이정도면 다 알게 되었다고 생각하는 순간, 다시 낯설게 느껴지는 경우가 생길 것이다. 처음부터 완벽하게 숙달할 필요는 없다. 필요해질 때마다 한 번씩 다시 찾아본다면, 어느새 익숙해진 자신을 발견하게 될 것이다.

## Reference.

- 브라이언 커니핸, 『유닉스의 탄생』, 한빛미디어(2020), 141–145p.
- [MDN Regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) : Regex에 대한 표준적인 설명과 javascript 사용 예제를 함께 접할 수 있습니다.
- [regexone](https://regexone.com/) : Regex에 대한 훌륭한 설명과 예제를 제공합니다. 이 포스팅의 다룬 예제도 이 웹사이트에서 빌려온 것들입니다.
- [regexr](https://regexr.com/) : 실시간으로 regex를 작성해보고 매칭 결과를 확인해볼 수 있는 playground입니다.
- [regexper](https://regexper.com/) : 작성한 regex 패턴을 이용해 state machine을 그려주는 웹사이트입니다. regex가 작동하는 과정을 시각화해 확인할 수 있습니다.
