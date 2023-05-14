export const Cargos = {
    ADMIN: 'admin',
    USER: 'user',
  };

export const temCargo = (userRole: string, requiredRole: string) => {
    // Implemente a lógica para verificar se o usuário tem o papel necessário
    return userRole === requiredRole;
  };