[TOC]

# problem

https://leetcode.com/problems/two-sum

```
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

# solution

```
var twoSum = function(nums, target) {
    const inverseMap = {};
    nums.forEach( (v,i) => {
        inverseMap[v] = i;
    });

    return nums.reduce( (acc, cur, ind) =>{
        if( acc.length === 2){
            return acc;
        }
        const diff = target - cur;
        if( inverseMap[diff] === ind ){
            return [];
        }
        if( inverseMap[diff] !== undefined ){
            return [ind, inverseMap[diff]];
        }
        return [];
    }, []);

};

```

무작정 reduce를 쓰는 연습을 해보았는데, reduce를 쓰는게 맞는지 아직 확신은 없다.
