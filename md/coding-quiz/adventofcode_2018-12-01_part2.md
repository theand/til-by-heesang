[TOC]

# 문제
https://adventofcode.com/2018/day/1#part2

part 1 에서의 동일한 입력과 동일한 주파수 조정을 사용하되, 조정된 주파수 값이 두번째로 반복해서 나타나는 주파수의 값을 찾아라. 입력 리스트를 반복했을때 반복해서 나타나는 주파수가 없다면 리스트를 처음부터 반복한다.


# 풀이

첫번째 시도 : 메소드 체인을 걸다가 each 에서 조건이 충족되었을때 멈출 방법을 모르겠어서 예외를 던지도록 해버렸다. 어느 언어로하든 map/reduce/each 등에서 중간에 멈추도록 하는 직관적인 방법을 아직 못 찾았다.

```ruby


class DeviceFrequency

  def self.find_first_freq_reached_twice input, current
    reached = { 0 => true}
    answer = nil
    begin
      input.split(",")
        .map { |x| x.split("\n")}
        .flatten
        .cycle
        .each do |x|
          current = current + x.to_i
          if reached.has_key? current and answer.nil?
            answer = current
            raise "answer found"
          else
            reached[current] = true
          end
        end
    rescue
      print "answer found"
    end
    answer
  end

end
```

두번째 시도 : 동작하던 첫번째 코드를 조금 개선하였다.

```ruby
class DeviceFrequency

  def self.find_first_freq_reached_twice(input, current)
    reached = {0 => true}
    input.split(",")
      .map {|x| x.split("\n")}
      .flatten
      .cycle
      .each do |x|
        current = current + x.to_i
        if reached.has_key? current
          return current
        end
        reached[current] = true
      end
  end

end
```
