<template>
    <div :class="{'main-contain':true,'main-close-contain':!isOpenMenu}"
         :style="{backgroundColor:bgc,padding:(padding+'px')}">
        <slot/>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "main-container",
        data() {
            return {
                bgc: '#f7f8f8',
                padding: '15'
            }
        },
        computed: {
            ...mapState('menu', ["isOpenMenu"])
        },
        mounted() {
            this.$bus.$on('colorHasChanged', (color) => {
                this.bgc = color;
            });
            this.$bus.$on('paddingHasChanged', (padding) => {
                this.padding = padding;
            })
        }
    }
</script>

<style scoped lang="less">
    .main-contain {
        width: calc(100% - 207px);

        position: absolute;
        top: 60px;
        left: 207px;
        transition: all .3s ease-out;

        background-color: #f7f8f8;
        padding: 15px;
        box-sizing: border-box;
        height: calc(100% - 60px);
    }

    .main-close-contain {
        width: 100%;
        left: 0;
    }
</style>