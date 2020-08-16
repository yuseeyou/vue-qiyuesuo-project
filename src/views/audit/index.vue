<template>
    <div class="audit-contain">
        <left-menu/>
        <right-content/>
    </div>
</template>

<script>
    import leftMenu from './left-menu';
    import rightContent from './right-content';

    export default {
        name: "index",
        components: {
            leftMenu,
            rightContent
        }
    }
</script>

<style scoped lang="less">
    .audit-contain {
        height: 100%;
        width: 100%;
        display: flex;

        .contain-menu {
            width: 300px;
            background: #9a6e3a;
        }

        .contain-content {
            height: 100%;
            background: #55a532;
            overflow-y: scroll;
        }
    }
</style>