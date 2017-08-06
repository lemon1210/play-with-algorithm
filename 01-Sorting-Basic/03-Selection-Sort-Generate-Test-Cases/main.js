const randomArray = require('./sortTestHelper.js');

function swap(array, t1, t2){
    let temp = array[t1];
    array[t1] = array[t2];
    array[t2] = temp;
}

function selectionSort(arr){
    let minIndex;
    for(let i = 0, len = arr.length; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}

console.log(selectionSort(randomArray(100, 0, 100)));

