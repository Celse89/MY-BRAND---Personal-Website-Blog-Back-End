import jwt from "jsonwebtoken";

export class JWT {
    static generateJwt (id, exp='1d') {
        return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: exp})
    }
}