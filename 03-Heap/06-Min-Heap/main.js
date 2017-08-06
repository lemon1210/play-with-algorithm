 	function MinHeap(array){
		this.data = [];
		this.count = 0;
		for(var i = 0, len = array.length; i < len; i++){
			this.insert(array[i]); 
		}
	}

	MinHeap.prototype.insert = function(item){
		this.count++;
		this.data[this.count] = item;
		this.shiftUp(this.count);
	};

	MinHeap.prototype.__swap = function(arr, i, j){
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	};

	MinHeap.prototype.shiftUp = function(k){
		while(k > 1 && this.data[Math.floor(k / 2)] > this.data[k]){
			this.__swap(this.data, k, Math.floor(k / 2));
			k = Math.floor(k / 2);
		}
	};
	//返回堆顶元素
	MinHeap.prototype.get = function(){
		return this.data[1];
	};
	//删除堆顶元素（相当于出队）
	MinHeap.prototype.delete = function(){
		if(this.count > 0){
			var res = this.data[1];
			this.__swap(this.data, 1, this.count);
			this.count--;
			this.shiftDown(1);
			return res;
		}
	};
	MinHeap.prototype.shiftDown = function(k){
		while(2 * k <= this.count){
			var j = 2 * k;
			if(j + 1 <= this.count && this.data[j + 1] < this.data[j]){ //左右孩子先 选择更小的那个孩子的索引出来
				j += 1;
			}
			if(this.data[k] <= this.data[j]){
				break;
			}
			this.__swap(this.data, k, j);
			k = j;
		}
	};
	//先根遍历。跟二叉树的先序遍历差不多，递归的思想
	MinHeap.prototype.print = function(){
		(function(k){
			if(k > this.count){
				return;
			}
			console.log(this.data[k]);
			arguments.callee.call(this, 2 * k);
			arguments.callee.call(this, 2 * k + 1);
		}).call(this, 1);
	};
	var heap = new MinHeap([1, 5, 3, 8, 8, 5, 6]);
	heap.print();