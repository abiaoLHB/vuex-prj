<template>
	<div class="row">
      <div class="col-xs-12">
        <!-- /.box -->
         <router-view></router-view>
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">共有890890个课程，8个分类</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-hover">
              <thead>
              <tr class="active">
                <th class="col-xs-2">名称</th>
                <th class="col-xs-2">简介</th>
                <th class="col-xs-2">logo</th>
                <th class="col-xs-4">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in cloudSubject">
                <td>{{item.name}}</td>
                <td>{{item.title}}</td>
                <td>
                  <img  :src="'https://static.upedu.cc/'+item.logo" onerror="this.src='http://1.119.192.196:8084/static/upload/Dev/screencms/badimg.png'" class="logo" />
                </td>
                <td>
                	-
                </td>
              </tr>
              </tbody>
            </table>
            <div v-if="!cloudSubject" class="nothing">
              <img src="../../../assets/images/nothing.png" height="348" width="294" alt="" />
            </div>
            <div class="box-footer">
             <nav>
               <ul class="pagination">
                 <li v-if="showFirst"><a v-on:click="currentPage--">&laquo;</a></li>
                 <li v-for="index in indexs"  v-bind:class="{ 'active': currentPage == index}">
                    <a v-on:click="btnClick(index)">{{ index }}<span class="sr-only">(current)</span></a>
                 </li>
                 <li v-if="showLast" v-on:click="currentPage++"><a>&raquo;</a></li>
                 <li><a>共{{totalpage}}页</a></li>
               </ul>
             </nav>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
      <!-- courselist -->

    </div>
	</template>

	<script>
    function getcookie(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return (arr[2]);
      }else{
        return null;
      }
    }
    let channelId=getcookie('login');
		export default {
			name: 'aside',
			data () {
				return {
					msg: 'Welcome',
          subjectId: this.$route.params.subjectId,
          cloudSubject: {},
          channelId:'',
          //总项目数
          totalResultSize:'',
          //当前页码
          currentPage:1,
          //分页大小
          pageSize:5,
          //总分页数
          totalpage:'',
          //logo
          logopath:''
				}
			},
      mounted: function(){
        /*let logoqz="https://static.upedu.cc";
        let datasrc=$(".logo").attr('data-src');
        this.logopath=logoqz+datasrc;*/
        console.log("传过来的课程分类ID："+this.subjectId);
      },
      methods: {
        btnClick: function(data){//页码点击事件
           if(data != this.currentPage){
             this.currentPage = data;
             this.getData(data);
           }
        },
        getData: function(data){
          var that=this;
          var truedata=data;
          $.ajax({
            url:apiurl+'showSubjectCourse',
            type:'get',
            data:{'channelId':channelId,'subjectId':that.subjectId,type:0,'pageSize':that.pageSize,'currentPage':truedata||that.currentPage},
            dataType:'jsonp',
            jsonp:'false',
            jsonpCallback:'callback',
            success:function(result){
              if(result.success==0){
                that.cloudSubject = result.entity.courseList;
                that.totalpage = result.entity.page.totalPageSize;
                that.currentPage = result.entity.page.currentPage;
                console.log("totalpage:"+that.totalpage);
                console.log("currentPage:"+that.currentPage);
              }else{
                alert("数据请求错误")
              }
            }
          })
        }
      },
      computed: {
        indexs: function(){
          var left = 1
          var right = this.totalpage
          var ar = []
          if(this.totalpage>= 11){
            if(this.currentPage > 5 && this.currentPage < this.totalpage-4){
                    left = this.currentPage - 5
                    right = this.currentPage + 4
            }else{
                if(this.currentPage<=5){
                    left = 1
                    right = 10
                }else{
                    right = this.totalpage
                    left = this.totalpage -9
                }
            }
          }
          while (left <= right){
              ar.push(left)
              left ++
          }
          return ar
         },
         showLast: function(){
              if(this.currentPage == this.totalpage){
                  return false
              }
              return true
         },
         showFirst: function(){
             if(this.currentPage == 1){
               return false
             }
             return true
         }
      },
      created() {
        this.getData();
      },
      watch: {
        currentPage: function(oldValue,newValue){
          this.getData(oldValue);
        }
      }
		}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped>
    .nothing{
      text-align: center;
      padding: 100px 0;
    }
    .nothing img{
      width:180px;
      height:213px;
    }
    a:hover{
      cursor: pointer;
    }
    .box-footer{width: 100%;border:none;}
    .box-footer nav{text-align: center;}
    .logo{width:100px;height:100px;}
	</style>
