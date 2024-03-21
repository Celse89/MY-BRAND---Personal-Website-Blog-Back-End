export const Comments = {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Comment:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - comment
     *       properties:
     *         name:
     *           type: string
     *           description: The name of the commenter
     *         email:
     *           type: string
     *           description: The email of the commenter
     *         comment:
     *           type: string
     *           description: The comment content
     *         replies:
     *           type: array
     *           items:
     *             type: string
     *           description: The replies to the comment
     *       example:
     *         name: Commenter Name
     *         email: commenter@example.com
     *         comment: This is a comment
     *         replies: ["Reply1", "Reply2"]
     */
    };