import express, { Router, Request, Response } from 'express';
import { ReviewUseCase } from '../../application/usecases/ReviewUseCase';
import { ReviewRepository } from '../repositories/ReviewRepository';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

const reviewRepository = new ReviewRepository();
const reviewUseCase = new ReviewUseCase(reviewRepository);

declare global {
    namespace Express {
        interface Request {
            userId: string; // Define el tipo de userId como string
        }
    }
}

const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, 'alberto', (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Token no válido' });
        }
        req.userId = decoded.userId;
        next();
    });
};

router.post('/create', verifyToken, async (req, res) => {
    try {
        const review = req.body;
        const createdReview = await reviewUseCase.createReview(review);
        res.status(201).json('Reseña creada con éxito.');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await reviewUseCase.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/reviews/:id', verifyToken, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await reviewUseCase.getReviewById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/inactive-status', verifyToken, async (req, res) => {
    try {
        const reviews = await reviewUseCase.getReviewsWithStatus();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update/review/:id', verifyToken, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.userId; // Obtén el ID del usuario del token
        const updatedReviewData = req.body;

        const existingReview = await reviewUseCase.getReviewById(reviewId);

        if (!existingReview) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        // Verifica si el usuario que intenta actualizar la reseña es el autor
        if (existingReview.idUser !== userId) {
            return res.status(403).json({ error: 'No tienes permisos para actualizar esta reseña' });
        }

        const updatedReview = await reviewUseCase.updateReview(reviewId, updatedReviewData);

        res.status(200).json('Reseña actualizada correctamente');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/reviews/:id/change-status', verifyToken, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.userId; // Obtén el ID del usuario del token
        const newStatus = req.body.status;

        const existingReview = await reviewUseCase.getReviewById(reviewId);

        if (!existingReview) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        // Verifica si el usuario que intenta cambiar el estado de la reseña es el autor
        if (existingReview.idUser !== userId) {
            return res.status(403).json({ error: 'No tienes permisos para cambiar el estado de esta reseña' });
        }

        const updatedReview = await reviewUseCase.changeReviewStatus(reviewId, newStatus);

        res.status(200).json('Estado de la reseñada actualizada correctamente');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/filter/user/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Verifica si el usuario que intenta acceder es el mismo que se está solicitando
        if (req.userId !== userId) {
            return res.status(403).json({ error: 'No tienes permisos para acceder a estas reseñas' });
        }

        const reviews = await reviewUseCase.filterReviewsByUserId(userId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.userId; // Obtén el ID del usuario del token

        const review = await reviewUseCase.getReviewById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        // Verifica si el usuario que intenta eliminar la reseña es el autor
        if (review.idUser !== userId) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar esta reseña' });
        }

        await reviewUseCase.deleteReview(reviewId);

        res.status(200).json({ message: 'Reseña eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;