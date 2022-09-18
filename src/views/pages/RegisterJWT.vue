<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>

  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Registrar um novo usuário</h4>
                  <p>Bem vindo, faça un novo registro.</p>
                </div>

                <div>
                  <vs-input
                    v-validate="'required|min:3'"
                    data-vv-validate-on="blur"
                    label-placeholder="Name"
                    name="displayName"
                    placeholder="Name"
                    v-model="displayName"
                    class="w-full" />
                  <span class="text-danger text-sm">{{ errors.first('displayName') }}</span>

                  <vs-input
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                    name="email"
                    type="email"
                    label-placeholder="Email"
                    placeholder="Email"
                    v-model="email"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                  <vs-input
                    ref="password"
                    type="password"
                    data-vv-validate-on="blur"
                    v-validate="'required|min:6|max:10'"
                    name="password"
                    label-placeholder="Password"
                    placeholder="Password"
                    v-model="password"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                  <vs-input
                    type="password"
                    v-validate="'min:6|max:10|confirmed:password'"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="confirm_password"
                    label-placeholder="Confirm Password"
                    placeholder="Confirm Password"
                    v-model="confirm_password"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>

                  <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">Eu aceito os termos & condições.</vs-checkbox>
                  <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
                  <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Registrar</vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      confirm_password: "",
      isTermsConditionAccepted: true,
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirm_password != "" &&
        this.isTermsConditionAccepted === true
      );
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm) return;
      this.$vs.loading()
      const payload = {
        name: this.displayName,
        email: this.email,
        password: this.password,
      };

      this.$http.post(process.env.VUE_APP_BASE_API + 'register', payload)
        .then(e => {
          this.$vs.loading.close()
          if (e.data.success) {
            console.log(e)
            this.$router.push('/login').catch(() => {})
            this.$vs.notify({
              title: 'Sucesso',
              text: e.data.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success'
            })
          } else {
            let error = ''
            for (const key in e.data.error) {
              if (Object.hasOwnProperty.call(e.data.error, key)) {
                const element = e.data.error[key];
                error += '\n' + element.join()
              }
            }
            
            this.$vs.notify({
              title: 'Falha ao efetuar o registro',
              text: error,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        })
        .catch((e,x) => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Falha ao efetuar o registro',
            text: e.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
  },
};
</script>
