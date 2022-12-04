---
title: Jest의 mock은 내부적으로 어떻게 구현되어 있을까?
slug: how-jest-mock-works
date_published: 2021-12-01T07:46:00.000Z
date_updated: 2022-01-09T13:55:13.000Z

---

우리 팀은 리팩토링의 황금 규칙을 따라, 코드 구조를 수정하기 전 항상 테스트 코드를 작성해 원치 않는 행동에 변경이 일어나는 것을 막고 있다. 테스트 코드를 작성하고, 리팩토링 하던 중 일어난 일이다.

## [문제 발생] 왜 테스트가 이상하게 동작하지?

    test('함수 1 테스트', () => {}); // TEST PASSED ✅
    
    
    test('함수 2 테스트', () => {}); // TEST FAILED ❌
    
    
    test('함수 3 테스트', () => {}); // TEST FAILED ❌

로직이 수정되지 않았는데, 테스트가 결과가 달라졌다?
당시 **나는 함수 1을 리팩토링했다.  그런데 연관되지 않은 함수 2, 3의 테스트가 실패했다. **이들 함수는 서로 로직이 분리되어 있는 함수였다. 이유를 도무지 알 수가 없었다 🤔. 

## [공통점 포착] 문제가 생긴 테스트에는 공통점이 있다.

로직에는 문제가 없음을 확인했다. 함수 1과 2, 3은 서로 분리되어 있어, 서로 영향을 미칠 수 없다. 그렇다면 문제는 테스트 코드 자체가 아니었을까? 

    test('함수 1 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(X);
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Y);
    });
    
    test('함수 2 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Z);
    });
    
    test('함수 3 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(W);
    });
    

모두 모듈A::메소드a를 mocking하고 있다
문제가 생긴 테스트에는 **공통점**이 있었다. 모두 **같은 모듈의 같은 메소드를 모킹(mocking)하고 있다는 점**이다. 테스트 코드에서 mock은 테스트하고자 하는 대상의 '로직'만을 순수하게 분리할 때 사용한다. 

예를 들어, 결제 모듈의 로직을 테스트하려 하고, 이 모듈에서는 인증 서버의 API를 호출한다고 가정하자. **결제 모듈 로직 테스트의 성공/실패 여부는 인증 서버의 상태와는 독립적으로 유지되어야 한다**. 이 경우, 인증 서버의 API를 호출하는 부분을, 실제로 API 요청을 보내는 것이 아닌, 우리가 이미 알고 있는 '정답값'을 반환하도록 세팅해놓으면, 결제 모듈의 로직만을 순수하게 테스트할 수 있을 것이다. 대부분의 테스트 프레임워크는 mock 기능을 제공한다.

## [문제점 발견] mock의 반환값이 한 칸씩 밀린다?

불현듯, 내가 함수 1에서 수정한 사항이 떠올랐다. **함수 1을 리팩토링하면서 `모듈A::메소드a`의 호출 횟수가 2번에서 1번으로 줄었지만, 테스트 코드는 수정되지 않아 여전히 `모듈A::메소드a`의 mocking 함수가 2번 호출되고 있었다. **

    test('함수 1 테스트', () => {
     	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(X);
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Y);
    	// `모듈A::메소드a`는 한 번 밖에 호출되지 않는다.
    });
    
    test('함수 2 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Z);
    	// `모듈A::메소드a`를 호출하면 Y가 반환된다.
    });
    
    test('함수 3 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(W);
    	// `모듈A::메소드a`를 호출하면 W이 반환된다.
    });
    

나는 함수 1, 2, 3 테스트의 mocking된 함수의 반환값을 로그로 찍어보았다. '함수 2 테스트'에서 호출되는 `모듈A::메소드a`의 경우 `Z`를 반환하도록 mocking되어 있지만 실제로는 `Y`를 반환했다. **Jest는 마치 mock의 반환값이 한 칸씩 밀린 것처럼 동작**했다. 함수 1 테스트의 mocking 함수를 2번에서 1번 호출하는 것으로 변경하자 모든 테스트가 통과했다. 

    test('함수 1 테스트', () => {}); // TEST PASSED ✅
    
    test('함수 2 테스트', () => {}); // TEST PASSED ✅
    
    test('함수 3 테스트', () => {}); // TEST PASSED ✅

## [오픈소스 들여다보기] Jest는 mock을 어떻게 구현했을까?

`jest.spyOn(모듈, 메소드).mockResolvedValue(더미값)`에서 `spyOn` 함수의 인자로 넘겨진 `모듈`의 `메소드`는, 테스트 도중 호출될 경우 `더미값`을 리턴한다. 우리가 사용한 함수는 `mockResolvedValueOnce()` 으로 끝에 `Once` 라는 접미사가 붙어있다. `모듈::메소드`가 여러 번 호출되어도 딱 한 번만 우리가 설정한 `더미값` 이 리턴된다는 의미다.

`mockResolvedValueOnce(더미값)` 에 설정한 값이 한 칸씩 뒤로 밀렸던 것으로 볼 때, **이 함수는 `single queue`에 값을 `PUSH`해놓았다가, 하나씩 `POP`해서 사용할 것이라고 추측할 수 있다**. 실제로도 그럴까? [Github에 공개된 Jest 프로젝트의 소스코드](https://github.com/facebook/jest)를 확인해보자.

우리가 사용했던 jest의 `mockResolvedValueOnce()`는 `mockImplementationOnce()` 의 syntatic sugar다([Link](https://github.com/facebook/jest/blob/main/packages/jest-mock/src/index.ts#L727-L728)).

    f.mockResolvedValueOnce = (value: Unpromisify<T>) =>
    	f.mockImplementationOnce(() => Promise.resolve(value as T));

jest mock은 내부적으로 `MockFunctionConfig` 타입의 `mockConfig` 변수를 관리한다([Link](https://github.com/facebook/jest/blob/main/packages/jest-mock/src/index.ts#L176-L181)). **내부의 `specificMockImpls`이 `Array<Function>` 타입임을 확인할 수 있었다.**

    type MockFunctionConfig = {
    	mockImpl: Function | undefined;
    	mockName: string;
    	specificReturnValues: Array<unknown>;
    	specificMockImpls: Array<Function>; // 
    };

`mockImplementationOnce()` 함수는 **호출 시 인자로 받은 함수 **`**fn**`**을 함수 어레이에 PUSH**한다([Link](https://github.com/facebook/jest/blob/main/packages/jest-mock/src/index.ts#L743-L751)).

    f.mockImplementationOnce = (
    	fn: ((...args: Y) => T) | (() => Promise<T>)
        ): Mock<T, Y> => {
        	const mockConfig = this._ensureMockConfig(f);
        	mockConfig.specificMockImpls.push(fn); // 함수 호출 시 인자로 받은 함수 fn을 어레이에 푸시
        	return f;
            };

mocking한 함수가 호출되면 `specificMockImples` 어레이에 element가 있는지 확인하고, 있다면 **맨 앞의 인덱스를 POP, **비어있다면 `mockImpl` (여기에서는 undefined)를 리턴한다.([Link](https://github.com/facebook/jest/blob/main/packages/jest-mock/src/index.ts#L647-L650))

    const mockImpl = mockConfig.specificMockImpls.length
    	? mockConfig.specificMockImpls.shift() 
    	: mockConfig.mockImpl;
    return mockImpl && mockImpl.apply(this, arguments);

종합해서, `jest.spyOn()` 의 `mockResolvedValueOnce()` 가 내부적으로 single queue로 구현되어 있을 것이라는 추측이 옳았다. 함수가 호출될 때 jest 내부의  `specificMockImpls` 어레이의 상태를 주석으로 표현하면 다음과 같다.

    test('함수 1 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(X); // [X]
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Y); // [X, Y]
        
    	call 모듈A::메소드a // X 리턴, 어레이에는 [Y]가 남아있음
    });
    
    test('함수 2 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(Z); // [Y, Z]
        
    	call 모듈A::메소드a // Y 리턴, 어레이에는 [Z]가 남아있음
    });
    
    test('함수 3 테스트', () => {
    	jest.spyOn(모듈 A, '메소드a').mockResolvedValueOnce(W); // [Z, W]
        
    	call 모듈A::메소드a // Z 리턴, 어레이에는 [W]가 남아있음
    });

## [문제 해결] 원인을 해결하기 

우리는 `mockResolvedValueOnce()`에서 세팅한 dummy return 값이 해당 테스트에서만 적용되고, 다음 테스트에는 영향을 미치지 않기를 바란다. **매 테스트가 실행될 때마다 `specificMockImpls` 가 초기화되기를 바라는 것**이다. 

Jest configuration에서 매 테스트마다 mock 세팅을 초기화하는 설정인 `resetMocks`을 `true` 로 설정([Link](https://jestjs.io/docs/configuration#resetmocks-boolean))하니 mock에서 값이 밀리는 문제가 해결되었다.

    // jest_config.json
    
    {
    	"resetMocks": true,
    	...
    }
    

## 마치며

오픈소스를 쓰다보면 특정한 상황에서 패키지가 어떻게 동작할지 궁금한 경우가 생긴다. **Documentation에는 궁금한 케이스가 구체적으로 나와있지 않은 경우, 오픈소스 코드를 뒤져 직접 살펴보는 방법**이 있다. 대개 contributor를 위해 소스코드의 아키텍쳐에 대한 설명이 추가되어 있는 경우가 많아 크게 난이도가 높지 않다. 이 글을 통해 오픈소스에 한 걸음 가까워졌기를 바라며 이만 글을 마친다.
