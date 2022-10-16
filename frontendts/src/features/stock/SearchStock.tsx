import * as React from 'react';
import SearchForm from '../../components/SearchForm';
import SearchResultGrid from '../../components/SearchResultGrid';
import { AppDispatch } from '../../app/store';
import { searchStock, selectIsSearchingStock } from './stockSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularIndeterminate from '../../components/CircularIndeterminate';

export default function SearchStock() {
  const dispatch = useDispatch<AppDispatch>();
  const isSearchingStock = useSelector(selectIsSearchingStock);

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
        <SearchResultGrid />
      }
    </>
  )
}
