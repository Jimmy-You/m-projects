<template>
    <Modal
        :value="showModal"
        title="删除"
        :mask-closable="false"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <p>确认删除此条目?</p>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    mixins: [mixins],
    props: ['data'],
    methods: {
        handleModalConfirm() {
            const url = this.data.isDir ? this.$url.delFolder : this.$url.delProduct
            this.$axios.post(url, {
                id: this.data.id,
                type: this.data.isDir ? 'dir' : 'pro'
            }).then(res => {
                if(res.data.code == 0) {
                    this.$Message.success('删除成功')
                    this.handleModalCancle();
                    this.$emit('handleDeleteSuccess')
                }
            })
        },
        
    },
}
</script>
<style lang="less">
    
</style>