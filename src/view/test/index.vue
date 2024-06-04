<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue'
import { getDate } from '@/util/minix.ts'

let date: Ref<string> = ref(getDate(Date.now()))

let timer: any = setInterval(() => {
  date.value = getDate(Date.now())
}, 1000)

const formInline = ref({
  user: '',
  region: '',
  date: ''
})

const onSubmit = () => {
  console.log(12345);

}

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);

const currentPage = ref(5)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(tableData.value.length)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

onMounted(() => {

})

onUnmounted(() => {
  clearInterval(timer)
})

</script>
<template>
  <div class="test-container">
    <div class="test-header">
      <div class="title">标 题</div><span>{{ date }}</span>
    </div>
    <div class="test-main">
      <div class="test-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="作者">
            <el-input v-model="formInline.user" placeholder="Approved by" clearable />
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="test-table">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
    <div class="test-footer">
      <div class="test-pagiation">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .test-header {
    position: relative;
    height: 60px;
    width: 100%;
    text-align: center;
    // background-color: red;
    border: 1px solid skyblue;
    border-radius: 5px;
    box-sizing: border-box;

    .title {
      line-height: 60px;
      font-size: 24px;
      font-weight: 700;
    }

    span {
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 16px;
      transform: translateY(-8px);
    }
  }
  .test-main {
    height: calc(100% - 122px);
    .test-form {
      height: 60px;
      padding-top: 12px;
      padding-left: 10px;
      box-sizing: border-box;
      border: 1px solid red;
      border-radius: 5px;
    }
    .test-table {
      height: calc(100% - 60px);
      padding: 0 10px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
  .test-footer {
    display: flex;
    height: 60px;
    flex-direction: row-reverse;
    line-height: 60px;
    box-sizing: border-box;
    border: 1px solid purple;
    border-radius: 5px;
  }
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>