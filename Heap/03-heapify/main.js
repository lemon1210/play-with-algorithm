/*
    heapify: 将整个数组构建成堆
    对于一棵完全二叉树，第一个非叶子节点的索引值=Math.floor(元素个数/2)
    从第一个非叶子节点开始递减，依次shiftDown
*/

/*
    将n个元素逐个插入到一个空堆中，算法复杂度是O(nlogn)
    heapify的过程，直接舍弃了n/2个元素，算法复杂度为O(n)
 */

const MaxHeap = require('./Heap.js');

//第二个版本的堆排序，建堆过程不一样了
function heapSort(arr){
    let maxHeap = new MaxHeap(arr);   //版本二
    // for(let i = 0, len = arr.length; i < len; i++){ //版本一
    //     // maxHeap.insert(arr[i]); 这里将数组中的元素一个一个插入到堆中，实际上有更好的方法如上
    // }
    for(let i = arr.length - 1; i >= 0; i--){
        arr[i] = maxHeap.extractMax();
    }
    return arr;
}   

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(heapSort(arr));



/*
         |    平均时间复杂度    |     原地排序      |     额外空间       |     稳定排序      |
插入排序            O(n^2)              对                  O(1)                 是
归并排序            O(nlogn)            错                  O(n)                 是
快速排序            O(nlogn)            对            O(logn)递归的空间           错
堆排序              O(nlogn)            对                  O(1)                 错

 */
