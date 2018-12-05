
# less 커맨드로 텍스트 살펴보다가 대소문자구분 없이 검색하고 싶을때

문제 : vi 키바인딩이 그대로 들어가있다고 생각했는데, `/keyword/i` 가 영 안 먹히길래 찾아봄.

해결 : 실행 중인 상태에서 `-I` 를 입력하면 대소문자구분 설정이 토글됨.

출처 : https://stackoverflow.com/questions/16828/how-do-you-do-a-case-insensitive-search-using-a-pattern-modifier-using-less

비고 : `LESS` 환경변수에 넣어서 디폴트 옵션으로 되는 방법도 있지만, 내가 들어가볼 일이 생길 모든 서버들에 저 설정을 적용하려니 absible 설정 고쳐야하고 귀찮아서 그냥 저 커맨드를 외우기로 함.
