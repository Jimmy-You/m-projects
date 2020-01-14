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
                <div>已有图片</div>
                <template v-if="fileShow.length">
                    <div style="width: 150px;display:inline-flex" v-for="(item, index) in fileShow" :key="index">
                        <img :src="imgPro + item"  style="width: 80%;height: 100px;" />
                        <div style="cursor: pointer" @click="handleDeletePic(item)">X</div>
                    </div>
                </template>
                <div>
                    <div>新上传图片</div>
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
        let picList = [];
        if(this.item.productPic) {
            picList = this.item.productPic.slice(this.item.productPic.indexOf('[') + 1, this.item.productPic.indexOf(']')).split(',')
        }
        picList = picList.map(f => {
                return f.trim();
            })
        return {
            imgPro: this.$imgPro,
            file: [],
            fileShow: picList,
            editProductForm: {
                name: this.item.name,
                desc: this.item.desc,
            },
            priceList: [{
                name: '', value: '',
            }]
        }
    },
    watch: {
        item(val) {
            this.editProductForm = {
                name: val.productName,
                desc: val.productDesp,
            }
            this.file = []
            let picList = [];
            if(this.item.productPic) {
                picList = val.productPic.slice(val.productPic.indexOf('[') + 1, val.productPic.indexOf(']')).split(',')
            }
            this.fileShow = picList.map(f => {
                return f.trim();
            })
            this.priceList = JSON.parse(val.productPrice || "[]")
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
        handleDeletePic(item) {
            // 调用远程接口去删除数据
            let params = {
                id: this.item.id,
                name: item,
            }
            this.$axios.get(this.$url.deletepic, params).then((res) => {
                if(res.data.code == 0) {
                    this.fileShow = this.fileShow.filter((chiItem) => {
                        return chiItem != item;
                    })
                    this.$Message.success('删除成功')
                } else {
                    this.$Message.error('删除失败')
                }
            }).catch((err) => {
                this.$Message.error('未知错误，联系管理员')
            })
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
            let formData = new FormData();
            this.file.forEach((item) => {
                formData.append('files', item);
            })
            formData.append('lable_id', this.item.lableId);
            formData.append('product_name', this.editProductForm.name);
            formData.append('product_price', JSON.stringify(this.priceList));
            formData.append('product_desp', this.editProductForm.desc || '');
            formData.append('product_id', this.item.id);
            this.$axios.post(this.$url.updateProduct, formData, { 'Content-Type': 'multipart/form-data'}).then((res) => {
                if(res.data.code == 0) {
                    this.$Message.success('编辑成功')
                    this.$emit('handleUpdateOk');
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