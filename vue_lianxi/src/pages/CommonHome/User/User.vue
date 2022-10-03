<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
      :before-close="updated"
    >
      <CommForm
        :inline="true"
        ref="form"
        :formLabel="operateFormLabel"
        :form="operateForm"
      >
      </CommForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.User.isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm(operateForm)">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>

      <CommForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </CommForm>
    </div>
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    >
    </CommonTable>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CommForm from "./CommForm/CommForm.vue";
import CommonTable from "./CommonTable/CommonTable.vue";
import { getUser } from "../../../assets/api/data";
export default {
  name: "User",
  components: { CommForm, CommonTable },
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  computed: {
    ...mapState("User", [
      "operateType",
      "isShow",
      "operateFormLabel",
      "operateForm",
      "formLabel",
      "searchForm",
    ]),
  },
  methods: {
    confirm(operateForm) {
      if (this.operateType === "edit") {
        this.$axios.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          console.log("编辑-------");
          this.updated();
          this.getList();
        });
      } else {
        console.log(Object.entries(operateForm), "------------------------");
        // 这里也可以用some方法简化解决
        for (const key in operateForm) {
          if (Object.hasOwnProperty.call(operateForm, key)) {
            const element = String(operateForm[key]).trim();
            this.$store.state.User.operateForm[key] = element;
          }
        }
        console.log(operateForm);
        // console.log(Object.values(operateForm).trim());
        console.log(Object.values(operateForm));
        if (Object.values(operateForm).includes("")) {
          this.updated();
          return alert("请输入正确的信息!");
        } else {
          this.$axios.post("/user/add", this.operateForm).then((res) => {
            console.log(res);
            console.log("增加-------");
            this.updated();
            this.getList();
          });
        }
      }
    },
    updated() {
      this.$store.state.User.isShow = false;
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        /* console.log(res);
        console.log("我是res数据↑"); */
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.connt;
        this.config.loading = false;
      });
    },
    editUser(row) {
      this.$store.state.User.operateType = "edit";
      this.$store.state.User.isShow = true;
      this.$store.state.User.operateForm = row;
    },
    delUser(row) {
      // console.log(row);
      /* let a = this.tableData.findIndex(item=>item.id === row.id)
      this.tableData.splice(a,1) */
      let a = this.tableData.findIndex(item=>item.id === row.id)
      this.$confirm("此操作将永久删除该组件,是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$axios.post('user/del',{
          params:{id}
        }).then(() =>{
          this.$message({
            type:'success',
            message:'删除成功'
          })
          let a = this.tableData.findIndex(item=>item.id === row.id)
          this.tableData.splice(a,1)
          // this.getList();
          console.log(this.tableData,'----------123');
        })
      });
    },
    ...mapMutations("User", ["addUser"]),
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>