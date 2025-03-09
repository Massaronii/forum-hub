import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentAnswerUseCaseReponse {}

export class DeleteAnswerCommentAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentAnswerUseCaseRequest): Promise<DeleteAnswerCommentAnswerUseCaseReponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
