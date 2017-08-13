// Quick Union + rank + path compression

function UF(n){
    this.parent = [];
    this.rank = [];
    this.count = n;
    for(var i = 0; i < n; i++){
        this.parent[i] = i;
        this.rank[i] = 1;
    }
}

UF.prototype.find = function(v){
    if(v >= 0 && v < this.count){
        while(v !== this.parent[v]){
            this.parent[v] = this.parent[this.parent[v]];
            v = this.parent[v];
        }
        return v;
    }
};

UF.prototype.union = function(v, m){
    var vRoot = this.find(v),
        mRoot = this.find(m);
    if(vRoot === mRoot){
        return;
    }
    if(this.rank[vRoot] < this.rank[mRoot]){
        this.parent[vRoot] = mRoot;
    }else if(this.rank[vRoot] > this.rank[mRoot]){
        this.parent[mRoot] = vRoot;
    }else{
        this.parent[vRoot] = mRoot;
        this.rank[vRoot] += 1;
    }
};

UF.prototype.isConnected = function(v, m){
    return this.find(v) === this.find(m);
};

// var  n = 10000,
//     uf = new UF(n),
//     start = Date.now();
// for(var i = 0; i < n; i++){
//     var a = Math.floor(Math.random() * n);
//     var b = Math.floor(Math.random() * n);
//     uf.union(a, b);
// }

// for(var i = 0; i < n; i++){
//     var a = Math.floor(Math.random() * n);
//     var b = Math.floor(Math.random() * n);
//     uf.isConnected(a, b);
// }
// var end = Date.now();

// console.log(end - start);

module.exports = UF;