/*
    堆的典型应用：优先队列
    普通队列：先进先出，后进后出
    优先队列：出队顺序和入队顺序无关，而是跟优先级有关
    使用堆来实现优先队列，可以将入队出队的时间复杂度都为O(lgn), O(lgn)
    使用普通数组或者顺序数组，最差情况:O(n^2)
*/

/*
    二叉堆:logn级别，即树形结构。
            1.任何一个节点不会大于它的父节点（最大堆），最顶层节点最大
            2.堆总是一棵完全二叉树，最后一层可以不用满（鉴于完全二叉树是一个很整齐的结构，因此可以不用指针而只用数组来表示一颗完全二叉树）

    用数组存储二叉堆
    根节点为1,其他从上到下，从左到右依次编号
    parent (i) = Math.floor(i/2);
    left child (i) = 2*i
    right child (i) = 2*i + 1
*/


function MaxHeap(){
    this.data = []; //存储的内容是从索引1开始的
    this.count = 0; 
}

MaxHeap.prototype.swap = function(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

MaxHeap.prototype.size = function(){
    return this.count;
};

MaxHeap.prototype.isEmpty = function(){
    return this.count === 0;
};
//堆的插入是按照顺序插入到底层的结点上
//，然后与他的父节点比较，如果大于父节点，那么此结点与父节点交换位置，否则，这个位置就是应该插入的位置，依次循环，
MaxHeap.prototype.insert = function(item){ //insert的时候主要堆的定义不能被破坏就行
    this.data[this.count + 1] = item;
    this.count++;
    this.shiftUp(this.count); //新加入的元素大小不确定，有可能破坏堆的定义
};

//尝试将 索引为k的元素 向上移动
MaxHeap.prototype.shiftUp = function(k){
    while(k > 1 && this.data[Math.floor(k / 2)] < this.data[k]){
        this.swap(this.data, k, Math.floor(k / 2));
        k = Math.floor(k / 2);
    };
};

MaxHeap.prototype.shiftDown = function(k){
    while(2 * k <= this.count){ //2 * k < this.count说明该结点存在孩子
        let j = 2 * k;
        if(j + 1 <= this.count && this.data[j + 1] > this.data[j]){
            j += 1;
        }
        if(this.data[k] >= this.data[j]){
            break;
        }
        this.swap(this.data, k, j);
        k = j;
    }
};

//从堆中取出一个元素，只能取出根节点的元素。对于最大堆来说，取出的就是优先级最大的元素，然后用最后一个元素放到根元素的位置，
//保证堆还是一颗完全二叉树，但此时不再是最大堆，需比较替换，就是shiftDown的过程了
MaxHeap.prototype.extractMax = function(){
    if(this.count > 0){
        let res = this.data[1];
        this.swap(this.data, 1, this.count);
        this.count--;
        this.shiftDown(1);
        return res;
    }else{
        throw new Error('堆为空!');
    }
};

let maxHeap = new MaxHeap();

for(let i = 1; i <= 15; i++){
    maxHeap.insert(i);
}

while(!maxHeap.isEmpty()){
    console.log(maxHeap.extractMax());
};
