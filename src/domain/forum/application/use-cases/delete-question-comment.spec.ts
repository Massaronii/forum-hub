import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentQuestionUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentQuestionUseCase

// sut = system under test
describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentQuestionUseCase(
      inMemoryQuestionCommentsRepository,
    )
  })

  it('Should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete another users question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    expect(
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-idddd',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
