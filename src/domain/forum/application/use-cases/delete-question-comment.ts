import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentQuestionUseCaseReponse {}

export class DeleteQuestionCommentQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentQuestionUseCaseRequest): Promise<DeleteQuestionCommentQuestionUseCaseReponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
