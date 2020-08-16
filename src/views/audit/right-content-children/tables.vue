<template>
    <div class="table-contain">
        <el-table
                :data="tableData"
                style="width: 100%"
                @row-click="handle"
                ref="myTable"
                v-loading="loading">
            <el-table-column
                    v-for="item in tableTitles"
                    :label="item.name"
                    :prop="item.prop"
                    :key="item.prop">
            </el-table-column>

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="详细操作数据">
                            <span>{{ props.row.detailedOperation }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom-pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="currentShowNum"
                    layout="sizes, prev, pager, next, jumper"
                    :total="totalDataNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {httpGet} from '@/utils/http.ts';
    import {initQueryForm, initTableTitles} from '@/constant/index.js';
    import {deepCopy} from '@/utils/index.ts';

    export default {
        name: "tables",
        data() {
            return {
                tableData: [], //表格数据
                tableTitles: initTableTitles, //表头
                queryForm: deepCopy(initQueryForm), //查询参数
                currentPage: 1,
                currentShowNum: 10,
                totalDataNum: 0,
                loading: true
            }
        },
        mounted() {
            // 1.初始化表格数据
            this.getTableData();
            // 2.通过事件总线接收左边菜单栏传递过来的关键词
            this.$bus.$on('receiveMenuProps', (item) => {
                this.tableTitles = item.tableTitles;
                this.queryForm = deepCopy(initQueryForm); //切换左边菜单栏，搜索框重新初始化
                this.queryForm.auditType = item.keywords;
                this.currentPage = 1;
                this.currentShowNum = 10;
                this.getTableData();
            });
            // 3.通过事件总线触发搜索
            this.$bus.$on('doSearch', (data) => {
                this.queryForm = Object.assign(this.queryForm, data);
                this.getTableData();
            })
        },
        //事件总线的坑，是$on()会触发多次，具体原因跟生命周期有关。
        beforeDestroy() {
            this.$bus.$off('receiveMenuProps');
            this.$bus.$off('doSearch');
        },
        methods: {
            //1.获取表格中的数据
            async getTableData() {
                const result = await httpGet('api/system/audit/list', this.queryForm)
                this.tableData = result?.data?.result?.result;
                this.totalDataNum = result?.data?.result?.totalCount;
                this.loading = false;
            },
            //2.控制表格行的展开和收起
            handle(row) {
                this.$refs.myTable.toggleRowExpansion(row);
            },
            //3.修改每页展示数量
            handleSizeChange(val) {
                this.currentShowNum = val;
                this.queryForm.pageSize = val;
                this.getTableData();
            },
            //4.切换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryForm.pageNo = val;
                this.getTableData();
            }
        }
    }
</script>

<style lang="less">
    .table-contain {
        padding: 0 30px;
        background-color: #ffffff;

        .el-table__expanded-cell {
            .el-form-item {
                margin-bottom: 0;
            }
        }

        .el-table__body-wrapper {
            .el-table__row {
                td:nth-last-child(2) {
                    .cell {
                        max-width: 100%;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }

        .bottom-pagination {
            display: flex;
            justify-content: flex-end;
            padding: 24px 10px 40px 10px;
        }
    }


</style>