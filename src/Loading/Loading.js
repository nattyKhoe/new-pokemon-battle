import loading from '../assets/loading-pokeball.gif';
import styles from './styles.module.css';

const Loading = () =>{
    return (
    <div>
    <img className={styles.loading} src={loading} alt="Loading" />
    </div>
    );
};

export default Loading;