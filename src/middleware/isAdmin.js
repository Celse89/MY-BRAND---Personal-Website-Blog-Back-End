export const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      let message = '';
      switch (req.method) {
        case 'GET':
          message = 'Admin privileges are required to retrieve this resource.';
          break;
        case 'POST':
          message = 'Admin privileges are required to create this resource.';
          break;
        case 'PUT':
        case 'PATCH':
          message = 'Admin privileges are required to update this resource.';
          break;
        case 'DELETE':
          message = 'Admin privileges are required to delete this resource.';
          break;
        default:
          message = 'Admin privileges are required to access this resource.';
      }
      res.status(403).json({ message });
    }
  };