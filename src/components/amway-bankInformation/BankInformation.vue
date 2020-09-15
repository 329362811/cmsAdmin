<template>
  <div class="amway-bankInformation">
    <div class="top">
      <div class="search">
        <el-input v-model="question"
                  placeholder="請輸入搜索內容"></el-input>
      </div>
      <el-button type="primary"
                 @click="query"
                 size="small">搜索</el-button>

      <div class="search"
           style="width:400px;margin:auto 0px auto 20px;">
        <span class="mrg-right10">簽約日期</span>
        <el-date-picker style="width:140px;"
                        v-model="dataValue1"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="選擇日期"
                        @change="query">
        </el-date-picker>
        至
        <el-date-picker style="width:140px;"
                        v-model="dataValue2"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="選擇日期"
                        @change="query">
        </el-date-picker>
      </div>

      <el-button type="primary"
                 @click="downloadBankInfo"
                 size="small">匯出</el-button>

    </div>
    <div class="module-table">
      <div id="table_style">
        <template>
          <el-table :data="tableData"
                    border
                    style="width:100%">
            <el-table-column prop=""
                             label="Ada號碼"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.adaNo">
                  {{scope.row.adaNo}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             label="簽約日期"
                             min-width="100">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.signUpDate">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             min-width="100"
                             label="用戶英文名1st">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.masterEName">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             min-width="100"
                             label="用戶中文名1st">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.masterCName">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             label="用戶身份證號碼1st"
                             width="120">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.masterIdCardNumber">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             min-width="100"
                             label="用戶英文名2nd">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.spouseEName">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             min-width="100"
                             label="用戶中文名2nd">

              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.spouseCName">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             min-width="120"
                             label="用戶身份證號碼2nd">
              <template slot-scope="scope">
                <div class="word-space"
                     v-html="scope.row.spouseIdCardNumber">
                  <!-- {{scope.row.answer}} -->
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="銀行編號"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.bankCode">
                  {{scope.row.bankCode}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="銀行名稱"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.bankName">
                  {{scope.row.bankName}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="銀行分行編號"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.branchBankCode">
                  {{scope.row.branchBankCode}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="賬戶號碼"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.bankAccountNum">
                  {{scope.row.bankAccountNum}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="戶口持有人之英文姓名"
                             min-width="100">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.bankAccountHolder">
                  {{scope.row.bankAccountHolder}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop=""
                             label="相片"
                             min-width="120">
              <template slot-scope="scope">
                <div class="table-question"
                     :title="scope.row.bankAccountHolder">

                  <!-- <el-button @click="onPreview" type="primary">查看图片</el-button> -->
                  <el-button type="text"
                             size="small"
                             v-show="scope.row.bankCardImageUrl1"
                             @click="onPreview(scope.row.bankCardImageUrlList,1)">相片1</el-button>
                  <el-button type="text"
                             size="small"
                             v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1==null"
                             style="margin-left:0px;"
                             @click="onPreview(scope.row.bankCardImageUrlList,2)">相片1</el-button>
                  <el-button type="text"
                             size="small"
                             v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1!=null"
                             @click="onPreview(scope.row.bankCardImageUrlList,2)">相片2</el-button>
                  <!-- src="../../../assets/images/transparent-icon.png" -->
                  <!-- <el-image src="transparent-icon.png" v-show="scope.row.bankCardImageUrl1&&scope.row.bankCardImageUrl2==null"
                    style="width: 40px; height: 40px;position:absolute;left:38px;cursor:pointer;"
                    :preview-src-list="scope.row.bankCardImageUrlList">
                      <div slot="error" class="image-slot"></div>
                  </el-image>
                  <el-image src="transparent-icon.png" v-show="scope.row.bankCardImageUrl1&&scope.row.bankCardImageUrl2!=null"
                    style="width: 40px; height: 40px;position:absolute;left:15px;cursor:pointer;"
                    :preview-src-list="scope.row.bankCardImageUrlList">
                      <div slot="error" class="image-slot"></div>
                  </el-image>
                  <el-image src="transparent-icon.png" v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1==null"
                    style="width: 40px; height: 40px;position:absolute;left:38px;cursor:pointer;"
                    :preview-src-list="scope.row.bankCardImageUrlList">
                      <div slot="error" class="image-slot"></div>
                  </el-image>
                  <el-image src="transparent-icon.png" v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1!=null"
                    style="width: 40px; height: 40px;position:absolute;left:62px;cursor:pointer;"
                    :preview-src-list="scope.row.bankCardImageUrlList">
                      <div slot="error" class="image-slot"></div>
                  </el-image>
                  <el-button type="text"
                          size="small"
                          v-show="scope.row.bankCardImageUrl1"
                          >相片1</el-button>
                  <el-button type="text"
                          size="small" 
                          v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1==null"
                          style="margin-left:0px;" 
                          >相片1</el-button>
                          
                  <el-button type="text"
                          size="small" 
                          v-show="scope.row.bankCardImageUrl2&&scope.row.bankCardImageUrl1!=null"
                          @click="openImages(scope.row.bankCardImageUrl2)">相片2</el-button> -->
                </div>
              </template>
            </el-table-column>

            <!--  <el-table-column label="合同操作"
                             min-width="100">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           v-show="scope.row.contractDownloadUrl"
                           @click="downloadpdf(scope.row.contractDownloadUrl)">下載</el-button>
              </template>
            </el-table-column>
                <el-table-column label="休止期說明書操作"
                             min-width="100">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           v-show="scope.row.declarationDownloadUrl"
                           @click="downloadpdf(scope.row.declarationDownloadUrl)">下載</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-image-viewer v-if="showViewer"
                           :on-close="closeViewer"
                           :url-list="bankCardImageUrlList" />
        </template>
      </div>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange"
                       v-if="tableData.length>0"
                       :page-sizes="[10,15,20]"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"
                       layout="sizes, prev, pager, next,jumper"
                       :total="pageTotal"
                       background>
        </el-pagination>
      </div>

      <!-- 图片展示 -->
      <el-dialog :visible.sync="imgVisible"
                 @close="closeFunc"
                 title="圖片預覽"
                 center
                 class="img-visable"
                 width="40%">
        <div :href="dialogImageUrl"
             download="download">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { queryDistributorInfoList } from '@/api/index'
//查看图片插件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'bankInformation',
  components: {
    ElImageViewer
  },
  data () {
    return {
      bankCardImageUrlList: [],
      dataValue1: "",
      dataValue2: "",
      identityType: "2",
      question: '',
      stateValue: 0,
      answerState: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '草稿'
      }, {
        value: 2,
        label: '已發佈'
      }, {
        value: 3,
        label: '已取消發佈'
      }],
      tableData: [],
      currentPage: 1,
      pageSize: 20,//每页多少条
      pageTotal: 0,//总页数
      msgId: '',
      handleSelectData: [],
      status: ['', '草稿', '已發佈', '已取消發佈'],
      imgVisible: false,
      dialogImageUrl: '',

      showViewer: false,
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.msgId = this.$route.query.id
      this.getAnswerQuery(1)
    })
  },
  watch: {
    '$route' (val) {
      this.msgId = val.query.id
      this.getAnswerQuery(1)
    }
  },
  methods: {

    onPreview (listData, indexxx) {
      this.bankCardImageUrlList = []
      let reversevalList = [];
      if (indexxx == 2) {
        listData[1] = listData[1] ? listData[1] : ""
        listData[0] = listData[0] ? listData[0] : ""
        if (listData[1]) {
          reversevalList.push(listData[1])
        }
        if (listData[0]) {
          reversevalList.push(listData[0])
        }

        this.bankCardImageUrlList = reversevalList;


      } else {
        this.bankCardImageUrlList = listData;
      }

      this.showViewer = true
    },
    closeViewer () {
      this.showViewer = false
    },
    loadimg () {
      console.log(1);
    },




    closeFunc () {
      this.dialogImageUrl = "";
    },

    /*
    ***图片放大
    */
    openImages (value) {
      this.dialogImageUrl = "";
      //console.log(value)
      this.imgVisible = true
      this.dialogImageUrl = value
    },

    /*
    **获取数据
    */
    getAnswerQuery (pageNum) {
      switch (this.identityType) {
        case "直銷商":
          this.identityType = "1";
          break;
        case "優惠顧客":
          this.identityType = "2";
          break;
        default:
          this.identityType = "";
          break;
      }
      let params = {
        bizParam: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          param: {
            beginDate: this.dataValue1,
            endDate: this.dataValue2,
            identityType: 2,//identityType=2只查SR的
            model: this.msgId,
            search: this.question,
            status: this.stateValue || null,
          }
        }
      }
      queryDistributorInfoList(params).then(res => {
        this.tableData = res.items || []
        this.tableData.map(function (item) {
          let itemsss = [];
          if (item.bankCardImageUrl1 != null) {
            itemsss.push(item.bankCardImageUrl1);
          }
          if (item.bankCardImageUrl2 != null) {
            itemsss.push(item.bankCardImageUrl2);
          }
          item.bankCardImageUrlList = itemsss;
        });
        console.log(this.tableData)
        if (pageNum === 1) {
          this.$nextTick(() => {
            this.pageTotal = parseInt(res.totalNum)
          })
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.getAnswerQuery(1)
    },
    handleCurrentChange () {
      this.getAnswerQuery(this.currentPage)
    },


    /*
    **查询
    */
    query () {
      this.currentPage = 1
      this.getAnswerQuery(1)
    },
    ///external/exportExcel/bankInfo  导出银行Excel   导出银行注意identityType=2只查SR的
    downloadBankInfo () {
      let data = "/cms/external/exportExcel/bankInfo";
      let tooken = sessionStorage.getItem("token");
      /* this.dataValue1 = this.dataValue1?this.dataValue1:"";
      this.dataValue2 = this.dataValue2?this.dataValue2:""; */
      data = data + "?identityType=2" +
        "&search=" + this.question +
        "&beginDate=" + this.dataValue1 +
        "&endDate=" + this.dataValue2 +
        "&token=" + tooken

      window.open(data)
    }
  }
}
</script>
<style>
  .amway-bankInformation .el-image-viewer__close{
    color: #fff !important;
  }
</style>
<style lang="less" scoped>
.el-image-viewer__wrapper {
  visibility: initial !important;
}
.amway-bankInformation {
  
  .mrg-right10 {
    margin-right: 10px;
  }
  #table_style {
    width: 100%;
    padding: 0px 15px;
  }
  .search {
    width: 220px;
    margin: 20px 30px;
    display: inline-block;
  }
  div {
    text-decoration: none;
    color: #606266;
  }
  .attach-download div {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video-link,
  .table-question {
    line-height: 25px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -ms-box;
    -ms-box-orient: vertical;
    -ms-line-clamp: 2;
    max-height: 50px;
  }
  .word-space {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: break-word;
    max-height: 50px;
    ul,
    ol {
      box-sizing: border-box;
      padding-left: 20px !important;
    }
    ul > li {
      height: 25px;
      line-height: 25px;
      box-sizing: border-box;
    }
    ol > li {
      height: 25px;
      line-height: 25px;
      box-sizing: border-box;
    }
    li {
      p,
      a,
      h1 {
        text-align: center;
        line-height: 25px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -ms-box;
        -ms-box-orient: vertical;
        -ms-line-clamp: 1;
        // max-height: 50px;
      }
    }
    p,
    a,
    h1 {
      text-align: left;
      line-height: 25px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      display: -ms-box;
      -ms-box-orient: vertical;
      -ms-line-clamp: 2;
      max-height: 50px;
    }
  }
}
</style>

