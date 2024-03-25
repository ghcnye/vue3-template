<script setup lang="ts">
import { nextTick, ref } from 'vue';
import router from '@/router';

const route = router.getRoutes()

const arr = route.filter((val) => {
    return val.children.length != 0
})[0].children

const props = defineProps({
    isCollapse: Boolean,
    activePath: String
})

const AMuBox = ref()

const changeWidth = async (width: string) => {
    if(props.isCollapse) {
        AMuBox.value.style = width
    }else {
        AMuBox.value.style = width
    }
    await nextTick()
}

defineExpose({
    changeWidth
})

const elMenuBox = ref()

const emits = defineEmits<{
    changePathFn:[value: string]
}>()

const changePathFn = (val:string) => {
    emits('changePathFn',val)
}

</script>

<template>
    <div class="asideMenu-container" ref="AMuBox">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="activePath"
            text-color="#fff"
            :collapse="isCollapse"
            :unique-opened="true"
            :router="true"
            ref="elMenuBox"
        >
            <el-menu-item :index="obj.path" v-for="(obj,i) in arr" :key="i" @click="changePathFn(obj.path)">
                <el-icon>
                    <setting/>
                </el-icon>
                <template #title>{{obj.meta!.name}}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.asideMenu-container {
    width: 100%;
    height: 100%;
    .el-menu {
        height: 100%;
        overflow-y: auto;
    }
}
</style>