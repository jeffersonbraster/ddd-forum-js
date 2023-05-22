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

  async create(asnwer: Answer) {
    this.items.push(asnwer)
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(index, 1)
  }
}
