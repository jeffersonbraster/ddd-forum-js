import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentsUseCaseResponse {}

export class DeleteQuestionCommentsUseCase {
  constructor(private questionsCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteQuestionCommentsUseCaseResponse> {
    const questionComment = await this.questionsCommentRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      throw new Error('Question Comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionsCommentRepository.delete(questionComment)

    return {}
  }
}
