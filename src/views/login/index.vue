<template>
    <div class="login-contain">
        <el-card class="box-card">
            <div class="box-top">
                <p class="title">电子合同签署平台</p>
            </div>
            <div class="box-center">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"
                         class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="账号" ref="inputNode"
                                  @focus="doFocus"
                                  @blur="doBlur"></el-input>
                        <div class="tips">账号</div>
                        <div class="tips-placeholder" @click="toFocus" ref="tipsNode">支持手机号/邮箱/员工编号</div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="密码"
                                  @focus="$event.currentTarget.placeholder=''"
                                  @blur="$event.currentTarget.placeholder='密码'"></el-input>
                        <div class="tips">密码</div>
                    </el-form-item>
                    <div class="verification-code-login">
                        <span>忘记密码？使用验证码登录</span>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import * as ACTION from '@/store/modules/user/actions'

    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入手机号、邮箱或员工编号', trigger: 'blur', min: 1},
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur', min: 1},
                    ]
                }
            };
        },
        computed: {
            ...mapState('user', ["isLogin"])
        },
        methods: {
            // 1.点击登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.loginForm.password === "Qiyuesuo#2020") {
                            this.loginForm.password = '{cipher}qgDS6XetVCvFxYEtDdx8OlJyjRScQ1EgL6sYUXALYUJenEyyWEhCTimIs/ClfyNw+Jw/uXrqK8ImjeFfZoUQMzVBFkCo7Y4eg6fwmOUHSA+HkFKsoI+oMnKkPu5eUZS9LE3aZcMkDa4qwvMbrCIhE5OHS2ImlrI2Y3nvrXR7zBs=';
                        }
                        this.doLogin(this.loginForm).then(res => {
                            if (res?.data?.code === 0) {
                                this.$router.push({name: 'Home'})
                            }
                        })
                    }
                });
            },
            // 2.点击账号中间的提示使input聚焦
            toFocus() {
                this.$refs.inputNode.focus();
            },
            // 3.账号输入框聚焦时
            doFocus(event) {
                event.currentTarget.placeholder = ''
                this.$refs.tipsNode.style.display = 'none';
            },
            // 4.账号输入框失焦时
            doBlur(event) {
                event.currentTarget.placeholder = '账号';
                if (this.loginForm.username.length !== 0) {
                    this.$refs.tipsNode.style.display = 'none';
                } else {
                    this.$refs.tipsNode.style.display = 'block';
                }
            },
            ...mapActions('user', {
                doLogin: ACTION.DOLOGIN
            })
        }
    }
</script>

<style lang="less">
    .login-contain {
        height: 100%;
        background-image: url("../../assets/getbackgroundimage.jpg");
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .box-card {
            padding: 24px 40px;

            .el-card__body {
                padding: 24px 24px 14px 24px;

                .box-top {
                    .title {
                        font-size: 24px;
                        color: #001330;
                        text-align: center;
                        margin: 20px auto 32px;
                        font-weight: 700;
                    }
                }

                .box-center {
                    width: 330px;
                    padding-top: 15px;

                    .el-form {
                        .el-form-item {
                            margin-bottom: 32px;

                            &:nth-of-type(2) {
                                margin-bottom: 18px;
                            }

                            .el-form-item__content {
                                position: relative;

                                .el-input {
                                    &::after {
                                        content: "";
                                        display: block;
                                        width: 0;
                                        height: 2px;
                                        background: #2489f2;
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                        transition: width .5s ease, background-color .5s ease;
                                    }

                                    &:focus-within::after {
                                        width: 100%;
                                    }

                                    &:focus-within + .tips {
                                        visibility: visible;
                                    }

                                    /*&:focus-within + .tips + .tips-placeholder {*/
                                    /*    display: none;*/
                                    /*}*/

                                    input {
                                        border-top: 0;
                                        border-left: 0;
                                        border-right: 0;
                                        border-radius: 0;
                                        padding-left: 0;
                                    }
                                }

                                .el-button {
                                    width: 100%;
                                    margin-top: 28px;
                                }

                                .tips {
                                    color: #7f8997;
                                    font-size: 12px;
                                    visibility: hidden;
                                    position: absolute;
                                    top: -20px;
                                    left: 0;
                                }

                                .tips-placeholder {
                                    color: #c1c6cd;
                                    font-size: 12px;
                                    position: absolute;
                                    top: 0;
                                    left: 40px;
                                }
                            }
                        }

                        .verification-code-login {
                            text-align: right;
                            color: #7f8997;
                            font-size: 12px;

                            span {
                                cursor: pointer;

                                &:hover {
                                    color: #4c596e;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
</style>