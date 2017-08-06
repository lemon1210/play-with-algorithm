/*
    自低向上的归并排序
    无需递归，只需迭代
    自顶向下的归并排序会比自底向上的要稍微快一点，但非常进行
    意义：非常方便使用O(nlogn)对链表这样的数据结构进行排序
    优化：
    1.对于小数组使用插入排序
    2.在merge之前如果merge的两部分已经排序好，就不用再merge了
 */

// 第一层循环：对进行merge的元素进行遍历
// 第二层循环：0~sz-1 sz~2sz-1


var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

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

function mergeSortBU(arr){
    for(let size = 1, len = arr.length; size < len; size += size){//数组归并的个数: 从1开始到2到4到.... 一部分为一个size
		//console.log(size);
        //对arr[i.....i+size-1]和arr[i+size.....i+2*size-1]进行归并
        for(let i = 0; i + size < len; i += size + size){ // 注意这里每次都要跨过两个size的区域
            merge(arr, i, i + size - 1, Math.min(i + size + size - 1, len - 1)); //注意数组的越界问题
		}
    }
     return arr;
}

console.log(mergeSortBU(arr));