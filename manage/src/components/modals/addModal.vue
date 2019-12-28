<template>
    <Modal
        :value="showModal"
        title="新增"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <RadioGroup v-if="!addTypeProp" v-model="addType" type="button" class="addTypeCChoose" style="">
            <Radio label="1">目录</Radio>
            <Radio label="2">产品</Radio>
        </RadioGroup>
        <Form v-if="(addType == '1' && !addTypeProp) || addTypeProp == '1'" :model="addFolderForm" :label-width="80">
            <FormItem label="目录名称:">
                <Input v-model="addFolderForm.name" placeholder=""></Input>
            </FormItem>
        </Form>
        <Form v-if="(addType == '2' && !addTypeProp) || addTypeProp == '2'" :model="addProductForm" :label-width="80">
            <FormItem label="产品名称:">
                <Input v-model="addProductForm.name" placeholder=""></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    mixins: [mixins],
    props: ['addTypeProp'],
    data() {
        return {
            addFolderForm: {},
            addProductForm: {},
            addType: '1',
        }
    },
    methods: {
        handleModalConfirm() {
            // baocun
            this.$emit('modalManage', this.modalName)
        },
        
    },
}
</script>
<style lang="less">
    .addTypeCChoose {
        width: 100%;text-align: center;margin: 15px 0;
    }
</style>