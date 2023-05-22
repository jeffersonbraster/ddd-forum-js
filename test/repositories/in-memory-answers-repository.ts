import { AnswerRepository } from '@/domain/forum/application/repositories/asnwer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(asnwer: Answer) {
    this.items.push(asnwer)
  }
}
