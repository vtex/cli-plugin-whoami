import { CustomCommand, ColorifyConstants } from 'vtex'
import authWhoami from '../modules/auth/whoami'

export default class WhoAmI extends CustomCommand {
  static description = `Prints the current ${ColorifyConstants.ID('account')}, ${ColorifyConstants.ID('workspace')}, environment, and login details.`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex whoami')}`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = []

  async run() {
    this.parse(WhoAmI)

    await authWhoami()
  }
}
