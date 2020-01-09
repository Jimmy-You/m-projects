<template>
    <Modal
        :value="showModal"
        title="编辑目录"
        :mask-closable="false"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <Form :model="editForm" :label-width="80">
            <FormItem label="目录名称:">
                <Input v-model="editForm.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="预览图片:" v-if="level">
                <Upload
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/"> 
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
                <div style="width: 150px;height: auto" class="flex" v-if="editForm.file">
                    <img :src="editForm.file"  style="width: 80%;height: auto;" />
                    <div style="cursor: pointer" @click="handleDeletePic">X</div>
                </div>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
export default {
    props: ['item', 'level'],
    mixins: [mixins],
    data() {
        return {
            editForm: {
                name: this.item.name,
                file: this.item.picPath ? this.item.picPath[0] : '',
            }
        }
    },
    methods: {
        handleUpload(file) {
            this.editForm = {
                ...this.editForm,
                file
            }
            return false;
        },
        handleDeletePic() {
            this.editForm = {
                ...this.editForm,
                file: ''
            }
        },
        handleModalConfirm() {
            // baocun
            const params = {
                file: this.editForm.file,
                id: this.item.id,
                name: this.editForm.name || this.item.name,
            }
            this.$axios.post(this.$url.updateFolder, params, { 'Content-Type': 'multipart/form-data'}).then((res) => {
                if(res.data.code == 0) {
                    this.$Message.success('编辑成功')
                    this.$emit('handleCreateOk');
                } else {
                    this.$Message.error('编辑失败')
                }
            }).catch((err) => {
                this.$Message.error('未知错误，联系管理员')
            })
            this.handleModalCancle();
        },
        
    },
}
</script>
<style lang="less">
    
</style>