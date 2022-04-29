## Pluto 사전과제

#### HackerNews-auto-complete-search-box

## Usage(자세한 실행 방법)

1. git clone

```
https://github.com/sooyoung159/HackerNews-auto-complete-search-box
```

2. HackerNews-auto-complete-search-box 폴더를 인터프린터나 컴파일러로 열기
3. 필요한 라이브러리 설치

```
npm install
```

4. 실행

```
npm run start
```

_사용 기술_

- react.js
- redux-toolkit
- react-router
- styled-components

---

## 구현내용

#### 검색 시

![마우스선택](https://user-images.githubusercontent.com/68948735/166060159-f95ec6f5-096e-4041-9b5a-71dc6d540876.gif)

- `InputBox`에 검색하면 추천검색어가 나타남
- debounce hook을 이용하여 검색을 잠시 멈췄을 때 api요청
- 하나를 선택하면 자세한 정보를 보여주고 제목을 선택하면 기존의 기사가 새창으로 띄어짐

#### 키보드 선택

![키보드 선택](https://user-images.githubusercontent.com/68948735/166060125-9f52825f-4719-44b7-a427-1db049674101.gif)

- 검색 후 마우스가 아닌 키보드로 원하는 기사를 선택
