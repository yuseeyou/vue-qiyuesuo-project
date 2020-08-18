<template>
    <div :class="{'menu-contain':true,'menu-close-contain':!isOpenMenu}">
        <div class="menu-logo">
            <a href="/home">
                <img src="@/assets/logo.png" alt="">
            </a>
        </div>
        <el-divider></el-divider>
        <el-menu
                :default-active="currentPath"
                class="el-menu-vertical-demo"
                background-color="#101C29"
                text-color="#fff"
                active-text-color="#ffffff"
                unique-opened
                router>
            <div class="item" v-for="(item,index) in menuList" :key="item.name">
                <el-menu-item :index="item.router" v-if="item.children.length===0">
                    <span class="iconfont" v-html="item.icon"></span>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
                <el-submenu :index="(index+1).toString()" v-else>
                    <template slot="title">
                        <span class="iconfont" v-html="item.icon"></span>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item2.router"
                                      v-for="(item2,index2) in item.children" :key="index2" :disabled="item2.router===''">{{item2.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>

    import {mapState} from "vuex";

    export default {
        name: "main-menu",
        props: {
            menuList: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {
                currentPath: '/home'
            }
        },
        mounted() {
            this.currentPath = this.$route.path;
        },
        computed: {
            ...mapState('menu', ["isOpenMenu"])
        }
    }
</script>

<style lang="less">
    @import "../assets/iconfont/iconfont.css";

    .menu-contain {
        width: 207px;
        height: 100%;
        background-color: #101C29;
        position: fixed;
        overflow: hidden;
        transition: all .3s ease-out;

        .menu-logo {
            a {
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 150px;
                }
            }
        }

        .el-divider {
            margin: 0 auto;
            background-color: #1d242d;
        }

        .el-menu {
            border-right: none;

            .item {
                .iconfont {
                    font-size: 20px;
                    margin-right: 18px;
                }

                .el-menu-item {
                    opacity: .6;

                    &:hover {
                        opacity: 1;
                    }
                }

                .el-menu-item.is-active {
                    background-color: @mainColor !important;
                    opacity: 1;
                }

                .el-submenu {
                    .el-submenu__title {
                        opacity: .6;

                        &:hover {
                            opacity: 1;
                        }
                    }

                    .is-active {
                        background-color: @mainColor !important;
                        opacity: 1;
                    }
                }

                .el-submenu.is-active .el-submenu__title {
                    opacity: 1;
                }

            }
        }
    }

    .menu-close-contain {
        transform: translateX(-207px);
    }
</style>