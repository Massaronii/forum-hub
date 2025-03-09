import { DeleteAnswerCommentAnswerUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentAnswerUseCase

// sut = system under test
describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('Should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete another users answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-idddd',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
