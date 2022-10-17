import * as React from 'react';
import SearchForm from '../../components/SearchForm';
import SearchResultGrid from '../../components/SearchResultGrid';
import { AppDispatch } from '../../app/store';
import {
  searchStock,
  selectIsSearchingStock,
  resetSearch,
  selectNoMatchingStock,
} from './stockSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularIndeterminate from '../../components/CircularIndeterminate';
import { Typography } from '@mui/material';

function resultsGrid(notMatchingStock: boolean) {
  return (
    <>
      {
      notMatchingStock
      ?
      <Typography>No Stock Has been found</Typography>
      :
      <>
      <SearchResultGrid />
      </>
    }
    </>
  )
}

export default function SearchStock() {
  const dispatch = useDispatch<AppDispatch>();
  const isSearchingStock = useSelector(selectIsSearchingStock);
  const notMatchingStock = useSelector(selectNoMatchingStock);

  React.useEffect(() => {
    dispatch(resetSearch())
  }, [dispatch])

  const handleSearchStock = (query: string) => {
    dispatch(searchStock(query));
  }


  return (
    <>
      <SearchForm
      handleSearchStock={handleSearchStock}
      />
      {
        isSearchingStock
        ?
        <CircularIndeterminate />
        :
        resultsGrid(notMatchingStock)
      }
    </>
  )
}
