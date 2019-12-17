[TOC]

# HTML 문자열을 이용해서 DOM에 요소 추가하기

HTML 코드를 문자열로 가지고 있는 상태에서, 이 문자열을 DOM 트리에 HTML 요소로서 추가하고 싶다. 어떻게 하면 될까? 찾아보니 여러 가지 방법이 있지만, 브라우저 호환성을 고려할 필요가 없다면 `insertAdjacentHTML()`이 가장 간단해보였다.

아래와 같은 코드로 HTML 문자열을 DOM에 요소로 추가할 수 있다.

```
const uaDiv = `
<div class="clipperArea" id="clipperUa" data-clipboard-target="#clipperUa">${ua}</div>
`;

document.body.insertAdjacentHTML("afterbegin", uaDiv);
```

비고: 처음에는 문자열을 `DocumentFragments` 혹은 `Node`로 얻은 다음 `insertAdjacentElement()`을 이용하려 했는데, `Node`와 `Element`는 타입이 달라서 사용할 수 없었다.


참고
- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
- https://caniuse.com/#search=insertAdjacentHTML
- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
- https://caniuse.com/#search=insertAdjacentElement
