<template>
  <div class="home-page">
    <el-row class="container">
      <!--头部-->
      <el-col :span="24"
              class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
          <a href="/"><img src="../assets/images/amway.png"
                 style="padding-left:8px;"></a>
        </div>
        <div class="topbar-title">
          <span style="font-size: 18px;color: #fff;">CMS後台管理系統</span>
        </div>
        <div class="topbar-account topbar-btn">
          <div class="time">{{time}}</div>
          <div class="time">歡迎你，{{userName}}</div>
          <div class="exit"
               @click="exit">退出</div>
        </div>
      </el-col>

      <!--中间-->
      <el-col :span=" 24"
              class="main">
        <!--左侧导航-->
        <aside class="showSidebar">
          <!-- 导航菜单
          <div class="aside-head">cms</div> -->
          <el-tree :data="catalogData"
                   :props="defaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </aside>

        <!--右侧内容区-->
        <section class="content-container">
          <div class="right-container">
            <div v-show="!tabShow">
              <index></index>
            </div>
            <div class="grid-content bg-purple-light"
                 v-if="tabShow">
              <el-col :span="24"
                      class="content-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right"
                               v-show="nodeList.length">
                  <el-breadcrumb-item v-for="(item,index) in nodeList"
                                      :key="index"
                                      :class="{'breadcrumb-head':index==tabIndex}">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 标签栏 -->
                <div class="module">
                  <router-view :msgId="msgId"></router-view>
                </div>
                <!-- 标签栏 -->
              </el-col>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { catalogQuery } from '@/api/index'
import vuex from '@/store/index.js'
import formatData from '@/assets/js/formate-data'
import index from './index'
export default {
  name: 'home',
  components: { index },
  data () {
    return {
      msgId: '',
      catalogData: [], //目录数据
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      tabShow: false,
      userName: '',//用户名
      time: '',
      nodeList: [],
      tabIndex: -1
    }
  },
  created () {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('nodeList', JSON.stringify(this.nodeList))
      sessionStorage.setItem('tabIndex', this.tabIndex)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.getTime()
      this.userName = sessionStorage.getItem('userName')
      this.getCatalogData()
      this.nodeList = JSON.parse(sessionStorage.getItem('nodeList')) || []
      this.tabIndex = sessionStorage.getItem('tabIndex') || []
      this.tabShow = this.$route.name == 'home' ? false : true
    })
    
  },
  computed: {
    treeData () {
      return this.$store.state.treeData
    }
  },
  watch: {
    treeData: {
      handler () {
        this.getCatalogData()
      },
      deep: true
    },
    '$route' (val) {
      this.tabShow = val.name == 'home' ? false : true
    }
  },
  methods: {
    getTime () {
      this.time = sessionStorage.getItem('currentTime')
      let currentTime = new Date().getTime(this.time)
      setInterval(() => {
        currentTime = Number(currentTime + 1000)
        this.time = formatData(new Date(currentTime), 'YYYY-MM-DD hh:mm:ss')
      }, 1000)
    },
    /*
   **获取目录数据
   */
    getCatalogData () {
      let params = { bizParam: {} }
      catalogQuery(params).then(res => {
        console.log(params)
        console.log(res)
        if (res && res.length > 0) {
          //this.treeChange(res)
          this.catalogData = res
        }
      })
    },
    treeChange (data) {
      data.forEach((item, index) => {
        item.children = item.children || []
        item.route = item.route || item.template.codeKey
        if (item.catalogType !== '1') {
          data.splice(index, 1)
          this.treeChange(data)
        }
        if (item.children && item.children.length > 0) {
          this.treeChange(item.children)
        } else {
          item.children = item.children || []
          item.route = item.route || item.template.codeKey
        }
      });
    },
    /*
    **树形图展开
    */
    getNodeData (data) {
      if (data.parent) {
        this.nodeList.unshift({ name: data.label, path: data.data.route, id: data.data.id })
        this.getNodeData(data.parent)
      }
    },
    handleNodeClick (data, node) {
      this.catalogArr = data
      if (data.children.length > 0) {
        return false
      } else {
        this.nodeList = []
        this.getNodeData(node)
        sessionStorage.setItem('nodeList', JSON.stringify(this.nodeList))
        this.$router.replace({ name: this.nodeList[this.nodeList.length - 1].path, query: { id: this.nodeList[this.nodeList.length - 1].id } })
        this.tabIndex = this.nodeList.length - 1
      }
    },
    /*
     * 退出
    */
    exit () {
      this.$message.success('退出成功')
      setTimeout(() => {
        sessionStorage.clear()
        this.$store.commit('del_token')
        this.$store.commit('del_roleCodes')
        this.$router.replace('/login')
      }, 500);
    }
  }
}
</script>
<style>
@import url('../assets/css/ele-common.css');
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  min-width: 1000px;
  /deep/ .el-input__icon {
    line-height: 35px;
  }
  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: red;
    background-image: linear-gradient(180deg, #e50612, #b32d2f);
    padding: 0px;

    .topbar-btn {
      color: #fff;
    }
    .topbar-logo {
      float: left;
      width: 180px;
      line-height: 26px;
      text-align: center;
    }
    .topbar-logo img {
      height: 40px;
      margin-top: 5px;
      padding: 0;
    }
    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
      border-left: 1px solid #de6f6f;
    }
    .topbar-account {
      float: right;
      padding-right: 12px;
      .time {
        float: left;
        margin-right: 20px;
      }
      .exit {
        float: right;
        cursor: pointer;
      }
    }
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      padding-left: 10px;
    }
  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    width: 180px;
    background-color: #f1e6e6;
    height: 100%;
    // padding: 20px 0;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }

    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #d2c5c5;
    }

    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #333744;
      border-right: 0px;
    }

    .el-submenu .el-menu-item {
      min-width: 60px;
    }
    .el-menu {
      width: 180px;
    }
    .el-menu--collapse {
      width: 60px;
    }

    .el-menu .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }

    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #7ed2df;
    }
    .aside-head {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #f1e6e6;
      border-bottom: 1px solid #d2c5c5;
    }
  }

  .menu-toggle {
    background-color: #d8d8d8;
    text-align: center;
    color: #303133;
    line-height: 50px;
    height: 50px;
    font-size: 16px;
  }

  .content-container {
    flex: 1;
    overflow-y: auto;
    position: relative;
    .right-container {
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .content-wrapper {
      background-color: #fff;
      border-radius: 5px;
      // padding: 10px;
      box-sizing: border-box;
    }
    .module {
      // overflow: auto;
      margin-top: 60px;
    }
    .el-breadcrumb {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      // background-color: #f1e6e6;
      background-color: #ecf0f5;
      color: #303133;
      position: fixed;
      width: 100%;
      z-index: 1000;
    }
    .breadcrumb-head {
      .el-breadcrumb__inner {
        color: blue;
      }
    }
  }
}
</style>
