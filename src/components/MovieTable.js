import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MovieService } from '../services/MovieService';
import FavoriteStar from './FavoriteStar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { onPage, dataLoaded, setTotalRecords, toggleFavorite, addWatchLater, removeWatchLater } from '../redux/movieSlice';
import ReadMore from './ReadMore';
import './MovieTable.css';

const MovieTable = () => {
  const [search, setSearch] = useState("");

  const { movies, loading, rows, first, totalRecords, listSelected, watchlaters } = useSelector(state => state.movie);

  const dispatch = useDispatch();

  const movieService = new MovieService();

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const fetchData = () => {
    if (search !== '') {
      const nextPage = first / 20 + 1;
      movieService.getMovies(search, nextPage).then(res => {
        dispatch(setTotalRecords(res.data.total_results))
        const data = res.data.results.map(movie => {
          return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            favorite: false
          }
        })
        dispatch(dataLoaded(data));
      })
    } else {
      dispatch(setTotalRecords(0))
      dispatch(dataLoaded([]));
    }
  }

  const delayedSearch = useCallback(debounce(fetchData, 500), [search]);

  useEffect(() => {
    delayedSearch();
    return () => {
      delayedSearch.cancel();
    };
  }, [search, delayedSearch]);

  const initialState = {
    movies: [],
    favorite: [],
    loading: true,
    first: 0,
    rows: 20,
    totalRecords: 20
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading, first, rows]);

  let data;
  if (listSelected) {
    data = movies.map(movie => {
      return {
        ...movie,
        overview: <ReadMore>{movie.overview}</ReadMore>,
        favorite: <FavoriteStar filled={movie.favorite} onClick={() => dispatch(toggleFavorite(movie.id))} />,
        watchlater: <Button label="Add" className="p-button-outlined" onClick={() => dispatch(addWatchLater(movie))}/>
      }
    })
  } else {
    data = watchlaters.map(movie => {
      return {
        ...movie,
        watchlater: <Button label="Remove" className="p-button-outlined" onClick={() => dispatch(removeWatchLater(movie.id))}/>
      }
    })
  }
  return (
    <div className="card">
      {listSelected ? <DataTable
        value={data}
        paginator rows={rows}
        totalRecords={totalRecords}
        lazy
        first={first}
        onPage={e => dispatch(onPage(e))}
        loading={loading}
        paginatorClassName="justify-content-end"
        header={<span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText className="p-inputtext-lg block" value={search} onChange={handleChange} placeholder="Search" />
        </span>}
        responsiveLayout="stack" breakpoint="600px">
        <Column field="title" header="Title" className='text-center'/>
        <Column field="overview" header="Overview" className='text-center'/>
        <Column field="favorite" header="Favorite" className='text-center'/>
        <Column field="watchlater" header="Watch Later" className='text-center'/>
      </DataTable> : <DataTable
        value={data}
        paginator rows={10}
        paginatorClassName="justify-content-end"
        header="Watch Later Movies"
        responsiveLayout="scroll" breakpoint="600px">
        <Column field="title" header="Title" className='text-center'/>
        <Column field="overview" header="Overview" className='text-center'/>
        <Column field="watchlater" header="Watch Later" className='text-center'/>
      </DataTable>
      }
    </div >
  );
}

export default MovieTable;
