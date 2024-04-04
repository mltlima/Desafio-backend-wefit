export enum UserType {
    PessoaFisica = "Pessoa física",
    PessoaJuridica = "Pessoa jurídica"
}

export interface IProfileData {
    userType: UserType;
    cnpj?: string;            // Required if userType is PessoaJuridica
    cpf?: string;             // Required if userType is PessoaFisica
    name: string;
    cellphone: string;
    phone?: string;
    email: string;
    confirmEmail: string;
    cep: string;
    street: string;
    number: number;
    additionalInfo?: string;
    city: string;
    neighborhood: string;
    state: string;
    agreeToTerms: boolean;
}
