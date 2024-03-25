import { reactive } from "vue";

export const BarOption = reactive({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
});

export const BarOptionCircle = reactive({
  title: [
    {
      text: "",
    },
  ],
  polar: {
    radius: [30, "80%"],
  },
  angleAxis: {
    max: 4,
    startAngle: 75,
  },
  radiusAxis: {
    type: "category",
    data: ["a", "b", "c", "d"],
  },
  tooltip: {},
  series: {
    type: "bar",
    data: [2, 1.2, 2.4, 3.6],
    coordinateSystem: "polar",
    label: {
      show: true,
      position: "middle", // or 'start', 'insideStart', 'end', 'insideEnd'
      formatter: "{b}: {c}",
    },
  },
});

export const pieOption = reactive({
  title: {
    text: "Nightingale Chart",
    subtext: "Fake Data",
    left: "left",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    left: "center",
    top: "bottom",
    data: [
      "rose1",
      "rose2",
      "rose3",
      "rose4",
      "rose5",
      "rose6",
      "rose7",
      "rose8",
    ],
  },
  toolbox: {
    show: false,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "Radius Mode",
      type: "pie",
      radius: [20, 140],
      center: ["45%", "50%"],
      roseType: "radius",
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      data: [
        { value: 40, name: "rose 1" },
        { value: 33, name: "rose 2" },
        { value: 28, name: "rose 3" },
        { value: 22, name: "rose 4" },
        { value: 20, name: "rose 5" },
        { value: 15, name: "rose 6" },
        { value: 12, name: "rose 7" },
        { value: 10, name: "rose 8" },
      ],
    },
  ],
});

export const gaugeOption = {
  series: [
    {
      type: "gauge",
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.3, "#67e0e3"],
            [0.7, "#37a2da"],
            [1, "#fd666d"],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: "#fff",
          width: 2,
        },
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: "#fff",
          width: 4,
        },
      },
      axisLabel: {
        color: "inherit",
        distance: 40,
        fontSize: 14,
      },
      detail: {
        valueAnimation: true,
        formatter: "{value} km/h",
        color: "inherit",
        fontSize: 20,
      },
      data: [
        {
          value: 70,
        },
      ],
    },
  ],
};
