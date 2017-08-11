// 有权的稀疏图-邻接表
//边类
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype.other = function(a){
    if(a === this.a || a === this.b){
        return a === this.a ? this.a : this.b;
    }
};

function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
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

//最差O(n)
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
//遍历邻边
SparseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        return this.adj[v];
    }
};
//输出
SparseGraph.prototype.show = function(){
    for(var i = 0; i < this.vertices; i++){
        console.log(this.adj[i]);
    }
};

var g = new SparseGraph(7, false);

g.addEdge(0, 1, 0.1);
g.addEdge(0, 2, 0.2);
g.addEdge(0, 5, 0.3);
g.addEdge(0, 6, 0.4);
g.addEdge(3, 4, 0.5);
g.addEdge(3, 5, 0.6);
g.addEdge(4, 5, 0.7);
g.addEdge(4, 6, 0.8);

g.show();
