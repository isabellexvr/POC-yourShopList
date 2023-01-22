import { getUserByEmail } from '../repositories/userRepository';
import { userAlreadyExistsError } from '../errors/signUpErrors';

export async function checkUserExistence(email: string) {

    const isThereAnyUser = await getUserByEmail(email)
    if (isThereAnyUser.rows.length > 0) throw userAlreadyExistsError()
}