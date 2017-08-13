/*
    这一节是对上一节并查集的优化
    size优化
*/



function UnionFind(n){
    this.parent = []; 
    this.size = []; // sz[i]表示以i为根的集合中元素个数
    this.count = n;
    for(var i = 0; i < n; i++){
        this.parent.push(i); 
        this.size[i] = 1;
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
    //这里是优化点：这里固定地将第一个元素的根结点指向第二个元素
    //可能会导致树的高度太高，不够平衡
    //解决：将元素少的根节点指向元素多的根节点
    //需要新增一个存储个数size的数组
    //this.parent[pRoot] = qRoot;    
    // 根据两个元素所在树的元素个数不同判断合并方向
    // 将元素个数少的集合合并到元素个数多的集合上
    if(this.size[pRoot] < this.size[qRoot]){
        this.parent[pRoot] = qRoot;
        this.size[qRoot] += this.size[pRoot];
    }else{
        this.parent[qRoot] = pRoot;
        this.size[pRoot] += this.size[qRoot]; 
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