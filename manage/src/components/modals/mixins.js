export default {
    props: ['showModal', 'modalName'],
    methods: {
        handleModalCancle() {
            this.$emit('modalManage', this.modalName)
        }
    }
}