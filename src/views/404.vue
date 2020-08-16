<template>
    <div class="lose-contain">
        <div class="top">
            <img src="../assets/404.png" alt="">
        </div>
        <div class="bottom">
            <a href="/" class="right">返回首页</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "error",
    }
</script>

<style scoped lang="less">
    .lose-contain{
        padding-top: 10%;
        .top{
            text-align: center;
        }
        .bottom{
            padding: 20px;
            display: flex;
            justify-content: center;
            a{
                padding: 20px;
                color:#F19E62;
            }
        }
    }
</style>