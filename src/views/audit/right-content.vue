<template>
    <div class="right-content-contain">
        <search/>
        <tables/>
    </div>
</template>

<script>
    import search from "./right-content-children/search";
    import tables from "./right-content-children/tables";

    export default {
        name: "right-content",
        components: {
            search,
            tables
        }
    }
</script>

<style scoped lang="less">
    .right-content-contain{
        flex: 1;
        /*overflow: hidden;*/
        height: 100%;
        overflow-y: scroll;
    }
</style>