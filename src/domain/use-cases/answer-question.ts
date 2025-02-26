import { create } from "domain"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface AnswerQuestionUseCaseRequest {
    InstructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {

    constructor(private anwsersRepository: AnswersRepository) {}

    async execute({ InstructorId, questionId , content}: AnswerQuestionUseCaseRequest) {

        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(InstructorId),
            questionId: new UniqueEntityId(questionId),
        })

        await this.anwsersRepository.create(answer)

        return answer
    }   
}