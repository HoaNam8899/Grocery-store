import * as bcrypt from 'bcrypt';

export class Bcrypt {

    async hashPassword(saltOrRounds: number, password: string): Promise<string> {
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }

}