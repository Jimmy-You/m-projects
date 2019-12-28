<template>
    <Modal
        :value="showModal"
        title="编辑目录"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <Form :model="editForm" :label-width="80">
            <FormItem label="目录名称:">
                <Input v-model="editForm.name" placeholder=""></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    mixins: [mixins],
    data() {
        return {
            editForm: {}
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
    
</style>