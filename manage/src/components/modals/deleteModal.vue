<template>
    <Modal
        :value="showModal"
        title="删除"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <p>确认删除此条目?</p>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    mixins: [mixins],
    methods: {
        handleModalConfirm() {
            this.$emit('modalManage', this.modalName)
        },
        
    },
}
</script>
<style lang="less">
    
</style>