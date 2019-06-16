[TOC]

# 모던 브라우저에서 비동기 네트웍 요청하기

## 개요

옛날에는 XHR a.k.a. AJAX를 썼다. 쌩으로 쓰긴 번거로우니 jQuery 같은걸 이용했다. 비동기 호출을 편하게 쓸 수 있었고, 새로운 브라우저와 구닥다리 브라우저를 모두 지원할 수 있었다.

`Fetch` API는 비동기 네트웍 요청을 표준하며 만들어졌고, `Promise` 기반으로 구성된다.

IE만 빼면 그럭저럭 지원이 잘 된다. (참고 - https://caniuse.com/#feat=fetch ) 공식적으로 지원되지 않는 브라우저에서는 polyfill 을 쓰면 된다.

## 기본 사용법

```javascript
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


- `fetch()` 는 글로벌 `window` 스코프에 있는 함수라서 바로 쓸 수 있다. 가장 간단한 사용법은 인자로 들어온 리소스 경로를 하나 넘기는 것이다. 이렇게 하면 해당 리소스 경로로 `GET` 요청을 보낸다.
- `fetch()` 는 비동기 호출 결과를 `Promise` 객체로 리턴하므로 `then()` 메소드를 이용해서 결과를 처리한다.
- `then()` 메소드에서는 `Response` 객체를 받는다.
- `catch()` 메소드는 `Promise`에서 요청 수행 도중에 에러가 발생할 경우 처리가 넘어가서 에러 핸들링 할 수 있는 부분이다.
- `Response` 객체에는 네트웍 요청에 대한 응답 결과가 담겨 있다.
  - `response.headers`, `response.status`,  `response.statusText`, `response.url` 등의 메타 정보를 사용할 수 있다.
  - 응답의 body는 html 인 경우, `response.text()` 으로, json인 경우 `response.json()` 으로 얻을 수 있다.


## Request 옵션

`fetch()` 메소드에 리소스 경로 하나만 넣으면 디폴트로 `GET` 요청을 보내지만, request 옵션 객체를 넘기면 다른 요청도 가능하다. 혹은, 같은 설정으로 `Request` 객체를 만들어서 그 객체 하나만 `fetch()` 에 넘겨도 같은 결과를 얻을 수 있다.


```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
    //디폴트 옵션에 * 표시 있음.
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-type": "application/json; charset=UTF-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify({ // body data type must match "Content-Type" header
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
  })
  .then(response => response.json())
  .then(json => console.log(json))
```

참고

- https://fetch.spec.whatwg.org/
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://medium.freecodecamp.org/understanding-the-fetch-api-a7d4c08c2a7
- https://github.com/github/fetch



## await fetch

`fetch()` 의 리턴값은 promise 라서 콜백 함수 안에서 쓰거나 해야하는데, 리턴값을 동기 코드의 리턴 값을 쓰는것처럼 바로 쓰려면 `await` 연산자를 이용할 수 있다.

`await`은 promise를 기다리게 해준다. 그리고 `async` 함수 안에서만 사용할 수 있다.

그냥 짧은 요청을 테스트해보는 정도에서는 아래와 같은 코드 조각을 활용할 수 있다.

```javascript

(async () => {
  let response = await fetch(api);
  let body = await response.json();
  console.log(body.data);
})();
```

위 섹션에서 사용한 예제코드는 아래와 같이 옮길 수 있다.


```javascript
(async () => {

  let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  let body = await response.json();
  console.log(body)

})();
```


참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
