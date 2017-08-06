function MaxHeap(arr){
    if(Object.prototype.toString.call(arr) === '[object Array]'){
        let i,
            len = arr.length;
        this.data = [];
        for(i = 0; i < len; i++){
            this.data[i + 1] = arr[i];
        }
        this.count = i;
        for(i = Math.floor(this.count / 2); i > 0; i--){
            this.shiftDown(i);
        }
    }else{
        this.data = []; //存储的内容是从索引1开始的
        this.count = 0; 
    }
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

module.exports = MaxHeap;