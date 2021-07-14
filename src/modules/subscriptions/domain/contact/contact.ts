import { Entity } from '@core/domain/Entity'
import { Either, right } from '@core/logic/Either'

import { Email } from './email'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidNameError } from './errors/InvalidNameError'
import { Name } from './name'
import { Subscription } from './subscription'
import { Subscriptions } from './subscriptions'

interface IContactProps {
  name: Name
  email: Email
  subscriptions?: Subscriptions
  isUnsubscribed?: boolean
  createdAt?: Date
}

export class Contact extends Entity<IContactProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get subscriptions() {
    return this.props.subscriptions
  }

  get isUnsubscribed() {
    return this.props.isUnsubscribed
  }

  get createdAt() {
    return this.props.createdAt
  }

  private constructor(props: IContactProps, id?: string) {
    super(props, id)
  }

  public subscribeToTag(subscription: Subscription) {
    this.subscriptions.add(subscription)
  }

  public unsubscribeFromTag(subscription: Subscription) {
    this.subscriptions.remove(subscription)
  }

  static create(
    props: IContactProps,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError, Contact> {
    const contact = new Contact(
      {
        ...props,
        subscriptions: props.subscriptions ?? Subscriptions.create([]),
        isUnsubscribed: props.isUnsubscribed ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return right(contact)
  }
}
