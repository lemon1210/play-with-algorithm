/*
    二分查找法：
    对于有序数列，才能使用二分查找法
    O(logn)级别
    实现：1,循环 2,递归，在性能上会略差
 */

// 如果找到target,返回响应的索引index
// 如果没有找到target,返回-1

function binarySearch1(arr, target){
    let l = 0,
        r = arr.length - 1;
    //在arr[l....r]的范围中查找
    while(l <= r){
        let mid = l + Math.floor((r - l) / 2);
        if(target === arr[mid]){
            return mid;
        }
        //arr[l....mid-1]
        if(target < arr[mid]){
            r = mid - 1;
        }
        //arr[mid+1....r]
        if(target > arr[mid]){
            l = mid + 1;
        }
    }
    return  -1;
}




//arr[l.....r]
function binarySearch2(arr, target, l, r){
    if(l > r){
        return -1;
    }
    let mid = l + Math.floor((r - l) / 2);
    if(target === arr[mid]){
        return mid;
    }
    if(target > arr[mid]){
        return binarySearch2(arr, target, mid + 1, r);
    }
    if(target < arr[mid]){
        return binarySearch2(arr, target, l, mid - 1);
    }
}

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch2(arr, 6, 0, arr.length - 1));


