<template>
  <div class="login-container">
    <div class="login-info">
      <div class="login-img"></div>
      <div class="title">EPOCH 微服务平台</div>
      <div class="sub-title">分享生活，留住感动</div>
    </div>
    <!--  登录信息表单   -->
    <el-form ref="authenticationInfo" :model="authenticationInfo" :rules="rules" class="login-form">
      <div class="title-container">
        <h3 class="title">EPOCH 登录</h3>
      </div>
      <!--  账户密码登录   -->
      <span v-if="login.type==='password'">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            ref="username"
            v-model="authenticationInfo.username"
            name="username"
            type="text"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-key"
            ref="password"
            v-model="authenticationInfo.password"
            name="password"
            :show-password="true"
          />
        </el-form-item>

        <el-form-item prop="validateCode" class="code-input">
          <el-input
            ref="validateCode"
            v-model="authenticationInfo.validateCode"
            prefix-icon="el-icon-lock"
            placeholder="验证码"
            name="validateCode"
            type="text"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <img :src="validateCode.imageCode" alt="codeImage" class="code-image" @click="getCodeImage">

      <el-button :loading="loading" type="primary" style="width:80%;margin-bottom:30px;margin-left:10%"
                 @click.native.prevent="handleLogin">登录
      </el-button>
      </span>
      <!--  第三方账号登录 表单  -->
      <span v-if="login.type === 'thirdParty'">
        选择登录方式
        <div>
          <template v-for="(l, index) in logo">
            <div :key="index" class="logo-wrapper">
              <img :src="resolveLogo(l.img)" alt="" :class="{ 'radius': l.radius }" @click="socialLogin(l.name)">
            </div>
          </template>
        </div>
      </span>

      <el-dropdown class="login-type" placement="top-end">
        <span class="el-dropdown-link">
          <el-link type="primary"> 其他方式登录 </el-link>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="login.type === 'password'" @click.native="login.type = 'password'">账户密码登录
          </el-dropdown-item>
          <el-dropdown-item :disabled="login.type === 'thirdParty'" @click.native="login.type = 'thirdParty'">第三方账号登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-form>
  </div>
</template>

<script>
  import auth from '@/utils/auth'
  import base from '@/utils/base'
  import loginApi from '@/api/login/login'

  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        authenticationInfo: {
          username: 'Marshal',
          password: '1',
          validateCode: '',
          validateCodeKey: base.randomNum(24, 16)
        },
        login: {
          type: 'password'
        },
        logo: [
          { img: 'github.png', name: 'github', radius: true },
          { img: 'qq.png', name: 'qq', radius: false }
        ],
        rules: {
          username: [{ required: true, trigger: 'blur' }],
          password: [{ required: true, trigger: 'blur' }],
          validateCode: [{ required: true, trigger: 'blur' }]
        },
        loading: false,
        validateCode: {
          imageCode: ''
        },
        redirect: 'dashboard'
      }
    },
    created() {
    },
    mounted() {
      this.getCodeImage()
    },
    destroyed() {
    },
    methods: {
      getCodeImage() {
        loginApi.generateValidateCode(this.authenticationInfo.validateCodeKey, this)
      },
      resolveLogo(logo) {
        return require(`@/assets/logo/${logo}`)
      },
      handleLogin() {
        this.$refs.authenticationInfo.validate(valid => {
          if (valid) {
            loginApi.login(this.authenticationInfo)
              .then(res => {
                if (res) {
                  debugger
                  this.loading = true
                  auth.setToken(res.token_type + ' ' + res.access_token)
                  this.$router.push({ path: this.redirect })
                  this.loading = false
                } else {
                  this.$message.error(res.message)
                }
              })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "login";
</style>
<style lang="scss" scoped>
  @import "login-scoped";
</style>
