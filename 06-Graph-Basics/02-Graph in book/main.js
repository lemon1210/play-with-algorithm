//来自<<数据结构与算法JavaScript描述>>一书
//它是用邻接表来表示图的边的
//为此我就不把01里的spareGraph.js写完整的了


function Graph(v){
    this.edges = 0;
    this.vertices = v;
    this.adj = [];
    this.from = []; //this.pathTo[1] = 2; 表示1节点从2节点来的
    this.marked = []; //标记点i是否被访问 
    for(var i = 0; i < v; i++){
        this.adj[i] = [];
        this.from[i] = -1;
    }
}

//添加从v->m的边
Graph.prototype.addEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        this.adj[v].push(m);
        this.adj[m].push(v);
        this.edges++;
    }
};

//深度优先搜索
Graph.prototype.dfs = function(v){
    if(v >= 0 && v < this.vertices){
        for(var i = 0; i < this.vertices; i++){
            this.marked[i] = false;
        }
        var arr = [];
        arr.push(v);
        this.marked[v] = true;
        for(var i = 0, len = this.adj[v].length; i < len; i++){
            if(!this.marked[this.adj[v][i]]){
                arr = arr.concat(this.dfs(this.adj[v][i]));
            }
        }
        return arr;
    }
};
//广度优先搜索
Graph.prototype.bfs = function(v){
    if(v >= 0 && v < this.vertices){
        for(var i = 0; i < this.vertices; i++){
            this.marked[i] = false;
        }
        var queue = [];
        var result = [];
        this.marked[v] = true; //
        queue.push(v);
        while(queue.length > 0){
            var first = queue.shift();
            result.push(first);
            for(var i = 0, len = this.adj[first].length; i < len; i++){
                var now = this.adj[first][i];;
                if(!this.marked[now]){
                    this.from[now] = first;
                    this.marked[now] = true; //
                    queue.push(now);
                }
            }
        }
        return result;
    }
};
//利用广度优先搜索查找最短路径
Graph.prototype.smallestPath = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        this.bfs(v);
        var arr = [];
        arr.unshift(m);
        while(this.from[m] !== -1){
            arr.unshift(this.from[m]);
            m = this.from[m];
        }
        return arr;
    }
};


Graph.prototype.toString = function(){

};


var g= new Graph(7);

g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(0, 5);
g.addEdge(0, 6);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);
g.addEdge(4, 6);

//console.log(g.adj);
//console.log(g.bfs(0));
console.log(g.smallestPath(1, 3));



function topSort(){
    var stack = [];
    var visited = [];
    for(var i = 0; i < this.vertices; i++){
        visited[i] = false;
    }
    for(var i = 0; i < this.vertices; i++){
        if(visited[i] === false){
            this.topSortHelper(i, visited, stack);
        }
    }
}

function topSortHelper(v, visited, stack){
    visited[v] = true;
    for(var i = 0; i < this.adj[v]; i++){
        this.topSortHelper();
    }
}