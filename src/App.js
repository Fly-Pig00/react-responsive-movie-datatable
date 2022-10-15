import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MovieTable from './components/MovieTable';
import { useDispatch } from 'react-redux';
import { toggleSelect } from './redux/movieSlice';

function App() {
	const dispatch = useDispatch();
	return (
		<div className="text-center">
			<div className='flex justify-content-center flex-wrap'>
				<div className="flex align-items-center justify-content-center w-8rem h-4rem font-bold m-2">
					<Button label="Movie List" className="p-button-outlined" onClick={() => dispatch(toggleSelect(true))}/>
				</div>
				<div className="flex align-items-center justify-content-center w-8rem h-4rem font-bold m-2">
					<Button label="Watch Later" className="p-button-outlined" onClick={() => dispatch(toggleSelect(false))}/>
				</div>
			</div>
			<MovieTable />
		</div>
	);
}

export default App;