

class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
        this.adjacencyList[vertex2][vertex1] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
        this.adjacencyList[vertex2][vertex1] = weight;
    }

    dijkstra(source) {
        let distances = {},
            parents = {},
            visited = new Set();
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        console.log(distances);
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }
    buildGraph(edges) {
        for (let [from, to, weight] of edges.map(r => r.split("-"))) { 
            if(!this.vertices.includes(from)) this.addVertex(from);
            if(!this.vertices.includes(to)) this.addVertex(to);
            this.addEdge(from, to, parseInt(weight));
        }
    }
}

var roads = [
    "Alice's House-Bob's House-1",
    "Alice's House-Cabin-2",
    "Alice's House-Post Office-3",
    "Bob's House-Town Hall-4",
    "Daria's House-Ernie's House-5",
    "Daria's House-Town Hall-6",
    "Ernie's House-Grete's House-7",
    "Grete's House-Farm-8",
    "Grete's House-Shop-9",
    "Marketplace-Farm-10",
    "Marketplace-Post Office-11",
    "Marketplace-Shop-12",
    "Marketplace-Town Hall-13",
    "Shop-Town Hall-14"

  ];
let newGraph = new Graph();

newGraph.buildGraph(roads);
let x = prompt("Input Start Point:")
newGraph.dijkstra(x);
