import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';

export class UpdateReportCoordinatorFeedbackHandler implements IHandler {
    private _ReportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this._ReportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const studentUsername = req.body.num_usp;
        const coordinatorOpinion = req.body.coordinatorOpinion;
        const coordinatorComment = req.body.coordinatorComment;
        const report = await this._ReportRepository.findLatestByNumeroUSP(studentUsername);
        if (!report) {
            res.status(404).send();
            return;
        }
        report.coordenadorParecer = coordinatorOpinion;
        report.coordenadorComentario = coordinatorComment;
        const new_report = await this._ReportRepository.save((report));
        res.status(200).send(new_report);
    }
}