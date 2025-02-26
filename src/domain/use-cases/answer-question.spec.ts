import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entites/answer'

const fakeAnswersRepository: AnswersRepository = {
    create: async(answer: Answer) => {
        return
    }
}

test('create an answer question', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestionUseCase.execute({
        questionId: "1",
        InstructorId: "1",
      content: 'This is the answer',
    })

expect(answer.content).toEqual('This is the answer')

})