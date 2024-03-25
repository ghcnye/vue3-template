// 首先引入Mock
import Mock from 'mockjs'
import './api/flowChart.ts'

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});



