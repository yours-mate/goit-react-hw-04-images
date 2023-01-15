import { RotatingLines } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

export function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
