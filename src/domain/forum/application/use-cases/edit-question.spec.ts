import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author1',
      questionId: newQuestion.id.toString(),
      title: 'New Title edit',
      content: 'New Content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New Title edit',
      content: 'New Content',
    })
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      return await sut.execute({
        authorId: 'author2',
        questionId: newQuestion.id.toString(),
        title: 'New Title edit',
        content: 'New Content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
