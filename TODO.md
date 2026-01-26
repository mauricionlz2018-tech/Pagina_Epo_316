# TODO - Login and Logout Fixes

## Completed Tasks
- [x] Fix login redirection to role-specific panels (e.g., /admin/orientador for orientador role)
- [x] Add logout button to admin layout (available on all admin pages)
- [x] Implement logout functionality that clears localStorage and redirects to login

## Changes Made
1. **app/admin/login/page.tsx**: Changed redirect from `/admin/panel` to `/admin/${data.usuario.rol}`
2. **app/admin/layout.tsx**: 
   - Added logout button with LogOut icon
   - Added handleLogout function to clear tokens and redirect to login
   - Imported necessary icons and router

## Testing Needed
- [ ] Test login with different roles (director, subdirectora, secretaria, orientador, docente)
- [ ] Verify correct redirection to role-specific panels
- [ ] Test logout functionality from all admin pages
- [ ] Ensure old dashboard page is not interfering

## Summary
The login system has been fixed to redirect users to their role-specific panels instead of the generic /admin/panel. A logout button has been added to the admin layout, making it available on all admin pages. The logout functionality clears authentication tokens and redirects to the login page.

The user can now test the login with 'orientador' role and should be redirected to /admin/orientador instead of the old dashboard.

## Notes
- Database already supports 'orientador' role
- Role-specific panels exist for each role
- Layout provides consistent logout across all admin pages
