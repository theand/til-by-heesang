
# .ics 파일만들기 (캘린더이벤트 데이터)


해결하고 싶은 문제:

 - 일련의 이벤트를 캘린더에 등록할 일이 아주 가끔 있는데, n개 이상의 비슷한 패턴이지만 반복 이벤트는 아닌 구별되는 이벤트를 한땀한땀 등록하기에는 너무 피곤하다. n개의 개별 이벤트 정보를 모아서 그에 대한 ics(iCalendar) file 을 구워낼 수 있으면  원하는 캘린더에 등록하기 쉽겠다.

찾아낸 해법 :

 - 의존성 : ics 생성하는 node 모듈을 사용한다.  https://github.com/adamgibbons/ics

## 설치 및 사용법

- 설치 : `npm install -S ics`


## 케이스1 : 이벤트 하나 짜리 ics 만들기

`ics.createEvent` 을 쓰면 된다. 자세한건 readme 참고.

## 케이스2 : 여러 이벤트를 하나의 ics 에 담아서 만들기

- 만들어진 ics 파일을 `cat * > ../all.ics ` 이렇게 합쳤더니.. fantastical 에서는 import 가 되는데 기본 달력앱이나 구글 캘린더에서는 import 가 안 되더라.
- 파일을 뜯어보니 하나의 ics 파일은 BEGIN END 가 중첩이 되어 있었다.
  - 가장 바깥 블록에서 `VCALENDAR` 를 BEGIN-END 하고, 그 안에 이벤트 하나 단위로 `VEVENT` 블록이 BEGIN-END 해야하므로, 단일 ics 파일을 단순병합하면 VCALENDAR 블록이 여러개 생겨서 이걸 파싱할 수 있는 앱과 그렇지 않은 앱이 차이가 생김.
  - 자세한건 https://en.wikipedia.org/wiki/ICalendar 참고.
- 모듈에서 멀티 이벤트 제공한다고 나왔는데, 계속 에러가 나서 한참 헤매다보니 멀티 이벤트 생성은 `ics.createEvents` 로 s가 하나 더 붙었어야하는거였음.

## 적용사례 : 시작일과 끝나는 날짜가 정해져있고, 하루하루마다 당번이 정해져있는 이벤트들에 대한 ics 파일 생성.

```javascript
const {writeFileSync} = require('fs');
const {mkdirp} = require('fs-extra');
const ics = require('ics');
const sanitize = require("sanitize-filename");
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const dailyManagers = [
    "@name1"
    , "@name2"
    , "@name3"
];

const mine = "name1";

const start = moment('2018-10-15', 'YYYY-MM-DD');
const end = moment('2019-01-22', 'YYYY-MM-DD');
const range = moment.range(start, end);

const days = Array.from(range.by('days'));

mkdirp(`${__dirname}/ics/`);

const eventsAll = days.map( (day, i) => {
    const dateString = day.format(moment.HTML5_FMT.DATE);
    const managerIndex = i % dailyManagers.length;
    const managerName = dailyManagers[managerIndex];

    const calEvent = {
        uid: `til-s2-${dateString}`,
        title: `${managerName} - 일일매니저`,
        start: [day.year(), day.month() + 1, day.date(), 0, 0],
        duration: {days: 1},
        url: 'https://some.url.',
        description: 'some description',
    };

    #하루하루에 대한 ics 파일 생성
    ics.createEvent(calEvent, (error, value) => {
        if (error) {
            console.error(error);
        } else {
            writeFileSync(`${__dirname}/ics/${sanitize(dateString)} - (${managerIndex}) - ${sanitize(managerName)}.ics`, value)
        }
    });

    return calEvent;
});


const eventsMine = eventsAll.filter( e => e.title.startsWith(mine));


#전체 일정을 모두 담은 ics 파일 생성
ics.createEvents(eventsAll, (error, value) => {
    if (error) {
        console.error(error);
    } else {
        writeFileSync(`${__dirname}/ics/all.ics`, value);
    }
});


#내가 담당인 전체 일정만 담은  ics 파일 생성
ics.createEvents(eventsMine, (error, value) => {
    if (error) {
        console.error(error);
    } else {
        writeFileSync(`${__dirname}/ics/mine.ics`, value);
    }
});
```
