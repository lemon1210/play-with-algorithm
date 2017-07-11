const helper = require('./sortTestHelper.js');

function selectionSort(arr){
    let minIndex,
        temp;
    for(let i = 0, len = arr.length; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

//测试算法的性能
helper.testSort('selectionSort', selectionSort, helper.randomArray(10000, 0, 10000));

