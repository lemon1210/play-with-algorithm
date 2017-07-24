/*
    O(nlogn)
    无序数组，近乎有序的数组，重复值很多的数组对于堆排序影响不大
    堆排序与归并排序，快排相比要略慢一点，堆排序主要用在动态数据

*/


const MaxHeap = require('./Heap.js');

function heapSort(arr){
    let maxHeap = new MaxHeap(); 
    // for(let i = 0, len = arr.length; i < len; i++){
    //     // maxHeap.insert(arr[i]); 这里将数组中的元素一个一个插入到堆中，实际上有更好的方法
    // }
    for(let i = arr.length - 1; i >= 0; i--){
        arr[i] = maxHeap.extractMax();
    }
    return arr;
}   

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(heapSort(arr));
