// 最小堆
function Heap(){
    this.data = [];
    this.count = 0;
}
Heap.prototype.isEmpty = function(){
    return this.count === 0;
};

Heap.prototype.size = function(){
    return this.count;
};

Heap.prototype.swap = function(arr, i ,j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

Heap.prototype.shiftUp = function(k){
    while(k > 1 && this.data[k] < this.data[Math.floor(k / 2)]){
        this.swap(this.data, k, Math.floor(k / 2));
        k = Math.floor(k / 2);
    }
};

Heap.prototype.insert = function(v){
    this.data[this.count + 1] = v;
    this.count++;
    this.shiftUp(this.count);
};

Heap.prototype.shiftDown = function(k){
    while(2 * k <= this.count){
        var j = 2 * k;
        if(j + 1 <= this.count && this.data[j + 1] < this.data[j]){
            j += 1;
        }
        if(this.data[k] <= this.data[j]){
            break;
        }
        this.swap(this.data, k, j);
        k = j;
    }
};

Heap.prototype.extractMax = function(){
    if(this.count >= 1){
        var res = this.data[1];
        this.data[1] = this.data[this.count];
        this.count--;
        this.shiftDown(1);
        return res;
    }
}

module.exports = Heap;