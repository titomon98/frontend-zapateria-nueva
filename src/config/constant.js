// import { UserRole } from '../utils/auth.roles'

export default {
  webBaseURL: process.env.MIX_APP_URL
}
export const apiUrl = 'http://localhost:3000'
// export const apiUrl = 'http://backcorpo.xyz'

export const currentUser = {
  id: 1,
  title: 'Zapateria',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24'
  // role: UserRole.Admin
}
export const isAuthGuardActive = true
