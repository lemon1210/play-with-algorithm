/*
    快排之优化一：
    排序近乎有序的数组，会退化成O(n^2),比归并排序慢了太多了
    归并排序可以保证出来的树是平衡的
    快排的树的平衡度很差，不能保证树的高度是logN
    解决方法：随机选择一个元素作为标定元素,期望值是O(nlogn)，不代表每次都是O(nlogn)
 */

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, l, r){
    //随机生成一个索引并交换
    let random = Math.floor(Math.random() * (r - l + 1)) + l,
        start = l,
        j = l;
    swap(arr, start, random);
    for(let i = l + 1; i <= r; i++){
        if(arr[i] < arr[start]){
            swap(arr, i, j+1);
            j++;
        }
    }
    swap(arr, l, j);
    return j;
}

function __quickSort(arr, l, r){
    if(l >= r){
        return;
    }
    let p = partition(arr, l, r);
    __quickSort(arr, l, p - 1);
    __quickSort(arr, p + 1, r);
}

function quickSort(arr){
    __quickSort(arr, 0, arr.length - 1);
}

var arr = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10];

quickSort(arr);

console.log(arr);