<template>
  <div
    id='main-for-w2ui-infinite-scroll'
    style='width: 100%; height: 40vh'
  ></div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      className: 'usuario',
      config: {},
    };
  },
  mounted () {
    $('#main-for-w2ui-infinite-scroll').w2grid(this.getConfig().grid);
  },
  methods: {
    getConfig: () => {
      let className = process.env.VUE_APP_BASE_API + 'usuario'
      let config = {
        grid: {
          name: 'grid',
          url: className,
          autoLoad: true,
          skip: 0,
          show: {
            footer: true,
            toolbar: true,
            lineNumbers: false,
            selectColumn: true,
            toolbarAdd: false,
            toolbarDelete: true,
            toolbarSave: false,
            toolbarEdit: true,
          },
          columns: [
              { field: 'id', text: 'ID', size: '5%' },
              { field: 'name', text: 'Nome', size: '50%' },
              { field: 'email', text: 'E-Mail', size: '40%' },
          ],
          limit: 6,
          multiSearch: true,
          searches: [
            { field: 'id', label: 'ID ', type: 'int' },
            { field: 'name', label: 'Nome', type: 'text' },
            { field: 'email', label: 'Email', type: 'text' },
          ] ,
          onLoad: (event) => {
            let data = event.xhr.responseJSON;
            event.xhr.responseText = { records: data};
          },
          onAdd: (event) => {
            console.log(['abre form de criação', event])
            // window.location.href = className + '/create';
          },
          onEdit: function (event) {
            console.log(['abre form de edição', event])
            let row = this.get(this.getSelection())[0]
            this.openPopup(row)
          },
          openPopup: (event = null) => {
            let url = process.env.VUE_APP_BASE_API + 'usuario/' + event.id
            console.log(event)
            if (w2ui.foo) {
              delete w2ui.foo
              delete w2ui.foo_toolbar
              delete w2ui.foo_tabs
            }
            $().w2form({
              url: url,
              method: 'PUT',
              name: 'foo',
              style: 'border: 0px; background-color: transparent;z-index:99999',
              fields: [
                { field: 'name', type: 'text', required: true, html: { label: 'Nome' }, attr: 'style="width: 300px"'  },
                { field: 'email', type: 'email', html: { label: 'Email', attr: 'style="width: 200px"' } },
                { field: 'password', type: 'password', html: { label: 'Senha', attr: 'style="width: 200px"' } }
              ],
              record: {
                name  : event ? event.name : null,
                email : event ? event.email : null,
                password : null,
              },
              actions: {
                "Reset": function () { this.clear(); },
                "Save": function (event) { this.validate();this.save((e) => {
                  if (e.status !== true) {
                    if (e.error) {
                      let err = e.error
                      for (const key in err) {
                        if (Object.hasOwnProperty.call(err, key)) {
                          const arrValue = err[key];
                            this.last.errors.push({
                              error: arrValue.join(' - '),
                              field: this.get(key)
                            })                            
                        }
                      }
                      this.showErrors()
                    }
                    window.notify({
                      title: 'Falha ao salvar',
                      text: e.message,
                      iconPack: 'feather',
                      icon: 'icon-alert-circle',
                      color: 'danger'
                    })
                  } else {
                    w2popup.close()
                    window.notify({
                      title: 'Salvo com Sucesso',
                      text: e.message,
                      iconPack: 'feather',
                      icon: 'icon-alert-circle',
                      color: 'success'
                    })
                    $(".w2ui-icon-reload").click()
                    // w2ui.grid.refresh();
                    // let id = w2ui.grid.getSelection()[0]
                    // let registro = w2ui.grid.get(id)
                    // let newVal = {...registro, ...this.record}
                    // w2ui.grid.set(id, newVal, false)
                    setTimeout(() => {
                      w2popup.close()
                    }, 5000);
                  }
                }) }
              }
            })
            // }
            w2popup.open({
              title   : 'Atualizar Usuário',
              body    : '<div id="form" style="width: 100%; height: 100%;"></div>',
              style   : 'padding: 15px 0px 0px 0px',
              width   : 500,
              height  : 280,
              showMax : true,
              onToggle: function (event) {
                $(w2ui.foo.box).hide();
                event.onComplete = function () {
                  $(w2ui.foo.box).show();
                  w2ui.foo.resize();
                }
              },
              onOpen: function (event) {
                event.onComplete = function () {
                  // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                  $('#w2ui-popup #form').w2render('foo');
                }
              }
            })
          },
          onValidate(event) {
            console.log(event)
          },
        },
      };
      return config;
    },
  },
};
</script>

<style scoped>
</style>