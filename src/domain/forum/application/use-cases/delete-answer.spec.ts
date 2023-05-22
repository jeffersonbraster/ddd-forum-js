import { expect } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('answer1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author1',
      answerId: 'answer1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('answer1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      return await sut.execute({
        authorId: 'author2',
        answerId: 'answer1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
