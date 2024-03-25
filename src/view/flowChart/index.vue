<script setup lang="tsx">
import { getNodeEdgeData } from "@/api/flowChart/index.ts";
import { onMounted, onUpdated, reactive, nextTick } from "vue";
import { Graph, Platform, StringExt, Path, Edge, Shape } from "@antv/x6";
import { ElTooltip, ElDropdown } from "element-plus";
import { register } from "@antv/x6-vue-shape";

let nodeData = reactive([]);
let edgeData = reactive([]);

const getmock = () => {
  getNodeEdgeData().then((res) => {
    nodeData = res.data.node;
    edgeData = res.data.edge;
  });
};

// 节点类型
enum NodeType {
  INPUT = "INPUT", // 数据输入
  FILTER = "FILTER", // 数据过滤
  JOIN = "JOIN", // 数据连接
  UNION = "UNION", // 数据合并
  AGG = "AGG", // 数据聚合
  OUTPUT = "OUTPUT", // 数据输出
}

// 元素校验状态
enum CellStatus {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

// 不同节点类型的icon
const NODE_TYPE_LOGO = {
  INPUT:
    "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original", // 数据输入
  FILTER:
    "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ZJ6qToit8P4AAAAAAAAAAAAADtOHAQ/original", // 数据筛选
  JOIN: "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*EHqyQoDeBvIAAAAAAAAAAAAADtOHAQ/original", // 数据连接
  UNION:
    "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k4eyRaXv8gsAAAAAAAAAAAAADtOHAQ/original", // 数据合并
  AGG: "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*TKG8R6nfYiAAAAAAAAAAAAAADtOHAQ/original", // 数据聚合
  OUTPUT:
    "https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*zUgORbGg1HIAAAAAAAAAAAAADtOHAQ/original", // 数据输出
};

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
const createEdge = (obj) => {
  const edge = {
    id: obj.id,
    shape: 'data-processing-curve',
    source: obj.source,
    target: obj.target,
    zIndex: -1,
    data: obj.data,
    connector: {
      name: "rounded",
      args: {
        radius: 20,
      },
      sourceAnchor: {
        // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
        name: "right",
        args: {
          dx: 0,
        },
      },
      targetAnchor: {
        // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
        name: "left",
        args: {
          dx: 0,
        },
      },
      connectionPoint: "boundary",
    },
    tools: ['edge-editor'],
  };
  if (graph) {
    graph.addEdge(edge);
  }
};

// 根据节点的类型获取ports
const getPortsByType = (type, nodeId: string) => {
  let ports = {};
  switch (type) {
    case "INPUT":
      ports = {
        groups: {
          out: {
            position: "right",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#31d0c6",
                strokeWidth: 2,
                fill: "#fff",
                style: {
                  // visibility: "hidden",
                },
              },
            },
          },
        },
        items: [
          {
            id: `${nodeId}-out`,
            group: "out",
          },
        ],
      };
      break;
    case "OUTPUT":
      ports = {
        groups: {
          in: {
            position: "left",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#108ee9",
                strokeWidth: 2,
                fill: "#fff",
                style: {
                  // visibility: "hidden",
                },
              },
            },
          },
        },
        items: [
          {
            id: `${nodeId}-in`,
            group: "in",
          },
        ],
      };
      break;
    default:
      ports = {
        groups: {
          in: {
            position: "left",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#108ee9",
                strokeWidth: 2,
                fill: "#fff",
                style: {
                  // visibility: "hidden",
                },
              },
            },
          },
          out: {
            position: "right",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#31d0c6",
                strokeWidth: 2,
                fill: "#fff",
                style: {
                  // visibility: "hidden",
                },
              },
            },
          },
        },
        items: [
          {
            id: `${nodeId}-in`,
            group: "in",
          },
          {
            id: `${nodeId}-out`,
            group: "out",
          },
        ],
      };
      break;
  }
  return ports;
};

/**
 * 创建节点并添加到画布
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
const createNode = (obj) => {
  const sameTypeNodes = obj.data.type;
  const typeName = obj.data.name;
  const id = obj.id;
  const node = {
    id,
    // shape: obj.shape,
    shape: 'rect',
    x: obj.x,
    y: obj.y,
    attrs: {
      body: {
        stroke: 'blue',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
      label: {
        fill: '#333',
      }
    },
    width: 180,
    height: 48,
    ports: getPortsByType(obj.data.type, id),
    data: {
      name: `${typeName}_${sameTypeNodes.length + 1}`,
      type: obj.data.type,
    },
    label: `${typeName}`,
    tools: ['node-editor'],
  };
  graph.addNode(node);
};

let graph: Graph;

// 画布初始化
const initGraph = () => {
  graph = new Graph({
    container: document.getElementById("container")!,
    panning: {
      enabled: true,
      eventTypes: ["leftMouseDown", "mouseWheel"],
    },
    mousewheel: {
      enabled: true,
      modifiers: "ctrl",
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#31d0c6",
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      sourceAnchor: {
        name: "left",
        args: {
          dx: Platform.IS_SAFARI ? 4 : 8,
        },
      },
      targetAnchor: {
        name: "right",
        args: {
          dx: Platform.IS_SAFARI ? 4 : -8,
        },
      },
      createEdge() {
        return graph.createEdge({
          shape: 'data-processing-curve',
          attrs: {
            line: {
              strokeDasharray: '5 5',
            },
          },
          zIndex: -1,
        })
      },
      // 连接桩校验
      validateConnection({ sourceMagnet, targetMagnet }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
          return false
        }
        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
          return false
        }
        return true
      },
    },
    grid: {
      visible: true,
    },
    background: {
      color: "#F2F7FA",
    },
    autoResize: true,
  });
};

function DataProcessingDagNode (item):Node {

  function render(item) {
    const name  = item.data.name
    return (
      <div className="data-processing-dag-node">
        <div className="main-area">
          {{name}}
        </div>
      </div>
    )
  }
  return render(item)
}



// 初始化连线
const initLine = () => {
  // 注册连线
  Graph.registerConnector(
    "curveConnector",
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x);
      const path = new Path();
      path.appendSegment(
        Path.createSegment("M", sourcePoint.x - 4, sourcePoint.y)
      );
      path.appendSegment(
        Path.createSegment("L", sourcePoint.x + 12, sourcePoint.y)
      );
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          "C",
          sourcePoint.x < targetPoint.x
            ? sourcePoint.x + hgap / 2
            : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x
            ? targetPoint.x - hgap / 2
            : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x - 6,
          targetPoint.y
        )
      );
      path.appendSegment(
        Path.createSegment("L", targetPoint.x + 2, targetPoint.y)
      );

      return path.serialize();
    },
    true
  );
  Edge.config({
    markup: [
      {
        tagName: "path",
        selector: "wrap",
        attrs: {
          fill: "none",
          cursor: "pointer",
          stroke: "transparent",
          strokeLinecap: "round",
        },
      },
      {
        tagName: "path",
        selector: "line",
        attrs: {
          fill: "none",
          pointerEvents: "none",
        },
      },
    ],
    connector: { name: "curveConnector" },
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: "round",
      },
      line: {
        connection: true,
        stroke: "#A2B1C3",
        strokeWidth: 1,
        targetMarker: {
          name: "classic",
          size: 6,
        },
      },
    },
  });
}

const addnodeFn = async () => {
  nodeData.forEach((item) => {
    // register({
    //   shape: 'data-processing-dag-node',
    //   width: 180,
    //   height: 48,
    //   component: DataProcessingDagNode(item),
    // })
    createNode(item);
  });
  await nextTick();
};

const addedgeFn = async () => {
  edgeData.forEach((item) => {
    createEdge(item);
  });
  await nextTick();
};



onMounted(async () => {
  await getmock();
  initGraph();
  
  setTimeout(() => {
    // Graph.registerNode("data-processing-dag-node", Node);
    addnodeFn();
  }, 500);
  initLine()
  setTimeout(() => {
    Graph.registerEdge("data-processing-curve", Edge, true);
    addedgeFn();
  }, 600);
});

onUpdated(() => {});
</script>

<template>
  <div class="flowChart-container">
    <div class="treeBox">123</div>
    <div class="chart-container">
      <div id="container"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./flowChart.scss";

.flowChart-container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 20px;

  .treeBox {
    width: 19%;
    height: 100%;
    margin-right: 1%;
    border: 1px solid #31d0c6;
  }

  .chart-container {
    width: 80% !important;
    height: 100% !important;
    border: 1px solid #31d0c6;

    .x6-graph {
      height: 100% !important;
    }
  }
}
</style>
