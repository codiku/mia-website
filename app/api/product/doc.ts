/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostProductSchemaBody'
 *     responses:
 *       200:
 *         description: Returns the created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSchema'
 *       400:
 *         description: Bad request if the product data is invalid
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - Product
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Returns a list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductSchema'
 *       400:
 *         description: Bad request if the product data is invalid
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     description: Get a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSchema'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     tags:
 *       - Product
 *     description: Update a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchProductSchemaBody'
 *     responses:
 *       200:
 *         description: Returns the updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSchema'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     description: Delete a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSchema'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */
