import bcrypt from 'bcrypt';

export class BcryptUtils{
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      }
      
    static async comparePassword(password: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}

