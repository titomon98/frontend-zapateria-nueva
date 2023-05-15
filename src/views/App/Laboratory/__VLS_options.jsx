import { xray } from '../../../config/pluginInit';
import DatatableHeading from '../../Tables/DatatableHeading';
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePaginationBootstrap from '../../../components/common/VuetablePaginationBootstrap';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';
import { apiUrl } from '../../../config/constant';

export default (await import('vue')).defineComponent({
name: 'SuppliesLab',
components: {
vuetable: Vuetable,
'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
'datatable-heading': DatatableHeading
},
setup() {
return { $v: useVuelidate() };
},
mounted() {
xray.index();
axios.get(apiUrl + '/tipo_insumo_laboratorio/get').then((response) => {
this.type = response.data;
});
},
data() {
return {
from: 0,
to: 0,
total: 0,
perPage: 5,
search: '',
form: {
type: [],
id: 0,
name: '',
code: '',
totalExistence: '',
state: 1
},
options: [
{ value: '1', nombre: '...' },
{ value: '2', nombre: '...' }
],
columna: { value: '1', nombre: '...' },
type: [],
alertSecs: 5,
alertCountDown: 0,
alertCountDownError: 0,
alertText: '',
alertErrorText: '',
alertVariant: '',
apiBase: apiUrl + '/insumo_laboratorio/list',
fields: [
{
name: '__slot:actions',
title: 'Acciones',
titleClass: '',
dataClass: 'text-muted'
},
{
name: 'name',
sortField: 'name',
title: 'Nombre',
dataClass: 'list-item-heading'
},
{
name: 'code',
sortField: 'code',
title: 'Codigo',
dataClass: 'list-item-heading'
},
{
name: 'existenceTotal',
sortField: 'existenceTotal',
title: 'Existencia Total',
dataClass: 'list-item-heading'
},
{
name: 'type',
sortField: 'type',
title: 'Tipo de Insumo',
dataClass: 'list-item-heading'
},
{
name: '__slot:estado',
title: 'Estado',
titleClass: '',
dataClass: 'text-muted',
width: '25%'
}
]
};
},
validations() {
return {
form: {
name: { required },
code: { required },
totalExistence: { required },
type: { required }
}
};
},
methods: {
openModal(modal, action) {
switch (modal) {
case 'save': {
this.$v.$reset();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
closeModal(action) {
switch (action) {
case 'save': {
this.$v.$reset();
this.$refs['modal-1'].hide();
this.form.id = 0;
this.form.number = '';
this.form.state = 1;
this.form.site = [];
break;
}
case 'update': {
this.$v.$reset();
this.$refs['modal-2'].hide();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
onValidate(action) {
this.$v.$touch();
if (this.$v.$error !== true) {
if (action === 'save') {
this.onSave();
} else if (action === 'update') {
this.onUpdate();
}
} else {
this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos';
this.showAlertError();
}
},
setData(data) {
this.form.name = data.nombre;
this.form.code = data.codigo;
this.for.totalExistence = data.existencia_total;
this.form.id = data.id;
this.form.type = data.tipo_insumo_laboratorios;
},
/* Guardar */
onSave() {
const me = this;
axios.post(apiUrl + '/clinica/create', {
form: me.form
})
.then((response) => {
me.alertVariant = 'success';
me.showAlert();
me.alertText = 'Se ha creado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('save');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = error.response.data.msg;
console.error('Error!', error);
});
},
/* Guardar */
onUpdate() {
const me = this;
// this.$refs["modalSave"].hide();
axios.put(apiUrl + '/insumo_laboratorio/update', {
form: me.form
})
.then((response) => {
me.alertVariant = 'primary';
me.showAlert();
me.alertText = 'Se ha actualizado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('update');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('Error!', error);
});
},
onState() {
let me = this;
if (this.form.state === 1) {
axios
.put(apiUrl + '/insumo_laboratorio/deactivate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'warning';
me.showAlert();
me.alertText = 'Se ha desactivado el isnumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-3'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
} else {
axios
.put(apiUrl + '/insumo_laboratorio/activate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'info';
me.showAlert();
me.alertText = 'Se ha activado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-4'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
}
},
makeQueryParams(sortOrder, currentPage, perPage) {
return sortOrder[0]
? {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
}
: {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
};
},
changePageSizes(perPage) {
this.perPage = perPage;
this.$refs.vuetable.refresh();
},
searchChange(val) {
this.search = val.toLowerCase();
this.$refs.vuetable.refresh();
},
onPaginationData(paginationData) {
this.from = paginationData.from;
this.to = paginationData.to;
this.total = paginationData.total;
this.lastPage = paginationData.last_page;
this.items = paginationData.data;
this.$refs.pagination.setPaginationData(paginationData);
},
onChangePage(page) {
this.$refs.vuetable.changePage(page);
},
showAlert() {
this.alertCountDown = this.alertSecs;
},
showAlertError() {
this.alertCountDownError = this.alertSecs;
},
changeTypeSearch(columna) {
this.columna = columna;
}
}
});
const __VLS_options = {
...({
name: 'SuppliesLab',
components: {
vuetable: Vuetable,
'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
'datatable-heading': DatatableHeading
},
setup() {
return { $v: useVuelidate() };
},
mounted() {
xray.index();
axios.get(apiUrl + '/tipo_insumo_laboratorio/get').then((response) => {
this.type = response.data;
});
},
data() {
return {
from: 0,
to: 0,
total: 0,
perPage: 5,
search: '',
form: {
type: [],
id: 0,
name: '',
code: '',
totalExistence: '',
state: 1
},
options: [
{ value: '1', nombre: '...' },
{ value: '2', nombre: '...' }
],
columna: { value: '1', nombre: '...' },
type: [],
alertSecs: 5,
alertCountDown: 0,
alertCountDownError: 0,
alertText: '',
alertErrorText: '',
alertVariant: '',
apiBase: apiUrl + '/insumo_laboratorio/list',
fields: [
{
name: '__slot:actions',
title: 'Acciones',
titleClass: '',
dataClass: 'text-muted'
},
{
name: 'name',
sortField: 'name',
title: 'Nombre',
dataClass: 'list-item-heading'
},
{
name: 'code',
sortField: 'code',
title: 'Codigo',
dataClass: 'list-item-heading'
},
{
name: 'existenceTotal',
sortField: 'existenceTotal',
title: 'Existencia Total',
dataClass: 'list-item-heading'
},
{
name: 'type',
sortField: 'type',
title: 'Tipo de Insumo',
dataClass: 'list-item-heading'
},
{
name: '__slot:estado',
title: 'Estado',
titleClass: '',
dataClass: 'text-muted',
width: '25%'
}
]
};
},
validations() {
return {
form: {
name: { required },
code: { required },
totalExistence: { required },
type: { required }
}
};
},
methods: {
openModal(modal, action) {
switch (modal) {
case 'save': {
this.$v.$reset();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
closeModal(action) {
switch (action) {
case 'save': {
this.$v.$reset();
this.$refs['modal-1'].hide();
this.form.id = 0;
this.form.number = '';
this.form.state = 1;
this.form.site = [];
break;
}
case 'update': {
this.$v.$reset();
this.$refs['modal-2'].hide();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
onValidate(action) {
this.$v.$touch();
if (this.$v.$error !== true) {
if (action === 'save') {
this.onSave();
} else if (action === 'update') {
this.onUpdate();
}
} else {
this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos';
this.showAlertError();
}
},
setData(data) {
this.form.name = data.nombre;
this.form.code = data.codigo;
this.for.totalExistence = data.existencia_total;
this.form.id = data.id;
this.form.type = data.tipo_insumo_laboratorios;
},
/* Guardar */
onSave() {
const me = this;
axios.post(apiUrl + '/clinica/create', {
form: me.form
})
.then((response) => {
me.alertVariant = 'success';
me.showAlert();
me.alertText = 'Se ha creado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('save');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = error.response.data.msg;
console.error('Error!', error);
});
},
/* Guardar */
onUpdate() {
const me = this;
// this.$refs["modalSave"].hide();
axios.put(apiUrl + '/insumo_laboratorio/update', {
form: me.form
})
.then((response) => {
me.alertVariant = 'primary';
me.showAlert();
me.alertText = 'Se ha actualizado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('update');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('Error!', error);
});
},
onState() {
let me = this;
if (this.form.state === 1) {
axios
.put(apiUrl + '/insumo_laboratorio/deactivate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'warning';
me.showAlert();
me.alertText = 'Se ha desactivado el isnumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-3'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
} else {
axios
.put(apiUrl + '/insumo_laboratorio/activate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'info';
me.showAlert();
me.alertText = 'Se ha activado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-4'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
}
},
makeQueryParams(sortOrder, currentPage, perPage) {
return sortOrder[0]
? {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
}
: {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
};
},
changePageSizes(perPage) {
this.perPage = perPage;
this.$refs.vuetable.refresh();
},
searchChange(val) {
this.search = val.toLowerCase();
this.$refs.vuetable.refresh();
},
onPaginationData(paginationData) {
this.from = paginationData.from;
this.to = paginationData.to;
this.total = paginationData.total;
this.lastPage = paginationData.last_page;
this.items = paginationData.data;
this.$refs.pagination.setPaginationData(paginationData);
},
onChangePage(page) {
this.$refs.vuetable.changePage(page);
},
showAlert() {
this.alertCountDown = this.alertSecs;
},
showAlertError() {
this.alertCountDownError = this.alertSecs;
},
changeTypeSearch(columna) {
this.columna = columna;
}
}
}),
};
const __VLS_name = (await import('./__VLS_types.js')).getNameOption({
name: 'SuppliesLab',
components: {
vuetable: Vuetable,
'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
'datatable-heading': DatatableHeading
},
setup() {
return { $v: useVuelidate() };
},
mounted() {
xray.index();
axios.get(apiUrl + '/tipo_insumo_laboratorio/get').then((response) => {
this.type = response.data;
});
},
data() {
return {
from: 0,
to: 0,
total: 0,
perPage: 5,
search: '',
form: {
type: [],
id: 0,
name: '',
code: '',
totalExistence: '',
state: 1
},
options: [
{ value: '1', nombre: '...' },
{ value: '2', nombre: '...' }
],
columna: { value: '1', nombre: '...' },
type: [],
alertSecs: 5,
alertCountDown: 0,
alertCountDownError: 0,
alertText: '',
alertErrorText: '',
alertVariant: '',
apiBase: apiUrl + '/insumo_laboratorio/list',
fields: [
{
name: '__slot:actions',
title: 'Acciones',
titleClass: '',
dataClass: 'text-muted'
},
{
name: 'name',
sortField: 'name',
title: 'Nombre',
dataClass: 'list-item-heading'
},
{
name: 'code',
sortField: 'code',
title: 'Codigo',
dataClass: 'list-item-heading'
},
{
name: 'existenceTotal',
sortField: 'existenceTotal',
title: 'Existencia Total',
dataClass: 'list-item-heading'
},
{
name: 'type',
sortField: 'type',
title: 'Tipo de Insumo',
dataClass: 'list-item-heading'
},
{
name: '__slot:estado',
title: 'Estado',
titleClass: '',
dataClass: 'text-muted',
width: '25%'
}
]
};
},
validations() {
return {
form: {
name: { required },
code: { required },
totalExistence: { required },
type: { required }
}
};
},
methods: {
openModal(modal, action) {
switch (modal) {
case 'save': {
this.$v.$reset();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
closeModal(action) {
switch (action) {
case 'save': {
this.$v.$reset();
this.$refs['modal-1'].hide();
this.form.id = 0;
this.form.number = '';
this.form.state = 1;
this.form.site = [];
break;
}
case 'update': {
this.$v.$reset();
this.$refs['modal-2'].hide();
this.form.id = 0;
this.form.name = '';
this.form.code = '';
this.form.totalExistence = '';
this.form.type = [];
this.form.state = 1;
break;
}
}
},
onValidate(action) {
this.$v.$touch();
if (this.$v.$error !== true) {
if (action === 'save') {
this.onSave();
} else if (action === 'update') {
this.onUpdate();
}
} else {
this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos';
this.showAlertError();
}
},
setData(data) {
this.form.name = data.nombre;
this.form.code = data.codigo;
this.for.totalExistence = data.existencia_total;
this.form.id = data.id;
this.form.type = data.tipo_insumo_laboratorios;
},
/* Guardar */
onSave() {
const me = this;
axios.post(apiUrl + '/clinica/create', {
form: me.form
})
.then((response) => {
me.alertVariant = 'success';
me.showAlert();
me.alertText = 'Se ha creado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('save');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = error.response.data.msg;
console.error('Error!', error);
});
},
/* Guardar */
onUpdate() {
const me = this;
// this.$refs["modalSave"].hide();
axios.put(apiUrl + '/insumo_laboratorio/update', {
form: me.form
})
.then((response) => {
me.alertVariant = 'primary';
me.showAlert();
me.alertText = 'Se ha actualizado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.closeModal('update');
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('Error!', error);
});
},
onState() {
let me = this;
if (this.form.state === 1) {
axios
.put(apiUrl + '/insumo_laboratorio/deactivate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'warning';
me.showAlert();
me.alertText = 'Se ha desactivado el isnumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-3'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
} else {
axios
.put(apiUrl + '/insumo_laboratorio/activate', {
id: this.form.id
})
.then((response) => {
me.alertVariant = 'info';
me.showAlert();
me.alertText = 'Se ha activado el insumo ' + me.form.name + ' exitosamente';
me.$refs.vuetable.refresh();
me.$refs['modal-4'].hide();
})
.catch((error) => {
me.alertVariant = 'danger';
me.showAlertError();
me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde';
console.error('There was an error!', error);
});
}
},
makeQueryParams(sortOrder, currentPage, perPage) {
return sortOrder[0]
? {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
}
: {
criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
order: sortOrder[0] ? sortOrder[0].direction : 'desc',
page: currentPage,
limit: this.perPage,
search: this.search,
columna: this.columna.value
};
},
changePageSizes(perPage) {
this.perPage = perPage;
this.$refs.vuetable.refresh();
},
searchChange(val) {
this.search = val.toLowerCase();
this.$refs.vuetable.refresh();
},
onPaginationData(paginationData) {
this.from = paginationData.from;
this.to = paginationData.to;
this.total = paginationData.total;
this.lastPage = paginationData.last_page;
this.items = paginationData.data;
this.$refs.pagination.setPaginationData(paginationData);
},
onChangePage(page) {
this.$refs.vuetable.changePage(page);
},
showAlert() {
this.alertCountDown = this.alertSecs;
},
showAlertError() {
this.alertCountDownError = this.alertSecs;
},
changeTypeSearch(columna) {
this.columna = columna;
}
}
} as const);
function __VLS_template() {
import * as __VLS_types from './__VLS_types.js'; import('./__VLS_types.js');
let __VLS_ctx!: __VLS_types.PickNotAny<__VLS_Ctx, {}> & InstanceType<__VLS_types.PickNotAny<typeof __VLS_component, new () => {}>> & {};
let __VLS_vmUnwrap!: typeof __VLS_options & { components: {}; };
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_component extends { components: infer C; } ? C : {}> & __VLS_types.GlobalComponents & typeof __VLS_vmUnwrap.components & __VLS_types.PickComponents<typeof __VLS_ctx>;
let __VLS_selfComponent!: __VLS_types.SelfComponent<typeof __VLS_name, typeof __VLS_component & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_selfComponent, keyof typeof __VLS_otherComponents>;
__VLS_components['/* __VLS_.SearchTexts.Components */'];
({} as __VLS_types.GlobalAttrs)['/* __VLS_.SearchTexts.GlobalAttrs */'];
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
declare const BContainer: __VLS_types.ConvertInvalidJsxElement<
'b-container' extends keyof typeof __VLS_components ? typeof __VLS_components['b-container'] : 'bContainer' extends keyof typeof __VLS_components ? typeof __VLS_components['bContainer'] : 'BContainer' extends keyof typeof __VLS_components ? typeof __VLS_components['BContainer'] : 'b-container' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-container'] : 'bContainer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bContainer'] : 'BContainer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BContainer'] : unknown>;
__VLS_components['b-container']; __VLS_components.bContainer; __VLS_components.BContainer;
__VLS_components['b-container']; __VLS_components.bContainer; __VLS_components.BContainer;
__VLS_ctx['b-container']; __VLS_ctx.bContainer; __VLS_ctx.BContainer;
__VLS_ctx['b-container']; __VLS_ctx.bContainer; __VLS_ctx.BContainer;
declare const __VLS_0: __VLS_types.ExtractEmit2<typeof BContainer>;
/* Completion: Emits */
// @ts-ignore
__VLS_0('/* __VLS_.SearchTexts.Completion.Emit.b-container */');
// @ts-ignore
__VLS_0('/* __VLS_.SearchTexts.Completion.Emit.bContainer */');
// @ts-ignore
__VLS_0('/* __VLS_.SearchTexts.Completion.Emit.BContainer */');
/* Completion: Props */
// @ts-ignore
(<BContainer /* __VLS_.SearchTexts.Completion.Props.b-container */ />);
// @ts-ignore
(<BContainer /* __VLS_.SearchTexts.Completion.Props.bContainer */ />);
// @ts-ignore
(<BContainer /* __VLS_.SearchTexts.Completion.Props.BContainer */ />);
declare const BAlert: __VLS_types.ConvertInvalidJsxElement<
'b-alert' extends keyof typeof __VLS_components ? typeof __VLS_components['b-alert'] : 'bAlert' extends keyof typeof __VLS_components ? typeof __VLS_components['bAlert'] : 'BAlert' extends keyof typeof __VLS_components ? typeof __VLS_components['BAlert'] : 'b-alert' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-alert'] : 'bAlert' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bAlert'] : 'BAlert' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BAlert'] : unknown>;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_components['b-alert']; __VLS_components.bAlert; __VLS_components.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
__VLS_ctx['b-alert']; __VLS_ctx.bAlert; __VLS_ctx.BAlert;
declare const __VLS_1: __VLS_types.ExtractEmit2<typeof BAlert>;
/* Completion: Emits */
// @ts-ignore
__VLS_1('/* __VLS_.SearchTexts.Completion.Emit.b-alert */');
// @ts-ignore
__VLS_1('/* __VLS_.SearchTexts.Completion.Emit.bAlert */');
// @ts-ignore
__VLS_1('/* __VLS_.SearchTexts.Completion.Emit.BAlert */');
/* Completion: Props */
// @ts-ignore
(<BAlert /* __VLS_.SearchTexts.Completion.Props.b-alert */ />);
// @ts-ignore
(<BAlert /* __VLS_.SearchTexts.Completion.Props.bAlert */ />);
// @ts-ignore
(<BAlert /* __VLS_.SearchTexts.Completion.Props.BAlert */ />);
declare const BModal: __VLS_types.ConvertInvalidJsxElement<
'b-modal' extends keyof typeof __VLS_components ? typeof __VLS_components['b-modal'] : 'bModal' extends keyof typeof __VLS_components ? typeof __VLS_components['bModal'] : 'BModal' extends keyof typeof __VLS_components ? typeof __VLS_components['BModal'] : 'b-modal' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-modal'] : 'bModal' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bModal'] : 'BModal' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BModal'] : unknown>;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_components['b-modal']; __VLS_components.bModal; __VLS_components.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
__VLS_ctx['b-modal']; __VLS_ctx.bModal; __VLS_ctx.BModal;
declare const __VLS_2: __VLS_types.ExtractEmit2<typeof BModal>;
/* Completion: Emits */
// @ts-ignore
__VLS_2('/* __VLS_.SearchTexts.Completion.Emit.b-modal */');
// @ts-ignore
__VLS_2('/* __VLS_.SearchTexts.Completion.Emit.bModal */');
// @ts-ignore
__VLS_2('/* __VLS_.SearchTexts.Completion.Emit.BModal */');
/* Completion: Props */
// @ts-ignore
(<BModal /* __VLS_.SearchTexts.Completion.Props.b-modal */ />);
// @ts-ignore
(<BModal /* __VLS_.SearchTexts.Completion.Props.bModal */ />);
// @ts-ignore
(<BModal /* __VLS_.SearchTexts.Completion.Props.BModal */ />);
declare const BForm: __VLS_types.ConvertInvalidJsxElement<
'b-form' extends keyof typeof __VLS_components ? typeof __VLS_components['b-form'] : 'bForm' extends keyof typeof __VLS_components ? typeof __VLS_components['bForm'] : 'BForm' extends keyof typeof __VLS_components ? typeof __VLS_components['BForm'] : 'b-form' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-form'] : 'bForm' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bForm'] : 'BForm' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BForm'] : unknown>;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_components['b-form']; __VLS_components.bForm; __VLS_components.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
__VLS_ctx['b-form']; __VLS_ctx.bForm; __VLS_ctx.BForm;
declare const __VLS_3: __VLS_types.ExtractEmit2<typeof BForm>;
/* Completion: Emits */
// @ts-ignore
__VLS_3('/* __VLS_.SearchTexts.Completion.Emit.b-form */');
// @ts-ignore
__VLS_3('/* __VLS_.SearchTexts.Completion.Emit.bForm */');
// @ts-ignore
__VLS_3('/* __VLS_.SearchTexts.Completion.Emit.BForm */');
/* Completion: Props */
// @ts-ignore
(<BForm /* __VLS_.SearchTexts.Completion.Props.b-form */ />);
// @ts-ignore
(<BForm /* __VLS_.SearchTexts.Completion.Props.bForm */ />);
// @ts-ignore
(<BForm /* __VLS_.SearchTexts.Completion.Props.BForm */ />);
declare const BFormGroup: __VLS_types.ConvertInvalidJsxElement<
'b-form-group' extends keyof typeof __VLS_components ? typeof __VLS_components['b-form-group'] : 'bFormGroup' extends keyof typeof __VLS_components ? typeof __VLS_components['bFormGroup'] : 'BFormGroup' extends keyof typeof __VLS_components ? typeof __VLS_components['BFormGroup'] : 'b-form-group' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-form-group'] : 'bFormGroup' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bFormGroup'] : 'BFormGroup' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BFormGroup'] : unknown>;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_components['b-form-group']; __VLS_components.bFormGroup; __VLS_components.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
__VLS_ctx['b-form-group']; __VLS_ctx.bFormGroup; __VLS_ctx.BFormGroup;
declare const __VLS_4: __VLS_types.ExtractEmit2<typeof BFormGroup>;
/* Completion: Emits */
// @ts-ignore
__VLS_4('/* __VLS_.SearchTexts.Completion.Emit.b-form-group */');
// @ts-ignore
__VLS_4('/* __VLS_.SearchTexts.Completion.Emit.bFormGroup */');
// @ts-ignore
__VLS_4('/* __VLS_.SearchTexts.Completion.Emit.BFormGroup */');
/* Completion: Props */
// @ts-ignore
(<BFormGroup /* __VLS_.SearchTexts.Completion.Props.b-form-group */ />);
// @ts-ignore
(<BFormGroup /* __VLS_.SearchTexts.Completion.Props.bFormGroup */ />);
// @ts-ignore
(<BFormGroup /* __VLS_.SearchTexts.Completion.Props.BFormGroup */ />);
declare const VSelect: __VLS_types.ConvertInvalidJsxElement<
'v-select' extends keyof typeof __VLS_components ? typeof __VLS_components['v-select'] : 'vSelect' extends keyof typeof __VLS_components ? typeof __VLS_components['vSelect'] : 'VSelect' extends keyof typeof __VLS_components ? typeof __VLS_components['VSelect'] : 'v-select' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['v-select'] : 'vSelect' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['vSelect'] : 'VSelect' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['VSelect'] : unknown>;
__VLS_components['v-select']; __VLS_components.vSelect; __VLS_components.VSelect;
__VLS_components['v-select']; __VLS_components.vSelect; __VLS_components.VSelect;
__VLS_ctx['v-select']; __VLS_ctx.vSelect; __VLS_ctx.VSelect;
__VLS_ctx['v-select']; __VLS_ctx.vSelect; __VLS_ctx.VSelect;
declare const __VLS_5: __VLS_types.ExtractEmit2<typeof VSelect>;
/* Completion: Emits */
// @ts-ignore
__VLS_5('/* __VLS_.SearchTexts.Completion.Emit.v-select */');
// @ts-ignore
__VLS_5('/* __VLS_.SearchTexts.Completion.Emit.vSelect */');
// @ts-ignore
__VLS_5('/* __VLS_.SearchTexts.Completion.Emit.VSelect */');
/* Completion: Props */
// @ts-ignore
(<VSelect /* __VLS_.SearchTexts.Completion.Props.v-select */ />);
// @ts-ignore
(<VSelect /* __VLS_.SearchTexts.Completion.Props.vSelect */ />);
// @ts-ignore
(<VSelect /* __VLS_.SearchTexts.Completion.Props.VSelect */ />);
declare const BFormInput: __VLS_types.ConvertInvalidJsxElement<
'b-form-input' extends keyof typeof __VLS_components ? typeof __VLS_components['b-form-input'] : 'bFormInput' extends keyof typeof __VLS_components ? typeof __VLS_components['bFormInput'] : 'BFormInput' extends keyof typeof __VLS_components ? typeof __VLS_components['BFormInput'] : 'b-form-input' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-form-input'] : 'bFormInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bFormInput'] : 'BFormInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BFormInput'] : unknown>;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_components['b-form-input']; __VLS_components.bFormInput; __VLS_components.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
__VLS_ctx['b-form-input']; __VLS_ctx.bFormInput; __VLS_ctx.BFormInput;
declare const __VLS_6: __VLS_types.ExtractEmit2<typeof BFormInput>;
/* Completion: Emits */
// @ts-ignore
__VLS_6('/* __VLS_.SearchTexts.Completion.Emit.b-form-input */');
// @ts-ignore
__VLS_6('/* __VLS_.SearchTexts.Completion.Emit.bFormInput */');
// @ts-ignore
__VLS_6('/* __VLS_.SearchTexts.Completion.Emit.BFormInput */');
/* Completion: Props */
// @ts-ignore
(<BFormInput /* __VLS_.SearchTexts.Completion.Props.b-form-input */ />);
// @ts-ignore
(<BFormInput /* __VLS_.SearchTexts.Completion.Props.bFormInput */ />);
// @ts-ignore
(<BFormInput /* __VLS_.SearchTexts.Completion.Props.BFormInput */ />);
declare const BButton: __VLS_types.ConvertInvalidJsxElement<
'b-button' extends keyof typeof __VLS_components ? typeof __VLS_components['b-button'] : 'bButton' extends keyof typeof __VLS_components ? typeof __VLS_components['bButton'] : 'BButton' extends keyof typeof __VLS_components ? typeof __VLS_components['BButton'] : 'b-button' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-button'] : 'bButton' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bButton'] : 'BButton' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BButton'] : unknown>;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_components['b-button']; __VLS_components.bButton; __VLS_components.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
__VLS_ctx['b-button']; __VLS_ctx.bButton; __VLS_ctx.BButton;
declare const __VLS_7: __VLS_types.ExtractEmit2<typeof BButton>;
/* Completion: Emits */
// @ts-ignore
__VLS_7('/* __VLS_.SearchTexts.Completion.Emit.b-button */');
// @ts-ignore
__VLS_7('/* __VLS_.SearchTexts.Completion.Emit.bButton */');
// @ts-ignore
__VLS_7('/* __VLS_.SearchTexts.Completion.Emit.BButton */');
/* Completion: Props */
// @ts-ignore
(<BButton /* __VLS_.SearchTexts.Completion.Props.b-button */ />);
// @ts-ignore
(<BButton /* __VLS_.SearchTexts.Completion.Props.bButton */ />);
// @ts-ignore
(<BButton /* __VLS_.SearchTexts.Completion.Props.BButton */ />);
declare const BRow: __VLS_types.ConvertInvalidJsxElement<
'b-row' extends keyof typeof __VLS_components ? typeof __VLS_components['b-row'] : 'bRow' extends keyof typeof __VLS_components ? typeof __VLS_components['bRow'] : 'BRow' extends keyof typeof __VLS_components ? typeof __VLS_components['BRow'] : 'b-row' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-row'] : 'bRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bRow'] : 'BRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BRow'] : unknown>;
__VLS_components['b-row']; __VLS_components.bRow; __VLS_components.BRow;
__VLS_components['b-row']; __VLS_components.bRow; __VLS_components.BRow;
__VLS_ctx['b-row']; __VLS_ctx.bRow; __VLS_ctx.BRow;
__VLS_ctx['b-row']; __VLS_ctx.bRow; __VLS_ctx.BRow;
declare const __VLS_8: __VLS_types.ExtractEmit2<typeof BRow>;
/* Completion: Emits */
// @ts-ignore
__VLS_8('/* __VLS_.SearchTexts.Completion.Emit.b-row */');
// @ts-ignore
__VLS_8('/* __VLS_.SearchTexts.Completion.Emit.bRow */');
// @ts-ignore
__VLS_8('/* __VLS_.SearchTexts.Completion.Emit.BRow */');
/* Completion: Props */
// @ts-ignore
(<BRow /* __VLS_.SearchTexts.Completion.Props.b-row */ />);
// @ts-ignore
(<BRow /* __VLS_.SearchTexts.Completion.Props.bRow */ />);
// @ts-ignore
(<BRow /* __VLS_.SearchTexts.Completion.Props.BRow */ />);
declare const BCol: __VLS_types.ConvertInvalidJsxElement<
'b-col' extends keyof typeof __VLS_components ? typeof __VLS_components['b-col'] : 'bCol' extends keyof typeof __VLS_components ? typeof __VLS_components['bCol'] : 'BCol' extends keyof typeof __VLS_components ? typeof __VLS_components['BCol'] : 'b-col' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-col'] : 'bCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bCol'] : 'BCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BCol'] : unknown>;
__VLS_components['b-col']; __VLS_components.bCol; __VLS_components.BCol;
__VLS_components['b-col']; __VLS_components.bCol; __VLS_components.BCol;
__VLS_ctx['b-col']; __VLS_ctx.bCol; __VLS_ctx.BCol;
__VLS_ctx['b-col']; __VLS_ctx.bCol; __VLS_ctx.BCol;
declare const __VLS_9: __VLS_types.ExtractEmit2<typeof BCol>;
/* Completion: Emits */
// @ts-ignore
__VLS_9('/* __VLS_.SearchTexts.Completion.Emit.b-col */');
// @ts-ignore
__VLS_9('/* __VLS_.SearchTexts.Completion.Emit.bCol */');
// @ts-ignore
__VLS_9('/* __VLS_.SearchTexts.Completion.Emit.BCol */');
/* Completion: Props */
// @ts-ignore
(<BCol /* __VLS_.SearchTexts.Completion.Props.b-col */ />);
// @ts-ignore
(<BCol /* __VLS_.SearchTexts.Completion.Props.bCol */ />);
// @ts-ignore
(<BCol /* __VLS_.SearchTexts.Completion.Props.BCol */ />);
declare const IqCard: __VLS_types.ConvertInvalidJsxElement<
'iq-card' extends keyof typeof __VLS_components ? typeof __VLS_components['iq-card'] : 'iqCard' extends keyof typeof __VLS_components ? typeof __VLS_components['iqCard'] : 'IqCard' extends keyof typeof __VLS_components ? typeof __VLS_components['IqCard'] : 'iq-card' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['iq-card'] : 'iqCard' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['iqCard'] : 'IqCard' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['IqCard'] : unknown>;
__VLS_components['iq-card']; __VLS_components.iqCard; __VLS_components.IqCard;
__VLS_components['iq-card']; __VLS_components.iqCard; __VLS_components.IqCard;
__VLS_ctx['iq-card']; __VLS_ctx.iqCard; __VLS_ctx.IqCard;
__VLS_ctx['iq-card']; __VLS_ctx.iqCard; __VLS_ctx.IqCard;
declare const __VLS_10: __VLS_types.ExtractEmit2<typeof IqCard>;
/* Completion: Emits */
// @ts-ignore
__VLS_10('/* __VLS_.SearchTexts.Completion.Emit.iq-card */');
// @ts-ignore
__VLS_10('/* __VLS_.SearchTexts.Completion.Emit.iqCard */');
// @ts-ignore
__VLS_10('/* __VLS_.SearchTexts.Completion.Emit.IqCard */');
/* Completion: Props */
// @ts-ignore
(<IqCard /* __VLS_.SearchTexts.Completion.Props.iq-card */ />);
// @ts-ignore
(<IqCard /* __VLS_.SearchTexts.Completion.Props.iqCard */ />);
// @ts-ignore
(<IqCard /* __VLS_.SearchTexts.Completion.Props.IqCard */ />);
declare const BInput: __VLS_types.ConvertInvalidJsxElement<
'b-input' extends keyof typeof __VLS_components ? typeof __VLS_components['b-input'] : 'bInput' extends keyof typeof __VLS_components ? typeof __VLS_components['bInput'] : 'BInput' extends keyof typeof __VLS_components ? typeof __VLS_components['BInput'] : 'b-input' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-input'] : 'bInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bInput'] : 'BInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BInput'] : unknown>;
__VLS_components['b-input']; __VLS_components.bInput; __VLS_components.BInput;
__VLS_ctx['b-input']; __VLS_ctx.bInput; __VLS_ctx.BInput;
declare const __VLS_11: __VLS_types.ExtractEmit2<typeof BInput>;
/* Completion: Emits */
// @ts-ignore
__VLS_11('/* __VLS_.SearchTexts.Completion.Emit.b-input */');
// @ts-ignore
__VLS_11('/* __VLS_.SearchTexts.Completion.Emit.bInput */');
// @ts-ignore
__VLS_11('/* __VLS_.SearchTexts.Completion.Emit.BInput */');
/* Completion: Props */
// @ts-ignore
(<BInput /* __VLS_.SearchTexts.Completion.Props.b-input */ />);
// @ts-ignore
(<BInput /* __VLS_.SearchTexts.Completion.Props.bInput */ />);
// @ts-ignore
(<BInput /* __VLS_.SearchTexts.Completion.Props.BInput */ />);
declare const BDropdown: __VLS_types.ConvertInvalidJsxElement<
'b-dropdown' extends keyof typeof __VLS_components ? typeof __VLS_components['b-dropdown'] : 'bDropdown' extends keyof typeof __VLS_components ? typeof __VLS_components['bDropdown'] : 'BDropdown' extends keyof typeof __VLS_components ? typeof __VLS_components['BDropdown'] : 'b-dropdown' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-dropdown'] : 'bDropdown' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bDropdown'] : 'BDropdown' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BDropdown'] : unknown>;
__VLS_components['b-dropdown']; __VLS_components.bDropdown; __VLS_components.BDropdown;
__VLS_components['b-dropdown']; __VLS_components.bDropdown; __VLS_components.BDropdown;
__VLS_ctx['b-dropdown']; __VLS_ctx.bDropdown; __VLS_ctx.BDropdown;
__VLS_ctx['b-dropdown']; __VLS_ctx.bDropdown; __VLS_ctx.BDropdown;
declare const __VLS_12: __VLS_types.ExtractEmit2<typeof BDropdown>;
/* Completion: Emits */
// @ts-ignore
__VLS_12('/* __VLS_.SearchTexts.Completion.Emit.b-dropdown */');
// @ts-ignore
__VLS_12('/* __VLS_.SearchTexts.Completion.Emit.bDropdown */');
// @ts-ignore
__VLS_12('/* __VLS_.SearchTexts.Completion.Emit.BDropdown */');
/* Completion: Props */
// @ts-ignore
(<BDropdown /* __VLS_.SearchTexts.Completion.Props.b-dropdown */ />);
// @ts-ignore
(<BDropdown /* __VLS_.SearchTexts.Completion.Props.bDropdown */ />);
// @ts-ignore
(<BDropdown /* __VLS_.SearchTexts.Completion.Props.BDropdown */ />);
declare const BDropdownItem: __VLS_types.ConvertInvalidJsxElement<
'b-dropdown-item' extends keyof typeof __VLS_components ? typeof __VLS_components['b-dropdown-item'] : 'bDropdownItem' extends keyof typeof __VLS_components ? typeof __VLS_components['bDropdownItem'] : 'BDropdownItem' extends keyof typeof __VLS_components ? typeof __VLS_components['BDropdownItem'] : 'b-dropdown-item' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-dropdown-item'] : 'bDropdownItem' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bDropdownItem'] : 'BDropdownItem' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BDropdownItem'] : unknown>;
__VLS_components['b-dropdown-item']; __VLS_components.bDropdownItem; __VLS_components.BDropdownItem;
__VLS_components['b-dropdown-item']; __VLS_components.bDropdownItem; __VLS_components.BDropdownItem;
__VLS_ctx['b-dropdown-item']; __VLS_ctx.bDropdownItem; __VLS_ctx.BDropdownItem;
__VLS_ctx['b-dropdown-item']; __VLS_ctx.bDropdownItem; __VLS_ctx.BDropdownItem;
declare const __VLS_13: __VLS_types.ExtractEmit2<typeof BDropdownItem>;
/* Completion: Emits */
// @ts-ignore
__VLS_13('/* __VLS_.SearchTexts.Completion.Emit.b-dropdown-item */');
// @ts-ignore
__VLS_13('/* __VLS_.SearchTexts.Completion.Emit.bDropdownItem */');
// @ts-ignore
__VLS_13('/* __VLS_.SearchTexts.Completion.Emit.BDropdownItem */');
/* Completion: Props */
// @ts-ignore
(<BDropdownItem /* __VLS_.SearchTexts.Completion.Props.b-dropdown-item */ />);
// @ts-ignore
(<BDropdownItem /* __VLS_.SearchTexts.Completion.Props.bDropdownItem */ />);
// @ts-ignore
(<BDropdownItem /* __VLS_.SearchTexts.Completion.Props.BDropdownItem */ />);
declare const DatatableHeading: __VLS_types.ConvertInvalidJsxElement<
'datatable-heading' extends keyof typeof __VLS_components ? typeof __VLS_components['datatable-heading'] : 'datatableHeading' extends keyof typeof __VLS_components ? typeof __VLS_components['datatableHeading'] : 'DatatableHeading' extends keyof typeof __VLS_components ? typeof __VLS_components['DatatableHeading'] : 'datatable-heading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['datatable-heading'] : 'datatableHeading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['datatableHeading'] : 'DatatableHeading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['DatatableHeading'] : unknown>;
__VLS_components['datatable-heading']; __VLS_components.datatableHeading; __VLS_components.DatatableHeading;
__VLS_components['datatable-heading']; __VLS_components.datatableHeading; __VLS_components.DatatableHeading;
__VLS_ctx['datatable-heading']; __VLS_ctx.datatableHeading; __VLS_ctx.DatatableHeading;
__VLS_ctx['datatable-heading']; __VLS_ctx.datatableHeading; __VLS_ctx.DatatableHeading;
declare const __VLS_14: __VLS_types.ExtractEmit2<typeof DatatableHeading>;
/* Completion: Emits */
// @ts-ignore
__VLS_14('/* __VLS_.SearchTexts.Completion.Emit.datatable-heading */');
// @ts-ignore
__VLS_14('/* __VLS_.SearchTexts.Completion.Emit.datatableHeading */');
// @ts-ignore
__VLS_14('/* __VLS_.SearchTexts.Completion.Emit.DatatableHeading */');
/* Completion: Props */
// @ts-ignore
(<DatatableHeading /* __VLS_.SearchTexts.Completion.Props.datatable-heading */ />);
// @ts-ignore
(<DatatableHeading /* __VLS_.SearchTexts.Completion.Props.datatableHeading */ />);
// @ts-ignore
(<DatatableHeading /* __VLS_.SearchTexts.Completion.Props.DatatableHeading */ />);
declare const Vuetable: __VLS_types.ConvertInvalidJsxElement<
'vuetable' extends keyof typeof __VLS_components ? typeof __VLS_components['vuetable'] : 'Vuetable' extends keyof typeof __VLS_components ? typeof __VLS_components['Vuetable'] : 'vuetable' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['vuetable'] : 'Vuetable' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['Vuetable'] : unknown>;
__VLS_components.vuetable; __VLS_components.Vuetable;
__VLS_components.vuetable; __VLS_components.Vuetable;
__VLS_ctx.vuetable; __VLS_ctx.Vuetable;
__VLS_ctx.vuetable; __VLS_ctx.Vuetable;
declare const __VLS_15: __VLS_types.ExtractEmit2<typeof Vuetable>;
/* Completion: Emits */
// @ts-ignore
__VLS_15('/* __VLS_.SearchTexts.Completion.Emit.vuetable */');
// @ts-ignore
__VLS_15('/* __VLS_.SearchTexts.Completion.Emit.Vuetable */');
/* Completion: Props */
// @ts-ignore
(<Vuetable /* __VLS_.SearchTexts.Completion.Props.vuetable */ />);
// @ts-ignore
(<Vuetable /* __VLS_.SearchTexts.Completion.Props.Vuetable */ />);
declare const BBadge: __VLS_types.ConvertInvalidJsxElement<
'b-badge' extends keyof typeof __VLS_components ? typeof __VLS_components['b-badge'] : 'bBadge' extends keyof typeof __VLS_components ? typeof __VLS_components['bBadge'] : 'BBadge' extends keyof typeof __VLS_components ? typeof __VLS_components['BBadge'] : 'b-badge' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-badge'] : 'bBadge' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bBadge'] : 'BBadge' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BBadge'] : unknown>;
__VLS_components['b-badge']; __VLS_components.bBadge; __VLS_components.BBadge;
__VLS_components['b-badge']; __VLS_components.bBadge; __VLS_components.BBadge;
__VLS_components['b-badge']; __VLS_components.bBadge; __VLS_components.BBadge;
__VLS_components['b-badge']; __VLS_components.bBadge; __VLS_components.BBadge;
__VLS_ctx['b-badge']; __VLS_ctx.bBadge; __VLS_ctx.BBadge;
__VLS_ctx['b-badge']; __VLS_ctx.bBadge; __VLS_ctx.BBadge;
__VLS_ctx['b-badge']; __VLS_ctx.bBadge; __VLS_ctx.BBadge;
__VLS_ctx['b-badge']; __VLS_ctx.bBadge; __VLS_ctx.BBadge;
declare const __VLS_16: __VLS_types.ExtractEmit2<typeof BBadge>;
/* Completion: Emits */
// @ts-ignore
__VLS_16('/* __VLS_.SearchTexts.Completion.Emit.b-badge */');
// @ts-ignore
__VLS_16('/* __VLS_.SearchTexts.Completion.Emit.bBadge */');
// @ts-ignore
__VLS_16('/* __VLS_.SearchTexts.Completion.Emit.BBadge */');
/* Completion: Props */
// @ts-ignore
(<BBadge /* __VLS_.SearchTexts.Completion.Props.b-badge */ />);
// @ts-ignore
(<BBadge /* __VLS_.SearchTexts.Completion.Props.bBadge */ />);
// @ts-ignore
(<BBadge /* __VLS_.SearchTexts.Completion.Props.BBadge */ />);
declare const BButtonGroup: __VLS_types.ConvertInvalidJsxElement<
'b-button-group' extends keyof typeof __VLS_components ? typeof __VLS_components['b-button-group'] : 'bButtonGroup' extends keyof typeof __VLS_components ? typeof __VLS_components['bButtonGroup'] : 'BButtonGroup' extends keyof typeof __VLS_components ? typeof __VLS_components['BButtonGroup'] : 'b-button-group' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['b-button-group'] : 'bButtonGroup' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['bButtonGroup'] : 'BButtonGroup' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['BButtonGroup'] : unknown>;
__VLS_components['b-button-group']; __VLS_components.bButtonGroup; __VLS_components.BButtonGroup;
__VLS_components['b-button-group']; __VLS_components.bButtonGroup; __VLS_components.BButtonGroup;
__VLS_ctx['b-button-group']; __VLS_ctx.bButtonGroup; __VLS_ctx.BButtonGroup;
__VLS_ctx['b-button-group']; __VLS_ctx.bButtonGroup; __VLS_ctx.BButtonGroup;
declare const __VLS_17: __VLS_types.ExtractEmit2<typeof BButtonGroup>;
/* Completion: Emits */
// @ts-ignore
__VLS_17('/* __VLS_.SearchTexts.Completion.Emit.b-button-group */');
// @ts-ignore
__VLS_17('/* __VLS_.SearchTexts.Completion.Emit.bButtonGroup */');
// @ts-ignore
__VLS_17('/* __VLS_.SearchTexts.Completion.Emit.BButtonGroup */');
/* Completion: Props */
// @ts-ignore
(<BButtonGroup /* __VLS_.SearchTexts.Completion.Props.b-button-group */ />);
// @ts-ignore
(<BButtonGroup /* __VLS_.SearchTexts.Completion.Props.bButtonGroup */ />);
// @ts-ignore
(<BButtonGroup /* __VLS_.SearchTexts.Completion.Props.BButtonGroup */ />);
declare const VuetablePaginationBootstrap: __VLS_types.ConvertInvalidJsxElement<
'vuetable-pagination-bootstrap' extends keyof typeof __VLS_components ? typeof __VLS_components['vuetable-pagination-bootstrap'] : 'vuetablePaginationBootstrap' extends keyof typeof __VLS_components ? typeof __VLS_components['vuetablePaginationBootstrap'] : 'VuetablePaginationBootstrap' extends keyof typeof __VLS_components ? typeof __VLS_components['VuetablePaginationBootstrap'] : 'vuetable-pagination-bootstrap' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['vuetable-pagination-bootstrap'] : 'vuetablePaginationBootstrap' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['vuetablePaginationBootstrap'] : 'VuetablePaginationBootstrap' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['VuetablePaginationBootstrap'] : unknown>;
__VLS_components['vuetable-pagination-bootstrap']; __VLS_components.vuetablePaginationBootstrap; __VLS_components.VuetablePaginationBootstrap;
__VLS_ctx['vuetable-pagination-bootstrap']; __VLS_ctx.vuetablePaginationBootstrap; __VLS_ctx.VuetablePaginationBootstrap;
declare const __VLS_18: __VLS_types.ExtractEmit2<typeof VuetablePaginationBootstrap>;
/* Completion: Emits */
// @ts-ignore
__VLS_18('/* __VLS_.SearchTexts.Completion.Emit.vuetable-pagination-bootstrap */');
// @ts-ignore
__VLS_18('/* __VLS_.SearchTexts.Completion.Emit.vuetablePaginationBootstrap */');
// @ts-ignore
__VLS_18('/* __VLS_.SearchTexts.Completion.Emit.VuetablePaginationBootstrap */');
/* Completion: Props */
// @ts-ignore
(<VuetablePaginationBootstrap /* __VLS_.SearchTexts.Completion.Props.vuetable-pagination-bootstrap */ />);
// @ts-ignore
(<VuetablePaginationBootstrap /* __VLS_.SearchTexts.Completion.Props.vuetablePaginationBootstrap */ />);
// @ts-ignore
(<VuetablePaginationBootstrap /* __VLS_.SearchTexts.Completion.Props.VuetablePaginationBootstrap */ />);
{
<BContainer fluid={true}></BContainer>;

{
<BAlert variant={(__VLS_ctx.alertVariant)} show={(__VLS_ctx.alertCountDown)} dismissible={true} fade={true} class={"\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065"}></BAlert>;

const __VLS_20 = new BAlert({ variant: ((__VLS_ctx.alertVariant)), show: ((__VLS_ctx.alertCountDown)), dismissible: (true), fade: (true), class: ("\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065"), });
type __VLS_21 = typeof __VLS_20 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BAlert & Record<string, unknown>;
const __VLS_22: {
'dismissed': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BAlert, 'dismissed'>, __VLS_21['onDismissed'], typeof __VLS_20 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'dismissed'> : unknown, __VLS_types.GlobalAttrs['onDismissed']
>
>;
} = {
dismissed: $event => {
__VLS_ctx.alertCountDown = 0;
}
};
[alertVariant, alertCountDown, alertVariant, alertCountDown, alertCountDown,];
{
<div class={"\u0069\u0071\u002d\u0061\u006c\u0065\u0072\u0074\u002d\u0074\u0065\u0078\u0074"}></div>;

(__VLS_ctx.alertText);
[alertText,];
}
}
{
<BModal id={"\u006d\u006f\u0064\u0061\u006c\u002d\u0031"} ref={"\u006d\u006f\u0064\u0061\u006c\u002d\u0031"} title={"\u0041\u0067\u0072\u0065\u0067\u0061\u0072\u0020\u0069\u006e\u0073\u0075\u006d\u006f\u0073"}></BModal>;

// @ts-ignore
(__VLS_ctx.modal - 1);
[modal,];
{
<BAlert show={(__VLS_ctx.alertCountDownError)} dismissible={true} fade={true} class={"\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"}></BAlert>;

const __VLS_25 = new BAlert({ show: ((__VLS_ctx.alertCountDownError)), dismissible: (true), fade: (true), class: ("\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_26 = typeof __VLS_25 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BAlert & Record<string, unknown>;
const __VLS_27: {
'dismissed': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BAlert, 'dismissed'>, __VLS_26['onDismissed'], typeof __VLS_25 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'dismissed'> : unknown, __VLS_types.GlobalAttrs['onDismissed']
>
>;
} = {
dismissed: $event => {
__VLS_ctx.alertCountDownError = 0;
}
};
[alertCountDownError, alertCountDownError, alertCountDownError,];
{
<div class={"\u0069\u0071\u002d\u0061\u006c\u0065\u0072\u0074\u002d\u0074\u0065\u0078\u0074"}></div>;

(__VLS_ctx.alertErrorText);
[alertErrorText,];
}
}
{
<BForm></BForm>;

{
<BFormGroup label={"\u0054\u0069\u0070\u006f\u0020\u0064\u0065\u0020\u0049\u006e\u0073\u0075\u006d\u006f\u003a"}></BFormGroup>;

{
<VSelect name={"\u0074\u0079\u0070\u0065"} modelValue={(__VLS_ctx.$v.form.type.$model)} state={(!__VLS_ctx.$v.form.type.$error)} options={(__VLS_ctx.type)} label={"\u006e\u006f\u006d\u0062\u0072\u0065"} placeholder={"\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0065\u0020\u0065\u006c\u0020\u0074\u0069\u0070\u006f\u0020\u0064\u0065\u0020\u0069\u006e\u0073\u0075\u006d\u006f"} />;
[$v, $v, type,];
}
if (__VLS_ctx.$v.form.type.$error) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b\u002d\u0076\u0073\u0065\u006c\u0065\u0063\u0074"}></div>;

}
}
}
{
<BFormGroup label={"\u004e\u006f\u006d\u0062\u0072\u0065\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.name.$model)} state={(!__VLS_ctx.$v.form.name.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u006e\u006f\u006d\u0062\u0072\u0065\u0020\u0064\u0065\u006c\u0020\u0069\u006e\u0073\u0075\u006d\u006f"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.name.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
{
<BFormGroup label={"\u0043\u006f\u0064\u0069\u0067\u006f\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.code.$model)} state={(!__VLS_ctx.$v.form.code.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0063\u006f\u0064\u0069\u0067\u006f\u0020\u0064\u0065\u006c\u0020\u0069\u006e\u0073\u0075\u006d\u006f"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.code.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
{
<BFormGroup label={"\u0045\u0078\u0069\u0073\u0074\u0065\u006e\u0063\u0069\u0061\u0020\u0054\u006f\u0074\u0061\u006c\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.totalExistence.$model)} state={(!__VLS_ctx.$v.form.totalExistence.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0065\u0078\u0069\u0073\u0074\u0065\u006e\u0063\u0069\u0061\u0020\u0074\u006f\u0074\u0061\u006c"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.totalExistence.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
}
{
<template></template>;

const __VLS_42 = new BModal({ id: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0031"), ref: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0031"), title: ("\u0041\u0067\u0072\u0065\u0067\u0061\u0072\u0020\u0069\u006e\u0073\u0075\u006d\u006f\u0073"), });
declare const __VLS_43: __VLS_types.ExtractComponentSlots<typeof __VLS_42>;
const { } = __VLS_43['modal-footer'];
{
<BButton type={"\u0073\u0075\u0062\u006d\u0069\u0074"} variant={"\u0070\u0072\u0069\u006d\u0061\u0072\u0079"}></BButton>;

const __VLS_45 = new BButton({ type: ("\u0073\u0075\u0062\u006d\u0069\u0074"), variant: ("\u0070\u0072\u0069\u006d\u0061\u0072\u0079"), });
type __VLS_46 = typeof __VLS_45 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_47: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_46['onClick'], typeof __VLS_45 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.onValidate('save');
}
};
[onValidate,];
}
{
<BButton variant={"\u0064\u0061\u006e\u0067\u0065\u0072"}></BButton>;

const __VLS_48 = new BButton({ variant: ("\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_49 = typeof __VLS_48 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_50: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_49['onClick'], typeof __VLS_48 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.closeModal('save');
}
};
[closeModal,];
}
}
}
{
<BModal id={"\u006d\u006f\u0064\u0061\u006c\u002d\u0032"} ref={"\u006d\u006f\u0064\u0061\u006c\u002d\u0032"} title={"\u0045\u0064\u0069\u0074\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f\u0073"}></BModal>;

// @ts-ignore
(__VLS_ctx.modal - 2);
[modal,];
{
<BAlert show={(__VLS_ctx.alertCountDownError)} dismissible={true} fade={true} class={"\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"}></BAlert>;

const __VLS_52 = new BAlert({ show: ((__VLS_ctx.alertCountDownError)), dismissible: (true), fade: (true), class: ("\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_53 = typeof __VLS_52 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BAlert & Record<string, unknown>;
const __VLS_54: {
'dismissed': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BAlert, 'dismissed'>, __VLS_53['onDismissed'], typeof __VLS_52 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'dismissed'> : unknown, __VLS_types.GlobalAttrs['onDismissed']
>
>;
} = {
dismissed: $event => {
__VLS_ctx.alertCountDownError = 0;
}
};
[alertCountDownError, alertCountDownError, alertCountDownError,];
{
<div class={"\u0069\u0071\u002d\u0061\u006c\u0065\u0072\u0074\u002d\u0074\u0065\u0078\u0074"}></div>;

(__VLS_ctx.alertErrorText);
[alertErrorText,];
}
}
{
<BForm></BForm>;

{
<BFormGroup label={"\u0054\u0069\u0070\u006f\u0020\u0064\u0065\u0020\u0049\u006e\u0073\u0075\u006d\u006f\u003a"}></BFormGroup>;

{
<VSelect name={"\u0074\u0079\u0070\u0065"} modelValue={(__VLS_ctx.$v.form.type.$model)} state={(!__VLS_ctx.$v.form.type.$error)} options={(__VLS_ctx.type)} label={"\u006e\u006f\u006d\u0062\u0072\u0065"} placeholder={"\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0065\u0020\u0065\u006c\u0020\u0074\u0069\u0070\u006f\u0020\u0064\u0065\u0020\u0069\u006e\u0073\u0075\u006d\u006f"} />;
[$v, $v, type,];
}
if (__VLS_ctx.$v.form.type.$error) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b\u002d\u0076\u0073\u0065\u006c\u0065\u0063\u0074"}></div>;

}
}
}
{
<BFormGroup label={"\u004e\u006f\u006d\u0062\u0072\u0065\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.name.$model)} state={(!__VLS_ctx.$v.form.name.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u006e\u006f\u006d\u0062\u0072\u0065\u0020\u0064\u0065\u006c\u0020\u0069\u006e\u0073\u0075\u006d\u006f"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.name.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
{
<BFormGroup label={"\u0043\u006f\u0064\u0069\u0067\u006f\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.code.$model)} state={(!__VLS_ctx.$v.form.code.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0063\u006f\u0064\u0069\u0067\u006f\u0020\u0064\u0065\u006c\u0020\u0069\u006e\u0073\u0075\u006d\u006f"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.code.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
{
<BFormGroup label={"\u0045\u0078\u0069\u0073\u0074\u0065\u006e\u0063\u0069\u0061\u0020\u0054\u006f\u0074\u0061\u006c\u003a"}></BFormGroup>;

{
<BFormInput modelValue={(__VLS_ctx.$v.form.totalExistence.$model)} state={(!__VLS_ctx.$v.form.totalExistence.$error)} placeholder={"\u0049\u006e\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0065\u0078\u0069\u0073\u0074\u0065\u006e\u0063\u0069\u0061\u0020\u0074\u006f\u0074\u0061\u006c"}></BFormInput>;

[$v, $v,];
}
if (__VLS_ctx.$v.form.totalExistence.required.$invalid) {
[$v,];
{
<div class={"\u0069\u006e\u0076\u0061\u006c\u0069\u0064\u002d\u0066\u0065\u0065\u0064\u0062\u0061\u0063\u006b"}></div>;

}
}
}
}
{
<template></template>;

const __VLS_69 = new BModal({ id: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0032"), ref: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0032"), title: ("\u0045\u0064\u0069\u0074\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f\u0073"), });
declare const __VLS_70: __VLS_types.ExtractComponentSlots<typeof __VLS_69>;
const { } = __VLS_70['modal-footer'];
{
<BButton type={"\u0073\u0075\u0062\u006d\u0069\u0074"} variant={"\u0070\u0072\u0069\u006d\u0061\u0072\u0079"}></BButton>;

const __VLS_72 = new BButton({ type: ("\u0073\u0075\u0062\u006d\u0069\u0074"), variant: ("\u0070\u0072\u0069\u006d\u0061\u0072\u0079"), });
type __VLS_73 = typeof __VLS_72 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_74: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_73['onClick'], typeof __VLS_72 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.onValidate('update');
}
};
[onValidate,];
}
{
<BButton variant={"\u0064\u0061\u006e\u0067\u0065\u0072"}></BButton>;

const __VLS_75 = new BButton({ variant: ("\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_76 = typeof __VLS_75 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_77: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_76['onClick'], typeof __VLS_75 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.closeModal('update');
}
};
[closeModal,];
}
}
}
{
<BModal id={"\u006d\u006f\u0064\u0061\u006c\u002d\u0033"} ref={"\u006d\u006f\u0064\u0061\u006c\u002d\u0033"} title={"\u0044\u0065\u0073\u0061\u0063\u0074\u0069\u0076\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f"}></BModal>;

// @ts-ignore
(__VLS_ctx.modal - 3);
[modal,];
{
<BAlert show={(__VLS_ctx.alertCountDownError)} dismissible={true} fade={true} class={"\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"}></BAlert>;

const __VLS_79 = new BAlert({ show: ((__VLS_ctx.alertCountDownError)), dismissible: (true), fade: (true), class: ("\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_80 = typeof __VLS_79 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BAlert & Record<string, unknown>;
const __VLS_81: {
'dismissed': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BAlert, 'dismissed'>, __VLS_80['onDismissed'], typeof __VLS_79 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'dismissed'> : unknown, __VLS_types.GlobalAttrs['onDismissed']
>
>;
} = {
dismissed: $event => {
__VLS_ctx.alertCountDownError = 0;
}
};
[alertCountDownError, alertCountDownError, alertCountDownError,];
{
<div class={"\u0069\u0071\u002d\u0061\u006c\u0065\u0072\u0074\u002d\u0074\u0065\u0078\u0074"}></div>;

(__VLS_ctx.alertErrorText);
[alertErrorText,];
}
}
{
<h6 class={"\u006d\u0079\u002d\u0034"}></h6>;

(__VLS_ctx.form.name);
[form,];
}
{
<template></template>;

const __VLS_84 = new BModal({ id: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0033"), ref: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0033"), title: ("\u0044\u0065\u0073\u0061\u0063\u0074\u0069\u0076\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f"), });
declare const __VLS_85: __VLS_types.ExtractComponentSlots<typeof __VLS_84>;
const { } = __VLS_85['modal-footer'];
{
<BButton type={"\u0073\u0075\u0062\u006d\u0069\u0074"} variant={"\u0070\u0072\u0069\u006d\u0061\u0072\u0079"}></BButton>;

const __VLS_87 = new BButton({ type: ("\u0073\u0075\u0062\u006d\u0069\u0074"), variant: ("\u0070\u0072\u0069\u006d\u0061\u0072\u0079"), });
type __VLS_88 = typeof __VLS_87 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_89: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_88['onClick'], typeof __VLS_87 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.onState();
__VLS_ctx.$bvModal.hide('modal-3');
}
};
[onState, $bvModal,];
}
{
<BButton variant={"\u0064\u0061\u006e\u0067\u0065\u0072"}></BButton>;

const __VLS_90 = new BButton({ variant: ("\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_91 = typeof __VLS_90 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_92: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_91['onClick'], typeof __VLS_90 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.$bvModal.hide('modal-3');
}
};
[$bvModal,];
}
}
}
{
<BModal id={"\u006d\u006f\u0064\u0061\u006c\u002d\u0034"} ref={"\u006d\u006f\u0064\u0061\u006c\u002d\u0034"} title={"\u0041\u0063\u0074\u0069\u0076\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f"}></BModal>;

// @ts-ignore
(__VLS_ctx.modal - 4);
[modal,];
{
<BAlert show={(__VLS_ctx.alertCountDownError)} dismissible={true} fade={true} class={"\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"}></BAlert>;

const __VLS_94 = new BAlert({ show: ((__VLS_ctx.alertCountDownError)), dismissible: (true), fade: (true), class: ("\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0062\u0067\u002d\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_95 = typeof __VLS_94 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BAlert & Record<string, unknown>;
const __VLS_96: {
'dismissed': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BAlert, 'dismissed'>, __VLS_95['onDismissed'], typeof __VLS_94 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'dismissed'> : unknown, __VLS_types.GlobalAttrs['onDismissed']
>
>;
} = {
dismissed: $event => {
__VLS_ctx.alertCountDownError = 0;
}
};
[alertCountDownError, alertCountDownError, alertCountDownError,];
{
<div class={"\u0069\u0071\u002d\u0061\u006c\u0065\u0072\u0074\u002d\u0074\u0065\u0078\u0074"}></div>;

(__VLS_ctx.alertErrorText);
[alertErrorText,];
}
}
{
<h6 class={"\u006d\u0079\u002d\u0034"}></h6>;

(__VLS_ctx.form.name);
[form,];
}
{
<template></template>;

const __VLS_99 = new BModal({ id: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0034"), ref: ("\u006d\u006f\u0064\u0061\u006c\u002d\u0034"), title: ("\u0041\u0063\u0074\u0069\u0076\u0061\u0072\u0020\u0049\u006e\u0073\u0075\u006d\u006f"), });
declare const __VLS_100: __VLS_types.ExtractComponentSlots<typeof __VLS_99>;
const { } = __VLS_100['modal-footer'];
{
<BButton type={"\u0073\u0075\u0062\u006d\u0069\u0074"} variant={"\u0070\u0072\u0069\u006d\u0061\u0072\u0079"}></BButton>;

const __VLS_102 = new BButton({ type: ("\u0073\u0075\u0062\u006d\u0069\u0074"), variant: ("\u0070\u0072\u0069\u006d\u0061\u0072\u0079"), });
type __VLS_103 = typeof __VLS_102 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_104: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_103['onClick'], typeof __VLS_102 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.onState();
__VLS_ctx.$bvModal.hide('modal-4');
}
};
[onState, $bvModal,];
}
{
<BButton variant={"\u0064\u0061\u006e\u0067\u0065\u0072"}></BButton>;

const __VLS_105 = new BButton({ variant: ("\u0064\u0061\u006e\u0067\u0065\u0072"), });
type __VLS_106 = typeof __VLS_105 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_107: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_106['onClick'], typeof __VLS_105 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.$bvModal.hide('modal-4');
}
};
[$bvModal,];
}
}
}
{
<BRow></BRow>;

{
<BCol md={"\u0031\u0032"}></BCol>;

{
<IqCard></IqCard>;

{
<template></template>;

const __VLS_111 = new IqCard({});
declare const __VLS_112: __VLS_types.ExtractComponentSlots<typeof __VLS_111>;
__VLS_112['headerTitle'];
{
<h4 class={"\u0063\u0061\u0072\u0064\u002d\u0074\u0069\u0074\u006c\u0065\u0020\u006d\u0074\u002d\u0033"}></h4>;

}
{
<div class={"\u0069\u0071\u002d\u0073\u0065\u0061\u0072\u0063\u0068\u002d\u0062\u0061\u0072\u0020\u006d\u0074\u002d\u0032"}></div>;

{
<div class={"\u0072\u006f\u0077"}></div>;

{
<div class={"\u0063\u006f\u006c\u002d\u0073\u006d"}></div>;

{
<BForm action={"\u0023"} class={"\u0073\u0065\u0061\u0072\u0063\u0068\u0062\u006f\u0078"}></BForm>;

{
<BInput id={"\u0073\u0065\u0061\u0072\u0063\u0068"} placeholder={"\u0042\u0075\u0073\u0063\u0061\u0072\u002e\u002e\u002e"} />;
const __VLS_119 = new BInput({ id: ("\u0073\u0065\u0061\u0072\u0063\u0068"), placeholder: ("\u0042\u0075\u0073\u0063\u0061\u0072\u002e\u002e\u002e"), });
type __VLS_120 = typeof __VLS_119 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BInput & Record<string, unknown>;
const __VLS_121: {
'input': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BInput, 'input'>, __VLS_120['onInput'], typeof __VLS_119 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'input'> : unknown, __VLS_types.GlobalAttrs['onInput']
>
>;
} = {
input: ((val) => __VLS_ctx.searchChange(val))
};
[searchChange,];
}
{
<a class={"\u0073\u0065\u0061\u0072\u0063\u0068\u002d\u006c\u0069\u006e\u006b"} href={"\u0023"}></a>;

{
<i class={"\u0072\u0069\u002d\u0073\u0065\u0061\u0072\u0063\u0068\u002d\u006c\u0069\u006e\u0065"}></i>;

}
}
}
}
{
<div class={"\u0063\u006f\u006c\u002d\u0073\u006d"}></div>;

{
<BDropdown id={"\u0064\u0064\u006f\u0077\u006e\u0031"} text={(__VLS_ctx.columna.nombre)} variant={"\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u0064\u0061\u0072\u006b"} class={"\u006d\u0072\u002d\u0031\u0020\u0066\u006c\u006f\u0061\u0074\u002d\u006d\u0064\u002d\u006c\u0065\u0066\u0074\u0020\u0062\u0074\u006e\u002d\u0067\u0072\u006f\u0075\u0070"} size={"\u0078\u0073"}></BDropdown>;

[columna,];
for (const [search, index] of __VLS_types.getVforSourceType(__VLS_ctx.options)) {
[options,];
{
<BDropdownItem key={(index)}></BDropdownItem>;

const __VLS_126 = new BDropdownItem({ key: ((index)), });
type __VLS_127 = typeof __VLS_126 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BDropdownItem & Record<string, unknown>;
const __VLS_128: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BDropdownItem, 'click'>, __VLS_127['onClick'], typeof __VLS_126 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.changeTypeSearch(search);
}
};
[changeTypeSearch,];
(search.nombre);
}
}
}
}
}
}
}
{
<template></template>;

const __VLS_129 = new IqCard({});
declare const __VLS_130: __VLS_types.ExtractComponentSlots<typeof __VLS_129>;
__VLS_130['headerAction'];
{
<BButton variant={"\u0070\u0072\u0069\u006d\u0061\u0072\u0079"}></BButton>;

__VLS_types.directiveFunction(__VLS_ctx.vBModal)();
}
}
{
<template></template>;

const __VLS_133 = new IqCard({});
declare const __VLS_134: __VLS_types.ExtractComponentSlots<typeof __VLS_133>;
__VLS_134['body'];
{
<DatatableHeading changePageSize={(__VLS_ctx.changePageSizes)} searchChange={(__VLS_ctx.searchChange)} from={(__VLS_ctx.from)} to={(__VLS_ctx.to)} total={(__VLS_ctx.total)} perPage={(__VLS_ctx.perPage)}></DatatableHeading>;

[changePageSizes, searchChange, from, to, total, perPage,];
}
{
<Vuetable ref={"\u0076\u0075\u0065\u0074\u0061\u0062\u006c\u0065"} class={"\u0074\u0061\u0062\u006c\u0065\u002d\u0064\u0069\u0076\u0069\u0064\u0065\u0064\u0020\u006f\u0072\u0064\u0065\u0072\u002d\u0077\u0069\u0074\u0068\u002d\u0061\u0072\u0072\u006f\u0077"} apiUrl={(__VLS_ctx.apiBase)} api-url={(__VLS_ctx.apiBase)} queryParams={(__VLS_ctx.makeQueryParams)} query-params={(__VLS_ctx.makeQueryParams)} perPage={(__VLS_ctx.perPage)} per-page={(__VLS_ctx.perPage)} reactiveApiUrl={(true)} reactive-api-url={(true)} fields={(__VLS_ctx.fields)} paginationPath={true} pagination-path={true}></Vuetable>;

// @ts-ignore
(__VLS_ctx.vuetable);
[apiBase, makeQueryParams, perPage, fields, vuetable,];
const __VLS_137 = new Vuetable({ ref: ("\u0076\u0075\u0065\u0074\u0061\u0062\u006c\u0065"), class: ("\u0074\u0061\u0062\u006c\u0065\u002d\u0064\u0069\u0076\u0069\u0064\u0065\u0064\u0020\u006f\u0072\u0064\u0065\u0072\u002d\u0077\u0069\u0074\u0068\u002d\u0061\u0072\u0072\u006f\u0077"), apiUrl: ((__VLS_ctx.apiBase)), 'api-url': ((__VLS_ctx.apiBase)), queryParams: ((__VLS_ctx.makeQueryParams)), 'query-params': ((__VLS_ctx.makeQueryParams)), perPage: ((__VLS_ctx.perPage)), 'per-page': ((__VLS_ctx.perPage)), reactiveApiUrl: ((true)), 'reactive-api-url': ((true)), fields: ((__VLS_ctx.fields)), paginationPath: (true), 'pagination-path': (true), });
type __VLS_138 = typeof __VLS_137 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof Vuetable & Record<string, unknown>;
const __VLS_139: {
'vuetable:pagination-data': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof Vuetable, 'vuetable:pagination-data'>, __VLS_138['onVuetable:paginationData'], __VLS_138['onVuetable:pagination-data'], typeof __VLS_137 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'vuetable:pagination-data'> : unknown, __VLS_types.GlobalAttrs['onVuetable:paginationData']
>
>;
} = {
'vuetable:pagination-data': (__VLS_ctx.onPaginationData)
};
[apiBase, makeQueryParams, perPage, fields, onPaginationData,];
{
<div slot={"\u0065\u0073\u0074\u0061\u0064\u006f"} slotScope={"\u0070\u0072\u006f\u0070\u0073"} slot-scope={"\u0070\u0072\u006f\u0070\u0073"}></div>;

if (__VLS_ctx.props.rowData.estado == 1) {
[props,];
{
<h5></h5>;

{
<BBadge variant={"\u006c\u0069\u0067\u0068\u0074"}></BBadge>;

{
<h6 class={"\u0073\u0075\u0063\u0063\u0065\u0073\u0073"}></h6>;

{
<strong></strong>;

}
}
}
}
}
else {
{
<h5></h5>;

{
<BBadge variant={"\u006c\u0069\u0067\u0068\u0074"}></BBadge>;

{
<h6 class={"\u0064\u0061\u006e\u0067\u0065\u0072"}></h6>;

{
<strong></strong>;

}
}
}
}
}
}
{
<template slot={"\u0061\u0063\u0074\u0069\u006f\u006e\u0073"} slotScope={"\u0070\u0072\u006f\u0070\u0073"} slot-scope={"\u0070\u0072\u006f\u0070\u0073"}></template>;

{
<BButtonGroup></BButtonGroup>;

{
<BButton class={"\u006d\u0062\u002d\u0032"} size={"\u0073\u006d"} variant={"\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u0077\u0061\u0072\u006e\u0069\u006e\u0067"}></BButton>;

__VLS_types.directiveFunction(__VLS_ctx.vBModal)();
const __VLS_151 = new BButton({ class: ("\u006d\u0062\u002d\u0032"), size: ("\u0073\u006d"), variant: ("\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u0077\u0061\u0072\u006e\u0069\u006e\u0067"), });
type __VLS_152 = typeof __VLS_151 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_153: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_152['onClick'], typeof __VLS_151 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {
__VLS_ctx.setData(__VLS_ctx.props.rowData);
}
};
[setData, props,];
{
<i class={('fas fa-pencil-alt')} />;
}
}
{
<BButton class={"\u006d\u0062\u002d\u0032"} size={"\u0073\u006d"} variant={(
__VLS_ctx.props.rowData.estado == 1 ? 'outline-danger' : 'outline-info')}></BButton>;

const __VLS_155 = new BButton({
class: ("\u006d\u0062\u002d\u0032"), size: ("\u0073\u006d"), variant: ((
__VLS_ctx.props.rowData.estado == 1 ? 'outline-danger' : 'outline-info')),
});
type __VLS_156 = typeof __VLS_155 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof BButton & Record<string, unknown>;
const __VLS_157: {
'click': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof BButton, 'click'>, __VLS_156['onClick'], typeof __VLS_155 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'click'> : unknown, __VLS_types.GlobalAttrs['onClick']
>
>;
} = {
click: $event => {

__VLS_ctx.setData(__VLS_ctx.props.rowData);
__VLS_ctx.props.rowData.estado == 1
? __VLS_ctx.$bvModal.show('modal-3')
: __VLS_ctx.$bvModal.show('modal-4');

}
};
[props, props, setData, props, props, $bvModal, $bvModal,];
{
<i class={(
__VLS_ctx.props.rowData.estado == 1
? 'fas fa-trash-alt'
: 'fas fa-check')} />;
[props,];
}
}
}
}
}
{
<VuetablePaginationBootstrap ref={"\u0070\u0061\u0067\u0069\u006e\u0061\u0074\u0069\u006f\u006e"} />;
// @ts-ignore
(__VLS_ctx.pagination);
[pagination,];
const __VLS_159 = new VuetablePaginationBootstrap({ ref: ("\u0070\u0061\u0067\u0069\u006e\u0061\u0074\u0069\u006f\u006e"), });
type __VLS_160 = typeof __VLS_159 extends { $props: infer Props; } ? Props & Record<string, unknown> : typeof VuetablePaginationBootstrap & Record<string, unknown>;
const __VLS_161: {
'vuetable-pagination:change-page': __VLS_types.FillingEventArg<
__VLS_types.FirstFunction<
__VLS_types.EmitEvent<typeof VuetablePaginationBootstrap, 'vuetable-pagination:change-page'>, __VLS_160['onVuetablePagination:changePage'], __VLS_160['onVuetable-pagination:change-page'], typeof __VLS_159 extends { $emit: infer Emit; } ? __VLS_types.EmitEvent2<Emit, 'vuetable-pagination:change-page'> : unknown, __VLS_types.GlobalAttrs['onVuetablePagination:changePage']
>
>;
} = {
'vuetable-pagination:change-page': (__VLS_ctx.onChangePage)
};
[onChangePage,];
}
}
}
}
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
let __VLS_component!: typeof import('./SuppliesLab.vue')['default'];
