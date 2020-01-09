<template>
    <Modal
        :value="showModal"
        title="编辑产品"
        :mask-closable="false"
        @on-ok="handleModalConfirm"
        @on-cancel="handleModalCancle">
        <Form :model="editProductForm" :label-width="80">
            <FormItem label="产品名称:">
                <Input v-model="editProductForm.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="产品价格:">
                <div class="product_price">
                    <div class="item flex" style="margin: 8px 0;justify-content: space-around;" v-for="(item, index) in priceList" :key="index">
                        <div style="margin-right: 8px;">规格:</div>
                        <Input v-model="item.name" style="width: 80px" />
                        <div style="margin-right: 8px;">价格:</div>
                        <Input v-model="item.value" style="margin-right: 8px; width: 80px" />
                        <Button @click="handleRemovePriceItem(index)">-</Button>
                    </div>
                    <div style="text-align:center;">
                        <Button @click="handleAddPriceItem">+</Button>
                    </div>
                </div>
            </FormItem>
            <FormItem label="产品描述:">
                <Input type="textarea" v-model="editProductForm.desc" placeholder="" />
            </FormItem>
            <FormItem label="产品图片:">
                <Upload
                    multiple
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/"> 
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
                <div>
                    <div v-for="item in file" :key="item.id" style="margin-right: 2px;">
                        <span>{{item.name}}&nbsp;&nbsp;</span><span style="pointer: cursor" @click="removeImage(item)">X</span>
                    </div>
                </div>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import mixins from './mixins.js'
let imgId = 0;

export default {
    mixins: [mixins],
    props: ['item', 'faItem'],
    data() {
        return {
            file: this.item.picPath || [],
            editProductForm: {
                name: this.item.name,
                desc: this.item.desc,
            },
            priceList: [{
                name: '', value: '',
            }]
        }
    },
    methods: {
        handleAddPriceItem() {
            //  增加不同规格的价格
            this.priceList.push({
                name: '', value: '',
            })
        },
        handleRemovePriceItem(index) {
            //移除规格价格
            this.priceList.splice(index, 1)
        },
        removeImage(item) {
            let index = -1;
            this.file.forEach((chiItem, chiIndex) => {
                if(chiItem.id == item.id) {
                    index = chiIndex
                }
            })
            if(index != -1) {
                this.file.splice(index, 1);
            }
        },
        handleUpload(file) {
            if(Array.isArray(file)) {
                file.forEach((item) => {
                 item.id = imgId;
                 imgId += 1;   
                })
                this.file = file;
            } else {
                file.id = imgId;
                imgId +=1;
                this.file.push(file)
            }
            return false;
        },
        handleModalConfirm() {
            // baocun
            const params = {
                files: this.file,
                lable_id: this.faItem ? this.faItem.id : '',
                product_id: this.item.id,
                product_name: this.editProductForm.name || this.item.name,
                product_price: this.priceList.join(','),
                product_desp: this.editProductForm.desc,
            }
            this.$axios.post(this.$url.updateProduct, params, { 'Content-Type': 'multipart/form-data'}).then((res) => {
                if(res.data.code == 0) {
                    this.$Message.success('编辑成功')
                    this.$emit('handleCreateOk');
                } else {
                    this.$Message.error('编辑失败')
                }
            }).catch((err) => {
                this.$Message.error('未知错误，联系管理员')
            })
            this.$emit('modalManage', this.modalName)
        },
        
    },
}
</script>
<style lang="less">
    
</style>