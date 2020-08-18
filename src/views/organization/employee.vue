<template>
    <div class="employee-contain">

        <div class="tree-contain">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    node-key="id"
                    :filter-node-method="filterNode"
                    ref="tree"
                    :highlight-current="true"
                    :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><span class="iconfont" style="padding-right: 8px">&#xe60d;</span>{{ node.label }}</span>
                    <el-popover
                            placement="bottom"
                            width="60"
                            trigger="hover"
                            popper-class="employee-popper">
                        <span slot="reference">...</span>
                        <ul class="popover-list">
                            <li class="list-item" @click="addEmployee(node)">添加</li>
                            <li class="list-item">编辑</li>
                            <li class="list-item">删除</li>
                        </ul>
                     </el-popover>
                </span>
            </el-tree>
        </div>

        <div class="edit-panel" v-show="panelState">
            <div class="edit-top">
                <p class="title">添加组织成员</p>
                <p class="close-panel" @click="closePanel">
                    <i class="el-icon-close"></i>
                </p>
            </div>
            <div class="edit-content">
                <el-form :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
                    <el-form-item label="组织单元名称:" prop="name">
                        <el-input v-model="employeeName" placeholder="请输入组织单元名称"></el-input>
                    </el-form-item>
                    <el-form-item label="上级组织单元:" prop="leader">
                        <el-cascader
                                v-model="value"
                                :options="data"
                                :props="{ checkStrictly: true}"
                                label="value"
                                clearable
                                v-if="isShow"
                                @change="handelChanged"></el-cascader>
                    </el-form-item>
                </el-form>
            </div>

            <div class="edit-bottom">
                <el-button plain @click="closePanel">取消</el-button>
                <el-button type="primary" @click="toAddTreeNode">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {initEmployeeData} from '@/constant'

    let baseId = 100;
    export default {
        name: "employee",
        data() {
            return {
                panelState: false,
                filterText: '',
                employeeName: '',
                data: initEmployeeData,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                value: [],     // 级联选择器当前选中的值
                isShow: true,  //当修改了chooseValue时重新加载el-cascader组件，不然会有显示残留
                rules: {       //表单验证
                    name: [
                        {required: true, message: '请输入组织单元名称', trigger: 'blur', min: 1},
                    ],
                    leader: [
                        {required: true}
                    ]
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            // 1.关闭面板
            closePanel() {
                this.panelState = false;
            },
            //2.点击添加，选中当前树的node节点
            addEmployee(node) {
                this.panelState = true;
                this.$refs.tree.setCurrentKey(node.key)

                this.isShow = false;
                this.$nextTick(() => {
                    this.value = [];
                    this.isShow = true;
                    this.value.unshift(node.key);
                    this.toCheckHasParentNode(node);
                })
            },
            //3.遍历检测父节点
            toCheckHasParentNode(node) {
                if (node?.parent?.key) {
                    this.value.unshift(node.parent.key);
                    this.toCheckHasParentNode(node.parent)
                }
            },
            //4.修改级联选择器的key值
            handelChanged() {
                const key = this.value[this.value.length - 1];
                this.$refs.tree.setCurrentKey(key);
            },
            //5.添加一个子结点
            toAddTreeNode() {
                if (this.employeeName) {
                    const data = this.$refs.tree.getCurrentNode();
                    const newChild = {id: baseId++, value: baseId - 1, label: this.employeeName, children: []};
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                    this.employeeName = '';
                    this.closePanel();
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/iconfont/iconfont.css";

    .employee-popper {

        min-width: 0;
        padding: 0;

        .popover-list {
            .list-item {
                cursor: pointer;
                text-align: center;
                padding: 8px;

                &:hover {
                    background: rgba(224, 224, 224, .5);
                }
            }
        }
    }

    .employee-contain {
        background: #ffffff;
        height: 100%;
        width: 100%;

        .tree-contain {
            width: 255px;
            height: 100%;
            overflow: auto;
            border-right: 1px solid #e8e8e8;
            padding: 20px;
            box-sizing: border-box;

            .el-input {
                margin-bottom: 15px;
            }

            .el-tree {
                .el-tree-node {
                    .el-tree-node__content {

                        &:hover {
                            span:nth-child(2) {
                                .el-popover__reference {
                                    display: inline;
                                    font-weight: bold;
                                }
                            }
                        }

                        .custom-tree-node {
                            .el-popover__reference {
                                display: none;
                                margin: auto 20px;
                            }
                        }
                    }
                }
            }

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

        .edit-panel {
            position: fixed;
            right: 0;
            top: 60px;
            box-shadow: -1px 2px 4px 0 rgba(0, 0, 0, .22);
            background-color: #ffffff;
            width: 600px;
            height: 100%;
            z-index: 2000;

            .edit-top {
                display: flex;
                justify-content: space-between;
                padding: 16px 24px;
                border-bottom: 1px solid #e5e7ea;
                font-size: 16px;

                .close-panel {
                    cursor: pointer;
                }
            }

            .edit-content {
                padding: 24px;

                input {
                    width: 250px;
                    height: 40px;
                }

                label {
                    padding-right: 60px;
                }
            }

            .edit-bottom {
                box-sizing: border-box;
                padding: 20px;
                background: #fff;
                width: 100%;
                position: absolute;
                right: 0;
                bottom: 60px;
                border-top: 1px solid #e6e6e6;
                z-index: 2001;
                text-align: right;
            }
        }

    }
</style>