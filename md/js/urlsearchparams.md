[TOC]

# 쿼리스트링을 편하게 다루기

쿼리스트링은 key,value의 문자열의 모음인데, js에서 이를 문자열로 취급해서 조작하려면 뻔한 작업임에도 여간 귀찮은 것이 아니었다. 그래서 그동안은 적당한 쿼리스트링 라이브러리를 가져다가 객체로 파싱해서 사용했었다. (이를테면 https://github.com/anodynos/node2web_querystring )


IE 에서는 지원하지 않지만, 다른 브라우저에서 모두 지원하는 `URLSearchParams`가 있는데 이를 쓰면 외부 라이브러리에 대한 의존성을 추가하거나 직접 일일이 파싱하는 코드를 작성하지 않고 깔끔하게 쿼리스트링을 조작할 수 있다.


현재 페이지의 쿼리스트링을 `key => value` 형태로 출력하기 위해서 기존에는 아래와 같이 `querystring` 라이브러리 의존성을 추가한 다음 아래와 같이 작업했다.

```
const qs = document.location.search;
const query_object = querystring.parse(qs.substring(1));
Object.keys(query_object).forEach(k => console.log(`${k} : ${query_object[k]}`));
```

`URLSearchParams` 를 사용하면 의존성을 없애고 같은 결과를 달성할 수 있다.

```
const qs = document.location.search;
const query_object = new URLSearchParams(qs);
query_object.forEach( (v,k) => console.log(`${k} : ${v}`) );
```

참고
- https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/forEach
- https://developers.google.com/web/updates/2016/01/urlsearchparams?a=a&b=1
- https://googlechrome.github.io/samples/urlsearchparams/
- https://itnext.io/easiest-way-to-get-and-create-url-params-javascript-9d24eae65720
