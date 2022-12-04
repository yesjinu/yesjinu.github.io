---
title: k8s 백엔드 엔지니어라면 반드시 알아야하는 쿠버네티스의 기초
slug: k8s-tutorial
date_published: 2021-10-16T06:57:00.000Z
date_updated: 2021-12-14T00:46:28.000Z

---

# k8s, 이런게 있습니다

### k8s는 **컨테이너 상태 오케스트레이션** 툴입니다.

- **컨테이너란?** 컨테이너는 딱 하나의 프로그램만을 구동하기 위한 가벼운 가상환경입니다. 컨테이너를 사용하면 프로그램 간 복잡한 dependency 문제에서 자유롭습니다.
- **상태란?** 컨테이너의 개수나 건강상태(health), 다른 컨테이너와의 관계 등을 의미합니다.
- **오케스트레이션이란?** 그런 컨테이너 여러 개를 상황에 적절하게 지휘하는 것을 의미합니다. 여러 컨테이너를 사용하다보면 불편한 점이 생깁니다. 라이브 중인 컨테이너가 알 수 없는 이유로 죽으면 어떻게 할까요? 새벽에 서버 접속 인원이 늘어 컨테이너 증설이 필요하다면 어떻게 해야할까요? 개수가 늘어나더라도 로드 밸런싱을 자동으로 할 수는 없을까요? k8s가 도울 수 있습니다. :)

k8s는 사람이 직접 해야했던 컨테이너 오케스트레이션 기능을 wrapping해서 제공하는 툴입니다. 유저는 yaml 파일을 작성하는 것으로 이 오케스트레이션을 지휘할 수 있습니다. 인간의 오케스트레이션 수고를 덜어주는 것이죠.

*Pod는 '파드', '팟' 으로 읽힙니다. 이 글에서는 '팟'으로 부르겠습니다.*
*팟은 컨테이너와 미묘하게 다르지만, 툴의 기본이 되는 atomic한 단위라는 점에서 비슷합니다. 아래 글은 팟=컨테이너라고 생각하며 읽으셔도 무방합니다.*

# k8s, 이렇게 동작합니다

도커가 작동하는 하나의 단위가 '컨테이너'였듯이, k8s는 '팟'이라는 단위로 작동합니다. k8s는 팟의 상태를 관리합니다. k8s가 유저의 어떤 요구를 어떻게 해결하고 있는지 케이스별로 살펴보면서, k8s의 동작에 대한 심적표상을 그려보겠습니다.

### 팟이 잘 살아있는지 자동으로 확인하고 죽으면 다시 띄워줄 수 없을까?

- 있습니다. k8s가 제공하는 `livenessProbe` 옵션은 주기적으로 팟이 살아있는지 체크해줍니다.

### 팟의 개수를 간편하게 관리할 수는 없을까?

- 있습니다. k8s가 제공하는 `replicaset` 오브젝트를 이용해 쉽게 팟의 개수를 원하는 만큼만 유지할 수 있습니다.

### 팟이 죽었을 때 알아서 복구되게 할 수는 없을까?

- 있습니다. 위에서 살펴본 `replicaset` 오브젝트는 팟의 개수를 관찰하고 있다가, 팟의 개수가 명령받은 값과 일치하지 않으면 팟을 다시 생성해줍니다.

### 여러 개의 팟을 롤링 업데이트하려는데 간편하게 할 수 없을까?

- 있습니다. k8s가 제공하는 `deployment` 오브젝트는 여러 개의 팟이 순차적으로 새로운 버전으로 업데이트되도록 돕습니다. 팟을 새롭게 만들고, 기존 팟을 지우는 식입니다.
- 배포 후 문제가 발생해도 편리하게 원하는 상태로 돌아갈 수 있습니다. 버전 관리가 가능한 것이죠!

### 여러 팟 간의 로드밸런싱을 편하게 할 수 없을까?

- 있습니다. k8s가 제공하는 `service` 오브젝트는 deployment의 여러 팟 간의 로드 밸런싱 기능을 제공합니다.
- 동시에 service 오브젝트는 바깥에서 접근할 수 있는 단 하나의 고유 IP를 제공하기도 합니다.

### 웹 서비스의 여러 기능들이 서로 다른 service object로 묶여있다. 유저가 사용하기 좋게 도메인을 나눌 수는 없을까?

- 있습니다. k8s가 제공하는 ingress object는 url 별로 서로 다른 서비스로 분리할 수 있도록 해줍니다.

# k8s, 이렇게 쓰면 됩니다

### 기본적인 개념들

- Object: k8s는 기능에 따른 역할을 수행하는 object를 만들어 두었습니다. Pod, ReplicaSet, Deployment, Service가 그것입니다. 하나의 역할을 수행하는 객체라고 생각하면 편리합니다.

### kubectl 커맨드 종류

가장 자주 사용하는 4가지만 설명하겠습니다. 나머지는 하나씩 찾아보세요!

- get : 원하는 object의 목록과 간략한 상태를 받아볼 수 있습니다. `kubectl get pods`와 같은 명령어로 pod들의 상태를 볼 수 있습니다.
- describe: Pod의 상태를 자세하게 보고 싶을 때 사용하는 명령어입니다. `kubectl describe 팟이름` 으로 사용합니다.
- logs: Pod 내부에서 발생하는 로그를 확인하고 싶을 때 사용하는 명령어입니다. `kubectl logs 팟이름`으로 사용합니다.
- exec: Pod 내부에서 어떤 프로그램을 실행할 때 사용하는 명령어입니다. 보통 팟 내부에서 shell을 사용할 때 사용합니다. `kubectl exec -it 팟이름 -- sh`와 같이 사용합니다.

### yaml 파일 읽고 쓰는 법

- apiVersion : 사용하려는 object의 버전입니다. v1, apps/v1 등이 있습니다.
- kind: 사용하려는 object의 종류입니다. Pod, ReplicaSet, Service, Deployment 등이 있습니다.
- metadata: 사용하려는 object에 대한 메타 정보입니다. name, labels 등이 있습니다.
- spec: object의 상세를 적는 곳입니다. object마다 다르지만 큰 그림에서는 비슷합니다.

아래는 아키텍쳐 구성 중 가장 많이 쓰이는 Deployment와 Service object의 YAML 명세를 예시로 구성해보았습니다. K8S에 대한 100번의 설명보다, YAML 파일을 보는 것이 (개인적으로는) 더 많은 도움이 되었습니다. 궁금할만한 부분마다 주석을 달아놓았으니 확인해보세요 :)

    apiVersion: apps/v1          # Deployment라는 Object의 버전입니다. 다른 버전을 사용하면 Object를 찾을 수 없다는 에러가 발생합니다.
    kind: Deployment             # 사용하려는 object입니다.
    metadata:                    # Object에 대한 메타 정보입니다. 
      name: wordpress-mysql
      labels:
        app: wordpress           # 사용자가 정할 수 있는 key-value값입니다. hello-world라고 적어도 무방합니다.
    spec:
      replicas: 4                # replicaset을 이용해 4개의 pod를 유지합니다.
      selector:                  # deployment는 다음 라벨과 일치하는 팟을 찾아 지속적으로 배포합니다.
        matchLabels:
          app: wordpress
          tier: mysql
      template:                  # 위와 일치하는 라벨을 가진 팟이 없으면 아래 템플릿을 보고 새로운 팟을 생성합니다.
        metadata:                # 여기부터 아래는 팟에 대한 명세입니다.
          labels:
            app: wordpress
            tier: mysql
        spec:
          containers:             # 이 팟은 다음과 같은 컨테이너를 가졌습니다. (yaml에 대한 설명)
            - image: mysql:5.6
              name: mysql
              env:                # 이 컨테이너 내부에서 사용할 환경변수를 지정할 수 있습니다. 역시나 key-value입니다.
                - name: MYSQL_ROOT_PASSWORD
                  value: password
              ports:
                - containerPort: 3307 # 컨테이너가 외부로 노출하는 포트입니다.
                  name: mysql
              resources:
                limits:
                  memory: "1024Mi"
                  cpu: "1000m"     # 최대 CPU의 1 core를 사용할 수 있음
    
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: wordpress-mysql
      labels:
        app: wordpress
    spec:
      ports:
        - port: 3306              # 서비스 오브젝트가 외부로 공개할 포트번호입니다. 
          targetPort: 3307        # 서비스 오브젝트가 타겟으로 하는 팟의 포트입니다. 생략하면 spec.ports.port와 같은 값이 default로 들어갑니다.
      selector:                   # 아래 라벨과 일치하는 팟을 찾습니다.
        app: wordpress
        tier: mysql
