export const User = {
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin or not
 *         avatar:
 *           type: string
 *           description: The user's avatar
 *         socialMediaLinks:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *             twitter:
 *               type: string
 *             linkedin:
 *               type: string
 *           description: The user's social media links
 *         passwordResetToken:
 *           type: string
 *           description: The user's password reset token
 *         passwordResetTokenExpires:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the user's password reset token
 *         subscribed:
 *           type: boolean
 *           description: Whether the user is subscribed or not
 *         profilePicture:
 *           type: string
 *           description: The user's profile picture
 *       example:
 *         username: user1
 *         email: user1@example.com
 *         password: passw0rd
 *         isAdmin: false
 *         avatar: https://example.com/avatar1.jpg
 *         socialMediaLinks:
 *           facebook: https://facebook.com/user1
 *           twitter: https://twitter.com/user1
 *           linkedin: https://linkedin.com/in/user1
 *         passwordResetToken: null
 *         passwordResetTokenExpires: null
 *         subscribed: false
 *         profilePicture: https://example.com/profile1.jpg
 */
};