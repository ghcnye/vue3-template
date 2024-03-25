<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {userstore} from '@/store/modules/user'
import router from '@/router';
import type {Info} from '@/store/modules/user'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})



const userStore = userstore();

let loginform: Info = reactive({
  username: '',
  password: ''
});

interface RuleForm {
  username: string
  password: string
}

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur',},
    { min: 6, max: 18, message: '密码长度须在6-18位数之间', trigger: 'blur' },
  ]
})

const loginBool = ref(false);

// 登陆
const onlogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      router.push('/')
      userStore.login(loginform)
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 变成注册 from
const ontozcFn = () => {
  loginBool.value = true
  resetfrom()
}

// 变成登陆 form
const ontologinFn = () => {
  loginBool.value = false
  resetfrom()
}

const resetfrom = () => {
  loginform.username = '';
  loginform.password = '';
}

// 注册
const onzcFn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      loginBool.value = false
      resetfrom()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const EnterFn = (val:Object) => {
  if(val?.key === 'Enter') {
    onlogin(ruleFormRef.value)
  }  
}

</script>
<template>
    <div class="login-container">
        <div class="titleBox">
          <h1 v-if="!loginBool">登 陆</h1>
          <h1 v-else>注 册</h1>
        </div>
        <div class="mainBox">
          <el-form 
            :model="loginform" 
            label-width="120px"  
            class="demo-form-inline" 
            label-position="left"
            ref="ruleFormRef"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginform.username" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginform.password" type="password" clearable @keydown="EnterFn($event)" />
            </el-form-item>
            <el-form-item class="formbtnBox" v-if="!loginBool">
              <el-button @click="ontozcFn">注 册</el-button>
              <el-button type="primary" @click="onlogin(ruleFormRef)">登 陆</el-button>
            </el-form-item>
            <el-form-item class="formbtnBox" v-else>
              <el-button @click="ontologinFn">返 回</el-button>
              <el-button type="primary" @click="onzcFn(ruleFormRef)">注 册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerBox">
            <p>copyright @20240110 vite-vue3-typescript-pinia-vuerouter-axios</p>
        </div>
        <el-watermark :font="font" :content="['vite+elementplus+pinia+typescript']" class="watermarkBox">
            <div />
        </el-watermark>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  .titleBox {
    position: absolute;
    top: 5%;
    left: 45%;
    width: 10%;
    height: 100px;
    text-align: center;
  }
  .mainBox {
    position: absolute;
    top: 35%;
    left: 30%;
    width: 40%;
    min-width: 400px;
    height: 300px;
    z-index: 10;
    ::v-deep .el-form--default {
      height: 100%;
      width: 380px;
      padding: 10px;
      margin: 0 auto;
      .el-form-item {
        margin-bottom: 40px;
      }
      .formbtnBox {
        .el-form-item__content {
          margin-left: 70px !important;
          :nth-child(2) {
            margin-left: 110px;
          }
        }
      }
    }
  }
  .footerBox {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    p {
      width: 100%;
      text-align: center;
    }
  }
}
.watermarkBox {
  height: 100vh;
}
::v-deep .demo-form-inline .el-input {
  --el-input-width: 360px;
}
</style>