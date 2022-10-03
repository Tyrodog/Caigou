<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>上次登录时间: <span>2017-7-19</span></p>
            <p>上次登录地点: <span>武汉</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px; height: 460px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) of tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="16">
        <div class="air">
          <el-card
            shadow="hover"
            v-for="item of countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>

        <el-card shadow="hover" class="el">
          <!-- 线状图 -->
          <Echarts :chartData="echartData.order" />
        </el-card>

        <div class="graph">
          <el-card style="height: 260px">
            <!-- 柱状图 -->
            <Echarts class="zhu" :chartData="echartData.user" />
          </el-card>

          <el-card style="height: 260px">
            <!-- 柱状图 -->
            <Echarts
              class="zhu"
              :chartData="echartData.video"
              :isAxisChart="false"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDate } from "@/assets/api/data";
import { mapState } from "vuex";
import Echarts from "./Echarts/Echarts.vue";
export default {
  name: "CommonHome",
  components: {
    Echarts,
  },
  methods: {
    Td(val) {
      this.$store.commit("CommonHome/Td", val);
    },
  },
  computed: {
    ...mapState("CommonHeader", ["userImg"]),
    ...mapState("CommonHome", [
      "tableData",
      "tableLabel",
      "countData",
      "echartData",
    ]),
  },
  mounted() {
    getDate()
      .then((res) => {
        console.log(res);
        const { code, data } = res.data;
        if (code === 20000) {
          this.Td(data.tableData);
          const order = data.orderData;
          const xData = order.date;
          const keyArray = Object.keys(order.data[0]);
          const series = [];
          keyArray.forEach((key) => {
            series.push({
              name: key,
              data: order.data.map((item) => item[key]),
              type: "line",
            });
          });
          this.echartData.order.xData = xData;
          this.echartData.order.series = series;
          console.log(order);

          this.echartData.user.xData = data.userData.map((item) => item.date);
          this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ];

          this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
            },
          ];
        }
      })
      .catch((err) => {
        console.log("失败了", err);
      });
  },
};
</script>

<style lang="less">
.home {
  // font-size: 30px;
  color: black;
}
.el-row {
  user-select: none;
}
/* .el-col {
  margin-top: 20px;
} */
.el {
  height: 320px;
  // width: 100%;
  div,
  .echart {
    // width: 100%;
    // height: 320px;
    aspect-ratio: 16/4.2;
  }
}
.zhu {
  height: 240px;
}
.air {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    font-size: 30px;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }
}
</style>