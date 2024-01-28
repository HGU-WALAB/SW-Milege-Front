# 한동대학교 대상 소중대 마일리지 관리자 시스템 [ 프론트엔드 ]


<br />

## 요구 사항

- Node.js 16 이상
- npm 8 이상
- VS Code
<br />

## 개발에 필요한 도구 설정

- nodeJS 설치
  - 설치 가이드 https://nodejs.org/en
- VS Code
  - 설치 가이드 https://code.visualstudio.com
<br />

## 개발 환경 준비

### 1. 코드 클론

```
git clone https://github.com/HGU-WALAB/SW-Milege-Front.git
```

### 2. 패키지 설치

```
npm install
```
or

```
npm install --force
```

### 3. 환경 변수 정의

개발환경: .env .env.development   
배포환경: .env .env.production

```
NEXT_PUBLIC_HOST_API_KEY=
NEXT_PUBLIC_MAIL_SERVICE_ID=
NEXT_PUBLIC_MAIL_TEMPLATE_ID=
NEXT_PUBLIC_MAIL_PUBLIC_KEY=
NEXT_PUBLIC_HOST_BASE_DOMAIN=
```


### 4. 개발 모드 시작

```
npm run dev
```

`http://localhost:3031`로 접속

### 5. 빌드

```
npm run build
```

### 6. 배포 모드 시작

```
npm run start
```

<br />

## 배포

와랩 서버 접속 후 배포 자동화 쉘 스크립트 실행

참고: https://8156217.tistory.com/73 

<br />
## 코딩 룰

- esLint에 정의된 규칙을 따른다.
<br />

## 커밋 룰

레파지토리 내에서 npm 커맨드를 사용하면 커밋 규격이 나타난다.

```
npm run commit
```

  
- Feat: [새로운 기능 구현]
- Fix: [코드 수정]
- Docs: [문서 추가]
- Style: [코드 포매팅 , UX/UI 변경]
- Refactor: [코드 개선 , 리펙터링]
- Test: [테스트 코드 작성]
- Chore: [환경 설정 파일 수정 , 패키지 추가]
<br />


커밋 내용은 다음과 같이 작성한다.

```
feat: 구현 기능(#이슈번호)

ex) feat: 로그인 기능 구현 (#105)
```


