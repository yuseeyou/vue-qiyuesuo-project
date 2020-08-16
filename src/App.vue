<template>
    <div id="app">
        <!--  此处的router-view只供login组件渲染，业务组件在layout中渲染-->
        <router-view name="login"/>
        <router-view name="layout"/>
        <router-view name="404"/>
    </div>
</template>

<script>
    import layout from "@/views/layout";

    export default {
        name: 'app',
        components: {layout}
    }
</script>

<style lang="less" scoped>
    #app {
        height: 100vh;
    }
</style>
