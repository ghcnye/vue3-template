<script setup lang="ts">
import { ref } from 'vue'

import * as echarts from 'echarts';

import {BarOption,BarOptionCircle,pieOption,gaugeOption} from './data.ts'

const sclist = ref<HTMLElement>()
const sclistBarCircle = ref<HTMLElement>()
const pieList = ref<HTMLElement>()
const gaugeList = ref<HTMLElement>()

const myCharts = ref<any>();
const myChartsBarCircle = ref<any>();
const myChartsPieList = ref<any>();
const myChartsGaugeList = ref<any>();

setTimeout(() => {
    myCharts.value = echarts.init(sclist.value!)
    myCharts.value.setOption(BarOption)
},10)

setTimeout(() => {
    myChartsBarCircle.value = echarts.init(sclistBarCircle.value!)
    myChartsBarCircle.value.setOption(BarOptionCircle)
},10)

setTimeout(() => {
    myChartsPieList.value = echarts.init(pieList.value!)
    myChartsPieList.value.setOption(pieOption)
},10)

setTimeout(() => {
    myChartsGaugeList.value = echarts.init(gaugeList.value!)
    myChartsGaugeList.value.setOption(gaugeOption)
},10)

</script>
<template>
    <div class="sy-container">
        <div class="scListBox">
            <div ref="sclist" class="sclist">

            </div>
            <div class="sclist" ref="sclistBarCircle">

            </div>
            <div class="sclist" ref="pieList">

            </div>
            <div class="sclist" ref="gaugeList">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sy-container {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;

    .scListBox {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        .sclist {
            width: 20%;
            height: 260px;
            background-color: aqua;
        }
    }
}
</style>