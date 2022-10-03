<template>
  <div class="commonTable">
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column
        v-for="item of tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 150"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-count="11"
      :page-size="20" 
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
        console.log(row,'edit的row');
        this.$emit('edit', row)
    },
    handleDelete(row) {
        console.log(row,'delete的row');
        this.$emit('del', row)
    },
    changePage(page) {
        console.log(page,'change的page');
        this.$emit('changePage', page)
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .cell{
  // padding: 0 !important;
  text-align: center !important;
}
body{
  position: relative;
}
.commonTable {
  height: calc(100% - 62px);
  background-color: #fff;
  overflow: hidden auto;
  .pager {
    position: absolute;
    bottom: 60px;
    right: 124px;
  }
}
.ziti /deep/ .el-table-column__inner {
  width: 300px;
}
</style>