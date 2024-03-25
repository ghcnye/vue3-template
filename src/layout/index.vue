<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import HeaderMenu from '@/layout/headerMenu.vue'
import AsideMenu from '@/layout/AsideMenu.vue';
import router from '@/router';

const isCollapse = ref(false)

const lyMainBox = ref()

const AMuBox = ref()

const laycBox = ref()

onMounted(() => {
})

const changeisCollapse = async () => {
    isCollapse.value = !isCollapse.value
    let width2 = laycBox.value?.clientWidth
    if(isCollapse.value) {
        AMuBox.value.changeWidth('width: 65px')
        lyMainBox.value.style = `width: ${width2 - 70}px`;
    }else {
        AMuBox.value.changeWidth('width: 10%')
        lyMainBox.value.style = `width: ${width2 * 0.9}px`;
    }
    await nextTick()
}

let path = ref(router.currentRoute.value.fullPath)

const changeActivePathFn = (val:string) => {
    path.value = val
}

const changepath = (val:string) => {
    path.value = val
}

</script>
<template>
    <div class="layout-container" ref="laycBox">
        <HeaderMenu :isCollapse="isCollapse" @changeisCollapse="changeisCollapse" @changeActivePath="changeActivePathFn"></HeaderMenu>
        <AsideMenu class="AsideMenuBox"  ref="AMuBox" :activePath="path" @changePathFn="changepath" :isCollapse="isCollapse"></AsideMenu>
        <div class="layoutMain" ref="lyMainBox">
            <router-view>
                <template #default="{ Component, route }">
                    <keep-alive>
                        <component :is="Component" :key="route.path" />
                    </keep-alive>
                </template>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    box-sizing: border-box;

    HeaderMenu {
        width: 100%;
    }

    .AsideMenuBox {
        width: 10%;
        height: calc(100% - 80px);
        float: left;
    }

    .layoutMain {
        width: 90%;
        height: calc(100% - 80px);
        float: right;
    }
}
</style>