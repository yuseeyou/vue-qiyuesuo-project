<template>
    <div class="left-menu-contain">
        <el-menu
                default-active="1"
                class="el-menu-vertical-left">
            <el-menu-item :index="(index+1).toString()" v-for="(item,index) in auditMenu" @click="toggleMenu(item)"
                          :key="item.title">
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {auditMenu} from '../../constant/index';

    export default {
        name: "left-menu",
        data() {
            return {
                auditMenu
            }
        },
        methods: {
            toggleMenu(item) {
                this.$bus.$emit('receiveMenuProps', item);
            }
        }
    }
</script>

<style scoped lang="less">
    .left-menu-contain {
        width: 159px;
        background-color: #ffffff;
        padding-top: 30px;

        .el-menu-vertical-left {
            height: 100%;

            .el-menu-item {
                padding: 0 24px !important;
                height: 34px;
                line-height: 34px;
                color: #485a6a;
            }

            .is-active {
                background-color: #f7f8f8;
                border-right: 2px solid #2489f2;
            }
        }
    }

</style>