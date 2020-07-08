<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="form.content" :useCustomImageHandler="true" @image-added="ImageUpload"></vue-editor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="categpries">
          <el-checkbox
            v-for="item in column "
            :key="item.id"
            :label="item.id"
            name="type"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL+'/upload'"
          :headers="{Authorization:'Bearer ' +token}"
          list-type="picture-card"
          :on-success="success"
          :on-remove="remove"
          :file-list="form.cover"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
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
        categories: [],
        content: "",
        cover: [],
        type: ""
      },
      column: [],
      categpries: []
    };
  },
  watch: {
    categpries() {
      this.form.categories = this.categpries.map(item => {
        return { id: item };
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      this.column = res.data.data.filter(item => {
        return item.id != 0 && item.id != 999;
      });
    });
    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id
      }).then(res => {
        const { data } = res.data;
        const img = data.cover.map(item => {
          const img = { ...item };
          if (img.url.indexOf("http") == -1) {
            img.url = this.$axios.defaults.baseURL + item.url;
            return img;
          }
        });
        data.cover = img;
        this.categpries = data.categories.map(item => {
          return item.id;
        });
        data.content = data.content.replace(/div/g, "p");
        this.form = data;
        console.log(this.form);
      });
    }
  },
  methods: {
    onSubmit() {
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res);
      });
    },
    success(response, file, fileList) {
      file.id = response.data.id;
      this.form.cover.push(file);
    },
    remove(file, fileList) {
      this.form.cover = fileList;
    },
    ImageUpload(file, Editor, cursorLocation, resetUploader) {
      const data = new FormData();
      data.append("file", file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: data
      }).then(res => {
        const { url } = res.data.data;
        Editor.insertEmbed(
          cursorLocation,
          "image",
          this.$axios.defaults.baseURL + url
        );
        resetUploader();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 400px;
}
</style>