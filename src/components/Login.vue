<template>
    <div class="login">
        <div class="login-box">
            <h1>Login</h1>
            <div class="input-box">
                <div class="item">
                    <i></i>
                    <input
                        type="text"
                        placeholder="用户名"
                        v-model="loginForm.username"
                    />
                </div>
                <div class="item">
                    <i></i>
                    <input
                        type="text"
                        placeholder="用户密码"
                        v-model="loginForm.password"
                    />
                </div>
                <button @click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            token:'zdsf1651681',
        };
    },
    methods: {
        getMutaions(){
          this.$store.commit('changeLogin'); // 这里不用return的
      },

        //  ...mapMutations(['changeLogin']),
        login() {
            let _this = this;
            if (
                this.loginForm.username === "" ||
                this.loginForm.password === ""
            ) {
                alert("账号或密码不能为空");
            } else {
                // this.axios({
                //     method: "post",
                //     url: "/user/login",
                //     data: _this.loginForm,
                // })
                //     .then((res) => {
                //         console.log(res.data);
                //         _this.userToken = "Bearer " + res.data.data.body.token;
                //         // 将用户token保存到vuex中
                //         _this.getMutaions({ Authorization: _this.userToken });
                //         _this.$router.push("/home");
                //         alert("登陆成功");
                //     })
                //     .catch((error) => {
                //         alert("账号或密码错误");
                //         console.log(error);
                //     });

                _this.userToken = "Bearer " + this.token;
                        // 将用户token保存到vuex中
                        _this.getMutaions({ Authorization: _this.userToken });
                        _this.$router.push("/home");
                        alert("登陆成功");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/img/跑车.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
h1 {
    font-size: 25px;
}
.login-box {
    width: 30%;
    // height: 300px;
    border: 1px solid #000;
    margin: 0 auto;
    // margin-top: 20%;
    text-align: center;
    background: #00000080;
    color: #fff;
    padding: 20px 0px;
}
.item {
    margin-top: 15px;
}
.item input {
    width: 180px;
    font-size: 18px;
    border: 0;
    border-bottom: 2px solid #fff;
    padding: 5px 10px;
    background: #ffffff00;
    color: #ffffff;
}
.input-box button {
    margin-top: 15px;
    width: 180px;
    height: 30px;
}
</style>