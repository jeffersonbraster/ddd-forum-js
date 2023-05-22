import { expect, test } from 'vitest'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async () => {},
}
test('create an question', async () => {
  const questionQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await questionQuestion.execute({
    authorId: '1',
    title: 'nova pergunta',
    content: 'nova pergunta',
  })

  expect(question.content).toEqual('nova pergunta')
})
