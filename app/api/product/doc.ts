/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     description: Update a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchProductModelBody'
 *     responses:
 *       200:
 *         description: Returns the updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModel'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */
 /**
  * @swagger
  * /api/product:
  *   get:
  *     description: Get all products
  *     responses:
  *       200:
  *         description: Returns a list of products
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/ProductModel'
  *       400:
  *         description: Bad request if the product data is invalid
  */
/**
 * @swagger
 * /api/product:
 *   post:
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostProductBody'
 *     responses:
 *       200:
 *         description: Returns the created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostProduct'
 *       400:
 *         description: Bad request if the product data is invalid
 */
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     description: Delete a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModel'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */