
# 콘솔에서 rubygems 의 특정 gem 상세 정보 보기

`gem info` 커맨드가 2018-12에 릴리즈된 3.0.0 에서야 들어왔는데, `npm info` 처럼 수시로 사용하기엔 턱없이 부족한 것 같다.

```
#로컬에 설치된 패키지 정보 보여주기
gem info name

#원격에  있는 패키지 정보 보기
gem info name -r
```

`rails` gem 에 대한 정보를 본다고 치면..

```
$ gem info rails -raV

*** REMOTE GEMS ***

GET https://rubygems.org/specs.4.8.gz
304 Not Modified
rails (5.2.2, 5.2.1.1, 5.2.1, 5.2.0, 5.1.6.1, 5.1.6, 5.1.5, 5.1.4, 5.1.3, 5.1.2, 5.1.1, 5.1.0, 5.0.7.1, 5.0.7, 5.0.6, 5.0.5, 5.0.4, 5.0.3, 5.0.2, 5.0.1, 5.0.0.1, 5.0.0, 4.2.11, 4.2.10, 4.2.9, 4.2.8, 4.2.7.1, 4.2.7, 4.2.6, 4.2.5.2, 4.2.5.1, 4.2.5, 4.2.4, 4.2.3, 4.2.2, 4.2.1, 4.2.0, 4.1.16, 4.1.15, 4.1.14.2, 4.1.14.1, 4.1.14, 4.1.13, 4.1.12, 4.1.11, 4.1.10, 4.1.9, 4.1.8, 4.1.7.1, 4.1.7, 4.1.6, 4.1.5, 4.1.4, 4.1.3, 4.1.2, 4.1.1, 4.1.0, 4.0.13, 4.0.12, 4.0.11.1, 4.0.11, 4.0.10, 4.0.9, 4.0.8, 4.0.7, 4.0.6, 4.0.5, 4.0.4, 4.0.3, 4.0.2, 4.0.1, 4.0.0, 3.2.22.5, 3.2.22.4, 3.2.22.3, 3.2.22.2, 3.2.22.1, 3.2.22, 3.2.21, 3.2.20, 3.2.19, 3.2.18, 3.2.17, 3.2.16, 3.2.15, 3.2.14, 3.2.13, 3.2.12, 3.2.11, 3.2.10, 3.2.9, 3.2.8, 3.2.7, 3.2.6, 3.2.5, 3.2.4, 3.2.3, 3.2.2, 3.2.1, 3.2.0, 3.1.12, 3.1.11, 3.1.10, 3.1.9, 3.1.8, 3.1.7, 3.1.6, 3.1.5, 3.1.4, 3.1.3, 3.1.2, 3.1.1, 3.1.0, 3.0.20, 3.0.19, 3.0.18, 3.0.17, 3.0.16, 3.0.15, 3.0.14, 3.0.13, 3.0.12, 3.0.11, 3.0.10, 3.0.9, 3.0.8, 3.0.7, 3.0.6, 3.0.5, 3.0.4, 3.0.3, 3.0.2, 3.0.1, 3.0.0, 2.3.18, 2.3.17, 2.3.16, 2.3.15, 2.3.14, 2.3.12, 2.3.11, 2.3.10, 2.3.9, 2.3.8, 2.3.7, 2.3.6, 2.3.5, 2.3.4, 2.3.3, 2.3.2, 2.2.3, 2.2.2, 2.1.2, 2.1.1, 2.1.0, 2.0.5, 2.0.4, 2.0.2, 2.0.1, 2.0.0, 1.2.6, 1.2.5, 1.2.4, 1.2.3, 1.2.2, 1.2.1, 1.2.0, 1.1.6, 1.1.5, 1.1.4, 1.1.3, 1.1.2, 1.1.1, 1.1.0, 1.0.0, 0.14.4, 0.14.3, 0.14.2, 0.14.1, 0.13.1, 0.13.0, 0.12.1, 0.12.0, 0.11.1, 0.11.0, 0.10.1, 0.10.0, 0.9.5, 0.9.4.1, 0.9.4, 0.9.3, 0.9.2, 0.9.1, 0.9.0, 0.8.5, 0.8.0)
    Author: David Heinemeier Hansson
    Homepage: http://rubyonrails.org

    Full-stack web application framework.

```

이정도 밖에 보여주지 않는다. https://rubygems.org/gems/rails/ 에서 보여주는 것에 비해 노출되는 정보가 너무 빈약한데, 검색해봐도 아직 마땅한 대안은 눈에 띄지 않았다.

source :
- https://guides.rubygems.org/command-reference/#gem-info
- https://github.com/rubygems/rubygems/blob/master/History.txt