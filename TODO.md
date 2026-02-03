# TODO - Login Fix and Database Restructuring

## Completed Tasks
- [x] Analyze current database structure and login implementation
- [x] Create new database schema with separate tables for each role (director, subdirectora, secretaria, orientador, docente)
- [x] Update login API to query appropriate tables based on role
- [x] Add password fields to role tables (including profesores for docente role)
- [x] Remove usuario_id references from estudiantes and profesores tables
- [x] Update foreign key constraints to remove references to old usuarios table

## Pending Tasks
- [ ] Test the new login functionality with the updated database
- [ ] Update any other API endpoints that reference the old `usuarios` table
- [ ] Update foreign key references in other tables if needed
- [ ] Verify all role-based access works correctly

## Database Changes Summary
- **Removed**: `usuarios` table
- **Added**: Separate tables for each role:
  - `director` (id, nombre, correo, contraseña, telefono, activo, timestamps)
  - `subdirectora` (id, nombre, correo, contraseña, telefono, activo, timestamps)
  - `secretaria` (id, nombre, correo, contraseña, telefono, activo, timestamps)
  - `orientador` (id, nombre, correo, contraseña, telefono, activo, timestamps)
  - `profesores` (updated with contraseña field for docente role)
- **Updated**: Foreign key references to point to appropriate role tables
- **Migrated**: Existing user data to new role-specific tables

## Next Steps
1. Apply the new database schema to XAMPP
2. Test login with different roles
3. Fix any remaining issues
