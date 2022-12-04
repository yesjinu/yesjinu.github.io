---
title: Golang의 기본 문법에 대해 알아보자
slug: golang-tutorial
date_published: 2022-02-07T15:08:32.000Z
date_updated: 2022-02-07T15:08:32.000Z

---

# Intro

- 오늘은 Go 설치부터 간단한 문법에 대해 알아보겠다.

> Mac 기준으로 설명하겠다.

# How to install

1. Go 공식 웹사이트를 통해 다운로드를 진행한다.
2. Download Go for Mac 버튼을 통해 .pkg 파일을 다운로드 받고, 여타 애플리케이션 설치와 같은 방식으로 진행한다.
3. 설치가 완료되면 `~/`(사용자 홈 디렉토리)에 go 디렉토리가 설치되어 있어야 한다.
4. 설치되어 있지 않다면 `mkdir ~/go | mkdir -p ~/go/{bin,src,pkg}` 명령어를 통해 수동으로 폴더를 만들어야 한다.
5. 이후 `src/` 하위에 프로젝트 폴더 `sample/`과 `main.go`를 생성하고, VS code를 실행한다. 우측 하단에 go와 관련된 설치 요청 팝업이 뜰텐데, Install All 버튼을 누르고 go에 필요한 패키지들이 `bin/`과 `pkg/` 하위에 설치되도록 한다.
6. `go version` 커맨드를 통해 설치가 잘 진행되었는지 확인할 수 있다.

# Basics

### 1. Package, main

Package는 하나의 묶음 단위임. 여러 개로 쪼개진 파일을 하나의 단위로 묶고 싶을 때, 파일의 가장 상단에 `package` 키워드를 통해 이를 명시할 수 있음

    // Accounts.go
    package Bank
    
    ...
    
    // Deposit.go
    package Bank
    
    ...
    

컴파일러는 package 이름이 main인 파일을 먼저 찾아 entry point로 진입해 컴파일하기 시작한다. 따라서 코드가 컴파일 되길 원한다면 `package main`과 `main 함수`를 반드시 포함시켜야 한다.

    // main.go
    package main
    
    func main() {
      ...
    }
    

### 2. Variables, Constants

    // 변수와 상수는 var, const로 구분
    // 변수명을 먼저, 타입을 나중에 적는 식. Typescript에서 colon(:)만 빠진 형태
    var num1 int = 1
    var str1 string = "string thing"
    const boo1 bool = true
    
    // 함수 안에서는 아래와 같이 선언 가능하고, go가 자동으로 타입을 추론해줌
    func testFunc() {
    	num1 := 1
    	str1 := "string thing"
    	boo1 := true
    }
    

### 3. Functions

    // 기본적으로 Typescript와 동일한 순서로 타입을 적는다고 생각하면 된다.
    func sum(num1 int, num2 int) int {
    	return num1 + num2
    }
    
    // golang은 특이하게 한 번에 여러 값을 리턴할 수 있다.
    func lenAndUpper(name string) (int, string) {
    	return len(name), strings.ToUpper(name)
    }
    nameLength, upperName := lenAndUpper("jinu") // nameLength 4, upperName JINU
    
    // defer 키워드를 이용하면 함수 실행이 끝나고 나서 실행되는 코드를 삽입할 수 있다.
    func login() Authentication {
    	defer fmt.Println("User Logged-In!") // auth가 return된 이후에 호출됨
    	...
    	return auth	
    }
    
    // 인자로 여러 개를 넘길 경우 ... 키워드를 사용함 (Javascript의 Spread Operator)
    func iter(fruits ...string) {
    	...
    }
    iter("apple", "banana", "carrot")
    
    // 기본적으로 Go에서는 변수명의 시작이 소문자면 private, 대분자면 public으로 처리한다.
    // fmt라는 패키지에서 가져온 Println() 함수가 대문자로 시작하는 것도 같은 이유.
    

### 4. For, range, ...args

    // Go는 오직 for loop 만을 제공함. 파이썬과 자바스크립트가 섞인듯한 모습임.
    for i := 0; i < 10; i++ {
    	...
    }
    
    // Array를 순회할 때는 range 키워드를 쓰면 편리함
    for index, name := range fruits { // number = ["apple", "banana", "carrot"]
    	fmt.Println(index, name) // 0 apple 1 banana, 2 carrot
    }
    

### 5. If, switch

    // If와 Switch문 사용 역시 다른 언어와 동일함.
    func buyAlcohol(age int) Alcohol {
    	if age < 19 {
    		return nil
    	}
    	return alcohol
    }
    
    func buyUnderwear(sex string) Underwear {
    	switch sex {
    		case "Male":
    			return "pants"
    		case "Female":
    			return "skirts"
    	}
    }
    

### 6. Pointers

    // C언어와 문법이 같음. & 키워드를 통해 메모리 주소를 받아오고, * 키워드를 통해 dereferencing
    a := 1
    b := a
    fmt.Println(a, b) // 1, 1
    
    a := 1
    b := &a
    fmt.Println(a, b) // 1, 0xc00001a100
    
    a := 1
    b := &a
    *b = 7
    fmt.Println(a, b) // 7, 0xc00001a100
    

### 7. Array, Slices

    // Go의 Array는 선언 시 길이를 할당해야 함
    fruits := [5]string{"apple", "orange", "banana"}
    fruits[3] = "grape"
    fruits[4] = "peach" // 인덱스를 기반으로 접근해 값을 추가하거나 수정할 수 있음
    
    // Go의 Slice는 길이가 할당되지 않은 Array임
    regions := []string{"North America", "South America"}
    regions = append(regions, "Australia")
    regions = append(regions, "Africa") // append 함수를 통해 값을 추가할 수 있음
    

### 8. Maps

    jinu := map[string]string{"name": "jinu", "age": "28"}
    fmt.Println(jinu) // map[age:28 name:jinu]
    
    for key, value range jinu { // 이렇게 iterate도 가능함
    	...
    }
    

### 9. Structs

    // Go에는 class가 없다. struct를 이용해 복잡한 구조를 표현할 수 있다.
    type person struct {
    	name string
    	age int
    	friends []string
    }
    
    func main() {
    	jinu := person{
    		name: "jinu",
    		age: 28,
    		friends: []string{"James", "Alice", ...}
    	}
    
    	fmt.Println(jinu) // {jinu 28 [James Alice]}
    }
