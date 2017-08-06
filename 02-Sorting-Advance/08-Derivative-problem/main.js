/*
    归并排序和快速排序的衍生问题:
    都使用分治算法的思想，即分而治之，将原问题分隔成同等结构的子问题
*/

//例子一-归并排序衍生问题
// 求数组中逆序对的数量
// 逆序对：用来衡量一个数组的有序程度

//方法一：暴力破解，双重循环考察每一个数对。算法复杂度为O(n^2)
//方法二：Merge Sort的思路求逆序对的个数。算法复杂度为O(nlogn)

// 对于一个大小为N的数组, 其最大的逆序数对个数为 N*(N-1)/2, 非常容易产生整型溢出

// merge函数求出在arr[l...mid]和arr[mid+1...r]有序的基础上, arr[l...r]的逆序数对个数
function merge(arr, l, mid, r){
    let aux = new Array(r - l + 1);
    let result = 0;
    for(let i = l; i <= r; i++){
        aux[i - l] = arr[i];
    }
    let i = l;
    let j = mid + 1;
    for(let k = l; k <= r; k++){
        if(i > mid){
            arr[k] = aux[j - l];
            j++;
        }else if(j > r){
            arr[k] = aux[i - l];
            i++;
        }else if(aux[i - l] <= aux[j - l]){
            arr[k] = arr[i - l];
            i++;
        }else{
            // 此时, 因为右半部分i所指的元素小
            // 这个元素和左半部分的所有未处理的元素都构成了逆序数对
            // 左半部分此时未处理的元素个数为 mid - l + 1
            arr[k] = arr[j - l];
            j++;
            result += mid - l + 1;  
        }
    }
    return result;
}

// 求arr[l..r]范围的逆序数对个数
function __getReversePair(arr, l, r){
    if(l >= r){
        return 0;
    }
    let mid = Math.floor((r - l) / 2);
    // 求出 arr[l...mid] 范围的逆序数
    let res1 = __getReversePair(arr, l, mid);
    // 求出 arr[mid+1...r] 范围的逆序数
    let res2 = __getReversePair(arr, mid + 1, r);
    return res1 + res2 + merge(arr, l, mid, r);
}


function reversePair(arr){
   return __getReversePair(arr, 0, arr.length - 1);
}

//###########################################################

//例子一-快速排序的衍生问题
//求数组中第n大的元素

//方法一：先排序，算法复杂度：O(nlogn)
//方法二：Quick Sort的思路,算法复杂度为O(2n)=n+n/2+n/4+n/8+...+1也就是O(n)级别的

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function __partition(arr, l, r){
    let start = l;
    let j = l;
    for(let i = l + 1; i <= r; i++){
        if(arr[i] < arr[start]){
            j++;
            swap(arr, i, j);
        }
    }
    swap(arr, start, j);
    return j;
}

// 求出arr[l...r]范围里第k小的数
function __select(arr, l, r, k){
    if(l === r){
        return arr[r];
    }
    // partition之后, arr[p]的正确位置就在索引p上
    let p = __partition(arr, l, r); //返回的p就是它的索引，也就是它的排名
    if(k == p){ // 如果 k == p, 直接返回arr[p]
        return arr[p];
    }else if(k < p){ // 如果 k < p, 只需要在arr[l...p-1]中找第k小元素即可
        return __select(arr, l, p - 1, k);
    }else{  // 如果 k > p, 则需要在arr[p+1...r]中找第k小元素    
        return __select(arr, p + 1, r, k);
    }
}

// 寻找arr数组中第k小的元素
function selection(k){
    __select(arr, 0, arr.length - 1, k);
}