import chalk from 'chalk'

import { logger, SessionManager, createWorkspacesClient, WorkspaceResponse, ColorifyConstants, COLORS } from 'vtex'

const workspaceState = (meta: WorkspaceResponse) => (meta.production ? 'production' : 'dev')

const getWorkspaceState = async (account: string, workspace: string): Promise<string> => {
  try {
    const workspaces = createWorkspacesClient()
    const meta = await workspaces.get(account, workspace)

    return `${workspaceState(meta)} `
  } catch (err) {
    logger.debug(`Unable to fetch workspace state`)
    logger.debug(err.message)

    // @ts-ignore
    return undefined
  }
}

export const greeting = async (): Promise<string[]> => {
  const { account, userLogged, workspace } = SessionManager.getSingleton()

  if (account && userLogged && workspace) {
    let loggedMessage = 'Logged into'
    let state = await getWorkspaceState(account, workspace)

    if (!state) {
      loggedMessage = `${chalk.hex(COLORS.YELLOW)('Not logged in')}. Previously logged into`
      state = ''
    }

    return [
      `${loggedMessage} ${ColorifyConstants.ID(account)} as ${ColorifyConstants.ID(userLogged)} at ${chalk.hex(COLORS.YELLOW)(
        state
      )}workspace ${ColorifyConstants.ID(workspace)}`,
    ]
  }

  return [`${chalk.bold('Welcome to VTEX IO')}`, `Log in by running ${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex login')} ${ColorifyConstants.ID('<account-name>')}`]
}
