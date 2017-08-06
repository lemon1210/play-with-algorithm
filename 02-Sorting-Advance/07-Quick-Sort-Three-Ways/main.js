/*
    快排之优化三：
    三路快速排序
    arr[l+1...lt]<v
    arr[gt...r]>v
    arr[lt+1....i-1]==v
    [ v   |   <v   |   =v   |   >v ]
      l          lt          gt 
 */

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, l, r){
    let random = Math.floor(Math.random() * (r - l + 1)) + l,
        start = l,
        lt = l, // arr[l+1.......lt] < v
        gt = r + 1, // arr[gt.........r] > v
         i = l + 1; // arr[lt+1...i] == v
    swap(arr, start, random);
    while(i < gt){
        if(arr[i] < arr[start]){
            swap(arr, lt + 1, i);
            lt++;
            i++;
        }else if(arr[i] > arr[start]){
            swap(arr, gt - 1, i);
            gt--;
        }else{
            i++;
        }
    }
    swap(arr, start, lt);
    return lt;
}

function __quickSort(arr, l, r){
    if(l >= r){
        return;
    }
    let p = partition(arr, l, r);
    __quickSort(arr, l, p - 1);
    __quickSort(arr, p + 1, r);
}

function quickSort3ways(arr){
    __quickSort(arr, 0, arr.length - 1);
}

var arr = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10];

quickSort3ways(arr);

console.log(arr);