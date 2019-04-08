[TOC]

# 모던 브라우저에서 비동기 네트웍 요청하기

## 개요

옛날에는 XJR a.k.a. AJAX를 썼다. 쌩으로 쓰긴 번거로우니 jQuery 같은걸 이용했다. 비동기 호출을 편하게 쓸 수 있었고, 새로운 브라우저와 구닥다리 브라우저를 모두 지원할 수 있었다.

`Fetch` API는 비동기 네트웍 요청을 표준하며 만들어졌고, `Promise` 기반으로 구성된다.

IE만 빼면 그럭저럭 지원이 잘 된다. (참고 - https://caniuse.com/#feat=fetch ) 공식적으로 지원되지 않는 브라우저에서는 polyfill 을 쓰면 된다.

## 기본 사용법

```
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    console.dir(response.headers.get('Content-Type'));
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.url);
    return response.json();
  })
  .then(body => console.log(body))
  .catch(err => console.error(err))
```


- `fetch()` 는 글로벌 `window` 스코프에 있는 함수라서 바로 쓸 수 있다.
- 인자로 들어온 경로에 `GET` 요청을 보낸다. 위 요청은 그외에 설정할 수 있는 많은 옵션들을 디폴트로 사용한다고 가정했을때 가장 단순하게 사용할 수 있는 명령이다.
- `fetch()` 는 비동기 호출 결과를 `Promise` 객체로 리턴하므로 `then()` 메소드를 이용해서 결과를 처리한다.
- `then()` 메소드에서는 `Response` 객체를 받는다.
- `catch()` 메소드는 `Promise`에서 요청 수행 도중에 에러가 발생할 경우 처리가 넘어가서 에러 핸들링 할 수 있는 부분이다.
- `Response` 객체에는 네트웍 요청에 대한 응답 결과가 담겨 있다.
  - `response.headers`, `response.status`,  `response.statusText`, `response.url` 등의 메타 정보를 사용할 수 있다.
  - 응답의 body는 html 인 경우, `response.text()` 으로, json인 경우 `response.json()` 으로 얻을 수 있다.







참고 링크

- https://fetch.spec.whatwg.org/
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://medium.freecodecamp.org/understanding-the-fetch-api-a7d4c08c2a7
- https://github.com/github/fetch
