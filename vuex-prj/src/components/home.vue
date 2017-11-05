<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>首页<small></small></h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-home"></i>首页</a></li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-info">
                    <!-- 添加轮播图开始 -->
                        <div class="box-header with-border">
                            <div class="box-body">
                            <!-- 第一个参数必须得传 -->
                                <!-- <button type="button" @click="editBtnClick('',true)" class="btn btn-warning  pull-left">添加轮播图</button> -->
                                 <button type="button" @click="(!circleList.length || circleList.length<5)?editBtnClick('',true):maxtip()" class="btn btn-warning  pull-left">添加轮播图</button>
                                <!-- v-on:click="(!carouselList.length||carouselList.length<6)?clearmodel():maxtip()" -->
                                <!-- <h3 class="box-title pull-right">共查询到<span>{{totalnum}}</span>条记录</h3> -->
                            </div>
                        </div>
                    <!-- 添加轮播图结束 -->
                        <div class="box-body casebox">
                            <Spin size="large" fix v-if="spinShow">
                                <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
                                <div>Loading</div>
                            </Spin>

                            <div class="table-responsive" v-if="tableShow">
                                <table class="table no-margin">
                                    <thead>
                                        <tr>
                                            <th>序列号</th>
                                            <th>名称</th>
                                            <th>跳转链接</th>
                                            <th>图片</th>
                                            <th>创建时间</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="cicleTr" v-for="(item,index) in circleList">
                                            <!-- 序列号开始 -->
                                            <td class="col-md-1">
                                              <span>{{item.sequence}}</span>
                                            </td>
                                            <!-- 序列号结束 -->
                                            <!-- 名称开始 -->
                                            <td class="col-md-2">
                                                 <div>
                                                   <p>{{item.title}}</p>
                                                 </div>
                                            </td>
                                            <!-- 名称结束 -->
                                            <!-- 跳转链接开始 -->
                                            <td class="col-md-3 jumpLink">
                                               <Tooltip v-if='item.link.length>=30' placement="bottom" transfer='true'>
                                                    <a :href=item.link>
                                                      {{item.link}}
                                                    </a>
                                                    <p style="white-space:normal;word-break:break-all;" slot="content" >
                                                      {{item.link}}
                                                    </p>
                                                </Tooltip>
                                                <a v-else :href=item.link>
                                                    {{item.link}}
                                                </a>
                                            </td>
                                            <!-- 跳转链接结束 -->
                                            <!-- 图片开始 -->
                                            <td class="col-md-2">
                                                <div class="sparkbar" data-color="#00a65a" data-height="20">
                                                    <a :href=item.logo class="swipebox" title="test">
                                                      <img :src=item.logo  style="width:100px;height:60px;"  alt="" />
                                                    </a>
                                                </div>
                                            </td>
                                            <!-- 图片结束 -->
                                            <!-- 创建时间 -->
                                            <td class="col-md-2">{{item.addTime}}</td>
                                            <td class="col-md-2">
                                                <button @click="editBtnClick(item,false)" type="button" class="btn btn-primary editBtn">编辑</button>
                                                <!-- <button  type="button" @click="deleteCourse(item)" class="btn btn-danger">删除</button> -->
                                                <button  type="button" @click="(!circleList.length||(circleList.length&&circleList.length<=1))?lesstip():deleteCourse(item)" class="btn btn-danger">删除</button>


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            <!-- /.table-responsive -->
                            </div>
                             <p class="prize_none" v-if="showNoDataImage">
                                  <img src="../../../assets/images/nothing.png" height="348" style="width: 180px;" alt="" /><br>
                              </p>
                        </div>
                        <!-- /.box-body -->
                       <!--  <div class="box-footer clearfix">
                            <Page :total="totalnum" :current="nowpage" :page-size="pagesize" @on-change="change"></Page>
                        </div> -->
                        <!-- /.box-footer -->
                    </div>
                </div>
            </div>
        </section>
            <!-- 新加/编辑轮播图模态框开始 -->
            <Modal v-model="myModal"  :title="isEdit?'编辑轮播图':'添加轮播图'"  @on-ok="handleSubmit('formInline')" @on-cancel="close" :mask-closable="false">
                  <div class="addCircleContent modal-body"  v-if="myModal">
                    <!-- iview的表单 -->
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
                        <form method="post" id="edit_course">
                            <!-- 序列号开始 -->
                             <Form-item prop="sequence" label="序列号">
                                 <Input style="width:90%;" type="text" name="sequence" class="xuliehao" v-model="formInline.sequence" placeholder="请输入序列号">
                                  </Input>
                             </Form-item>
                             <!-- 序列号结束 -->

                            <!-- 名称开始 -->
                             <Form-item prop="title" label="名称">
                                  <Input style="width:90%;" type="text" name="title" v-model="formInline.title" placeholder="请输入名称">
                                  </Input>
                             </Form-item>
                              <!-- 名称结束 -->

                              <!-- 跳转链接开始 -->
                             <Form-item prop="link" label="跳转链接">
                                 <Input style="width:90%;" type="text" name="link" v-model="formInline.link" placeholder="请输入跳转链接">
                                  </Input>
                              </Form-item>
                              <!-- 跳转链接结束 -->
                               <div class="addcommon mingcheng clearfix">
                                  <div class="left"><span class='mingchengRequied'>*</span><span class="title-f700">图片：</span></div>
                                  <div class="right">
                                    <span style="color:red">图片格式要求：只支持jpg、jpeg 和 png .    建议图片长宽1920*800, 大小<2048kb</span>
                                  </div>
                                </div>

                                <div class="addcommon upload clearfix">
                                  <div class="left">.</div>
                                  <div class="right">
                                    <v-upload v-if="refreshComponet" v-on:child-say="listenToMyBoyLogo" :isEdit="isEdit" :logoStr='logoStr'></v-upload>
                                  </div>
                              </div>
                            </form>
                      </Form>
                  </div>
      </Modal>
        <!-- 新加/编辑轮播图模态框结束 -->

    </div>
</template>
<script>
import '../../../assets/css/plugins/iCheck/flat/blue.css'
import '../../../assets/css/common.css'
import '../../../assets/js/app.min.js'
import '../../../assets/js/demo.js'
import upload from './upload'
export default {
    data () {
        return {
          //所有轮播图数据总数
           totalnum:0,
            isEdit:false,
           refreshComponet:false,
           logoStr:'',
           //所有轮播图数据
           circleList:[],
           nowpage: 1,
           pagesize: 10,
           pageCookie:1,
           spinShow: false,
           //区分是添加还是编辑
           isAddNewCircle:true,
           //显示无数据
           showNoDataImage:false,
           tableShow:false,
           // 要编辑的轮播图的ID
           editCircleId:'',
           //编辑状态但是未传新图时的url
           oldImgUrl:'',
           //编辑轮播图所需数据
           xulihao:0,
           mingcheng:'',
           backImgUrl:'',
           tiaozhuanlianjie:'',
           tupianUrl:'',
           //保存轮播图时按钮显示为加载状态
           loading: false,
           myModal:false,
           // 轮播图列表
           getCircleListUrl:apiUrl+"officialWebAdmin/getFirstPageListPage",
           //添加+编辑轮播图
           postNewCilcleUrl:apiUrl+"officialWebAdmin/addFirstPage",
           // 删除轮播图
           deleteCircleUrl:apiUrl+"officialWebAdmin/deleteFirstPage",

            //遮罩层的功能
             formInline: {
                    //默认值
                    sequence: '',
                    title:'',
                    link:'',
                    logo:''
                },
                ruleInline: {
                  // 序列号
                    sequence: [{
                        required: true,
                        message: '请填写序列号,序列号必须是正整数',
                        // trigger: 'blur'
                    }],
                  //名称
                    title: [{
                        required: true,
                        message: '请填写名称',
                        // trigger: 'blur'
                    }, {
                        type: 'string',
                        max: 20,
                        message: '名称长度不超过20字',
                        // trigger: 'blur'
                    }],
                    // 跳转链接
                    link: [{
                        required: true,
                        message: '请填写跳转链接',
                        // trigger: 'blur'
                    }],
                    //图片标题
                    logo:[{
                      required: false
                    }]
                }
          }
      },
    components:{
      "v-upload":upload
    },
    props: [''],
    methods: {
         lesstip:function(){
                this.$Message.error("轮播图至少一张才可以生效，您可以直接修改图片信息");
            },
        maxtip:function(){
            this.$Message.error("最多可设置5张轮播图哦");
        },
        listenToMyBoyLogo:function(somedata){
            this.logoStr = somedata;
        },
        // 显示模态框
        editBtnClick:function (item,from) {
          if (from==true) {
            this.refreshComponet = true;
            //添加新的轮播图
            this.isAddNewCircle = true;
            this.myModal = true;
            this.isEdit = false;
            //存一下状态，在upload.vue里清空默认图片
            sessionStorage.setItem('addNewCircleCach','1');
            //添加轮播图
            // alert('添加轮播图');
            // $('#myModal').modal('show');
            //要把所有的值清空，防止编辑时公用页面会有残值
            this.formInline.sequence = '';
            this.formInline.title = '';
            this.formInline.link = '';
            this.editCircleId = '';
            this.logoStr = '';
          }else{
            this.myModal = true;
            this.refreshComponet = true;
            // 编辑轮播图
            this.isAddNewCircle = false;
            this.isEdit = true;
            //编辑轮播图
            // $('#myModal').modal('show');
            //把值带过来
           this.formInline.sequence = item.sequence;
           this.formInline.title = item.title;
           this.formInline.link = item.link;
            // 点了哪一行的编辑，就给改变量赋值
            this.editCircleId = item.id;
            //存一下图片地址
            this.logoStr = item.logo;
          }
         },
         //暂留，关闭模态框
        close: function () {
            // 关闭模态框
            this.refreshComponet = false;
            this.loading = false;
            this.isEdit = false;
            this.myModal = false;
        },
        change:function (page) {
          this.getCircleData(page);
          this.pageCookie = page;
          sessionStorage.setItem('homekey',this.pageCookie);
        },
        //json对象的方法
        getJsonObj:function (res) {
          var string = res.data;
          var callback = string.substr(0, string.indexOf('('));
          var s = string.replace(callback + "(", "");
          var newData = s.substr(0, s.length - 1);
          var result = JSON.parse(newData);
          return result;
        },
        getCircleData:function (newpage) {
          var me = this;
          me.nowpage = parseInt(sessionStorage.getItem("homekey"));

          if (!newpage || newpage=='undefined') {
            me.spinShow = true;
            me.tableShow =false;
            setTimeout(slowget,500);
            function slowget() {
                $.ajax({
                      url: me.getCircleListUrl,
                      type: 'get',
                      data: {
                          'currentPage':me.nowpage,
                          'pageSize':me.pagesize
                      },
                      dataType: 'jsonp',
                      jsonpCallback: 'callback',
                      success: function(result) {
                          if (result.success == 0) {
                              me.spinShow = false;
                              me.tableShow = true;
                              me.circleList = result.entity.list;
                              me.totalnum = result.entity.totalSize;
                               // 显示暂无数据
                             if (me.circleList.length <= 0) {
                                me.showNoDataImage = true;
                              }else{
                                me.showNoDataImage = false;
                              }
                          } else {
                              setTimeout(() => {
                                  me.$Modal.remove();
                                  me.$Message.info('查询失败！');
                              }, 2000);
                          }
                      }
                  });

            }
          }else{
            me.nowpage = newpage;
            me.spinShow = true;
            me.tableShow = false;
            setTimeout(slowget2,500);
            function slowget2() {
               $.ajax({
                      url: me.getCircleListUrl,
                      type: 'get',
                      data: {
                          'currentPage':me.nowpage,
                          'pageSize':me.pagesize
                      },
                      dataType: 'jsonp',
                      // jsonpCallback: 'callback',
                      success: function(result) {
                          if (result.success == 0) {
                              me.spinShow = false;
                              me.tableShow = true;
                              me.circleList = result.entity.list;
                              me.totalnum = result.entity.totalSize;
                               // 显示暂无数据
                             if (me.circleList.length <= 0) {
                                me.showNoDataImage = true;
                              }else{
                                me.showNoDataImage = false;
                              }
                          } else {
                              setTimeout(() => {
                                  me.$Modal.remove();
                                  me.$Message.info('查询失败！');
                              }, 2000);
                          }
                      }
                  });

            }
          }
        },

         IsURL:function(domain) {
            // var name = /^((https|http|ftp|rtsp|mms|file)?:\/\/)[^\s]+.(html|htm|shtml|jsp|asp|php|com|cn|net|com.cn|org)$/;
            var name = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/;
            if( !(name.test(domain))){
                return false;
            }else{
                return true;
            }
        },
        //保存新的轮播图
        saveCircle:function ($event) {
          var that = this;
          that.loading = true;
          //序列号
          var newXuliehao = that.formInline.sequence;
          // 名称
          var newMingcheng = that.formInline.title;
          // 跳转链接
          var newLink = that.formInline.link;
          // 图片地址
          // var newImage = this.backImgUrl;
          var newImage = this.logoStr;
          var str=new RegExp("http");

          if(!(/(^[1-9]\d*$)/.test(newXuliehao))) {
            that.formInline.sequence = '';
　　　　　　return false;
　　　　　}else if(!this.IsURL(newLink)){
               this.$Message.info('请输入正确的跳转链接！');
               this.loading = false;
               return;
          }else if(newImage==''||newImage=='undefined'){
               this.$Message.info('请上传图片！');
               this.loading = false;
               return;
         }
          //序列化好的数据
          //var newData = $("#edit_course").serialize();

          if (that.isAddNewCircle) {
            $.ajax({
                url: this.postNewCilcleUrl,
                type: 'get',
                data: {
                  sequence:newXuliehao,
                  title:newMingcheng,
                  link:newLink,
                  logo:newImage
                },
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(result) {
                    // var result = me.getJsonObj(result);
                  if(result.success == 0){
                        // 换一种提示方式
                        that.myModal = false;
                        setTimeout(function() {
                          that.loading = false;
                          that.refreshComponet = false;
                          that.$Message.success("新增成功！");
                          that.getCircleData();
                        }, 200);
                      }else{
                        that.loading = false;
                      }
                },
                error: function() {
                    setTimeout(() => {
                        that.$Modal.remove();
                        that.$Message.info('查询失败！');
                    }, 2000);
                }
            });

          }else{
             if(newImage == 'undefined' || newImage==''){
                //点击了编辑，但是没有更换图片,图片地址还是请求回来的地址
                // newImage = this.oldImgUrl;
                newImage = this.logoStr;
              }
          $.ajax({
                url: this.postNewCilcleUrl,
                type: 'get',
                data: {
                  id:this.editCircleId,
                  sequence:newXuliehao,
                  title:newMingcheng,
                  link:newLink,
                  logo:newImage
                },
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(result) {

                  if(result.success == 0){
                        setTimeout(function() {
                          that.myModal = false;
                          that.$Message.success("编辑成功！");
                          that.getCircleData();
                          that.loading = false;
                          that.refreshComponet = fasle;
                          that.isAddNewCircle = false;
                        }, 200);
                      }else{

                      }
                },
                error: function() {
                    setTimeout(() => {
                        that.$Modal.remove();
                        that.$Message.info('查询失败！');
                    }, 2000);
                }
            });
          }
        },
        deleteCourse: function (item) {
          // 要删除的轮播图的id
          var circleId = item.id;
          var that=this;
            $.confirm({
                title: '警告!',
                content: '删除后无法恢复。</br>您确定要删除吗?',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: '确定',
                        btnClass: 'btn-red',
                        action: function(){
                            $.ajax({
                                url: that.deleteCircleUrl,
                                type: 'get',
                                data: {
                                  id:circleId
                                },
                                dataType: 'jsonp',
                                jsonpCallback: 'callback',
                                success: function(result) {
                                  if(result.success == 0){
                                      //显示保存成功信息
                                       setTimeout(function() {
                                          that.$Message.success("删除成功");
                                          that.loading = false;
                                          that.refreshComponet = false;
                                          that.getCircleData();
                                      }, 200);

                                    }else{
                                           setTimeout(function() {
                                              that.$Message.success("删除成功");
                                              that.loading = false;
                                              that.refreshComponet = false;
                                              that.getCircleData();
                                          }, 200);
                                    }
                                },
                                error: function() {
                                }
                            });

                        }
                    },
                  '取消': function () {
                  }
                }
            });
        },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.submitform();
                        this.saveCircle();
                    } else {
                        // this.$Message.error('表单验证失败!');
                    }
                })
            },

    },
    created(){
      // alert('home created')
      //获取网络数据
      this.getCircleData();
    },
    mounted(){
      // alert('home mounted')
        // 取不到的话
        if(!sessionStorage.getItem("homekey")){
            // 就设为第一页
            sessionStorage.setItem('homekey',1);
            this.change(1);
        }
    },
}

 jQuery(function($) {
    $(".swipebox").swipebox();

 });

</script>


<style scoped>
.title-f700{
  font-weight: 700;
}
.mingchengRequied{
      /*content: '*';*/
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
    font-weight: 900;
}
.jumpLink a{
    display:block;
     max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
}
  .table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
      vertical-align: middle;
  }
  .sparkbar{
    width: 100px;
  }
  .sparkbar img{
    display:block;
    width: 100%;
  }
  .box-footer{
    min-height: 57.6px;
    position:relative;
  }
  .ivu-page{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .ivu-tooltip-inner{
    white-space:normal;
  }

  .modal-content{
  margin-top:20%;
}
.modal-header
{
  background: #3c8dbc;
  color: #fff;
  text-align: center;
}
.addCircleContent{

}
.addCircleContent .addcommon{
  margin-bottom: 15px;
}

.addCircleContent .addcommon .left{
  float: left;
  width: 15%;
  text-align: right;
  padding-right: 10px;
}
.addCircleContent .addcommon .right{
  float: left;
  width: 85%;
}
.addCircleContent .addcommon .right input{
  width: 90%;
}
.addCircleContent .upload{

}
.addCircleContent .upload .uploadCommpont{
  width: 50%;
  float:right;
}
.addCircleContent .upload .left::after{
    content:" ";
    display:hidden;
}

.casebox{
  position:relative;
  /*min-height: 855px;*/
  min-height: 565px;
}
.picbox {
    /*width: 234px;*/
    width: 50%;
    height: 130px;
    display: inline-block;
    border: 1px solid #ddd;
    position: relative;
}

.addicon {
    position: absolute;
    top: 0;
    left: 47px;
    font-size: 70px;
    font-weight: 100;
    color: #ccc;
}
.addimg {
    position: absolute;
    bottom: 29px;
    left: 96px;
    color: #888;
}
.fileupload-button{
      position: relative;
    overflow: hidden;
    display: inline-block;
    color: #fff;
    padding: 6px 12px;
    background-color: #5cb85c;
    border-color: #4cae4c;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
}

.modal-footer{
  text-align: center;
}


.ivu-tooltip-inner {
    white-space: normal;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.ivu-spin-fix{
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.ivu-spin-fix{
  background: none;
}

.verticalCenter{
  padding-top: 6px;
}

/*.ivu-modal-wrap {
  z-index: 2000;
}*/
/*无数据时*/
.prize_none{
  text-align: center;
  margin-top: 200px;
}
.prize_none img{
  width: 180px;
  height: 180px;
}

/*.ivu-message{
  z-index: 10000000;
}*/
</style>