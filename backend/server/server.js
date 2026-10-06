import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { categorieRouter } from './routes/categories.js';
