import { PuffLoader } from 'react-spinners';
import css from './Loader.module.css';

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  return (
	<div className={css.loader}>
	  <PuffLoader
        color="#007dff"
        loading={loading}
        size={120}
		speedMultiplier={3}
      />
	</div>
  );
}