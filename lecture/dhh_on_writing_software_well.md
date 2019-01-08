
DHH의 [유튜브 시리즈](https://www.youtube.com/playlist?list=PL3m89j0mV0pdNAg6x9oq6S8Qz_4C-yuwj)를 보면서 메모할 부분이나 감상을 남긴다.

# 01 - pilot

https://www.youtube.com/watch?v=H5i1gdwe1Ls

basecamp 3의 프로덕션 코드를 가지고 얘기를 진행.

code comments
- explain magic variable -> extract an explaining variable -> inline variable to constant -> move to private -> change order by table of contents

DSL
- `find_or_create_by` 가 원하는 흐름이 아니라 코드가 장황해진 부분을 `create_or_find_by` 을 만들어서 해결.

후기
- DHH가 라이브 리팩토링 코딩하면서 썰 푸는거라 '저 사람은 저기에서 저런 선택을 하는군'' 하는 정도의 감상으로 봄.
- basecamp 정도 되는 성숙한 서비스의 코드베이스가 어떤지 엿보는 재미도..
- 레일즈로 블로그 만들기 데모로부터 십몇년이 지났는데 아직 TextMate를 쓰시는군.

# 02 - Using callbacks to manage auxiliary complexity

https://www.youtube.com/watch?v=m1jOWu7woKM

- default path 는 그대로 두고, auxiliary concern 에서 해야할 일들을 callback 으로 등록해서 옆으로 치워놓았다가 필요할때만 세부사항을 확인할 수 있도록 한다.
- 영상에서 살펴본 예제는, 베이스캠프에서 멘션을 남겼을때 벌어지는 일을 추적해들어간다. 컨트롤러로 입력이 들어와서 유저에게 응답이 나가는 것이 디폴트 패스이고, 멘션의 내용을 스캐닝해서 노티를 보내거나 보내지 않거나 하는 등의 작업을 auxiliary concern 으로 볼때, 이를 컨트롤러 코드에서 어떻게 다루고 콜백에서 어떻게 다루는지 보여주었다.

# 03 - Using globals when the price is right

https://www.youtube.com/watch?v=D7zUOtlpUPw

- `Current`
  https://api.rubyonrails.org/classes/ActiveSupport/CurrentAttributes.html
- `Concern`
  https://api.rubyonrails.org/classes/ActiveSupport/Concern.html

- 글로벌을 써야할때면 관리할 수 있게 써라.  `Current`는 per-request 속성을 전체 시스템에서 쉽게 접근할 수 있게 해준다.

# 04 - Not every model is backed by a database

https://www.youtube.com/watch?v=MQw9zF9IehI

`Concern` 을 이용해서 액티브 레코드 모델에서 디비와 관계 없는 개념을 캡슐화해서 추출하기.
