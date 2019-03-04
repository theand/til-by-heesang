
# 문제

https://adventofcode.com/2018/day/2

창고에 있는 박스 중에 비슷한 ID를 가진 박스를 찾으려고 한다. 우선 후보 박스들의 아이디를 스캔하였다. ID 중에 같은 문자가 딱 2번만 나오는 ID의 갯수를 세고, 그와 별개로 같은 문자가 딱 3번 나오는 ID의 갯수를 센 다음 그 두개의 수를 곱하여 체크섬을 얻는다. 제시된 ID 목록에 대하여 체크섬을 계산하라.

# 풀이

ID 문자열을 한글자씩 쪼갠 다음, 각 글자별로 group by를 하고, 각 글자를 키로 하고 글자의 출현횟수를 값으로 하는 해쉬를 만든다. 그리고 그 해쉬의 값 중에 2가 있는지 3이 있는지 체크함.

루비에서 배열과 해쉬에 제공되는 기본 연산자가 풍부해서 그걸 조합해 그럭저럭 빨리 풀렸다.

box_id_checksum.rb

```ruby

class BoxIdChecksum

  def self.classify(input)
    hash = input.split("")
        .group_by(&:itself)
        .transform_values!(&:size)
    result = Array.new
    result << 2 if hash.value? 2
    result << 3 if hash.value? 3
    result
  end

  def self.checksum(input)
    two = 0
    three = 0
    input.split("\n").each do |x|
      c = self.classify(x)
      two += 1 if c.include? 2
      three += 1 if c.include? 3
    end
    two*three
  end

end
```

main.rb
```ruby
require './lib/box_id_checksum'

input = File.read('input.txt').strip

print "Checksum for box ids is #{BoxIdChecksum.checksum(input)}\n"
```
