import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

// sut = system under test
describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('question-id'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-id',
      authorId: 'author-id',
      title: 'new title',
      content: 'new content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    })
  })

  it('Should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('question-id'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        questionId: 'question-id',
        authorId: 'author-idd',
        title: 'new title',
        content: 'new content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
