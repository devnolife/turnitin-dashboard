// Component Imports
import Register from '@/views/auth/Register'

import { getServerMode } from '@core/utils/serverHelpers'

const LoginPage = () => {
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default LoginPage
