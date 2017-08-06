/*
    插入排序与选择排序的区别：
    1.选择排序的第二层循环没有提前结束的机会，而插入排序有
    2.选择排序是将拿的元素v[i]与它后面的元素进行比较，而插入排序是跟之前元素做比较
    总体上来说，插入排序因为有提前结束的机会，所有它整体上性能要比选择排序好
 */

/* 
    插入排序
    默认第一个元素已经排序好，第一层循环选中从1开始 指定要排序的元素有v[i]
    第二层循环让指定的元素v[i]与它之前的元素v[i-1],v[i-2]做比较(想象一个打扑克的时候的做法)
*/


const helper = require('./sortTestHelper.js');

/*
    以下两个插入排序均在不停的交换位置
    每次交换位置都得索引到数组相应的位置进来3次赋值，可想而知是多么毫时的
 */

function insertionSort1(arr){
    let temp;
    for(let i = 1,len = arr.length; i < len; i++){
        for(let j = i; j > 0; j--){
            if(arr[j] < arr[j -1]){
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;   
            }else{
                break;
            }
        }
    }
    return arr;
}

function insertionSort2(arr){
    let temp;
    for(let i = 1,len = arr.length; i < len; i++){
        //想进入循环必须满足两个条件
        for(let j = i; j > 0 && arr[j] < arr[j -1]; j--){
            temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;   
        }
    }
    return arr;
}

console.log(insertionSort2(helper.randomArray(100, 0, 100)))
