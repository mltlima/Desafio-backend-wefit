import { IProfileData } from '../interfaces/IProfileData';
import { getConnection } from '../db';

export const createProfile = async (profileData: IProfileData): Promise<void> => {
    const connection = await getConnection();

    try {
        // TODO: verify table name, Replace `user_profiles` with actual table name
        const query = `
            INSERT INTO user_profiles (
                userType, cnpj, cpf, name, cellphone, phone, email, cep, street, number,
                additionalInfo, city, neighborhood, state
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            profileData.userType,
            profileData.userType === 'Pessoa jurídica' ? profileData.cnpj : null,
            profileData.userType === 'Pessoa física' ? profileData.cpf : null,
            profileData.name,
            profileData.cellphone,
            profileData.phone,
            profileData.email,
            profileData.cep,
            profileData.street,
            profileData.number,
            profileData.additionalInfo,
            profileData.city,
            profileData.neighborhood,
            profileData.state
        ];

        await connection.execute(query, values);
    } catch (error: any) {
        console.error(error);
        throw new Error('Failed to create profile in database. Error: ' + error.message);
    } finally {
        connection.release();
    }
};
