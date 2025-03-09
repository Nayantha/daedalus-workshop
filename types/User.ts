import type { User } from '@prisma/client';

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: any;
}

export interface LoginDTO {
    email: string;
    password: string;
}

// For creating new users
export type CreateUserDB = Omit<User, 'id'>;
export type UpdateUserDB = Partial<Omit<User, 'id'>>;
export type PublicUser = Omit<User, 'password' | 'salt'>;