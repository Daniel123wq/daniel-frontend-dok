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
      className: 'categoria',
      config: {},
    };
  },
  mounted () {
    $('#main-for-w2ui-infinite-scroll').w2grid(this.getConfig().grid);
  },
  methods: {
    getConfig: () => {
      let className = process.env.VUE_APP_BASE_API + 'categoria'
      let config = {
        grid: {
          name: 'grid1',
          url: className,
          autoLoad: true,
          skip: 0,
          show: {
            footer: true,
            toolbar: true,
            lineNumbers: false,
            selectColumn: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: false,
            toolbarEdit: true,
          },
          withs: [],
          columns: [
              { field: 'id', text: 'ID', size: '5%' },
              { field: 'nome', text: 'nome', size: '50%' }
          ],
          limit: 6,
          multiSearch: true,
          searches: [
            { field: 'id', label: 'ID ', type: 'int' },
            { field: 'nome', label: 'Nome da Categoria', type: 'text' }
          ],
          onLoad: (event) => {
            let data = event.xhr.responseJSON;
            event.xhr.responseText = { records: data};
          },
          onAdd: function (event) {
            this.openPopup()
            // window.location.href = className + '/create';
          },
          onEdit: function (event) {
            let row = this.get(this.getSelection())[0]
            this.openPopup(row)
          },
          onDelete: function (event) {
          },
          openPopup: (event = {}) => {
            let url = process.env.VUE_APP_BASE_API + 'categoria'
            let method = 'POST'
            if (event.id) {
              url += '/' + event.id
              method = 'PUT'
            }
            if (w2ui.foo) {
              delete w2ui.foo
              delete w2ui.foo_toolbar
              delete w2ui.foo_tabs
            }
            $().w2form({
              url: url,
              method: method,
              name: 'foo',
              autosize: true,
              style: 'background-color: transparent;z-index:99999',
              fields: [
                { field: 'nome', label: 'Nome', type: 'text', required: true, attr: 'style="with:100%;"', html: { label: 'Nome da Categoria' } },
              ],
              record: event,
              onRequest: function(event) {
                  
              },
              actions: {
                "Reset": function () { this.clear(); },
                "Save": function (event) {
                  let oldValue = this.record
                  let postData = {tipo: null}
                  let obj = this
                  for (const key in obj.fields) {
                      if (Object.hasOwnProperty.call(obj.fields, key)) {
                          const f = obj.fields[key];
                          if (f.type == 'enum') {
                          }
                          if (f.type == 'list') {
                            let el = $(f.el).w2field()
                            postData[f.field] = el.get().id
                          }
                      }
                  }
                  this.record = {...this.record, ...postData}
                  this.validate();
                  this.save((e) => {
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
                    // w2alert(e.message)
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
                      title: 'Salvo com sucesso',
                      text: e.message,
                      iconPack: 'feather',
                      icon: 'icon-alert-circle',
                      color: 'success'
                    })
                    $(".w2ui-icon-reload").click()
                    setTimeout(() => {
                      w2popup.close()
                    }, 5000);
                  }
                  this.record = oldValue
                }) }
              }
            })
            // }
            w2popup.open({
              title   : 'Atualizar Categoria',
              body    : '<div id="form" style="width: 100%; height: 100%;"></div>',
              style   : 'padding: 15px 0px 0px 0px',
              width   : 400,
              height  : 400,
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
                  $('#w2ui-popup #form').w2render('foo');
                }
              }
            })
          },
          onValidate(event) {
          },
        },
      };
      return config;
    },
  },
};
</script>