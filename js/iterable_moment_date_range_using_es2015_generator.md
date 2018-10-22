
# ES2015의 generator를 이용한 date range

ES2015에 generator 를 간단히 맛보자.

ES2015의 제너레이터를 간략히 문서를 읽어보았다. 지난주에 사용했던 `moment-range` 모듈에서 내가 필요했던 간단한 기능 정도는 다시 만들 수 있을 것 같았다.


## syntax : generator function

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
```

`function*` 문법이 새로 들어왔고, `yield` 키워드를 통해 generator object를 리턴한다. 그 객체에서 `.next()` 를 통해 값과 상태를 얻을 수 있는데, iterable protocol을 만족하는 객체여서 `for..of` 구문으로 순회할 수 있다.

참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

## 사용 코드

datetime 조작은 귀찮아서 moment 그대로 씀.

```javascript
const moment = require('moment');

const start = moment('2018-10-15', 'YYYY-MM-DD');
const end = moment('2018-11-22', 'YYYY-MM-DD');

const moment_daterange = function *(start, end){
    while( !start.isAfter(end) ){
        yield start;
        start.add(1, 'd');
    }
};


const dateIterator = moment_daterange(start, end);

for(let d of dateIterator){
    console.log(d.format(moment.HTML5_FMT.DATE));
}
```
