import { Answer } from "../entites/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
    InstructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {

    constructor(private anwsersRepository: AnswersRepository) {}

    async execute({ InstructorId, questionId , content}: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            content,
            authorId: InstructorId,
            questionId,
        })

        await this.anwsersRepository.create(answer)

        return answer
    }   
}