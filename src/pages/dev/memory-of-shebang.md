---
layout: '../../layouts/BlogPost.astro'
title: Docker Alpine linux에는 /bin/bash가 없다.

pubDate: 2021-09-17T00:52:00.000Z


---

## [문제 발생] 왜 shell script를 찾지 못하지? 🔍

GitLab runner를 이용한 빌드 및 디플로이 결과(성공/실패)를 슬랙으로 받아보기 위한 코드 작업을 진행하고 있었다. 슬랙 웹훅의 endpoint에 빌드 결과를 정리한 API을 호출하는 쉘 스크립트를 먼저 작성하고, `gitlab-ci.yml`에서 이 스크립트를 호출하는 식으로 구현하고 있었다. 매끄럽게 일이 완수될 것이라는 기대와는 다르게 **GitLab Runner가 빌드 중 쉘 스크립트 파일을 찾지 못하는 에러**가 발생하며 빌드 job이 중간에 drop되었다.

## [원인 추론] 무엇이 문제일까? 🔍

### 가설 1. Typo

Shell script의 파일명을 잘못 입력했을 가능성이 있다. 하지만 (아쉽게도) 파일명은 제대로 입력되어 있었다.

### 가설 2. 실행 환경에서 파일이 보이지 않음

실행 디렉토리가 다르다든지 하는 이유로, 빌드를 실행하는 환경에서 shell script 파일이 보이지 않을 수 있다. 하지만 여러가지 방법으로 확인해보았으나 파일이 너무나 잘 보였다. 사건은 점점 미궁 속으로 빠졌다.

    cat slack_notification.sh           # 잘 출력됨
    find . name "slack_notification.sh" # 잘 찾아짐
    ls -l                               # 리스트에서 잘 확인됨

너무나도 잘 보이는 스크립트
### 가설 3. 쉘 스크립트 실행(execute) 권한이 없음

파일에 실행권한이 부여되지 않았을 수도 있다. 하지만 `ls -l` 커맨드로 파일의 권한을 확인해본 결과, 쉘 스크립트에 execute 권한은 부여된 상태였다. 

    -rwxr-xr-x   1 jinu  staff  1200 Sep 16 18:26 slack_notification.sh
    

user도, group도, other도 모두 이 파일을 실행할 수 있다.
만약 execute 권한이 없었다면 `permission denied` 에러가 났을 것이다.

### 가설 4. shell executer의 문제

GitLab CI/CD는 원하는 스크립트를 실행하는 shell executer를 명시적으로 지정할 수 있는 옵션을 제공한다([Link](https://docs.gitlab.com/runner/shells/#shbash-shells)). 명시적으로 `/bin/bash` 를 지정하면 문제가 해결될지도 모르겠다는 생각을 했다.

    cat 'slack_notification.sh' | /bin/bash
    

위 커맨드는 CI/CD 로그에서 본 것과 똑같은 not found 에러를 발생시켰다. 이때 머리 속을 스치는 무언가가 있었다.

## [문제 해결] 문제는 shebang이야! 🕵️

우리 팀의 빌드 서버는 `docker:latest` 베이스 컨테이너에서 위에서 빌드를 진행한다. `docker:latest` 이미지는 `Alpine linux`를 기반으로 만들어져 있었고([Link](https://github.com/docker-library/docker/blob/5c42a7382f317ef94c16eb264ff9337ef4b9a260/20.10/Dockerfile#L7)), 경량화된 리눅스를 표방하는 `Alpine linux`는 `bash`조차 지원하지 않고 있던 것이다! (대신 Alpine linux는 BusyBox가 제공하는 `ash`를 기본으로 사용한다)

내가 실행하고자 했던 'slack_notification.sh'의 상단에는 `#!/bin/bash`(shebang)이 포함되어 있었다. Shebang으로 시작하는 텍스트 파일이 있으면 프로그램 로더는 `#!`와 함께 명시된 인터프리터(여기에서는 `bash`)를 사용해 아래 라인들을 line-by-line으로 실행한다. 실행중인 컨테이너에 `/bin/bash`가 없으니 not found 에러가 날 수 밖에 없던 것이다.

그렇다면 해결할 수 있는 방법은 2가지가 될 것이다. 빌드 컨테이너에 `bash`를 설치하거나, alpine linux가 기본적으로 제공하는 shell인 `ash`을 사용하거나. Docker image는 대개 경량화를 위해 alpine linux를 베이스로 사용하는 경우가 많으니, docker를 앞으로도 계속 사용할 예정이라면 실행환경 중 bash가 없는 경우가 계속 생길 것이다.** 이후의 시행착오를 근본적으로 막기 위해 OS가 기본적으로 제공하는 shell을 사용하는 것이 낫겠다고 판단했다.** 대부분의 POSIX 시스템에서 `/bin/sh`는 실행환경 OS 사용하는 sh 구현체의 symlink로 연결되어 있으므로, shebang을 `/bin/sh` 로 변경하면 여러 실행환경에서 shell executer를 찾지 못해 에러가 발생하는 일은 없을 것이다.

Shell script 상단의 shebang을 `#!/bin/bash`  -> `#!/bin/sh` 로 수정하니 문제가 해결되었다.

## 참고

- [Shebang (Unix) - Wikipedia](https://en.wikipedia.org/wiki/Shebang_(Unix))
- [Alpine Linux](https://alpinelinux.org/)
- [Difference between sh and Bash - StackOverflow](https://stackoverflow.com/questions/5725296/difference-between-sh-and-bash)
