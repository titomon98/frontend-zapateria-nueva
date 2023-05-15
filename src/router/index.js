import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import Default from '../layouts/BlankLayout'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
/* Dashboards View */
import Dashboard2 from '../views/Dashboards/Dashboard2.vue'
import Dashboard1 from '../views/Dashboards/Dashboard1.vue'
import Dashboard3 from '../views/Dashboards/Dashboard3'
import Dashboard4 from '../views/Dashboards/Dashboard4'
import Dashboard5 from '../views/Dashboards/Dashboard5'
/* UIElements View */
import UiAlerts from '../views/core/UiAlerts.vue'
import UiButtons from '../views/core/UiButtons.vue'
import UiBadges from '../views/core/UiBadges.vue'
import UiBreadcrumb from '../views/core/UiBreadcrumb.vue'
import UiColors from '../views/core/UiColors.vue'
import UiTypography from '../views/core/UiTypography.vue'
import UiCards from '../views/core/UiCards.vue'
import UiCarousel from '../views/core/UiCarousel.vue'
import UiEmbedVideo from '../views/core/UiEmbedVideo.vue'
import UiGrid from '../views/core/UiGrid.vue'
import UiModal from '../views/core/UiModal.vue'
import UiListGroup from '../views/core/UiListGroup.vue'
import UiImages from '../views/core/UiImages.vue'
import UiMediaObject from '../views/core/UiMediaObject.vue'
import UiTooltips from '../views/core/UiTooltips.vue'
import UiPopovers from '../views/core/UiPopovers.vue'
import UiNotifications from '../views/core/UiNotifications.vue'
import UiTabs from '../views/core/UiTabs.vue'
import UiPagination from '../views/core/UiPagination.vue'
import UiProgressBars from '../views/core/UiProgressBars.vue'
/* Authentic View */
import SignIn1 from '../views/AuthPages/Default/SignIn1'
import SignUp1 from '../views/AuthPages/Default/SignUp1'
import RecoverPassword1 from '../views/AuthPages/Default/RecoverPassword1'
import LockScreen1 from '../views/AuthPages/Default/LockScreen1'
import ConfirmMail1 from '../views/AuthPages/Default/ConfirmMail1'
/* Extra Pages */
import ErrorPage from '../views/Pages/ErrorPage'
import ComingSoon from '../views/Pages/ComingSoon'
import Maintenance from '../views/Pages/Maintenance'
import TimeLine from '../views/Pages/TimeLines'
import Pricing from '../views/Pages/Pricing'
import Pricing1 from '../views/Pages/Pricing1'
import BlankPage from '../views/Pages/BlankPage'
import FAQ from '../views/Pages/FAQ'
import Invoice from '../views/Pages/Invoice'
/* Apps Views */
import EmailListing from '../views/Apps/Email/EmailListing'
import EmailCompose from '../views/Apps/Email/EmailCompose'
import Calendar from '../views/Apps/Calendar/Calendar'
import ChatIndex from '../views/Apps/Chat/Index'
/* Icon Views */
import IconDripicons from '../views/Icons/IconDripicons'
import IconFontawesome5 from '../views/Icons/IconFontawesome5'
import IconLineAwesome from '../views/Icons/IconLineAwesome'
import IconRemixicon from '../views/Icons/IconRemixicon'
import IconUnicons from '../views/Icons/IconUnicons'
/* Tables Views */
import TablesBasic from '../views/Tables/TablesBasic'
import DataTable from '../views/Tables/DataTable'
import EditableTable from '../views/Tables/EditableTable'
import ApexCharts from '../views/Charts/ApexCharts'
import AmCharts from '../views/Charts/AmCharts'
import MorrisCharts from '../views/Charts/MorrisCharts'
import HighCharts from '../views/Charts/HighCharts'
import GoogleMaps from '../views/Maps/GoogleMaps'
import VectorMaps from '../views/Maps/VectorMaps'
/* Form View */
import FormLayout from '../views/Forms/FormLayout'
import FormValidates from '../views/Forms/FormValidates'
import FormSwitches from '../views/Forms/FormSwitches'
import FormRadios from '../views/Forms/FormRadios'
import FormCheckboxes from '../views/Forms/FormCheckboxes'
/* User View */
import Profile from '../views/User/Profile'
import ProfileEdit from '../views/User/ProfileEdit'
import AddUser from '../views/User/AddUser'
import UserList from '../views/User/UserList'
/* Todo */
import Callback from '../views/AuthPages/Default/Callback'
/* Plugins Views */
import DatepickerDemo from '../views/Plugins/DatepickerDemo'
import SelectDemo from '../views/Plugins/SelectDemo'
import DragDropDemo from '../views/Plugins/DragDropDemo'
import AppTreeView from '../views/Plugins/AppTreeView'

// App views
// admin
import Users from '../views/App/Admin/Users'
import AdminParent from '../views/App/Admin/AdminParent'
// pharmacy
import Inventory from '../views/App/Pharmacy/Inventory'
import InventoryAdjustment from '../views/App/Pharmacy/InventoryAdjustment'
import PharmacyReports from '../views/App/Pharmacy/PharmacyReports'
import Purchases from '../views/App/Purchases/Purchases'
import Sales from '../views/App/Sales/Sales'
import SalesCash from '../views/App/Sales/SalesCash'
import MedicalHouse from '../views/App/Pharmacy/MedicalHouse'
import Presentations from '../views/App/Pharmacy/Presentations'
import MedicationType from '../views/App/Pharmacy/MedicationType'
import Brand from '../views/App/Pharmacy/Brand'
import Medicine from '../views/App/Pharmacy/Medicine'
import ExternalMedicine from '../views/App/Pharmacy/ExternalMedicine'
import MedicineSide from '../views/App/sidebar/Medicine'
// cash
import BoxClosure from '../views/App/Cash/BoxClosure'
import Cobros from '../views/App/Cash/Cobros'

// Patients
import History from '../views/App/Patients/History'
import Patients from '../views/App/Patients/Patients'
import PacientesReception from '../views/App/Patients/PatientsReception'
import PacientesMarketing from '../views/App/Patients/PatientsMarketing'
import NewPatient from '../views/App/Patients/NewPatient'
import PatientsReports from '../views/App/Patients/Reports'
import UpdatePatient from '../views/App/Patients/UpdatePatient'
import PatientsToday from '../views/App/Patients/PatientsToday'
import WaitList from '../views/App/Patients/WaitList'
import Reception from '../views/App/Patients/Reception'
import PatientExpress from '../views/App/Patients/PatientExpress'

// Renting
import Sites from '../views/App/Renting/Sites'
import Appointments from '../views/App/Renting/Appointments/Appointments'
import QuickAppointment from '../views/App/Renting/Appointments/QuickAppointment'
import Clinics from '../views/App/Renting/Clinics'
import Renting from '../views/App/Renting/Renting'
import Appointment from '../views/App/sidebar/Appointment'
import RentingSide from '../views/App/sidebar/Renting'

// Services
import ServicesParent from '../views/App/Services/ServicesParent'
import Services from '../views/App/Services/Services'
import Therapy from '../views/App/Services/Therapy'

// Laboratory
import Examinations from '../views/App/Laboratory/Examinations'
import ExternalExaminations from '../views/App/Laboratory/ExternalExaminations'
import SuppliesInventory from '../views/App/Laboratory/SuppliesInventory'
import SuppliesLab from '../views/App/Laboratory/SuppliesLab'
import TipoInsumos from '../views/App/Laboratory/SuppliesType'
import SalesInventory from '../views/App/Sales/SalesInventory'
import ExamType from '../views/App/Laboratory/ExamType'
import Laboratory from '../views/App/sidebar/Laboratory'

// Doctor
import Specialties from '../views/App/Doctors/Specialties'
import Medicos from '../views/App/Doctors/Medicos'
import TipoMedicos from '../views/App/Doctors/Type'
import Medics from '../views/App/sidebar/Medic'

// Galo-tech
import InventoryGT from '../views/App/GaloTech/Inventory'
import InventoryAdjustmentGT from '../views/App/GaloTech/InventoryAdjustment'
import GaloTechReports from '../views/App/GaloTech/GaloTechReports'
import PurchasesGT from '../views/App/GaloTech/Purchases'
import SalesGT from '../views/App/GaloTech/Sales'
import EquipmentTypeGT from '../views/App/GaloTech/EquipmentType'
import EquipmentGT from '../views/App/GaloTech/Equipment'
import GaloTech from '../views/App/sidebar/GaloTech'

// Contabilidad
import Buylist from '../views/App/Accounting/Buylist'
import Closures from '../views/App/Accounting/Closures'
import Reports from '../views/App/Accounting/Reports'
import SalesList from '../views/App/Accounting/SalesList'
import SalesNomenclature from '../views/App/Accounting/SalesNomenclature'
import Partidas from '../views/App/Accounting/Partidas'
import NuevasPartidas from '../views/App/Accounting/NewPartida'
import EditPartida from '../views/App/Accounting/EditPartida'
import BooksParent from '../views/App/Accounting/BooksParent'
import Banks from '../views/App/Accounting/Banks'
import BankAccounts from '../views/App/Accounting/BankAccounts'
import BanksParent from '../views/App/Accounting/BanksParent'
import PurchasesDataParent from '../views/App/Accounting/PurchasesDataParent'
import SalesAccounting from '../views/App/Accounting/SalesAccounting'

// Reports
import ClosureReport from '../views/App/reports/ClosureReport'
import GaloTechReport from '../views/App/reports/GaloTechReport'
import PatientDetailReport from '../views/App/reports/PatientDetailReport'
import PurchaseReport from '../views/App/reports/PurchaseReport'
import RentReport from '../views/App/reports/RentReport'
import SaleReport from '../views/App/reports/SaleReport'
import SandboxReport from '../views/App/reports/SandboxReport'

// Administrativos
import Ingresos from '../views/App/Admin/Ingresos'
import GastosOperativos from '../views/App/Admin/GastosOperativos'
import PlanillaSalario from '../views/App/Admin/PlanillaSalario'
import Vauchers from '../views/App/Admin/Vauchers'

Vue.use(VueRouter)

const AdminRoutes = (prop, mode) => [
  {
    path: 'users',
    name: prop + '.users',
    meta: { dark: mode, auth: true, name: 'Usuarios' },
    component: Users
  },
  {
    path: 'ingresos',
    name: prop + '.ingresos',
    meta: { dark: mode, auth: true, name: 'Ingresos' },
    component: Ingresos
  },
  {
    path: 'gastosoperativos',
    name: prop + '.gastosoperativos',
    meta: { dark: mode, auth: true, name: 'GastosOperativos' },
    component: GastosOperativos
  },
  {
    path: 'vauchers',
    name: prop + '.vauchers',
    meta: { dark: mode, auth: true, name: 'Vauchers' },
    component: Vauchers
  },
  {
    path: 'planilla',
    name: prop + '.planilla',
    meta: { dark: mode, auth: true, name: 'PlanillaSalario' },
    component: PlanillaSalario
  },
  {
    path: 'adminparent',
    name: prop + '.adminparent',
    meta: { dark: mode, auth: true, name: 'adminparent' },
    component: AdminParent
  }
]

const PharmacyRoutes = (prop, mode) => [
  {
    path: 'inventory',
    name: prop + '.inventory',
    meta: { dark: mode, auth: true, name: 'Inventario' },
    component: Inventory
  },
  {
    path: 'adjustment',
    name: prop + '.inventoryAdjustment',
    meta: { dark: mode, auth: true, name: 'Ajuste de inventario' },
    component: InventoryAdjustment
  },
  {
    path: 'reports',
    name: prop + '.pharmacyReports',
    meta: { dark: mode, auth: true, name: 'Reporte de inventario' },
    component: PharmacyReports
  },
  {
    path: 'MedicalHouse',
    name: prop + '.MedicalHouse',
    meta: { dark: mode, auth: true, name: 'Casas medicas' },
    component: MedicalHouse
  },
  {
    path: 'Presentations',
    name: prop + '.presentations',
    meta: { dark: mode, auth: true, name: 'Presentaciones' },
    component: Presentations
  },
  {
    path: 'MedicationType',
    name: prop + '.MedicationType',
    meta: { dark: mode, auth: true, name: 'Tipo de medicamento' },
    component: MedicationType
  },
  {
    path: 'Brand',
    name: prop + '.Brand',
    meta: { dark: mode, auth: true, name: 'Marcas' },
    component: Brand
  },
  {
    path: 'Medicine',
    name: prop + '.Medicine',
    meta: { dark: mode, auth: true, name: 'Medicamentos' },
    component: Medicine
  },
  {
    path: 'ExternalMedicine',
    name: prop + '.ExternalMedicine',
    meta: { dark: mode, auth: true, name: 'Medicamentos Externos' },
    component: ExternalMedicine
  },
  {
    path: 'MedicineSide',
    name: prop + '.MedicineSide',
    meta: { dark: mode, auth: true, name: 'Medicamentos' },
    component: MedicineSide
  }
]

const CashRoutes = (prop, mode) => [
  {
    path: 'Sales',
    name: prop + '.sales',
    meta: { dark: mode, auth: true, name: 'Compras' },
    component: Sales
  },
  {
    path: 'closure',
    name: prop + '.closure',
    meta: { dark: mode, auth: true, name: 'Cierre de caja' },
    component: BoxClosure
  }
]

const ReportsRoutes = (prop, mode) => [
  {
    path: 'closure',
    name: prop + '.closure',
    meta: { dark: mode, auth: true, name: 'Cierre de caja' },
    component: ClosureReport
  },
  {
    path: 'galotech',
    name: prop + '.galotech',
    meta: { dark: mode, auth: true, name: 'Reporte de Galo Tech' },
    component: GaloTechReport
  },
  {
    path: 'patientdetail/:id',
    name: prop + '.patientdetail',
    meta: { dark: mode, auth: true, name: 'Reporte de detalle de paciente' },
    component: PatientDetailReport
  },
  {
    path: 'sandbox/:id',
    name: prop + '.sandbox',
    meta: { dark: mode, auth: true, name: 'Reporte de pruebas general' },
    component: SandboxReport
  },
  {
    path: 'purchase',
    name: prop + '.purchase',
    meta: { dark: mode, auth: true, name: 'Reporte de compras' },
    component: PurchaseReport
  },
  {
    path: 'rent',
    name: prop + '.rent',
    meta: { dark: mode, auth: true, name: 'Reporte de arrendamientos' },
    component: RentReport
  },
  {
    path: 'sale',
    name: prop + '.sale',
    meta: { dark: mode, auth: true, name: 'Reporte de ventas' },
    component: SaleReport
  }
]

const PatientRoutes = (prop, mode) => [
  {
    path: '/',
    name: prop + '.patients',
    meta: { dark: mode, auth: true, name: 'Pacientes' },
    component: Patients
  },
  {
    path: '/',
    name: prop + '.patientsreception',
    meta: { dark: mode, auth: true, name: 'PacientesReception' },
    component: PacientesReception
  },
  {
    path: '/',
    name: prop + '.patientsmarketing',
    meta: { dark: mode, auth: true, name: 'PacientesMarketing' },
    component: PacientesMarketing
  },
  {
    path: 'patient/',
    name: prop + '.patient',
    meta: { dark: mode, auth: true, name: 'Paciente' },
    component: NewPatient
  },
  {
    path: 'patient/',
    name: prop + '.patient',
    meta: { dark: mode, auth: true, name: 'Paciente' },
    component: NewPatient
  },
  {
    path: 'quick',
    name: prop + '.quick',
    meta: { dark: mode, auth: true, name: 'Paciente Externo' },
    component: PatientExpress
  },
  {
    path: 'patient/:id',
    name: prop + '.patientUpdate',
    meta: { dark: mode, auth: true, name: 'Paciente actualizar' },
    component: UpdatePatient
  },
  {
    path: 'history/:id',
    name: prop + '.history',
    meta: { dark: mode, auth: true, name: 'Historial de pacientes' },
    component: History
  },
  {
    path: 'reception/:id',
    name: prop + '.reception',
    meta: { dark: mode, auth: true, name: 'Recepcion' },
    component: Reception
  },
  {
    path: 'today',
    name: prop + '.today',
    meta: { dark: mode, auth: true, name: 'Pacientes hoy' },
    component: PatientsToday
  },
  {
    path: 'waitlist',
    name: prop + '.waitlist',
    meta: { dark: mode, auth: true, name: 'Lista de espera' },
    component: WaitList
  },
  {
    path: 'reports',
    name: prop + '.reports',
    meta: { dark: mode, auth: true, name: 'Reportes' },
    component: PatientsReports
  }
]

const RentingRoutes = (prop, mode) => [
  {
    path: 'appointments',
    name: prop + '.appointments',
    meta: { dark: mode, auth: true, name: 'Citas' },
    component: Appointments
  },
  {
    path: 'quickAppointments',
    name: prop + '.quickAppointments',
    meta: { dark: mode, auth: true, name: 'Primera consulta' },
    component: QuickAppointment
  },
  {
    path: 'clinics',
    name: prop + '.clinics',
    meta: { dark: mode, auth: true, name: 'Clinicas' },
    component: Clinics
  },
  {
    path: 'sites',
    name: prop + '.sites',
    meta: { dark: mode, auth: true, name: 'Centros' },
    component: Sites
  },
  {
    path: 'rentings',
    name: prop + '.rentings',
    meta: { dark: mode, auth: true, name: 'Arrendamientos' },
    component: Renting
  },
  {
    path: 'renting',
    name: prop + '.renting',
    meta: { dark: mode, auth: true, name: 'Arrendamiento' },
    component: RentingSide
  },
  {
    path: 'appointment',
    name: prop + '.appointment',
    meta: { dark: mode, auth: true, name: 'Citas' },
    component: Appointment
  }
]

const ServicesRoutes = (prop, mode) => [
  {
    path: 'services',
    name: prop + '.services',
    meta: { dark: mode, auth: true, name: 'ServicesParent' },
    component: ServicesParent
  },
  {
    path: 'services',
    name: prop + '.services',
    meta: { dark: mode, auth: true, name: 'Services' },
    component: Services
  },
  {
    path: 'services',
    name: prop + '.services',
    meta: { dark: mode, auth: true, name: 'Therapy' },
    component: Therapy
  }
]

const LaboratoryRoutes = (prop, mode) => [
  {
    path: 'examinations',
    name: prop + '.examinations',
    meta: { dark: mode, auth: true, name: 'Examenes' },
    component: Examinations
  },
  {
    path: 'ExternalExaminations',
    name: prop + '.ExternalExaminations',
    meta: { dark: mode, auth: true, name: 'Examenes Externos' },
    component: ExternalExaminations
  },
  {
    path: 'SalesInventory',
    name: prop + '.SalesInventory',
    meta: { dark: mode, auth: true, name: 'Inventario de ventas' },
    component: SalesInventory
  },
  {
    path: 'supplies',
    name: prop + '.SuppliesInventory',
    meta: { dark: mode, auth: true, name: 'Inventario de insumos' },
    component: SuppliesInventory
  },
  {
    path: 'SuppliesLab',
    name: prop + '.SuppliesLab',
    meta: { dark: mode, auth: true, name: 'Insumos de Laboratorio' },
    component: SuppliesLab
  },
  {
    path: 'TipoInsumos',
    name: prop + '.SuppliesType',
    meta: { dark: mode, auth: true, name: 'Tipo de insumos' },
    component: TipoInsumos
  },
  {
    path: 'ExamType',
    name: prop + '.ExamType',
    meta: { dark: mode, auth: true, name: 'Tipo de examenes' },
    component: ExamType
  },
  {
    path: 'Laboratory',
    name: prop + '.Laboratory',
    meta: { dark: mode, auth: true, name: 'Laboratorio' },
    component: Laboratory
  }

]
const DoctorRoutes = (prop, mode) => [
  {
    path: 'specialties',
    name: prop + '.specialties',
    meta: { dark: mode, auth: true, name: 'Especialidades' },
    component: Specialties
  },
  {
    path: 'medicos',
    name: prop + '.medicos',
    meta: { dark: mode, auth: true, name: 'Médicos' },
    component: Medicos
  },
  {
    path: 'tipomedicos',
    name: prop + '.tipomedicos',
    meta: { dark: mode, auth: true, name: 'Tipo medicos' },
    component: TipoMedicos
  },
  {
    path: 'medics',
    name: prop + '.medics',
    meta: { dark: mode, auth: true, name: 'Medicos' },
    component: Medics
  }
]

const GaloTechRoutes = (prop, mode) => [
  {
    path: 'purchases',
    name: prop + '.purchases',
    meta: { dark: mode, auth: true, name: 'Compras' },
    component: PurchasesGT
  },
  {
    path: 'sales',
    name: prop + '.sales',
    meta: { dark: mode, auth: true, name: 'Ventas' },
    component: SalesGT
  },
  {
    path: 'equipmenttype',
    name: prop + '.equipmenttype',
    meta: { dark: mode, auth: true, name: 'Tipo de Equipo' },
    component: EquipmentTypeGT
  },
  {
    path: 'equipment',
    name: prop + '.equipment',
    meta: { dark: mode, auth: true, name: 'Equipo' },
    component: EquipmentGT
  },
  {
    path: 'inventory',
    name: prop + '.inventory',
    meta: { dark: mode, auth: true, name: 'Inventario' },
    component: InventoryGT
  },
  {
    path: 'adjustment',
    name: prop + '.inventoryAdjustment',
    meta: { dark: mode, auth: true, name: 'Ajuste de inventario' },
    component: InventoryAdjustmentGT
  },
  {
    path: 'reports',
    name: prop + '.galotechReports',
    meta: { dark: mode, auth: true, name: 'Reporte de inventario' },
    component: GaloTechReports
  },
  {
    path: 'galoTech',
    name: prop + '.galoTech',
    meta: { dark: mode, auth: true, name: 'GaloTech' },
    component: GaloTech
  }
]

const AccountingRoutes = (prop, mode) => [
  {
    path: 'buylist',
    name: prop + '.buylist',
    meta: { dark: mode, auth: true, name: 'Lista de compras' },
    component: Buylist
  },
  {
    path: 'cash',
    name: prop + '.receipt',
    meta: { dark: mode, auth: true, name: 'Cobros' },
    component: Cobros
  },
  {
    path: 'closures',
    name: prop + '.closures',
    meta: { dark: mode, auth: true, name: 'Cierres' },
    component: Closures
  },
  {
    path: 'Purchases',
    name: prop + '.purchases',
    meta: { dark: mode, auth: true, name: 'Compras' },
    component: Purchases
  },
  {
    path: 'Partidas',
    name: prop + '.Partidas',
    meta: { dark: mode, auth: true, name: 'Partidas' },
    component: Partidas
  },
  {
    path: 'NuevasPartidas',
    name: prop + '.NuevasPartidas',
    meta: { dark: mode, auth: true, name: 'NuevasPartidas' },
    component: NuevasPartidas
  },
  {
    path: 'EditPartida/:id',
    name: prop + '.EditPartida',
    meta: { dark: mode, auth: true, name: 'EditPartida' },
    component: EditPartida
  },
  {
    path: 'BooksParent',
    name: prop + '.BooksParent',
    meta: { dark: mode, auth: true, name: 'Libros' },
    component: BooksParent
  },
  {
    path: 'Banks',
    name: prop + '.Banks',
    meta: { dark: mode, auth: true, name: 'Bancos' },
    component: Banks
  },
  {
    path: 'BanksParent',
    name: prop + '.BanksParent',
    meta: { dark: mode, auth: true, name: 'Bancos principal' },
    component: BanksParent
  },
  {
    path: 'BankAccounts',
    name: prop + '.BankAccounts',
    meta: { dark: mode, auth: true, name: 'Cuentas de banco' },
    component: BankAccounts
  },
  {
    path: 'PurchasesDataParent',
    name: prop + '.PurchasesDataParent',
    meta: { dark: mode, auth: true, name: 'Datos de compras' },
    component: PurchasesDataParent
  },
  {
    path: 'SalesNomenclature',
    name: prop + '.SalesNomenclature',
    meta: { dark: mode, auth: true, name: 'Nomenclaturas' },
    component: SalesNomenclature
  },
  {
    path: 'saleslist',
    name: prop + '.saleslist',
    meta: { dark: mode, auth: true, name: 'Lista de ventas' },
    component: SalesList
  },
  {
    path: 'salesaccounting',
    name: prop + '.salesaccounting',
    meta: { dark: mode, auth: true, name: 'Lista de ventas pendientes de contabilidad' },
    component: SalesAccounting
  },
  {
    path: 'reports',
    name: prop + '.reports',
    meta: { dark: mode, auth: true, name: 'Reportes' },
    component: Reports
  },
  {
    path: 'Sales',
    name: prop + '.sales',
    meta: { dark: mode, auth: true, name: 'Ventas' },
    component: Sales
  },
  {
    path: 'SalesCash',
    name: prop + '.salescash',
    meta: { dark: mode, auth: true, name: 'Ventas' },
    component: SalesCash
  }
]

const childRoutes = (prop, mode) => [
  {
    path: 'home-1',
    name: prop + '.home-1',
    meta: { dark: mode, auth: true, name: 'Home 1' },
    component: Dashboard1
  },
  {
    path: '`home-2`',
    name: prop + '.home-2',
    meta: { dark: mode, auth: true, name: 'Home 2' },
    component: Dashboard2
  },
  {
    path: 'home-3',
    name: prop + '.home-3',
    meta: { dark: mode, auth: true, name: 'Home 3' },
    component: Dashboard3
  },
  {
    path: 'home-5',
    name: prop + '.home-5',
    meta: { dark: mode, auth: true, name: 'Home 5' },
    component: Dashboard5
  },
  {
    path: '/home-4',
    name: prop + '.home-4',
    meta: { dark: mode, auth: true, name: 'Home 4' },
    component: Dashboard4
  }
]

const coreChildRoute = (prop, mode) => [
  {
    path: 'ui-colors',
    name: prop + '.color',
    meta: { dark: mode, auth: true, name: 'Colors' },
    component: UiColors
  },
  {
    path: 'ui-typography',
    name: prop + '.typography',
    meta: { dark: mode, auth: true, name: 'Typography' },
    component: UiTypography
  },
  {
    path: 'ui-alerts',
    name: prop + '.alert',
    meta: { dark: mode, auth: true, name: 'Alert' },
    component: UiAlerts
  },
  {
    path: 'ui-buttons',
    name: prop + '.button',
    meta: { dark: mode, auth: true, name: 'Button' },
    component: UiButtons
  },
  {
    path: 'ui-breadcrumb',
    name: prop + '.breadcrumb',
    meta: { dark: mode, auth: true, name: 'Breadcrumb' },
    component: UiBreadcrumb
  },
  {
    path: 'ui-badges',
    name: prop + '.badges',
    meta: { dark: mode, auth: true, name: 'Badges' },
    component: UiBadges
  },
  {
    path: 'ui-cards',
    name: prop + '.cards',
    meta: { dark: mode, auth: true, name: 'Card' },
    component: UiCards
  },
  {
    path: 'ui-carousel',
    name: prop + '.carousel',
    meta: { dark: mode, auth: true, name: 'Carousel' },
    component: UiCarousel
  },
  {
    path: 'ui-grid',
    name: prop + '.grid',
    meta: { dark: mode, auth: true, name: 'Grid' },
    component: UiGrid
  },
  {
    path: 'ui-embed-video',
    name: prop + '.embed-video',
    meta: { dark: mode, auth: true, name: 'Embed Video' },
    component: UiEmbedVideo
  },
  {
    path: 'ui-modal',
    name: prop + '.modal',
    meta: { dark: mode, auth: true, name: 'Model' },
    component: UiModal
  },
  {
    path: 'ui-listgroup',
    name: prop + '.listgroup',
    meta: { dark: mode, auth: true, name: 'List Group' },
    component: UiListGroup
  },
  {
    path: 'ui-images',
    name: prop + '.images',
    meta: { dark: mode, auth: true, name: 'Image' },
    component: UiImages
  },
  {
    path: 'ui-media-object',
    name: prop + '.media-object',
    meta: { dark: mode, auth: true, name: 'Media Object' },
    component: UiMediaObject
  },
  {
    path: 'ui-pagination',
    name: prop + '.pagination',
    meta: { dark: mode, auth: true, name: 'Paginations' },
    component: UiPagination
  },
  {
    path: 'ui-progressbars',
    name: prop + '.progressbars',
    meta: { dark: mode, auth: true, name: 'Progressbar' },
    component: UiProgressBars
  },
  {
    path: 'ui-tooltips',
    name: prop + '.tooltips',
    meta: { dark: mode, auth: true, name: 'Tooltip' },
    component: UiTooltips
  },
  {
    path: 'ui-popovers',
    name: prop + '.popovers',
    meta: { dark: mode, auth: true, name: 'Popover' },
    component: UiPopovers
  },
  {
    path: 'ui-notifications',
    name: prop + '.notifications',
    meta: { dark: mode, auth: true, name: 'Notification' },
    component: UiNotifications
  },
  {
    path: 'ui-tabs',
    name: prop + '.tabs',
    meta: { dark: mode, auth: true, name: 'Tabs' },
    component: UiTabs
  }
]
const formChildRoute = (prop, mode = false) => [
  {
    path: 'form-layout',
    name: prop + '.layout',
    meta: { dark: mode, auth: true, name: 'Layout' },
    component: FormLayout
  },
  {
    path: 'form-validate',
    name: prop + '.validate',
    meta: { dark: mode, auth: true, name: 'Validate' },
    component: FormValidates
  },
  {
    path: 'form-switches',
    name: prop + '.switch',
    meta: { dark: mode, auth: true, name: 'Switch' },
    component: FormSwitches
  },
  {
    path: 'form-radios',
    name: prop + '.radio',
    meta: { dark: mode, auth: true, name: 'Radio' },
    component: FormRadios
  },
  {
    path: 'form-checkboxes',
    name: prop + '.checkbox',
    meta: { dark: mode, auth: true, name: 'Checkbox' },
    component: FormCheckboxes
  }
]

const tableChildRoute = (prop, mode = false) => [
  {
    path: 'tables-basic',
    name: prop + '.basic',
    meta: { dark: mode, auth: true, name: 'Basic' },
    component: TablesBasic
  },
  {
    path: 'data-table',
    name: prop + '.dataTable',
    meta: { dark: mode, auth: true, name: 'Datatable' },
    component: DataTable
  },
  {
    path: 'editable',
    name: prop + '.editable',
    meta: { dark: mode, auth: true, name: 'Editable' },
    component: EditableTable
  }
]

const iconChildRoute = (prop, mode = false) => [
  {
    path: 'dripicons',
    name: prop + '.dripicons',
    meta: { dark: mode, auth: true, name: 'Dripicons' },
    component: IconDripicons
  },
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { dark: mode, auth: true, name: 'Font Awsome' },
    component: IconFontawesome5
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { dark: mode, auth: true, name: 'Line Awsome' },
    component: IconLineAwesome
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { dark: mode, auth: true, name: 'Remixicon' },
    component: IconRemixicon
  },
  {
    path: 'unicons',
    name: prop + '.unicons',
    meta: { dark: mode, auth: true, name: 'Unicon' },
    component: IconUnicons
  }
]

const chartChildRoutes = (prop, mode = false) => [
  {
    path: 'apex-charts',
    name: prop + '.apex',
    meta: { dark: mode, auth: true, name: 'Apex Chat' },
    component: ApexCharts
  },
  {
    path: 'am-charts',
    name: prop + '.am',
    meta: { dark: mode, auth: true, name: 'Am Chart' },
    component: AmCharts
  },
  {
    path: 'high-charts',
    name: prop + '.high',
    meta: { dark: mode, auth: true, name: 'High Chart' },
    component: HighCharts
  },
  {
    path: 'morris-charts',
    name: prop + '.morris',
    meta: { dark: mode, auth: true, name: 'Mirris Chart' },
    component: MorrisCharts
  }
]

const appChildRoute = (prop, mode = false) => [
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { dark: mode, auth: true, name: 'Calendar' },
    component: Calendar
  },
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { dark: mode, auth: true, name: 'Chat' },
    component: ChatIndex
  },
  {
    path: 'email',
    name: prop + '.email',
    meta: { dark: mode, auth: true, name: 'Email' },
    component: EmailListing
  },
  {
    path: 'email-compose',
    name: prop + '.email.compose',
    meta: { dark: mode, auth: true, name: 'New Email' },
    component: EmailCompose
  }
]

const authChildRoutes = (prop, mode = false) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { dark: mode, auth: true },
    component: SignIn1
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { dark: mode, auth: true },
    component: SignUp1
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { dark: mode, auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { dark: mode, auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { dark: mode, auth: true },
    component: ConfirmMail1
  }
]
const authChildRoutes2 = (prop, mode = false) => [
  {
    path: '/',
    name: prop + '.login',
    meta: { dark: mode, auth: true },
    component: SignIn1
  }
]

const mapChildRoute = (prop, mode = false) => [
  {
    path: 'google-maps',
    name: prop + '.google',
    meta: { dark: mode, auth: true, name: 'Google map' },
    component: GoogleMaps
  },
  {
    path: 'vector-maps',
    name: prop + '.vector',
    meta: { dark: mode, auth: true, name: 'Vector Detail' },
    component: VectorMaps
  }
]

const defaultlayout = (prop, mode = false) => [
  {
    path: 'timeline',
    name: prop + '.timeline',
    meta: { dark: mode, auth: true, name: 'Timeline' },
    component: TimeLine
  },
  {
    path: 'invoice',
    name: prop + '.invoice',
    meta: { dark: mode, auth: true, name: 'Invoice' },
    component: Invoice
  },
  {
    path: 'blank-page',
    name: prop + '.blank-page',
    meta: { dark: mode, auth: true, name: 'Blank Page' },
    component: BlankPage
  },
  {
    path: 'pricing',
    name: prop + '.pricing',
    meta: { dark: mode, auth: true, name: 'Pricing' },
    component: Pricing
  },
  {
    path: 'pricing-1',
    name: prop + '.pricing1',
    meta: { dark: mode, auth: true, name: 'Pricing 1' },
    component: Pricing1
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { dark: mode, auth: true, name: 'Faq' },
    component: FAQ
  }
]

const pagesChildRoutes = (prop, mode = false) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    meta: { dark: mode, auth: true },
    component: ErrorPage
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { dark: mode, auth: true },
    component: ComingSoon
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    meta: { dark: mode, auth: true },
    component: Maintenance
  }
]
const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { dark: mode, auth: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile-edit',
    name: prop + '.edit',
    meta: { dark: mode, auth: true, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { dark: mode, auth: true, name: 'Add Profile' },
    component: AddUser
  },
  {
    path: 'user-list',
    name: prop + '.list',
    meta: { dark: mode, auth: true, name: 'User List' },
    component: UserList
  }
]

const pluginsChildRoute = (prop, mode = false) => [
  {
    path: 'datepicker',
    name: prop + '.datepicker',
    meta: { dark: mode, auth: true, name: 'Datepicker' },
    component: DatepickerDemo
  },
  {
    path: 'select',
    name: prop + '.select',
    meta: { dark: mode, auth: true, name: 'Select' },
    component: SelectDemo
  },
  {
    path: 'draggable',
    name: prop + '.draggable',
    meta: { dark: mode, auth: true, name: 'Draggable' },
    component: DragDropDemo
  },
  {
    path: 'treeview',
    name: prop + '.treeview',
    meta: { dark: mode, auth: true, name: 'Tree View' },
    component: AppTreeView
  }
]

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: Layout1,
    meta: { auth: true },
    children: AdminRoutes('admin')
  },
  {
    path: '/pharmacy',
    name: 'pharmacy',
    component: Layout1,
    meta: { auth: true },
    children: PharmacyRoutes('pharmacy')
  },
  {
    path: '/cash',
    name: 'cash',
    component: Layout1,
    meta: { auth: true },
    children: CashRoutes('cash')
  },
  {
    path: '/patient',
    name: 'patient',
    component: Layout1,
    meta: { auth: true },
    children: PatientRoutes('patient')
  },
  {
    path: '/renting',
    name: 'renting',
    component: Layout1,
    meta: { auth: true },
    children: RentingRoutes('renting')
  },
  {
    path: '/services',
    name: 'services',
    component: Layout1,
    meta: { auth: true },
    children: ServicesRoutes('services')
  },
  {
    path: '/laboratory',
    name: 'laboratory',
    component: Layout1,
    meta: { auth: true },
    children: LaboratoryRoutes('laboratory')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: Layout1,
    meta: { auth: true },
    children: DoctorRoutes('doctor')
  },
  {
    path: '/galotech',
    name: 'galotech',
    component: Layout1,
    meta: { auth: true },
    children: GaloTechRoutes('galotech')
  },
  {
    path: '/reports',
    name: 'reports',
    component: Layout1,
    meta: { auth: true },
    children: ReportsRoutes('reports')
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: Layout1,
    meta: { auth: true },
    children: AccountingRoutes('accounting')
  },
  {
    path: '/',
    name: 'login',
    component: AuthLayout1,
    meta: { auth: true },
    children: authChildRoutes2('login')
  },
  {
    path: '/',
    name: 'dashboard',
    component: Layout1,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/core',
    name: 'core',
    component: Layout1,
    meta: { auth: true },
    children: coreChildRoute('core')
  },
  {
    path: '/table',
    name: 'table',
    component: Layout1,
    meta: { auth: true },
    children: tableChildRoute('table')
  },
  {
    path: '/chart',
    name: 'chart',
    component: Layout1,
    meta: { auth: true },
    children: chartChildRoutes('chart')
  },
  {
    path: '/icon',
    name: 'icon',
    component: Layout1,
    meta: { auth: true },
    children: iconChildRoute('icon')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout1,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/pages',
    name: 'pages',
    component: Default,
    meta: { auth: true },
    children: pagesChildRoutes('default')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: Layout1,
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/app',
    name: 'app',
    component: Layout1,
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: Layout1,
    meta: { auth: true },
    children: userChildRoute('doctor')
  },
  {
    path: '/map',
    name: 'map',
    component: Layout1,
    meta: { auth: true },
    children: mapChildRoute('map')
  },
  {
    path: '/form',
    name: 'form',
    component: Layout1,
    meta: { auth: true },
    children: formChildRoute('form')
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: Layout1,
    meta: { auth: true },
    children: pluginsChildRoute('plugins')
  },
  {
    path: '/callback',
    name: 'callback',
    meta: { auth: false },
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
