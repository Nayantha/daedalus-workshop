import type { Users } from '@prisma/client';

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

// For creating new users
export type CreateUserDB = Omit<Users, 'id'>;
export type UpdateUserDB = Partial<Omit<Users, 'id'>>;
export type PublicUser = Omit<Users, 'password' | 'salt'>;