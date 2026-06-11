export { auth as proxy } from '@/auth'

export const config = {
    matcher: ['/dashboard/:path*', '/scan/:path*','/settings/:path*']
}