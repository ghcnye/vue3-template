<script setup lang="ts">
import { ref,defineProps } from 'vue'
import { userstore } from '@/store/modules/user';
import { Setting, SwitchButton } from '@element-plus/icons-vue'
import router from '@/router';
import { ElMessageBox } from 'element-plus';

import type {Info} from '@/store/modules/user'

const userStore = userstore()
const userinfo: Info = userStore.userInfo as Info
const name = userinfo.username
const title = ref('vue-admin-template')

const logoutFn = () => {
    ElMessageBox.confirm(
        '是否确认退出?',
        '',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true,
        }
    )
        .then(() => {
            userStore.logout()
            router.push('/login')
        })
}

defineProps({
    isCollapse: Boolean,
})

const emit = defineEmits<{
    changeActivePath: [value: string]
    changeisCollapse: []
}>()

const touserFn = () => {
    router.push('/user')
    emit('changeActivePath','/user')
}


</script>

<template>
    <div class="headerMenu-container">
        <div class="hc-title" @click="$emit('changeisCollapse')">
            {{ title }}
        </div>
        <div class="hc-setting">
            <el-avatar :size="35"> {{ name }} </el-avatar>
            <el-dropdown trigger="click">
                <el-button type="primary" :icon="Setting" circle />
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="touserFn">用户管理</el-dropdown-item>
                    <el-dropdown-item>Action2</el-dropdown-item>
                    <el-dropdown-item>Action3</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button type="warning" :icon="SwitchButton" circle @click="logoutFn" />
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.headerMenu-container {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: rgba(44, 177, 195, 0.8);

    .hc-title {
        display: flex;
        width: 10%;
        color: #fff;
        height: 100%;
        line-height: 100%;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
    }

    .hc-setting {
        position: absolute;
        top: 20px;
        right: 20px;
        height: 35px;
        width: 150px;
        .el-avatar {
            position: absolute;
            right: 104px;
            top: 0;
        }
        .el-dropdown {
            position: absolute;
            right: 52px;
            top: 0;
        }
        .el-button {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}</style>