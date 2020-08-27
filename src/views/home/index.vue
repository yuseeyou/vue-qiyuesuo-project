<template>
    <div class="home-contain">
        <p>我是首页</p>
        <p>我是基础分支hotfix1.1</p>
        <p>我是分支feature/1.1/REQ-002</p>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped lang="less">
    .home-contain {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        p{
            text-align: center;
            padding-top: 50px;
            font-size: 25px;
            color: @mainColor;
        }
    }
</style>