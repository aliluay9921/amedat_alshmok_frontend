<template>
  <div class="login">
    <div class="image"></div>
    <div class="sign-in">
      <h1>تسجيل دخول في نظام شركة اعمدة الشموخ</h1>
      <v-alert v-if="alert" class="text-right" type="error">
        {{ alertText }}</v-alert
      >
      <form @submit.prevent="login">
        <input
          type="text"
          placeholder="ادخل اسم المستخدم"
          v-model="user_name"
          :rule="rules"
        />
        <input
          type="password"
          placeholder="ادخل كلمة المرور"
          v-model="password"
          :rule="rules"
        />
        <input type="submit" value="تسجيل الدخول" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    rules: [(value) => !!value || "هذا الحقل مطلوب."],
    password: "",
    user_name: "",
    alert: false,
    alertText: "",
  }),
  methods: {
    login() {
      if (this.user_name == "" || this.password == "") {
        this.alert = true;
        this.alertText = "يجب ادخال المعلومات";
        // console.log(this.alertText);
        setTimeout(() => {
          this.alert = false;
          this.alertText = "";
        }, 3000);
      }
      this.$store
        .dispatch("login", {
          user_name: this.user_name,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          let token = localStorage.token;
          let user_type = localStorage.user_type;
          if (token == undefined) {
            this.$router.replace("/login");
          } else {
            if (user_type == 0) {
              this.$router.replace("/");
            } else if (user_type == 1) {
              this.$router.replace("/processing");
            }
          }
        })
        .catch((err) => {
          this.alert = true;
          this.alertText = "يرجى ادخال معلومات صالحة للتسجيل";
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          // console.log(err);
        });
    },

    changeRTL() {
      this.$vuetify.rtl = true;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login {
  display: flex;
}
.image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: lighten;
  flex: 1;
}

.sign-in {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input[type="email"],
input[type="password"] {
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-bottom: solid 1px #000;
  outline: none;
}

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

input[type="email"]:hover::placeholder,
input[type="password"]:hover::placeholder {
  color: #000;
}

input[type="submit"] {
  background-color: #000;
  color: #fff;
  padding: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  border-radius: 15px;
}

input[type="submit"]:hover {
  background-color: #eee;
  color: #000;
}

a {
  color: #424242;
  text-decoration: none;
  align-self: flex-end;
}

a:hover {
  text-decoration: underline;
}

::selection {
  color: #fff;
  background-color: #000;
}

@media screen and (max-width: 786px) {
  .image {
    display: none;
  }
}
</style>
