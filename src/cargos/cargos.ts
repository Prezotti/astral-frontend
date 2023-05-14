import jwt, { JwtPayload } from "jsonwebtoken";

export const Cargos = {
    ADMINISTRADOR: 'Administrador',
    PRODUTOR: 'Produtor',
  };

export const temCargo = (token: string, requiredRole: string) => {
    const tokenDecodificado = jwt.decode(token) as JwtPayload;
    const userRole = tokenDecodificado.role;
    return userRole === requiredRole;
  };