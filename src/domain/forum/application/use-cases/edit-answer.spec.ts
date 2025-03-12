import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryanswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

// sut = system under test
describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryanswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryanswersRepository)
  })

  it('Should be able to edit a answer', async () => {
    const newanswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('answer-id'),
    )
    await inMemoryanswersRepository.create(newanswer)

    await sut.execute({
      answerId: 'answer-id',
      authorId: 'author-id',
      content: 'new content',
    })

    expect(inMemoryanswersRepository.items[0]).toMatchObject({
      content: 'new content',
    })
  })

  it('Should not be able to edit a answer from another user', async () => {
    const newanswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('answer-id'),
    )
    await inMemoryanswersRepository.create(newanswer)

    const result = await sut.execute({
      answerId: 'answer-id',
      authorId: 'author-idd',
      content: 'new content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
