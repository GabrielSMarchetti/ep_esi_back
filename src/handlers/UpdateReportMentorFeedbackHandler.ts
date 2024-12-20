import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';

export class UpdateReportMentorFeedbackHandler implements IHandler {
    private _ReportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this._ReportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const studentUsername = req.body.studentId;
        const professorOpinion = req.body.professorOpinion;
        const professorComment = req.body.professorComment;
        const report = await this._ReportRepository.findLatestByNumeroUSP(studentUsername);
        if (!report) {
            res.status(404).send();
            return;
        }
        report.professorParecer = professorOpinion;
        report.professorComentario = professorComment;
        const new_report = await this._ReportRepository.save((report));
        res.status(200).send(new_report);
    }
}