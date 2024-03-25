import Mock from 'mockjs'

const baseUrl = '/flowChart'

// 节点状态列表
const nodeStatusList = [
  {
    "id": "node-0",
    "shape": "data-processing-dag-node",
    "x": 40,
    "y": 100,
    "ports": [
      {
        "id": "node-0-out",
        "group": "out"
      }
    ],
    "data": {
      "name": "数据输入_1",
      "type": "INPUT",
      "status": 'success',
    }
  },
  {
    "id": "node-1",
    "shape": "data-processing-dag-node",
    "x": 250,
    "y": 100,
    "ports": [
      {
        "id": "node-1-in",
        "group": "in"
      },
      {
        "id": "node-1-out",
        "group": "out"
      }
    ],
    "data": {
      "name": "数据筛选_1",
      "type": "FILTER",
      "status": 'success',
    }
  },
  {
    "id": "node-2",
    "shape": "data-processing-dag-node",
    "x": 250,
    "y": 200,
    "ports": [
      {
        "id": "node-2-out",
        "group": "out"
      },
      {
        "id": "node-2-in",
        "group": "in"
      }
    ],
    "data": {
      "name": "数据输入_2",
      "type": "INPUT",
      "status": 'success',
    }
  },
  {
    "id": "node-3",
    "shape": "data-processing-dag-node",
    "x": 500,
    "y": 100,
    "ports": [
      {
        "id": "node-3-in",
        "group": "in"
      },
      {
        "id": "node-3-out",
        "group": "out"
      }
    ],
    "data": {
      "name": "数据连接_1",
      "type": "JOIN",
      "status": 'success',
    }
  },
  {
    "id": "node-4",
    "shape": "data-processing-dag-node",
    "x": 750,
    "y": 100,
    "ports": [
      {
        "id": "node-4-in",
        "group": "in"
      }
    ],
    "data": {
      "name": "数据输出_1",
      "type": "OUTPUT",
      "status": 'success',
    }
  }
]
  
  // 边状态列表
  const edgeStatusList = [
    {
      "id": "edge-0",
      "source": {
        "cell": "node-0",
        "port": "node-0-out"
      },
      "target": {
        "cell": "node-1",
        "port": "node-1-in"
      },
      "shape": "data-processing-curve",
      "zIndex": -1,
      "data": {
        "source": "node-0",
        "target": "node-1"
      }
    },
    {
      "id": "edge-1",
      "source": {
        "cell": "node-2",
        "port": "node-2-out"
      },
      "target": {
        "cell": "node-3",
        "port": "node-3-in"
      },
      "shape": "data-processing-curve",
      "zIndex": -1,
      "data": {
        "source": "node-2",
        "target": "node-3"
      }
    },
    {
      "id": "edge-2",
      "source": {
        "cell": "node-1",
        "port": "node-1-out"
      },
      "target": {
        "cell": "node-3",
        "port": "node-3-in"
      },
      "shape": "data-processing-curve",
      "zIndex": -1,
      "data": {
        "source": "node-1",
        "target": "node-3"
      }
    },
    {
      "id": "edge-3",
      "source": {
        "cell": "node-3",
        "port": "node-3-out"
      },
      "target": {
        "cell": "node-4",
        "port": "node-4-in"
      },
      "shape": "data-processing-curve",
      "zIndex": -1,
      "data": {
        "source": "node-3",
        "target": "node-4"
      }
    }
  ]

  const getNodeEdge = Mock.mock(baseUrl + '/getNodeEdge',() => {
    return {
        "code": 200,
        "msg": "success",
        "data": {
          node: nodeStatusList,
          edge: edgeStatusList
        }
    }
  })