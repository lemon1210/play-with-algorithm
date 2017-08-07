/*
    优化：路径压缩
    针对find操作的优化
    经过路劲压缩优化的并查集，时间复杂度近乎是O(1)的
*/

// 路劲压缩后树的层数会发生改变
// rank[i]表示以i为根的集合所表示的树的层数
// 在后续的代码中, 我们并不会维护rank的语意, 也就是rank的值在路径压缩的过程中, 有可能不在是树的层数值
// 这也是我们的rank不叫height或者depth的原因, 他只是作为比较的一个标准

function UnionFind(n){
    this.parent = []; 
    this.rank = [];
    this.count = n;
    for(var i = 0; i < n; i++){
        this.parent.push(i); 
        this.rank[i] = 1;
    }
}


UnionFind.prototype.find = function(p){
    if(p >= 0 && p < this.count){
        while(p !== this.parent[p]){ //能满足该条件说明p不是根结点
            // path compression 1
            this.parent[p] = this.parent[this.parent[p]] //让p直接指向它父亲的父亲
            p = this.parent[p];
        }
        return p;
        // path compression 2 递归
        // 压缩成高度为2的树了
        // if(p != this.parent[p]){
        //     this.parent[p] = this.find(this.parent[p]);
        //     return this.parent[p];
        // }
    }
};


UnionFind.prototype.isConnected = function(p, q){
    return this.find(p) === this.find(q);
};


UnionFind.prototype.union = function(p, q){
    var pRoot = this.find(p),
        qRoot = this.find(q);
    if(pRoot === qRoot){
        return;
    }
    //优化点
    if(this.rank[pRoot] < this.rank[qRoot]){
        this.parent[pRoot] = qRoot;
    }else if(this.rank[qRoot] < this.rank[pRoot]){
        this.parent[qRoot] = pRoot;
    }else{ //层数相等的时候才需要维护rank
        this.parent[pRoot] = qRoot;
        this.rank[qRoot] += 1;
    }
};


var  n = 100000,
    uf = new UnionFind(n),
    start = Date.now();
for(var i = 0; i < n; i++){
    var a = Math.floor(Math.random() * n);
    var b = Math.floor(Math.random() * n);
    uf.union(a, b);
}

for(var i = 0; i < n; i++){
    var a = Math.floor(Math.random() * n);
    var b = Math.floor(Math.random() * n);
    uf.isConnected(a, b);
}
var end = Date.now();

console.log(end - start);