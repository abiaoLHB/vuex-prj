<template>
    <div id="app">
        <!--登录-->
        <div class="loginWrap" v-if="login_seen">
            <div class="Login" :style="{backgroundImage: 'url(' + imgBg + ')'}">
                <h1>产品运营管理后台</h1>
                <div class="loginBox">
                    <!--账户登录start-->
                        <div v-if="loginBoolean">
                            <img src="./assets/images/login/logo.png" alt="Logo" />
                            <h4>登录</h4>
                            <!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"> -->
                            <!-- 不要组件的验证了 -->
                            <Form ref="formValidate" :model="formValidate">
                                <FormItem label="账户" prop="accounNumber">
                                    <Input v-model="formValidate.accounNumber" :maxlength="11" placeholder="请输入账户"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input type="password" v-model="formValidate.password" @on-enter="handleSubmit('formValidate')" placeholder="请输入密码"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')" long>登录</Button>
                                </FormItem>
                            </Form>
                            <a href="javascript:;" @click="codeLogin">验证码登录</a>
                            <p>
                                <Row>
                                    <Col span="12">
                                    <span >还没有账户,</span>
                                    <a href="javascript:;" @click="registerBtn" style="display: inline-block;color: #2d8cf0">立即注册！</a>
                                    </Col>
                                    <Col span="12">
                                    <a href="javascript:;" @click="forgetBtn" style="float:right;color: #2d8cf0;">忘记密码?</a>
                                    </Col>
                                </Row>
                            </p>
                        </div>
                    <!--账户登录END-->

                    <!--验证码登录START-->
                        <div class="codeWrap" v-if="codeBoolean">
                            <img src="./assets/images/login/logo.png" alt="Logo" />
                            <h4>验证码登录</h4>
                            <!-- <Form ref="formValidateCode" :model="formValidateCode" :rules="ruleValidateCode" label-position="top"> -->
                            <Form ref="formValidateCode" :model="formValidateCode"  label-position="top">
                                <FormItem label="手机验证" prop="phoneNumber">
                                    <Input v-model="formValidateCode.phoneNumber" :maxlength="11" placeholder="请输入手机号" class="phoneNum"></Input>
                                </FormItem>
                                <FormItem label="验证码" prop="yzcode">
                                    <Row>
                                        <Col span="17">
                                        <Input v-model="formValidateCode.yzcode" placeholder="请输入验证码" @on-enter="handleSubmitCode('formValidateCode')"></Input>
                                        </Col>
                                      <!--   <Col span="7">
                                            <Button type="primary" style="float:right;" @click="mesCode" class="mesCode">发送验证码</Button>
                                        </Col> -->
                                        <Col span="7">
                                            <Button type="primary" style="float:right;" @click="mesCode" class="mesCode">发送验证码</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long @click="handleSubmitCode('formValidateCode')">登录</Button>
                                </FormItem>
                            </Form>
                            <a href="javascript:;" @click="zhLogin">账户登录</a>
                            <p>
                                <Row>
                                    <Col span="12">
                                    <span>还没有账户,</span>
                                    <a href="javascript:;" @click="registerBtn" style="display: inline-block;color: #2d8cf0">立即注册！</a>
                                    </Col>
                                    <Col span="12">
                                    </Col>
                                </Row>
                            </p>
                        </div>
                    <!--验证码登录END-->

                    <!--注册START-->
                        <div class="registerWrap" v-if="registerBoolean">
                            <h4>注册</h4>
                             <a href="javascript:;" @click="zhLogin" class="accountLogin">返回账户登录</a>
                            <!-- <Form ref="formValidateReg" :model="formValidateReg" :rules="ruleValidateReg" label-position="top"> -->
                            <Form ref="formValidateReg" :model="formValidateReg"  label-position="top">
                                <FormItem label="账户" prop="phone">
                                    <Input v-model="formValidateReg.phone" :maxlength='11' placeholder="请输入手机号"></Input>
                                </FormItem>
                                <FormItem label="验证码" prop="verificationCode">
                                    <Row>
                                        <Col span="17">
                                        <Input v-model="formValidateReg.verificationCode" :maxlength='6' placeholder="请输入验证码"></Input>
                                        </Col>
                                        <Col span="7">
                                        <Button type="primary" style="float:right;" class="mesReg" @click="mesReg">发送验证码</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem label="姓名" prop="name">
                                    <Input v-model="formValidateReg.name" placeholder="请输入姓名"></Input>
                                </FormItem>
                                <FormItem label="所属组织" prop="organization">
                                    <Input v-model="formValidateReg.organization" placeholder="请输入组织名称"></Input>
                                </FormItem>
                                <FormItem label="职务" prop="post">
                                    <Input v-model="formValidateReg.post" placeholder="请输入职务"></Input>
                                </FormItem>
                                <FormItem label="微信二维码" prop="wechatQR">
                                    <v-code v-on:child-say="listenToMyBoyQrcode"></v-code>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long :loading="loadingRegister" @click="handleSubmitReg('formValidateReg')">确定</Button>
                                </FormItem>
                            </Form>
                            <div>
                                注册后，登录密码为默认密码111111,用户可以在登录页使用
                                <a href="javascript:;" @click="forgetBtn" >忘记密码?</a>功能进行更改！
                                <!-- <a href="javascript:;" @click="zhLogin">返回账户登录</a> -->
                            </div>
                        </div>
                    <!--注册END-->

                    <!--忘记密码start-->
                        <div class="forgetWrap" v-if="forgetBoolean">
                            <img src="./assets/images/login/logo.png" alt="Logo" />
                            <h4>忘记密码</h4>
                            <!-- <Form ref="formValidateforget" :model="formValidateforget" :rules="ruleValidateforget" label-position="top"> -->
                            <Form ref="formValidateforget" :model="formValidateforget" label-position="top">
                                <FormItem label="手机验证" prop="phone">
                                    <Input v-model="formValidateforget.phone" placeholder="请输入手机号"></Input>
                                </FormItem>
                                <FormItem label="验证码" prop="verificationCode">
                                    <Row>
                                        <Col span="17">
                                        <Input v-model="formValidateforget.verificationCode" placeholder="请输入验证码"></Input>
                                        </Col>
                                        <Col span="7">
                                        <Button type="primary" style="float:right;" class="msgsForget" @click="mesforget">发送验证码</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem label="新密码" prop="password">
                                    <Input type="password" v-model="formValidateforget.password" placeholder="密码为6到14位数字或字母"></Input>
                                </FormItem>
                                <FormItem label="确认密码" prop="passwdCheck">
                                    <Input type="password" v-model="formValidateforget.passwdCheck" placeholder="请再次输入密码"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long @click="handleSubmitforget('formValidateforget')">确定</Button>
                                </FormItem>
                            </Form>
                            <a href="javascript:;" @click="zhLogin">返回账户登录</a>
                        </div>
                    <!--忘记密码END-->
                </div>
            </div>
        </div>
        <!--登录 结束-->
        <div class="wrapper" v-if="login_hide">
            <v-header></v-header>
            <v-aside></v-aside>
            <v-content></v-content>
        </div>
    </div>
</template>
<script>
import commoncss from './assets/css/common.css'
import adminHeader from './components/header/AdminHeader.vue'
import Aside from './components/aside/Aside.vue'
import Content from './components/content/content.vue'
import Vcode from './components/content/home/qrCode.vue'
import imgBg from './assets/images/login/loginBg.jpg'

function setcookie(name, value) {
    var days = 1;
    var exp = new Date();
    //写入Cookie  ，toGMTstring将时间转换成字符串。
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString;
}

function getcookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    } else {
        return null;
    }
}
let seen = true;
let noseen = false;
if (getcookie('login') !== null) {
    seen = false;
    noseen = true;
}
export default {
    name: 'app',
    data() {
        return {
            imgBg:imgBg,
            login_seen: seen,
            login_hide: noseen,
            loginId: '',
            loginBoolean: true,
            codeBoolean: false,
            registerBoolean:false,
            forgetBoolean:false,
            loadingRegister:false,
            formValidate: {
                accounNumber: '',
                password: '',
                phone: '',
                yzcode: ''
            },
            ruleValidate: {
                accounNumber: [{
                    required: false,
                    message: '账户不能为空',
                    // trigger: 'blur'
                }],
                password: [{
                    required: false,
                    message: '密码不能为空',
                    // trigger: 'blur'
                }],
                phone: [{
                    required: false,
                    message: '手机号不能为空',
                    // trigger: 'blur'
                }],
                yzcode: [{
                    required: false,
                    message: '验证码不能为空',
                    // trigger: 'blur'
                }]
            },
            //验证码
            formValidateCode: {
                phoneNumber: '',
                yzcode: '',
            },
            ruleValidateCode: {
                phoneNumber: [{
                    required: false,
                    message: '手机号不能为空',
                    // trigger: 'blur'
                }],
                yzcode: [{
                    required: false,
                    message: '验证码不能为空',
                    // trigger: 'blur'
                }]
            },
            //注册
            formValidateReg: {
                phone: '',
                verificationCode: '',
                name:'',
                organization:'',
                post:'',
                wechatQR:''
            },
            ruleValidateReg: {
                phone: [
                    {
                        // required: true,
                        message: '手机号不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                        message: '手机号格式不对',
                        // trigger: 'blur'
                     }

                ],
                verificationCode: [
                    {
                        required: false,
                        message: '验证码不能为空',
                         // trigger: 'blur'
                     }
                ],
                name: [
                    {
                        // required: false,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 4,
                        message: '姓名不能大于4字',
                        // trigger: 'blur'
                    }
                ],
                organization: [
                    { required: false,
                        message: '所属组织不能为空', trigger: 'blur' }
                ],
                post: [
                    { required: false,
                        message: '职务不能为空', trigger: 'blur' }
                ]
            },
            //忘记密码
            formValidateforget: {
                phone: '',
                verificationCode: '',
                password:'',
                passwdCheck:''
            },
            ruleValidateforget: {
                phone: [
                    { required: false, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式不对', trigger: 'blur' }

                ],
                verificationCode: [
                    { required: false, message: '验证码不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: false, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, message: '密码为6到14位数字或字母', trigger: 'blur' }
                ],
                passwdCheck:[
                    { required: false, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, message: '密码为6到14位数字或字母', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        // <my-component> 将只在父模板可用
        'v-header': adminHeader,
        'v-aside': Aside,
        'v-content': Content,
        'v-code': Vcode
    },
    methods: {
        codeLogin() {
            this.loginBoolean = false;
            this.registerBoolean = false;
            this.forgetBoolean = false;
            this.codeBoolean = true;
        },
        //账户登录的enter事件
        // accountLoginOnEnter:function(name){
        //     this.handleSubmit(name);
        // },
        //账户登录
        //管理员信息
        // 账号：18866666666
        // 密码：111111
        // 杨帅电话：17710284010

        // 验证手机号是否合法
        testValatedPhoneNum:function(phoneNumber){
            var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
            if(myreg.test(phoneNumber)){
                return true;
            } else{
                return false;
            }
        },

        handleSubmit(name) {
            let vm = this;
            this.$refs[name].validate((valid) => {

                var account = vm.formValidate.accounNumber;
                var password = vm.formValidate.password;
                if(!account){
                    vm.$Message.error("请输入您的手机号！");
                    return;
                }
                if(!vm.testValatedPhoneNum(account)){
                    vm.$Message.error("请输入合法的手机号！");
                    return;
                }
                if(!password){
                    vm.$Message.error("请输入密码！");
                    return;
                }

                console.log('登录账号和密码----------------------')
                console.log(account)
                console.log(password)
                console.log('登录账号和密码----------------------')

                if (valid) {
                    $.ajax({
                        url: apiUrl + "login",
                        type: 'get',
                        data: {
                            'accounNumber': vm.formValidate.accounNumber,
                            'password': vm.formValidate.password
                        },
                        dataType: 'jsonp',
                        jsonpCallback: 'callback',
                        success: function(result) {

                            console.log('登录信息---------------------------')
                            console.log(result)
                            console.log('登录信息---------------------------')

                            if (result.success == 0) {
                                vm.loginId = result.entity.id;
                                vm.login_seen = false;
                                vm.login_hide = true;
                                //vm.isAdmin = result.entity.isAdmin;
                                setcookie('login', vm.loginId);
                                sessionStorage.setItem("isAdmin",result.entity.isAdmin);
                                vm.$Message.success('登录成功!');
                                console.log('登录成功')
                                setTimeout(function(){
                                    location.reload();
                                     // vm.$router.go({name:'home'});
                                     vm.$router.push({path:'/'})
                                }, 100)
                            } else if (result.success == 1) {
                                vm.$Message.error('账户不存在!');
                            } else if (result.success == 2) {
                                vm.$Message.error('密码错误!');
                            } else {
                                vm.$Message.error('账户或密码不正确！');
                            }
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        //验证码登录
        handleSubmitCode(name) {
            let vm = this;

            var account = vm.formValidateCode.phoneNumber;
            var yzcode = vm.formValidateCode.yzcode;

            if(!account){
                vm.$Message.error("请输入您的手机号！");
                return;
            }
            if(!vm.testValatedPhoneNum(account)){
                vm.$Message.error("请输入合法的手机号！");
                return;
            }
            if(!yzcode){
                vm.$Message.error("验证码不能为空！");
                return;
            }

            this.$refs[name].validate((valid) => {
                if (valid) {
                    $.ajax({
                        url: apiUrl + "login",
                        type: 'get',
                        data: {
                            'accounNumber': vm.formValidateCode.phoneNumber,
                            'validateNumber': vm.formValidateCode.yzcode
                        },
                        dataType: 'jsonp',
                        jsonpCallback: 'callback',
                        success: function(result) {
                            if (result.success == 0) {
                                vm.$Message.success('登录成功!');
                                vm.login_seen = false;
                                vm.login_hide = true;
                                vm.loginId = result.entity.id;
                                //vm.isAdmin = result.entity.isAdmin;
                                setcookie('login', vm.loginId);
                                sessionStorage.setItem("isAdmin",result.entity.isAdmin);
                                console.log('验证码登录result.entity.isAdmin')
                                console.log(result.entity.isAdmin)
                                console.log('验证码登录result.entity.isAdmin')
                                setTimeout(function(){
                                    location.reload();
                                }, 1000)
                            } else if (result.success == 1) {
                                vm.$Message.error('账号不存在！');
                            } else if (result.success == 3) {
                                vm.$Message.error('验证码超时');
                            } else if (result.success == 4) {
                                vm.$Message.error('验证码错误');
                            } else if (result.success == 5){
                                vm.$Message.error('登录失败');
                            }else {
                                vm.$Message.error('数据错误！');
                            }
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        zhLogin() {
            this.loginBoolean = true;
            this.codeBoolean = false;
            this.registerBoolean = false;
            this.forgetBoolean = false;
        },
        mesCode() {
            let vm = this;
            if (this.codeBoolean) {
                var value = vm.formValidateCode.phoneNumber;
                var successState = false
                if(!value){
                    vm.$Message.error('手请输入您的手机号！');
                    return false;
                }
                if (!/^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
                    vm.$Message.error('手机格式不正确！');
                    return false;
                }
                if (vm.formValidateCode.phoneNumber) {
                    $.ajax({
                        url: apiUrl + "validateNumberSend",
                        type: 'get',
                        data: {
                            'phone': vm.formValidateCode.phoneNumber
                        },
                        dataType: 'jsonp',
                        async: true,
                        jsonpCallback: 'callback',
                        success: function(result) {
                            console.log('注册码登录返回值------------------------------')
                            console.log(result)
                            console.log('注册码登录返回值------------------------------')
                            if (result.success == 0) {
                                vm.$Message.success('短信发送成功,请填写验证码!');
                                successState = true;

                                    var time = 30;
                                    var code = $(".mesCode");
                                    // if (validCode) {
                                        // validCode = false;
                                        code.attr('disabled', 'true');
                                        var t = setInterval(function() {
                                            time--;
                                            code.html(time + "秒");
                                            if (time == 0) {
                                                clearInterval(t);
                                                code.html("重新获取");
                                                // validCode = true;
                                                code.removeAttr('disabled')
                                            } else {

                                            }
                                        }, 1000)
                                    // }

                            } else if(result.success == 2){
                                vm.$Message.error('账号不存在！');
                                successState = false;
                                return;
                            }
                            else {
                                vm.$Message.error('短信发送失败,请重新发送！');
                            }
                        },
                        error: function() {
                            vm.$Message.error('网络请求失败！');
                        }
                    });
                    // var validCode = false;
                    // if(successState){
                    //     alert('进来了？？')
                    //     validCode = true;
                    // }else{
                    //     validCode =false;
                    // }
                    // var time = 30;
                    // var code = $(".mesCode");
                    // if (validCode) {
                    //     validCode = false;
                    //     code.attr('disabled', 'true');
                    //     var t = setInterval(function() {
                    //         time--;
                    //         code.html(time + "秒");
                    //         if (time == 0) {
                    //             clearInterval(t);
                    //             code.html("重新获取");
                    //             validCode = true;
                    //             code.removeAttr('disabled')
                    //         } else {

                    //         }
                    //     }, 1000)
                    // }
                } else {
                    vm.$Message.error('请填写手机号！');
                }
            }
        },
        //注册
        registerBtn(){
          this.registerBoolean = true;
          this.loginBoolean = false;
          this.codeBoolean = false;
          this.forgetBoolean = false;

          // 清空注册信息
          this.formValidateReg.phone='';
          this.formValidateReg.verificationCode='';
          this.formValidateReg.name='';
          this.formValidateReg.organization='';
          this.formValidateReg.post='';
          this.formValidateReg.wechatQR='';

        },
        mesReg() {
            let vm = this;
            if (this.registerBoolean) {
                var value = vm.formValidateReg.phone;
                if (!/^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
                    vm.$Message.warning('手机格式不正确！');
                    return false;
                }
                if (vm.formValidateReg.phone) {
                    $.ajax({
                        url: apiUrl + "validateNumberSend",
                        type: 'get',
                        data: {
                            'phone': vm.formValidateReg.phone,
                            'type':"register"

                        },
                        dataType: 'jsonp',
                        async: true,
                        jsonpCallback: 'callback',
                        success: function(result) {
                            if (result.success == 0) {
                                vm.$Message.success('短信发送成功,请填写验证码!');
                            } else {
                                vm.$Message.error('短信发送失败,请重新发送！');
                            }
                        },
                        error: function() {
                            vm.$Message.error('网络请求失败！');
                        }
                    });
                    var validCode = true;
                    var time = 30;
                    var code = $(".mesReg");
                    if (validCode) {
                        validCode = false;
                        code.attr('disabled', 'true');
                        var t = setInterval(function() {
                            time--;
                            code.html(time + "秒");
                            if (time == 0) {
                                clearInterval(t);
                                code.html("重新获取");
                                validCode = true;
                                code.removeAttr('disabled')
                            } else {

                            }
                        }, 1000)
                    }
                } else {
                    vm.$Message.error('请填写手机号！');
                }
            }
        },
        async: function() {
            var vm = this;
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p>注册后，登录密码为默认密码111111</p><p>用户可以在登录页使用忘记密码功能进行更改！</p>',
                loading: true,
                onOk: () => {
                    setTimeout(() => {
                        // vm.$Modal.remove();
                        location.reload();
                    }, 500);
                }
            });
        },
        listenToMyBoyQrcode:function(somedata){
            this.formValidateReg.wechatQR = somedata;
        },
        // 注册事件
        handleSubmitReg (name) {
            let vm = this;
            vm.loadingRegister = true;

            var account = vm.formValidateReg.phone;
            var verificationCode = vm.formValidateReg.verificationCode;
            var name = vm.formValidateReg.name;
            var organization = vm.formValidateReg.organization;
            var post = vm.formValidateReg.post;
            var wechatQR = vm.formValidateReg.wechatQR;

            if(!account){
                vm.$Message.error("请输入您的手机号！");
                vm.loadingRegister = false;
                return false;
            }
            if(!vm.testValatedPhoneNum(account)){
                vm.$Message.error("请输入合法的手机号！");
                vm.loadingRegister = false;
                return false;
            }
            if(!verificationCode){
                vm.$Message.error("请输入验证码！");
                vm.loadingRegister = false;
                return false;
            }
            if(!name){
                vm.$Message.error("请输入您的姓名！");
                vm.loadingRegister = false;
                return false;
            }
            if(!organization){
                vm.$Message.error("请输入您所属组织！");
                vm.loadingRegister = false;
                return false;
            }
            if(!post){
                vm.$Message.error("请输入您的职务！");
                vm.loadingRegister = false;
                return false;
            }
            if(!wechatQR){
                vm.$Message.error('请上传二维码图片！');
                vm.loadingRegister = false;
                return false;
            }

            $.ajax({
                  url: apiUrl+"peopleUpdate",
                  type: 'get',
                  data: {
                      'phone':account,
                      'verificationCode':verificationCode,
                      'name':name,
                      'organization':organization,
                      'post':post,
                      'wechatQR':wechatQR
                  },
                  dataType: 'jsonp',
                  jsonpCallback: 'callback',
                  success: function(result) {
                    console.log('注册信息result------------------------')
                    console.log(result)
                    console.log('注册信息result------------------------')
                      if (result.success == 0) {
                        vm.$Message.success('注册成功!');
                        setTimeout(function(){
                            vm.async();
                        }, 1000)
                        vm.loadingRegister = false;
                      }else if (result.success == 1){
                        vm.$Message.error('验证码错误!');
                        vm.loadingRegister = false;
                      }else if (result.success == 2){
                        vm.$Message.error('数据错误!');
                        vm.loadingRegister = false;
                      }else if (result.success == 3){
                        vm.$Message.error('此账号已注册!');
                        vm.loadingRegister = false;
                      } else {
                          vm.$Message.error('网络请求失败！');
                          vm.loadingRegister = false;
                      }
                  },
                  error: function(){
                    vm.loadingRegister = false;
                    vm.$Message.error('网络请求失败！');
                  }
            });

            // this.$refs[name].validate((valid) => {
            //     if (valid) {

            //     } else {
            //         this.$Message.error('表单验证失败!');
            //     }
            // })
        },
        //忘记密码
        forgetBtn(){
          this.forgetBoolean = true;
          this.registerBoolean = false;
          this.loginBoolean = false;
          this.codeBoolean = false;
        },
        mesforget() {
            let vm = this;
            if (this.forgetBoolean) {
                if(vm.formValidateforget.phone){
                    $.ajax({
                          url: apiUrl+"validateNumberSend",
                          type: 'get',
                          data: {
                              'phone':vm.formValidateforget.phone
                          },
                          dataType: 'jsonp',
                          async: true,
                          jsonpCallback: 'callback',
                          success: function(result) {
                              if (result.success == 0) {
                                vm.$Message.success('短信发送成功,请填写验证码!');
                              } else {
                                  vm.$Message.error('短信发送失败,请重新发送！');
                              }
                          },
                          error:function(){
                                vm.$Message.error('网络请求失败！');
                          }
                    });
                    var validCode = true;
                    var time = 30;
                    var code = $(".msgsForget");
                    if (validCode) {
                        validCode = false;
                        code.attr('disabled', 'true');
                        var t = setInterval(function() {
                            time--;
                            code.html(time + "秒");
                            if (time == 0) {
                                clearInterval(t);
                                code.html("重新获取");
                                validCode = true;
                                code.removeAttr('disabled')
                            }else{

                            }
                        }, 1000)
                    }
                }else{
                    vm.$Message.error('请填写手机号！');
                }
            }
        },
        // 忘记密码事件
        handleSubmitforget (name) {
            let vm = this;
            var account = vm.formValidateforget.phone;
            var verificationCode = vm.formValidateforget.verificationCode;
            var password = vm.formValidateforget.password;
            var passwdCheck = vm.formValidateforget.passwdCheck;

            if(!account){
                vm.$Message.error("请输入您的手机号！");
                return;
            }
            if(!vm.testValatedPhoneNum(account)){
                vm.$Message.error("请输入合法的手机号！");
                return;
            }
            if(!verificationCode){
                vm.$Message.error("请输入验证码！");
                return;
            }
            if(!password){
                vm.$Message.error("请输入新密码！");
                return;
            }
            if(!passwdCheck){
                vm.$Message.error("请输入确认密码！");
                return;
            }

            this.$refs[name].validate((valid) => {
                if (vm.formValidateforget.password!==vm.formValidateforget.passwdCheck){
                  vm.$Message.warning('两次密码输入不一致！');
                  setTimeout(function(){
                    vm.formValidateforget.passwdCheck='';
                  }, 200)
                  return false;
                }
                if (valid) {
                    $.ajax({
                          url: apiUrl+"psswordRtrieval ",
                          type: 'get',
                          data: {
                              'phone':vm.formValidateforget.phone,
                              'verificationCode':vm.formValidateforget.verificationCode,
                              'password':vm.formValidateforget.password,
                          },
                          dataType: 'jsonp',
                          jsonpCallback: 'callback',
                          success: function(result) {
                              if (result.success == 0) {
                                vm.$Message.success('密码重置成功!');
                                setTimeout(function(){
                                    vm.forgetBoolean = false;
                                    vm.loginBoolean = true;
                                }, 1500)
                              }else if (result.success == 1){
                                vm.$Message.error('验证码错误!');
                              }else if (result.success == 2){
                                vm.$Message.error('账号不存在!');
                              }else if (result.success == 3){
                                vm.$Message.error('数据错误!');
                              } else {
                                  vm.$Message.error('网络请求失败！');
                              }
                          },
                          error: function(){
                            vm.$Message.error('网络请求失败！');
                          }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    },
    mounted() {


    },
    created() {

    }
}
</script>
<style>
#app {
    height: 100vh;
}
.ivu-form-item{
    margin-bottom: 20px !important;
}
.ivu-form-label-top .ivu-form-item-label{
    padding-bottom: 5px;
}
.ivu-form .ivu-form-item-label{
    padding-bottom: 5px;
}
.accountLogin{
    position:absolute;
    top:23px;
    right:22px;
}
</style>
