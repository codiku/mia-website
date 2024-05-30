/**
  * @swagger
  * /api/human:
  *   post:
  *     tags:
  *       - Human
  *     description: Create a new human
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/PostHumanModelBody'
  *     responses:
  *       200:
  *         description: Returns the created human
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/HumanModel'
  *       400:
  *         description: Bad request if the human data is invalid
  */
  
  /**
  * @swagger
  * /api/human:
  *   get:
  *     tags:
  *       - Human
  *     description: Get all humans
  *     responses:
  *       200:
  *         description: Returns a list of humans
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/HumanModel'
  *       400:
  *         description: Bad request if the human data is invalid
  */

  /**
 * @swagger
 * /api/human/{id}:
 *   get:
 *     tags:
 *       - Human
 *     description: Get a specific human by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested human
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HumanModel'
 *       400:
 *         description: Bad request if the human id is invalid or not found
 */

  /**
 * @swagger
 * /api/human/{id}:
 *   patch:
 *     tags:
 *       - Human
 *     description: Update a specific human by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchHumanModelBody'
 *     responses:
 *       200:
 *         description: Returns the updated human
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HumanModel'
 *       400:
 *         description: Bad request if the human id is invalid or not found
 */

  /**
 * @swagger
 * /api/human/{id}:
 *   delete:
 *     tags:
 *       - Human
 *     description: Delete a specific human by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HumanModel'
 *       400:
 *         description: Bad request if the human id is invalid or not found
 */
  