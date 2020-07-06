<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="form.content"></vue-editor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categpries">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL+'/upload'"
          :headers="{Authorization:'Bearer ' +token}"
          list-type="picture-card"
          :on-success="success"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="文章"></el-radio>
          <el-radio label="视频"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      form: {
        title: "",
        categpries: [],
        content: "",
        type: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    success(response, file, fileList) {
      console.log(response, file, fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 400px;
}
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 800px;
  .el-checkbox {
    width: 300px;
    margin: 0px;
  }
}
</style>