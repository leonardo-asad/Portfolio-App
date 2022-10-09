import CircularIndeterminate from '../../components/CircularIndeterminate'
import TradesGrid from '../../components/TradesGrid'
import AlertNoPortfolioSelected from '../../components/AlertNoPortfolioSelected'
import { useSelector } from 'react-redux'
import { selectIsLoadingTrades, selectSelectedPortfolio } from './portfolioSlice'

function tradesGrid(isLoadingTrades: boolean) {
  return (
    <>
      { isLoadingTrades ?
        <CircularIndeterminate />
        :
        <TradesGrid />
      }
    </>
  )
}

export default function Trades() {
  const isLoadingTrades = useSelector(selectIsLoadingTrades);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);

  return (
    <>
      {
        selectedPortfolio.name === ''
        ?
        <AlertNoPortfolioSelected />
        :
        tradesGrid(isLoadingTrades)
      }
    </>
  )
}
