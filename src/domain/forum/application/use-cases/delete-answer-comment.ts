import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentsUseCaseResponse {}

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
      throw new Error('Answer Comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
