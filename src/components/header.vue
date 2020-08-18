<template>
    <div :class="{'header-contain':true,'close-header-contain':!isOpenMenu}">
        <div class="header-menu-left">
            <div class="open-menu-btn" @click="menuStateToggle">
                <span class="iconfont" v-show="isOpenMenu">&#xe623;</span>
                <span class="iconfont icon2" v-show="!isOpenMenu">&#xe668;</span>
            </div>
            <div class="sign-btn">
                <el-button type="primary">+ 电子签约</el-button>
            </div>
            <div class="company-choose">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                      维森集团有限公司<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-input placeholder="请输企业名称关键词"></el-input>
                        </el-dropdown-item>
                        <el-dropdown-item>测试公司1</el-dropdown-item>
                        <el-dropdown-item>测试公司2</el-dropdown-item>
                        <el-dropdown-item>测试公司3</el-dropdown-item>
                        <el-dropdown-item>测试公司4</el-dropdown-item>
                        <el-dropdown-item>测试公司5</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="header-menu-right">
            <div class="padding-toggle">
                <el-popover
                        placement="top-start"
                        :title="'当前padding值:'+paddingValue"
                        width="200"
                        trigger="hover"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <el-button slot="reference" icon="el-icon-s-operation">修改padding</el-button>
                    <el-slider v-model="paddingValue" :min="15" :max="50" @input="paddingChanged"></el-slider>
                </el-popover>
            </div>
            <div class="color-toggle">
                <el-color-picker v-model="color" @change="colorChanged"></el-color-picker>
            </div>
            <div class="functions-btn">
                <div class="message">
                    <el-tooltip class="item" effect="dark" content="消息提醒" placement="bottom">
                        <span class="iconfont">&#xe632;</span>
                    </el-tooltip>
                </div>
                <div class="check-sign">
                    <el-tooltip class="item" effect="dark" content="文件验签" placement="bottom">
                        <span class="iconfont">&#xe607;</span>
                    </el-tooltip>
                </div>
                <div class="download-app">
                    <el-tooltip class="item" effect="dark" content="下载APP" placement="bottom">
                        <span class="iconfont">&#xe66f;</span>
                    </el-tooltip>
                </div>
            </div>
            <div class="language-toggle">
                <el-dropdown>
                    <span class="el-dropdown-link">
                      语言切换<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>简体中文</el-dropdown-item>
                        <el-dropdown-item>English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="user">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img src="@/assets/user-header.png" alt="">
                        <i class="el-icon-arrow-down icon-caret-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import * as ACTION1 from '@/store/modules/menu/actions'
    import * as ACTION2 from '@/store/modules/user/actions'

    export default {
        name: "main-header",
        data() {
            return {
                color: "#",
                paddingValue: 0
            }
        },
        methods: {
            // 1.控制左边菜单栏展开收起
            menuStateToggle() {
                this.changeMenuState();
            },
            // 2.登出
            logout() {
                this.doLogout();
                this.$router.push({name: "Login"});
            },
            // 3.修改颜色
            colorChanged() {
                this.$bus.$emit('colorHasChanged', this.color);
            },
            // 4.修改padding
            paddingChanged() {
                this.$bus.$emit('paddingHasChanged', this.paddingValue);
            },
            ...mapMutations('menu', {
                changeMenuState: ACTION1.CHANGEMENUSTATE
            }),
            ...mapActions('user', {
                doLogout: ACTION2.DOLOGOUT
            })
        },
        computed: {
            ...mapState("menu", ["isOpenMenu"])
        }
    }
</script>

<style lang="less">
    @import "../assets/iconfont/iconfont.css";

    .header-contain {
        width: calc(100% - 207px);
        height: 60px;
        padding: 12px 15px;
        background-color: #fff;
        border-bottom: 1px solid #e5e7ea;
        position: fixed;
        top: 0;
        left: 207px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        transition: all .3s ease-out;
        z-index: 100;

        .header-menu-left {
            display: flex;

            .open-menu-btn {
                padding-right: 20px;
                border-right: 1px solid #c0c4cc;
                margin-right: 20px;
                cursor: pointer;

                .iconfont {
                    line-height: 35px;
                }

                .icon2 {
                    font-size: 22px;
                }
            }

            .sign-btn {
                .el-button {
                    height: 100%;
                    line-height: 0;
                    width: 150px;
                    border-radius: 40px;
                    background-color: @mainColor;

                    &:hover {
                        background-color: #50a1f5;
                    }
                }
            }

            .company-choose {
                margin-left: 20px;

                .el-dropdown {
                    height: 100%;
                    line-height: 35px;

                    .el-dropdown-link {
                        color: #001330;
                        cursor: pointer;
                    }
                }
            }
        }

        .header-menu-right {
            display: flex;

            .padding-toggle {

            }

            .color-toggle {
                margin: 0 15px;
            }

            .functions-btn {
                display: flex;
                line-height: 35px;

                .check-sign {
                    margin: 0 30px;
                }

                .iconfont {
                    font-size: 20px;
                    font-weight: bold;
                    color: #7f8997;
                    border-radius: 6px;
                    padding: 4px;
                    cursor: pointer;

                    &:hover {
                        background-color: rgba(224, 224, 224, 0.5);
                        color: @mainColor;
                    }
                }
            }

            .language-toggle {
                margin-left: 15px;

                .el-dropdown {
                    cursor: pointer;
                    height: 100%;
                    line-height: 35px;
                    border-left: 1px solid rgba(192, 196, 204, .5);
                    padding-left: 15px;
                }
            }

            .user {
                margin-left: 15px;

                .el-dropdown {
                    height: 100%;
                    cursor: pointer;

                    .el-dropdown-link {
                        img {
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }

    }

    .close-header-contain {
        width: 100%;
        left: 0;
    }
</style>