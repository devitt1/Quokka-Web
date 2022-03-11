export type RegisterUserDto = {
    email: string,
    password: string,
    confirmPassword: string,
}

export type LoginUserDto = {
    email: string,
    password: string
}

export type AuthenticatedUserDto = {
    email: string,
}
