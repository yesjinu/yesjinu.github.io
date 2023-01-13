---
layout: '../../layouts/BlogPost.astro'
title: 데이터베이스 학습 메니페스토

pubDate: 2021-07-08T00:47:00.000Z


draft: true
---

며칠 전 QA 테스트 용 게임 서버가 먹통이 되고 접속이 되질 않는 문제가 있었다. 에러 로그를 살펴보니 QA 서버 내에 등록되지 않은 id의 product가 판매되고 있다는 내용이 확인되었다. 이건 또 무슨 일일까. 에러 로그와 함께 찍혀있는 product id는 QA 서버에 등록된 마지막 product id보다 3배는 큰 수였다. QA용 테스트 세팅 중 모종의 이유로 Prod 용 product가 섞여들어갔고 아이템을 초기화하는 시점에 문제가 발생한 것으로 추정됐다.

해결의 실마리가 보인다. DB에서 문제가 되는 내용을 포함한 레코드 값을 삭제하면 될 터였다. 문제가 된 product id는 개수는 정확히 알 수 없지만 대략 6개 정도. 나는 `SELECT * FROM db.table ORDER BY id DESC` 쿼리를 통해 가장 최근 만들어진 product를 뒤져서 문제가 된 레코드를 찾아낼 심산이었다. 어렵지 않게 문제가 된 레코드를 발견할 수 있었다. 그때, 옆에서 지켜보고 있던 동료가 말을 걸어왔다. ‘잘못 등록된 product가 몇 개 일지 모르니 `LIKE` operator 이용해서 비슷한 id가 더 없나 검색해보죠.’, ‘네? `LIKE`가 뭐에요?’ 그날 나는 `LIKE` 와 `%`, `_`를 이용해 특정한 패턴을 가진 문자열을 검색할 수 있음을 알게되었고, 덕분에 (흐릿한) 내 눈에 의존하지 않고 문제를 해결할 수 있었다.

서론이 길었다. 오늘부터, 데이터베이스에 대한 학습을 시작하고자 한다. 졸업시점의 압박으로 대학 재학 중 수강하지 못하고 졸업했기 때문이다. 홀로 공부할 수 있도록 돕는 자료는 인터넷에 무한하기 때문에, 의지만 있다면 혼자서도 충분히 가능할 것이라고 생각했다. 사실 `LIKE` 따위의 키워드 뿐만 아니라, `storage engine간 차이점`, `index와 B-tree`, `데이터베이스 생명주기와 ER model`, `transaction` 등, DB 트러블슈팅 중에 접하는 키워드들을 더 잘 이해하고 싶다는 욕구가 있었다.

일단 시작은 책 구매부터. 한빛아카데미에서 나온 [MySQL로 배우는 데이터베이스 개론과 실습]이다. 대학 교재로도 사용되는 구성이 알찬 책이고, learning by doing을 실천할 수 있을 것 같아 이것으로 선택했다. 퇴근 후 틈틈히 공부해서 정리한 내용을 블로그에 올릴 계획이다. 굳이 블로그에 선언하는 이유는, 이렇게 해야 내가 더 지속할 수 있을 것 같기 때문.

나는 아직 젊고, 배울 것은 끝없이 많다. 꾸준히, 제대로 배우면 누구나 정상에 다다를 수 있다. 그런 믿음으로 시작한다.