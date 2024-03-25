<script lang="tsx" setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

import type { FunctionalComponent } from 'vue'
import type { Column, InputInstance } from 'element-plus'

// table
type SelectionCellProps = {
  value: string
  intermediate?: boolean
  onChange: (value: string) => void
  forwardRef: (el: InputInstance) => void
  onBlur: () => void
  onKeydownEnter: () => void
}

const InputCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef,
}) => {
  return (
    <ElInput ref={forwardRef as any} onInput={onChange} modelValue={value} />
  )
}

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
    id: `${prefix}${columnIndex}`,
    Cediting: false,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        editing: false,
        parentId: null,
      }
    )
  })

const columns: Column<any>[] = generateColumns(15)

columns.map((_, columnIndex) => {
  columns[columnIndex] = {
    ...columns[columnIndex],
    title: 'Editable Column',
    cellRenderer: ({ rowData, column }) => {
      const onChange = (value: string) => {
        rowData[column.dataKey!] = value
      }
      const onEnterEditMode = () => {
        rowData.editing = true
        column.Cediting = true
      }

      const onExitEditMode = () => {
        rowData.editing = false
        column.Cediting = false
      }
      const input = ref()
      const setRef = (el) => {
        input.value = el
        if (el) {
          el.focus?.()
        }
      }

      return rowData.editing&&column.Cediting ? (
        <InputCell
          forwardRef={setRef}
          value={rowData[column.dataKey!]}
          onChange={onChange}
          onBlur={onExitEditMode}
          onKeydownEnter={onExitEditMode}
        />
      ) : (
        <div class="table-v2-inline-editing-trigger" onClick={onEnterEditMode}>
          {rowData[column.dataKey!]}
        </div>
      )
    },
  }
})

const data = ref(generateData(columns, 100))

// tree
interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (val: Tree) => {
  console.log(val)
}

const treedata: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

</script>

<template>
  <div class="user-container">
    <div class="uc-main">
      <div class="ucm-tree">
        <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
      <div class="ucm-table">
          <el-auto-resizer>
            <template #default="{ height, width }">
              <el-table-v2
                :columns="columns"
                :data="data"
                :width="width"
                :height="height"
                fixed
              />
            </template>
          </el-auto-resizer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;

  .uc-main {
    position: relative;
    height: 100%;
    box-sizing: border-box;

    .ucm-table {
      position: absolute;
      right: 10px;
      top: 20px;
      width: 76%;
      height: calc(100% - 40px);
      border: 1px solid red;
      border-radius: 5px;
    }

    .ucm-tree {
      position: absolute;
      left: 10px;
      top: 20px;
      width: 21%;
      height: calc(100% - 40px);
      border: 1px solid rgb(21, 0, 255);
      border-radius: 5px;
    }
  }
}

.table-v2-inline-editing-trigger {
  border: 1px transparent dotted;
  padding: 4px;
}

.table-v2-inline-editing-trigger:hover {
  border-color: var(--el-color-primary);
}
</style>
