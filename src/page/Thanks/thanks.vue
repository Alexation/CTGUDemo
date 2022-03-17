<template>
  <div>
    <section class="w mt30 clearfix">
      <y-shelf title="调查问卷">

        <div slot="content" class="table" v-loading="loading" element-loading-text="加载中...">
          <!-- <p>佛祖保佑这些好心人写程序永无BUG，工资翻倍，长命百岁，迎娶白富美，走上人生巅峰！</p>
          <el-table border :data="tableData" :default-sort = "{prop: 'time', order: 'descending'}" stripe style="width: 90%">
            <el-table-column sortable prop="nickName" label="昵称" align="center"></el-table-column>
            <el-table-column sortable prop="payType" label="捐赠方式" align="center"> </el-table-column>
            <el-table-column sortable prop="money" label="捐赠金额(￥)" align="center"></el-table-column>
            <el-table-column sortable prop="info" label="捐赠人留言信息" align="center"></el-table-column>
            <el-table-column sortable prop="time" label="捐赠时间" align="center"></el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
          </el-pagination> -->

          <!-- <div style="margin-top:3%" v-for="(challenge,i) in tableData" :key="i"> -->
          
          <div style="margin-top:3%;margin-bottom:3%">
            
        <el-card style="margin-left:10%;margin-right:10%;"
        v-for="(challenge,i) in tableData" :key="i">
          <div slot="header" class="clearfix">
            <span>题目{{i+1}}: {{ challenge.question }}</span>
          </div>
            <el-radio-group v-model="radio[i]">
              <el-radio v-for="(checks,i) in challenge.radios" :label="checks" :key="i" >{{ checks }}</el-radio>
            </el-radio-group>
        </el-card>
      </div>
<div style="margin:auto">
      <el-button style="margin-bottom:30%;width:140px;height40px;" @click="QuesSubmit">提交</el-button>
                      <!-- <y-button style="width: 140px;height: 40px;line-height: 40px"
                          text="提交"
                          classStyle="main-btn"
                          @btnClick="cropper">
                </y-button> -->
      </div>
        </div>
      </y-shelf>
    </section>

    <section class="w mt30 clearfix">
      <y-shelf title="为什么要购买保险">
        <div slot="content" class="donate">
          <p>你若安好，我便备胎到老；你若不好，我是救命稻草！</p>
          <p>买保险的本质是为了获得一份保障</p>
          <p>在被保险人发生意外、疾病，或者是有资金需求时，保险公司提供相应的报销、给付，以减轻经济压力。</p>
          <p>规避风险 重疾高发,治疗费用昂贵,一旦罹患重疾,家庭、工作、生活都会受到影响。</p>
          <p>减轻负担 现代人生活压力大,面临上有老、下有小的窘境。</p>
          <p>抵制通胀 投保年交保险,能够拥有安全稳健的预期收益,加上分红和万能险预期收益,基本上可以抵消通胀。</p>
          <p>财商体现 俗话说,穷人买彩票,富人买保险。</p>
          <!-- <p>你也可以不做任何事。你的捐赠意味着你对我过去所做的表示感谢，而不是表达对未来的期望。</p>
          <p>但你的捐赠会提高我的积极性和设备配置让我努力把手头上的事做的更好。</p>
          <p>我会维护一份名单以感谢所有的捐赠者。正如我所说，捐赠是一个向我表示感谢的方式。</p> -->
        </div>
      </y-shelf>
    </section>
    
    <!-- <section class="w mt30 clearfix">
      <y-shelf :title="thankPanel.name">
        <div slot="content" class="hot">
          <mall-goods :msg="item" v-for="(item,i) in thankPanel.panelContents" :key="i"></mall-goods>
        </div>
      </y-shelf>
    </section> -->

    <!-- <div id="comment" style="width: 1220px;margin: 0 auto;"></div> -->
  </div>
</template>
<script>
  import { thank, thanksList, getQues } from '/api/index.js'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  import 'gitment/style/default.css'
  import Gitment from 'gitment'
  export default {
    data () {
      return {
        radio: [],
        thankPanel: [],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: true
      }
    },
    methods: {
      QuesSubmit() {
        this.$message({
          message:'提交很成功',
          type: 'success'
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._thanksList()
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._thanksList()
        this.loading = true
      },
      _thanksList () {
        let params = {
          params: {
            size: this.pageSize,
            page: this.currentPage
          }
        }
        thanksList(params).then(res => {
          this.loading = false
          this.tableData = res.result.data

          for (var i=0;i<Object.entries(res.result.data).length;i++)
          { 
              this.radio.push('')
          }
          this.total = res.result.recordsTotal
        })
      },
      initGitment () {
        const gitment = new Gitment({
          id: '1',
          owner: 'Exrick',
          repo: 'xmall-comments',
          oauth: {
            client_id: 'd52e48ce99ee4e8fb412',
            client_secret: 'f4154230d52f3a7d6b7695cb0ae89fe76b76121d'
          }
        })
        gitment.render('comment')
      }
    },
    mounted () {
      thank().then(res => {
        let data = res.result
        this.thankPanel = data[0]
      })
      this._thanksList()
      this.initGitment()
      getQues({pageNum:1, pageSize:10}).then(res=>{
        console.log(res);
      })
    },
    components: {
      YShelf,
      YButton,
      product,
      mallGoods
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .table {
    align-items: left;
    display: flex;
    flex-direction: column;
    p{
      font-size: 18px;
      margin-top: 2vw;
      // color: #5683EA;
    }
    .el-table{
      // margin: 5vw 8vw 2vw 8vw;
      margin: 2vw 0 2vw 0vw;
    }
    .el-pagination{
      align-self: flex-end;
      margin: 0 3.5vw 2vw;
    }
  }

  .donate {
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin: 1vw 3vw 2vw 3vw;
    p{
      font-size: 16px;
      margin-top: 1vw;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

</style>
