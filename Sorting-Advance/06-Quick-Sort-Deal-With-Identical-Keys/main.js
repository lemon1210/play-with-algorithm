/*  
    快排之优化二:双路快速排序
    排序重复值很多的数组,又退化到O(n^2)
    重复值太多，导致数组中基准值v两端的元素个数极度不平衡，=v的元素放在左边或右边都会导致不平衡性
    解决：
    之前我们把大于v和小于v放在数组的前面，现在把大于v和小于v放在数组的两边
    [v,<=v ........... >=v]      把=v都分散到数组的前后两部分
     l   i           j  
     i++
     j--
     i=j break
 */

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, l, r){
    let random = Math.floor(Math.random() * (r - l + 1)) + l,
        start = l,
        i = l + 1,
        j = r;
    swap(arr, start, random);
    //arr[l+1....i)<=v  arr(j....r]>=v
    while(true){
        while(i <= r && arr[i] < arr[start]) i++;
        while(j >= l + 1 && arr[j] > arr[start]) j--;
        if(i > j){
            break;
        }
        swap(arr, i, j);
        i++;
        j--;
    }
    swap(arr, start, j);
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