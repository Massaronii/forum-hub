import { Answer } from '../../enterprise/entities/answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  InstructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private anwsersRepository: AnswersRepository) {}

  async execute({
    InstructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(InstructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.anwsersRepository.create(answer)

    return {
      answer,
    }
  }
}
