[TOC]


# NodeList를 순회하는 여러가지 방법

source : https://css-tricks.com/a-bunch-of-options-for-looping-over-queryselectorall-nodelists/

`document.querySelectorAll` 로 얻어온 노드 목록을 순회하려고 할때 가능한 방법들. 굳이 이렇게까지... 하는 생각이 드는 방법은 생략함.

이런 글이 왜나오냐면, 노드 목록이니까 당연히 배열로 리턴하겠지? 라고 생각할 수도 있지만, 리턴 타입이 `NodeList` 이고 배열과 비슷하게 보일수도 있지만 배열이 아니다. 배열이라고 생각하고 코드를 짜면 망하던 때가 있었다. 최근 브라우저에서는 거의 배열과 유사하게 취급할 수 있게 해주긴 한다.

```
document.querySelectorAll('pre').length
//15
Array.isArray(document.querySelectorAll('pre'))
//false
```

## forEach

보통 배열에서 많이 쓰는 방식으로 직관적으로 떠오르는 방식인데, 오래된 브라우저는 지원안하므로 주의.

```
document.querySelectorAll('pre').forEach( (e) => something(e) );
```

polyfill을 쓸수있기도 -> https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach

## forEach + spread in array literal

spread syntax 를 어레이 리터럴에서 쓰면 NodeList를 배열의 원소로 채워서 만들 수 있다.

그런데 spread syntax를 지원하는 브라우저가 `NodeList.forEach`를 지원안하는 케이스는 아마 거의 없을 것 같다. 그러니 `forEach` 말고도 배열의 메소드인 `map`, `reduce`, `filter` 같은 것도 써야할 필요가 있을때 사용하기 적당한 방법 같다.

```
Array.isArray([...document.querySelectorAll('pre')])
//true

document.querySelectorAll('pre').map
//undefined
document.querySelectorAll('pre').reduce
//undefined
document.querySelectorAll('pre').filter
//undefined

[...document.querySelectorAll('pre')].map
//ƒ map() { [native code] }
[...document.querySelectorAll('pre')].reduce
//ƒ map() { [native code] }
[...document.querySelectorAll('pre')].filter
//ƒ map() { [native code] }
```

취향에 따라 `Array.from()` 을 써볼수도 있다고 함.

## for ... of

최신 브라우저라면 `for ... of` 문법을 쓸 수도 있다.

```
for( e of document.querySelectorAll('pre')) {
  something(e);
}
```


## 그외 생략

- `Function.prototype.call()` 을 쓰는 방법 -> `[].forEach.call()`
- jquery, lodash 에 있는 메소드
- 전통적인 `for(i=0; i<els.length; i++)`
