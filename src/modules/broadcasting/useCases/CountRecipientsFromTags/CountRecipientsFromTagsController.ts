import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { CountRecipientsFromTags } from './CountRecipientsFromTags'

type CountRecipientsFromTagsControllerRequest = {
  tagsIds: string[]
}

export class CountRecipientsFromTagsController implements Controller {
  constructor(private countRecipientsFromTags: CountRecipientsFromTags) {}

  async handle({
    tagsIds,
  }: CountRecipientsFromTagsControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.countRecipientsFromTags.execute({
        tagsIds,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          default:
            return clientError(error)
        }
      } else {
        return ok({
          data: {
            count: result.value.count,
          },
        })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
