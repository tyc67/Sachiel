import { z } from 'zod'

const actionsEnum = z.enum([
  'add_follow',
  'add_comment',
  'add_pick',
  'add_like',
  'add_collection',
  'notify_transaction',
  'notify_sponsorship',
  'approach_expiration',
])

const objectivesEnum = z.enum([
  'member',
  'story',
  'collection',
  'comment',
  'transaction',
  'sponsorship',
])

export const contentSchemaMap = {
  'add_follow:member': z.optional(z.null()),
  'add_comment:story': z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    source: z.object({
      id: z.string(),
      customId: z.string(),
      title: z.string(),
    }),
    commentCount: z.number(),
  }),
  'add_comment:collection': z.object({
    id: z.string(),
    title: z.string(),
  }),
  'add_pick:collection': z.object({
    id: z.string(),
    title: z.string(),
  }),
  'add_like:comment': z.object({
    id: z.string(),
    content: z.string(),
    story: z.object({
      id: z.string(),
    }),
  }),
  'add_collection:collection': z.object({
    id: z.string(),
    title: z.string(),
  }),
  'notify_transaction:transaction': z.object({
    id: z.string(),
    status: z.string(),
    policy: z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['unlock_one_publisher', 'deposit']),
    }),
    unlockStory: z
      .object({
        id: z.string(),
        title: z.string(),
      })
      .nullable(),
    depositVolume: z.number().nullable(),
  }),
  'notify_sponsorship:sponsorship': z.object({
    id: z.string(),
    status: z.string(),
    publisher: z.object({
      id: z.string(),
      title: z.string(),
      customId: z.string(),
    }),
    fee: z.number(),
  }),
  'approach_expiration:transaction': z.object({
    id: z.string(),
    status: z.string(),
    expireDate: z.string().datetime(),
    policy: z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
    }),
    unlockStory: z.object({
      id: z.string(),
      title: z.string(),
    }),
  }),
}
export type ContentSchemaMapKey = keyof typeof contentSchemaMap
const notificationSchema = z
  .object({
    uuid: z.string(),
    read: z.boolean(),
    action: actionsEnum,
    objective: objectivesEnum,
    targetId: z.string(),
    aggregate: z.boolean().optional(),
    notifiers_num: z.number().optional(),
    notifiers: z
      .array(
        z.object({
          id: z.string(),
          customId: z.string(),
          name: z.string(),
          avatar: z.union([z.string().url(), z.literal('')]),
        })
      )
      .optional(),
    tid: z.string().optional(),
    success: z.boolean().optional(),
    ts: z.number(),
    content: z.unknown(),
  })
  .superRefine((data, ctx) => {
    const { action, objective, uuid } = data
    const key = `${action}:${objective}` as ContentSchemaMapKey
    const schema = contentSchemaMap[key]

    if (!schema) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unsupported combination of action and objective: ${key}`,
        path: ['action', 'objective'],
      })
      return
    }

    const contentValidation = schema.safeParse(data.content)
    if (!contentValidation.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Content validation failed on uuid:${uuid}`,
        path: ['content'],
        ...contentValidation.error.flatten(),
      })
    }
  })

export type NotificationResponse = z.infer<typeof notificationResponseSchema>
export const notificationResponseSchema = z.object({
  id: z.string(),
  lrt: z.number(),
  notifies: z.array(notificationSchema),
})
