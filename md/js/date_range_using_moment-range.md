[TOC]


# iterable date range using moment-range

시작날짜와 끝날짜를 지정하면 시작날짜부터 끝날짜까지 간단히 순회할 수 있는 방법이 뭐가 있을까?

날짜 객체를 구해 하루씩 더하고 값을 일일이 비교하는거 말고 간단한 인터페이스로 가능했으면 좋겠다.

es에 native way는 없는 것 같고, 아래와 같은 방법을 찾음.


의존성
- http://momentjs.com/
- https://github.com/rotaready/moment-range


## 사용법

npm 으로 설치했다치고

```
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const start = moment('2018-10-15', 'YYYY-MM-DD');
const end = moment('2019-01-22', 'YYYY-MM-DD');
const range = moment.range(start, end);

const days = Array.from(range.by('days'));

days.forEach((day, i) => {
    console.log(`${day.format(moment.HTML5_FMT.DATE)} - ${i}`)
});
```

이런 식으로 range 를 얻은 다음에 배열로 변환해서 순회했다.
