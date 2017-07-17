/*
    归并排序的基本思想：分治策略
    分半->分半->再分半->分到每组只剩下一个元素的时候就回溯   需要分半的次数：log(n)
    回溯的过程就是在归并的过程，此时复杂度为O(n),所以此算法复杂度为O(nlogn)
    归并是：先复制数组arr的一份副本，然后拿这个副本数组aux中的v[i]和v[mid+i]来比较，谁小谁先进真正的arr
    缺点：产生O(n)额外的空间，牺牲空间换取时间的做法
      k
    [ 1, 2, 3, 4, 5, 6, 7, 8]
      l       mid          r
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
      l          mid          r  
 */

//对arr[l......r]进行插入排序
function insertionSort(arr, l, r){
    for(let i = l; i <= r; i++){
        let temp = arr[i],
            j;
        for(j = i; j > l && arr[j - 1] > temp; j--){
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
}

// 将arr[l...mid]和arr[mid+1...r]两部分进行归并
function merge(arr, l, mid, r){
    let aux = new Array(r - l + 1);

    //产生副本
    //副本数组是从0开始的，所以需要减去偏移量l
    for(let z = l; z <= r; z++){
        aux[z - l] = arr[z];
    }
    let i = l;
    let j = mid + 1;
    for(k = l; k <= r; k++){
        if(i > mid){ //说明左子数组已经归并了，剩下右子数组还没归并完
            arr[k] = aux[j - l];
            j++
        }else if(j > r){
            arr[k] = aux[i - l];
            i++;
        }else if(aux[i - l] < aux[j - l]){
            arr[k] = aux[i - l];
            i++;
        }else{
            arr[k] = aux[j - l];
            j++;
        }
    }
}

//递归，对arr[l...r]的范围进行排序
function sort(arr, l, r){
    // if(l >= r){
    //     return;
    // }
    //对于这些高级排序，都有个优化点，就是递归到剩余不多元素时采用插入排序
    if(r - l < 15){      //优化点二
        insertionSort(arr, l, r);
    }
    let mid = Math.floor((r - l)/ 2);
    sort(arr, l, mid);
    sort(arr, mid + 1, r);
    if(arr[mid] > arr[mid + 1]){ //优化点一:如果arr[mid] < arr[mid + 1] 说明整个数组都应该排序好了
       merge(arr, l, mid, r);
    }
}

function mergeSort(arr){
    //arr,开始位置，结束位置
    sort(arr, 0, arr.length - 1);
}

// var arr = [10, 9, 8];

// mergeSort(arr);

// console.log(arr);

//测试数组一大，一直报着“栈溢出”的错误
//理解思想为主
//《数据结构与算法-Javascript描述》也说这个算法的递归深度对js来说太深了