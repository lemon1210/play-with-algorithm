// Kruskal算法(思路超级简单的算法)  ---- O（ElogE）
// 将所有边按权值大小进行排序
// 每次都取出未标记的最小边，并标记。
// 看该最小边在图中与其他已标记的边是否形成环
// 如果形成环，则不是最小生成树的一条边。

// 图可能存在多个最小生成树

// 判断环：每次将某边A加入最小生成树时将该边的两端点进行union操作
// 下次要加入最小生成树的边B，只需在相应的并查集中查找该B边的两个端点的根节点
// 是否相同。如果相同，说明已经会形成环

//引入最小索引堆(优先队列)
var Q = require('./Queue.js');
//引入并查集
var UF = require('./UnionFind.js');

// 有权的稀疏图-邻接表
//边类
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype.other = function(a){
    if(a === this.a || a === this.b){
        return a === this.a ? this.b : this.a;
    }
};

Edge.prototype.v = function(){
    return this.a;
}

Edge.prototype.w = function(){
    return this.b;
};

//图类
function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.q = new Q();
    this.uf = new UF(n); //传入n个节点个数对并查集进行初始化
    this.adj = [];
    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
    }
}

SparseGraph.prototype.getVertices = function(){
    return this.vertices;
};

SparseGraph.prototype.getEdges = function(){
    return this.edges;
};

SparseGraph.prototype.addEdge = function(v, m, w){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        this.adj[v].push(new Edge(v, m, w));
        if(v !== m && !this.directed){ //防止自环边再push一次
            this.adj[m].push(new Edge(m, v, w));
        }
        this.edges++;
    }
};

SparseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.adj[v].length; i++){
            if(this.adj[v][i].other(v) === m){
                return true;
            }
        }
        return false;
    }
};

SparseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        return this.adj[v];
    }
};

SparseGraph.prototype.mst = function(){
    if(this.edges > 0){
        var res = [];
        for(var i = 0, len = this.adj.length; i < len; i++){
            for(var j = 0; j < this.adj[i].length; j++){
                var e = this.adj[i][j];
                if(e.v() < e.w()){ //排除重复的边
                    this.q.enqueue(e);
                }
            }
        }
        while(!this.q.isEmpty()){
            var e = this.q.dequeue(); //拿到最小权值的边
            if(this.uf.isConnected(e.v(), e.w())){ //如果边的两端点的根节点是相同的，说明形成环
                continue;
            } 
            res.push(e);
            this.uf.union(e.v(), e.w());
        }
        return res;
    }
};


SparseGraph.prototype.show = function(){
    for(var i = 0; i < this.vertices; i++){
        console.log(this.adj[i]);
    }
};

var str = `
4 5 0.35
4 7 0.37
5 7 0.28
0 7 0.16
1 5 0.32
0 4 0.38
2 3 0.17
1 7 0.19
0 2 0.26
1 2 0.36
1 3 0.29
2 7 0.34
6 2 0.40
3 6 0.52
6 0 0.58
6 4 0.93
`;

var arr = str.split('\n');

var g = new SparseGraph(8, false);

for(var i = 1; i < arr.length; i++){
    var v = arr[i].split(' ');
    g.addEdge(parseInt(v[0]), parseInt(v[1]), parseFloat(v[2]));
}
console.log(g.mst());
