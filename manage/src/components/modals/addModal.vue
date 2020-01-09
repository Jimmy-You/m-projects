<template>
    <Modal
        :value="showModal"
        title="新增"
        :mask-closable="false"
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
            <FormItem label="预览图片:">
                <Upload
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/"> 
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
                <div class="flex">
                    <div v-for="item in file" :key="item.id" style="margin-right: 2px;">
                        <span>{{item.name}}&nbsp;&nbsp;</span><span @click="removeImage(item)">X</span>
                    </div>
                </div>
            </FormItem>
        </Form>
        <Form v-if="(addType == '2' && !addTypeProp) || addTypeProp == '2'" :model="addProductForm" :label-width="80">
            <FormItem label="产品名称:">
                <Input v-model="addProductForm.name" placeholder=""></Input>
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
                <Input type="textarea" v-model="addProductForm.desc" placeholder="" />
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
    props: ['addTypeProp', 'level', 'parentId'],
    data() {
        return {
            file: [],
            addFolderForm: {},
            addProductForm: {},
            addType: '1',
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
            let params = {}, addUrl = '';
            if(this.addType == '1'){
                // 添加目录 -- 添加根目录和添加普通目录
                params = {
                    file: this.level ? this.file[0] : '', // 图 根目录不需要
                    level: this.level || '1',
                    name: this.addFolderForm.name || '',
                    lable_parentid: this.parentId || '-1',
                }
                addUrl = this.$url.addFolder
            } else {
                // 添加产品
                params = {
                    files: this.file,
                    lable_id: this.parentId,
                    product_name: this.addProductForm.name,
                    product_price: this.priceList.join(','),
                    product_desp: this.addProductForm.desc,
                    product_id: '-1'
                }
                addUrl = this.$url.addProduct
            }
            this.$axios.post(addUrl, params, { 'Content-Type': 'multipart/form-data'}).then((res) => {
                    if(res.data.code == 0) {
                        this.$Message.success('添加成功')
                        this.$emit('handleCreateOk');
                    } else {
                        this.$Message.error('添加失败')
                    }
                }).catch((err) => {
                    this.$Message.error('未知错误，联系管理员')
                })
            this.handleModalCancle()
        },
        
    },
}
</script>
<style lang="less">
    .addTypeCChoose {
        width: 100%;text-align: center;margin: 15px 0;
    }
</style>