/*
    使用模板(泛型)编写算法 
    因为我们要排序的东西是前差万别的，排序不仅仅是针对数字
    数字/浮点数/字符/字符串/对象
*/
// 在js中,数字/浮点数/字符/字符串 均可用01节的方法进行比较
// 如果是对象数组，要自定义比较，可以借要Array.protytpe.sort()方法



//方法一
// 学习资料：http://www.cnblogs.com/xljzlw/p/3694861.html
let arr = [
    { name: 'bbb', age: 20},
    { name: 'aaa', age: 19},
    { name: 'ccc', age: 21}
];

const compare = function(prop){
    return function(o1, o2){
        if(o1[prop] < o2[prop]){
            return -1;
        }else if(o1[prop] > o2[prop]){
            return 1;
        }else if(o1[prop] == o2[prop]){
            return 0; 
        }
    }
};

arr.sort(compare('age'));

//方法二
// 方法less通过return true/false 来定义什么是‘小于’

function selectionSort(arr, less){
    let minIndex;
    for(let i = 0, len = arr.length; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(less(arr[j], arr[minIndex])){
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}