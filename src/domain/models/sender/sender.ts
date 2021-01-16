import { v4 as uuid } from 'uuid'

import { Name } from '../shared/name'
import { Email } from '../shared/email'
import { InvalidNameError } from '../shared/errors/InvalidNameError'
import { InvalidEmailError } from '../shared/errors/InvalidEmailError'
import { Either, left, right } from '../../../core/logic/Either'

interface ISenderData {
  name: Name
  email: Email
}

export interface ISenderCreateData {
  name: string
  email: string
}

export class Sender {
  public readonly id: string
  public readonly name: Name
  public readonly email: Email

  private constructor({ name, email }: ISenderData, id?: string) {
    this.name = name
    this.email = email

    this.id = id ?? uuid()
  }

  static create(
    senderData: ISenderCreateData,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError, Sender> {
    const nameOrError = Name.create(senderData.name)
    const emailOrError = Email.create(senderData.email)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const sender = new Sender(
      {
        name: nameOrError.value,
        email: emailOrError.value,
      },
      id
    )

    return right(sender)
  }
}