<template>
	<div class="loginWrapper">
		<Form :model="loginForm" :label-width="80">
			<FormItem label="账号:">
					<Input v-model="loginForm.username" placeholder="请输入账号" />
			</FormItem>
			<FormItem label="密码:">
					<Input v-model="loginForm.pwd" type="password" placeholder="请输入密码" />
			</FormItem>
			<div style="text-align:center;">
				<Button @click="handleLoginConfirm">登陆</Button>
			</div>
		</Form>
	</div>	
</template>
<script>
export default {
	data() {
		return {
			loginForm: {
				username: '',
				pwd: '',
			}
		}
	},
	methods: {
		handleLoginConfirm() {
			if(!this.loginForm.username || !this.loginForm.pwd) {
				this.$Message.error('账号密码必填')
				return;
			} 
			if(this.loginForm.username == 'haodashangmao' && this.loginForm.pwd == '18681993941') {
				// 登录成功
				window.sessionStorage.setItem('token', 'balabala');
				this.$emit('handleLogin')
				return;
			}
			this.$Message.error('用户名或密码错误!')
		}
	}
}
</script>
<style lang="less" scoped>
.loginWrapper {
	    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>