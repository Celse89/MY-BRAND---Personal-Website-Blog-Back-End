export const Messages = {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Message:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - message
     *       properties:
     *         name:
     *           type: string
     *           description: The name of the sender
     *         email:
     *           type: string
     *           description: The email of the sender
     *         message:
     *           type: string
     *           description: The message content
     *         replies:
     *           type: array
     *           items:
     *             type: string
     *           description: The replies to the message
     *       example:
     *         name: Sender Name
     *         email: sender@example.com
     *         message: This is a message
     *         replies: ["Reply1", "Reply2"]
     */
    };