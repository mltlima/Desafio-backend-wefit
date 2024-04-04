import { IProfileData } from '../interfaces/IProfileData';
import { getConnection } from '../db';

export const createProfile = async (profileData: IProfileData): Promise<void> => {
    const connection = await getConnection();
    try {
        const query = `
            INSERT INTO user_profiles (
                userType, cnpj, cpf, name, cellphone, phone, email, cep, street, number,
                additionalInfo, city, neighborhood, state
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            profileData.userType,
            profileData.userType === 'Pessoa jurídica' ? profileData.cnpj || null : null,
            profileData.userType === 'Pessoa física' ? profileData.cpf || null : null,
            profileData.name,
            profileData.cellphone,
            profileData.phone || null,
            profileData.email,
            profileData.cep,
            profileData.street,
            profileData.number,
            profileData.additionalInfo || null,
            profileData.city,
            profileData.neighborhood,
            profileData.state
        ];

        await connection.execute(query, values);
    } catch (error: any) {
        throw new Error('Failed to create profile in database. Error: ' + error.message);
    } finally {
        connection.release();
    }
};
