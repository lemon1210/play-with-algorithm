/**
    图: 节点+边
    分类：
        有向图
        无向图
        有权图
        无权图
    连通性：
    简单图：没有自环边和平行边
    (有向/无向)图的表示：
        邻接矩阵：  适合表示稠密图（边相对比较多），有一种完全图
            0 1 2 3
            0 0 0 0  0
            0 0 0 0  1
            0 0 0 0  2
            0 0 0 0  3
        邻接表：  适合表示系数图
            0 [1, 2] 
            1 [0]
            2 [3, 1]
            3 [0]
    图的遍历：
        0：1 2 5 6
        1：0
        2：0
        3：4 5
        4：3 5 6
        5：0 3 4
        6：0 4
        深度优先遍历：
            从一个点开始不停地向下试。跟树的遍历不一样，树从根开始向下走，一定有走不通的时候。
            而图存在环，所以需要记录每一个点是否被遍历过了
            dfs查找两点之间的路劲并不能保证是最短路径
            0 1 2 5 3 4
            应用：求图中的连通分量，联通分量跟联通分量之间没有任何边相连
                 检测图中是否有环 
                 求两点之间的路径 
            复杂度：
                稀疏图（邻接表）：O(V+E)
                稠密图（邻接矩阵）：O(V^2)
        广度优先遍历(层序遍历)
            用一个队列，先push进根节点
            0 1 2 5 6 3 4
            应用：求出了无权图的最短路径和最长路径
            复杂度：
                稠密图（邻接矩阵）：O(V+E)
                稀疏图（邻接表）: O(V^2)
 */

// 稠密图-邻接矩阵
function DenseGraph(n, directed){
    this.vertices = n;  //顶点个数
    this.edges = 0; //边个数
    this.directed = directed;  //boolean 有向或无向
    this.ccount = 0; //连通分量
    this.visited = []; //标记哪些点已经被访问过
    this.id = []; //标记图中哪些点是相连接的。相连接的点的值相同
    this.from = []; //this.from[1] = 0; 说明0->1
    this.ord = []; // this.ord[3] = 4;  到3这个节点的层数为4
    this.matrix = [];
    for(var i = 0; i < n; i++){
        var arr = [];
        for(var j = 0; j < n; j++){
           arr[j] = false;
        }
        this.matrix[i] = arr;
    }
}
DenseGraph.prototype.getEdges = function(){
    return this.edges;
};
DenseGraph.prototype.getVertices = function(){
    return this.vertices;
};
// 这里把“平行边”的概念去掉了
DenseGraph.prototype.addEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        if(this.hasEdge(v, m)){  //如果该边已经存在
            return;
        }
        this.matrix[v][m] = true;
        if(!this.directed){     //不是有向图的话
            this.matrix[m][v] = true;
        }
        this.edges++;
        
    }
};
//O(1)
DenseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        if(this.matrix[v][m]){
            return true;
        }
        return false;
    }
};
//遍历邻边
DenseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        var arr = [];
        for(var i = 0; i < this.matrix[v].length; i++){
            if(this.matrix[v][i] === true){
                arr.push(i);
            }
        }
        return arr;
    }
};
//求联通分量的过程
DenseGraph.prototype.getCcount = function(){
    if(this.vertices > 0){
        for(var i = 0; i < this.vertices; i++){
            this.visited[i] = false;
            this.id[i] = -1;
        }
        for(var i = 0; i < this.vertices; i++){
            if(!this.visited[i]){ 
                this.dfsForCcount(i);
                this.ccount++;
            }
        }
        //this.visited = [];
        return this.ccount;
    }
};
//深度优先遍历---用于求联通分量
DenseGraph.prototype.dfsForCcount = function(v){
    this.visited[v] = true;
    this.id[v] = this.ccount;
    var neighbour = this.iterator(v); //返回v节点的所有邻边
    for(var i = 0, len = neighbour.length; i < len; i++){
        if(!this.visited[neighbour[i]]){
            this.dfsForCcount(neighbour[i]);
        }
    }
};
//v,m是否相连接
DenseGraph.prototype.isConnected = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        return this.id[v] === this.id[m];
    }
};
//查看v->m两点之间的路径
DenseGraph.prototype.path = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.vertices; i++){
            this.from[i] = -1;
            this.visited[i] = false;
        }
        this.dfsForPath(v);
        var p = m,
            stack = [];
        while(this.from[p] !== -1){
            stack.unshift(p);
            p = this.from[p];
        }
        stack.unshift(v);
        return stack.join('-->');
    }
};

DenseGraph.prototype.dfsForPath = function(v){
    this.visited[v] = true;
    var neighbour = this.iterator(v);
    for(var i = 0, len = neighbour.length; i < len; i++){
        if(!this.visited[neighbour[i]]){
            this.from[neighbour[i]] = v; //
            this.dfsForPath(neighbour[i]);
        }
    }
};

//求v->m的最短路径
DenseGraph.prototype.shortestPath = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.vertices; i++){
            this.from[i] = -1;
            this.visited[i] = false;
            this.ord[i] = -1;
        }
        this.dfs(v);
        var p = m,
            stack = [];
        while(this.from[p] !== -1){
            stack.unshift(p);
            p = this.from[p];
        }
        stack.unshift(v)
        return stack.join('-->');
    }
};
//广度优先遍历
DenseGraph.prototype.dfs = function(v){
     var queue = [];
     queue.push(v);
     this.visited[v] = true;
     this.ord[v] = 0; //
     while(queue.length > 0){
         var first = queue.shift();
         var neighbour = this.iterator(first);
         for(var i = 0, len = neighbour.length; i < len; i++){
             if(!this.visited[neighbour[i]]){
                 //console.log(neighbour[i]);
                 queue.push(neighbour[i]);
                 this.visited[neighbour[i]] = true;
                 this.from[neighbour[i]] = first;
                 this.ord[neighbour[i]] = this.ord[first] + 1; //求v-->m之间的路径数
             }
         }
     }
};


var g= new DenseGraph(7, false);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(0, 5);
g.addEdge(0, 6);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);
g.addEdge(4, 6);


console.log(g.shortestPath(0, 4));
