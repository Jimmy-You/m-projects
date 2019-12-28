<template>
    <Modal
        :value="showModal"
        title="编辑产品"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    mixins: [mixins],
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