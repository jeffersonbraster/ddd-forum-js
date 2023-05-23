import { PaginationParams } from '@/core/repositories/Pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/asnwer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(asnwer: Answer) {
    this.items.push(asnwer)
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items[index] = answer
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(index, 1)
  }
}
