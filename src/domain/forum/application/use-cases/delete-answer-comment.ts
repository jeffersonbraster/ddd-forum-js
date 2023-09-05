import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentsUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteAnswerCommentsUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      return left('Answer Comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
