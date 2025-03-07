import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

// sut = system under test
describe('Create a answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      InstructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
