import { Loader } from '@components/loader'
import Page from '@components/page'
import { useShallowEqualSelector } from '@hooks/redux-typed-hooks'
import Campaigns from '../components/campaigns'
import { isEmpty } from '../utils/global'

const Pages = () => {
  const { loading, data } = useShallowEqualSelector(s => s.campaigns)
  const component = isEmpty(data) ? <></> : <Campaigns />

  return (
    <Page title="Home">
      <Loader loading={loading}>{component}</Loader>
    </Page>
  )
}

export default Pages
