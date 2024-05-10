<script setup lang="tsx">
import { FunctionalComponent, Ref, onMounted, ref, toRef } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElButton, type ButtonInstance, ElDivider } from 'element-plus'
import { getDate } from '@/util/minix.ts'

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

const open = ref(false)

const date: Ref<string> = toRef(getDate(Date.now()))

const handleButton = (event,name:string) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event,name);
    
}

const TsxFn: FunctionalComponent = (): FunctionalComponent => {
    return (
        <div className="tboxmain">
            <ElButton 
                onClick={event => {
                    handleButton(event,'sss')
                }}
            >点击</ElButton>
            <p style={{color: 'black'}}>erererererererer</p>
            <div>
                {open.value ? <div>yes</div> : <span>no</span>}
            </div>
        </div>
    )
}

const listData = [
    {name: 'Tom', age: 18},
    {name: 'Jim', age: 20},
    {name: 'Lucy', age: 16}
]

const ForBox = () => {
    return (
        <div>
            <div class={'box'}>
                <span>姓名</span>
                <ElDivider direction="vertical" />
                <span>年龄</span>
            </div>
            {
                listData.map(item => {
                    return <div class={'box'}>
                        <span>{item.name}</span>
                        <ElDivider direction="vertical" />
                        <span>{item.age}</span>
                    </div>
                })
            }
        </div>
    )
}

onMounted(() => {
})

</script>
<template>
    <div class="sy-container">
        <div class="test">
            <el-button type="primary" @click="open = true">Begin Tour</el-button>

            <el-divider />

            <el-space>
                <el-button ref="ref1">upload</el-button>
                <el-button ref="ref2" type="primary">save</el-button>
                <el-button ref="ref3" :icon="MoreFilled" />
            </el-space>

            <el-tour v-model="open">
                <el-tour-step :target="ref1?.$el" title="Upload File">
                    <img src="https://element-plus.org/images/element-plus-logo.svg" alt="tour.png" />
                    <div>Put you files here.</div>
                </el-tour-step>
                <el-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
                <el-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
            </el-tour>
        </div>
        <div class="dateBox">
            {{ date }}
        </div>
        <div class="tsxBox">
            <Tsx-fn></Tsx-fn>
            <ForBox></ForBox>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sy-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.test {
    width: 300px;
    height: 200px;
}
</style>