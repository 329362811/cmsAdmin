<template>
  <el-form :model="AccountFrom" :rules="rules" ref="AccountFrom" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">用戶登錄</h3>
    <el-form-item prop="username">
      <el-input type="text" placeholder="賬號" v-model="AccountFrom.username" @keyup.enter.native="submitForm('AccountFrom')"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" placeholder="密碼" v-model="AccountFrom.password" @keyup.enter.native="submitForm('AccountFrom')"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="submitForm('AccountFrom')">登錄</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userLogin } from '@/api/index'
import store from '../store/index.js'
export default {
  name: 'login',
  data () {
    return {
      AccountFrom: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '請輸入賬號', trigger: 'blur' },
          { max: 20, message: '賬號長度最多20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { max: 16, message: '密碼長度最多為16位', trigger: 'blur' }
        ]
      },
      submitBtn: true
    };
  },
  methods: {
    submitForm (formName) {
      if (!this.submitBtn) return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            bizParam: {
              userName: this.AccountFrom.username,
              passWord: this.AccountFrom.password
            }
          }
          this.submitBtn = false
          let _this = this
          userLogin(params).then(res => {
            this.$message.success('登录成功')
            debugger
            _this.$store.commit('set_token', res.token)
            _this.$store.commit('set_roleCodes', res.roleCodes[0])
            sessionStorage.setItem('userName', this.AccountFrom.username)
            _this.submitBtn = true
            setTimeout(() => {
              if (this.$store.state.token) {
                this.$router.push('/')
              } else {
                this.$router.replace('/login');
              }
            }, 500)
          }).catch(res => {
            this.submitBtn = true
            this.$message.error('賬號或密碼錯誤')
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>
<style>
body {
  background: #dfe9fb;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /* Opera 11.10+ */
}

.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-container .remember {
  margin: 0px 0px 35px 0px;
}

/* .login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); //IE 10
  background: -moz-linear-gradient(top, #ace, #00c1de); //火狐
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); //谷歌
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); //Safari5.1 Chrome 10+
  background: -o-linear-gradient(top, #ace, #00c1de); //Opera 11.10+
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
} */
</style>

