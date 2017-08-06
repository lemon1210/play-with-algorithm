/*
    优化点：
    1.高级排序算法递归到底层的时候都可以用插入排序来进行优化
    2.近乎有序的数组,性能很差。退化为O(n^2),整个树不平衡
*/
function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// [ v |  <v  |  >v  ]
// start     j
//对arr[l......r]部分进行partition操作
//返回p,使得arr[l...p-1]<arr[p]; arr[p+1......r]>arr[p]
function partition(arr, l, r){
    let start = l,
        //arr[l+1...j] < v; arr[j+1....i] > v
        j = l;  //作为分割点
    for(let i = l + 1; i <= r; i++){
        if(arr[i] < arr[start]){
            swap(arr, i, j+1);
            j++;
        }
    }
    swap(arr, l, j);
    return j;
}

//对arr[l....r]部分进行快速排序
function __quickSort(arr, l, r){
    if(l >= r){
        return;
    }
    let p = partition(arr, l, r);  //分割操作，返回一个索引值。这个索引为基准值的所在位置
    __quickSort(arr, l, p - 1);
    __quickSort(arr, p + 1, r);
}

function quickSort(arr){
    __quickSort(arr, 0, arr.length - 1);
}

var arr = [10, 9, 8, 7, 6, 5, 3, 2, 1];

quickSort(arr);

console.log(arr);