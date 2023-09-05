// Failure
export class Left<L> {
  readonly value: any

  constructor(value: L) {
    this.value = value
  }
}

// Success
export class Right<R> {
  readonly value: any

  constructor(value: R) {
    this.value = value
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: any): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: any): Either<L, R> => {
  return new Right(value)
}
