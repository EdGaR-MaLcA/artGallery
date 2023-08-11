import { UserDetails } from "./userDetails";

export interface AuthResponse {
    token: string;
    user: UserDetails; // Aquí asumo que UserDetails es la interfaz que contiene los datos del usuario
}