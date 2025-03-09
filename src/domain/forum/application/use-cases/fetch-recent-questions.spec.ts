import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

// sut = system under test
describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to get fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 1, 1),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 1, 2),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 1, 3),
      }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    console.log(questions)
    expect(questions).toEqual([
      expect.objectContaining({
        createAt: new Date(2022, 1, 3),
      }),
      expect.objectContaining({
        createAt: new Date(2022, 1, 2),
      }),
      expect.objectContaining({
        createAt: new Date(2022, 1, 1),
      }),
    ])
  })

  it('Should be able to get fetch paginated recent questions', async () => {
    for (let i = 0; i < 23; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    console.log(questions)
    expect(questions).toHaveLength(3)
  })
})
