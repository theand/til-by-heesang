

advent calendar 형식으로, 크리스마스 관련된 주제의 설정하에 크리스마스까지 뭔가를 달성하기 위해서는 하루에 코딩 문제 2개씩을 풀어야하는 사이트. 2017년에 알게되어 며칠 풀어보다가 흐지부지됐는데, 2018년에 다시 도전. ruby + minitest 연습을 겸한다.

# 문제

https://adventofcode.com/2018/day/1

입력 파일 : `+1` , `-2` 와 같은 조정값이 한줄에 하나씩 들어있음.

초기 주파수에서 위 입력파일의 조정수치를 적용한 최종 주파수가 무엇인지 알아내기

# 풀이

첫날 문제라 문자열을 그냥 int 로 바꿔서 sum 하면 되는 간단한 문제.



device_frequency.rb

```ruby

class DeviceFrequency

  def self.adjust(input, current)
    input.split(",")
        .map {|x| x.split("\n")}
        .flatten
        .map {|x| x.to_i}
        .compact.sum + current
  end
end
```

main.rb

```ruby
require './lib/device_frequency'

input = File.read('input.txt').strip

print "Adjusted frequency is #{DeviceFrequency.adjust input, 0}\n"
```
