import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/asnwer-repository'

const fakeAnswerRepository: AnswerRepository = {
  create: async () => {},
}
test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    content: 'nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('nova resposta')
})
