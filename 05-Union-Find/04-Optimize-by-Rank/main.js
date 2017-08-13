/*
    这一节是对上一节并查集的优化
    rank优化
    size优化 可能会出现使其效率降低的极端情况， rank就是来解决这个问题
*/

function UnionFind(n){
    this.parent = []; 
    //this.size = []; // sz[i]表示以i为根的集合中元素个数
    //优化点
    this.rank = []; // rank[i]表示以i为根的集合所表示的树的层数（请对比上一节的this.size数组）
    this.count = n;
    for(var i = 0; i < n; i++){
        this.parent.push(i); 
        this.rank[i] = 1;
    }
}

UnionFind.prototype.find = function(p){
    if(p >= 0 && p < this.count){
        while(p !== this.parent[p]){ 
            p = this.parent[p];
        }
        return p;
    }
};

UnionFind.prototype.isConnected = function(p, q){
    return this.find(p) === this.find(q);
};

// 合并元素p和元素q所属的集合,找到它们的根节点来连接
// O(h)复杂度, h为树的高度
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
