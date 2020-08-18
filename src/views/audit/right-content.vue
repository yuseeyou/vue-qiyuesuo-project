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
    .right-content-contain {
        flex: 1;
        height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 8px;
            height: 1px;
        }

        /*滚动条滑块*/

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #C7C7C7;
        }
    }


</style>