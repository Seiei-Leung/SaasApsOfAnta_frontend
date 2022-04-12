<template>
  <div id="signin-component">
    <div class="contentWrapper">
      <div class="header">
        工业互联网高级图形排产系统
      </div>
      <div class="InputWrapper">
        <Input prefix="md-contact" placeholder="用户名" style="width: 150px" size="small" v-model="userName" />
      </div>
      <div class="InputWrapper">
        <Input prefix="md-key" placeholder="密码" style="width: 150px" size="small" type="password" v-model="password" />
      </div>
      <div class="InputWrapper">
        <Button size="small" type="success" style="width: 150px;" @click="signin" @keyup.enter="signin">提交</Button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import CONST from "../../common/const";

export default {
  data: function() {
    return {
      campanyName: "",
      userName: "",
      password: ""
    }
  },
  created: function() {
    var that = this;
    // 全局绑定 enter 事件，enter 事件的key值为 13
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.signin();
      }
    }
  },
  methods: {
    signin: function() {
      var that = this;
      this.$Spin.show();
      this.axios.post(this.seieiURL + "/user/login", {
        usercode: this.userName,
        pwd: this.password
      }).then((response) => {
        if (response.data.status == 0) {
          sessionStorage.setItem(CONST.CONSTOFUSER.IS_ONLINE, true);
          var usermsg = JSON.stringify(response.data.data);
          sessionStorage.setItem(CONST.CONSTOFUSER.CURRENT_USER_MSG, usermsg);
          that.$Message.success(response.data.msg);
          that.$store.commit("setIsSignin", true);
          that.$store.commit("setUserRole", response.data.data.role);
          that.$Spin.hide();
        } else {
          that.$Message.error(response.data.msg);
          that.$Spin.hide();
        }
      }).catch((error) => {
        that.$Message.error({
          content: "服务器异常,请刷新！！",
          duration: 0,
          closable: true
        });
        console.log(error);
        that.$Spin.hide();
      });
    }
  }
}

</script>
<style scoped>
#signin-component {
  position: relative;
  height: 448px;
  width: 790px;
  margin: auto;
  margin-top: 15vh;
  background-image: url("./img/background.png");
  background-repeat: no-repeat;
  background-size:100% 100%;
}
.contentWrapper {
  position: absolute;
  top: 120px;
  right: 50px;
  padding: 30px 10px 30px 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.header {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #dd5200;
}
.InputWrapper {
  margin: auto;
  margin-top: 20px;
  text-align: center;
}

</style>
