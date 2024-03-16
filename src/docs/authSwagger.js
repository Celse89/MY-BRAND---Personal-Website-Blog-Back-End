import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swaggerConfig.js';

const specs = swaggerJsdoc(options);

export default function(app) {
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(specs));
}
