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
      className: 'veiculo',
      config: {},
    };
  },
  mounted () {
    $('#main-for-w2ui-infinite-scroll').w2grid(this.getConfig().grid);
  },
  methods: {
    getConfig: () => {
      let className = process.env.VUE_APP_BASE_API + 'veiculo'
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
          withs: ['users'],
          columns: [
              { field: 'id', text: 'ID', size: '5%' },
              { field: 'placa', text: 'Placa', size: '50%' },
              { field: 'modelo', text: 'Modelo', size: '40%' },
              { field: 'tipo', text: 'Tipo', size: '40%' },
              { field: 'cor', text: 'Cor', size: '40%' },
              { field: 'users.name', text: 'Usuário', size: '40%' },
          ],
          limit: 6,
          multiSearch: true,
          searches: [
            { field: 'id', label: 'ID ', type: 'int' },
            { field: 'placa', label: 'Código da Placa', type: 'text' },
            { field: 'modelo', label: 'Modelo', type: 'text' },
            { field: 'tipo', label: 'Tipo', type: 'text' },
            { field: 'cor', label: 'Cor', type: 'color' },
            { field: 'users.name', label: 'Usuario', type: 'text' },
          ] ,
          onLoad: (event) => {
            let data = event.xhr.responseJSON;
            event.xhr.responseText = { records: data};
          },
          onAdd: function (event) {
            this.openPopup()
            console.log(['abre form de criação', event])
            // window.location.href = className + '/create';
          },
          onEdit: function (event) {
            console.log(['abre form de edição', event])
            let row = this.get(this.getSelection())[0]
            this.openPopup(row)
          },
          openPopup: (event = {}) => {
            console.log(event)
            let url = process.env.VUE_APP_BASE_API + 'veiculo'
            let method = 'POST'
            if (event.id) {
              url += '/' + event.id
              method = 'PUT'
            }
            console.log(event)
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
                { field: 'placa', label: 'Código da Placa', type: 'text', required: true, attr: 'style="with:100%;"', html: { label: 'Código da Placa' } },
                { field: 'modelo', label: 'Modelo', type: 'text', attr: 'style="with:100%;"', html: { label: 'Modelo' } },
                { field: 'tipo', label: 'Tipo', type: 'list', attr: 'style="with:100%;"', html: { label: 'Tipo' }, options: {
                  items: ['carro', 'moto']
                } },
                { field: 'cor', label: 'Cor', type: 'text', attr: 'style="with:100%;"', html: { label: 'Cor' } },
                // { field: 'user_id', label: 'Usuario', type: 'list', html: { label: 'Usuário' }, options: {
                //     openOnFocus: true,
                //     url: process.env.VUE_APP_BASE_API + 'usuario',
                //     onRequest(event) {
                //       event.postData.search = [{ field: 'name', type: 'text', operator: 'contains', value: event.postData.search }]
                //       event.postData.isSelect = ['id', 'name as text']
                //     }
                // } },
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
                  } else {
                    console.log(this)
                    w2popup.close()
                    w2alert(e.message)
                    console.log('aqui ainda')
                    // w2ui.grid.refresh();
                    // let id = w2ui.grid.getSelection()[0]
                    // let registro = w2ui.grid.get(id)
                    // let newVal = {...registro, ...this.record}
                    // w2ui.grid.set(id, newVal, false)
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
              title   : 'Atualizar Veiculo',
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