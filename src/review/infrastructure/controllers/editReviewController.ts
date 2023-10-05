import { Request, Response } from 'express';
import { EditReviewUseCase } from '../../application/editReviewUseCase';

export class EditReviewController {
    constructor(private editReviewUseCase: EditReviewUseCase) {}
  
    async updateReview(req: Request, res: Response): Promise<void> {
      try {
        // Obtén los valores de los parámetros y del cuerpo de la solicitud
        const idUser = parseInt(req.params.idUser);
        const idReview = parseInt(req.params.idReview);
        const { comment, status, idBook } = req.body;
  
    
        console.log('idUser:', idUser);
        console.log('idReview:', idReview);
        console.log('comment:', comment);
        console.log('status:', status);
        console.log('idBook:', idBook);
  

        const updatedReview = await this.editReviewUseCase.updateReview(
          idReview,
          comment,
          status,
          idUser,
          idBook
        );
  
        if (updatedReview) {
          res.status(200).json(updatedReview);
        } else {
          res.status(404).json({ error: 'Reseña no encontrada o no autorizada para actualizar.' });
        }
      } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
      }
    }
}
  

