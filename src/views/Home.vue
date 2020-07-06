<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <el-col :span="12">
          <h5>黑马头条</h5>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/post" @click="nextStation('/post')">
              <span slot="title">文章列表</span>
            </el-menu-item>
            <el-menu-item index="/publish" @click="nextStation('/publish')">
              <span slot="title">发布文章</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <img v-if="userInfo.head_img" :src="$axios.defaults.baseURL+userInfo.head_img" alt />
          <img v-else src="@/assets/logo.jpg" alt />
          <p>{{userInfo.nickname}}</p>
          <p>退出</p>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    nextStation(val) {
      if (this.$route.path !== val) {
        this.$router.push(val);
      }
    }
  },
  mounted() {
    const user = localStorage.getItem("user");
    this.userInfo = JSON.parse(user);
  }
};
</script>

<style lang="less" scoped>
.index {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-col {
  width: 200px;
  h5 {
    line-height: 60px;
  }
}
.el-header {
  background-color: #333333;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 100px 0px 0px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  p {
    margin: 0px 10px;
  }
}
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #000000;
  color: white;
  text-align: center;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>