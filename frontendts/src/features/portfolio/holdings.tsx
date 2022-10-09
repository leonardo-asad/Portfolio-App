import CircularIndeterminate from '../../components/CircularIndeterminate'
import Dashboard from '../../components/Dashboard'
import HoldingsGrid from '../../components/HoldingsGrid'
import AlertNoPortfolioSelected from '../../components/AlertNoPortfolioSelected'
import { useSelector } from 'react-redux'
import { selectIsLoadingHoldings } from './portfolioSlice'
import { selectSelectedPortfolio } from './portfolioSlice'

function holdings(isLoadingHoldings: boolean) {
  return (
    <>
      { isLoadingHoldings ?
        <CircularIndeterminate />
        :
        <>
          <Dashboard />
          <HoldingsGrid />
        </>
      }
    </>
  )
}

export default function Holdings() {
  const isLoadingHoldings = useSelector(selectIsLoadingHoldings);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);

  return (
    <>
    {
      selectedPortfolio.name === ''
      ?
      <AlertNoPortfolioSelected />
      :
      holdings(isLoadingHoldings)
    }
    </>
  )
}
