import { greeting } from '../../greeting'
import { logger } from 'vtex'

export default async (): Promise<void> => {
  const lines = await greeting()

  lines.forEach((msg: string) => logger.info(msg))
}
