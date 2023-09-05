import { Either, left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

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
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionsCommentRepository.delete(questionComment)

    return right({})
  }
}
