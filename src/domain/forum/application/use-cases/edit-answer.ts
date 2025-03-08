import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseReponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseReponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer,
    }
  }
}
