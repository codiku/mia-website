/**
  * @swagger
  * /api/animal:
  *   post:
  *     tags:
  *       - Animal
  *     description: Create a new animal
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/PostAnimalModelBody'
  *     responses:
  *       200:
  *         description: Returns the created animal
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/AnimalModel'
  *       400:
  *         description: Bad request if the animal data is invalid
  */
  
  /**
  * @swagger
  * /api/animal:
  *   get:
  *     tags:
  *       - Animal
  *     description: Get all animals
  *     responses:
  *       200:
  *         description: Returns a list of animals
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/AnimalModel'
  *       400:
  *         description: Bad request if the animal data is invalid
  */

  /**
 * @swagger
 * /api/animal/{id}:
 *   get:
 *     tags:
 *       - Animal
 *     description: Get a specific animal by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalModel'
 *       400:
 *         description: Bad request if the animal id is invalid or not found
 */

  /**
 * @swagger
 * /api/animal/{id}:
 *   patch:
 *     tags:
 *       - Animal
 *     description: Update a specific animal by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchAnimalModelBody'
 *     responses:
 *       200:
 *         description: Returns the updated animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalModel'
 *       400:
 *         description: Bad request if the animal id is invalid or not found
 */

  /**
 * @swagger
 * /api/animal/{id}:
 *   delete:
 *     tags:
 *       - Animal
 *     description: Delete a specific animal by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalModel'
 *       400:
 *         description: Bad request if the animal id is invalid or not found
 */
  