<template>
    <div class="layout-contain">
        <div class="layout-left">
            <div class="menu">
                <main-menu :menuList="menuList"/>
            </div>
        </div>
        <div class="layout-right">
            <div class="header">
                <main-header/>
            </div>
            <div class="content">
                <main-contain>
                    <router-view/>
                </main-contain>
            </div>
        </div>
    </div>
</template>

<script>
    import mainHeader from '@/components/header'
    import mainMenu from '@/components/menu'
    import mainContain from '@/components/main-container'
    import {menuList} from '@/constant/index.js'

    export default {
        name: "layout",
        components: {
            mainHeader,
            mainContain,
            mainMenu
        },
        data() {
            return {
                menuList
            }
        },

    }
</script>

<style scoped lang="less">
    .layout-contain {
        height: 100%;
        display: flex;

        .layout-left {
            height: 100%;

            .menu {
                width: 207px;
                height: 100%;
            }
        }

        .layout-right {
            height: 100%;

            .header {
                width: calc(100% - 207px);
                height: 60px;
            }

            .content {
                width: calc(100% - 207px);
                height: calc(100% - 60px);
            }
        }
    }

</style>