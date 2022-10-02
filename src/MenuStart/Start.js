import styles from './styles.module.css';
import logo from '../assets/pokemon-logo.png';
import React, { useState } from 'react';

const Start = ( {onStartClick} ) => {
    const [name,setName] = useState('');

    const onChangeName = (event) =>{
        setName(event.target.value);
    }
    
   
    return (
        <div className={styles.main}>
            <img className={styles.logo} src={logo} alt='pokemonlogo'/>
            <br/>
            <form>
                <label className={styles.centre}>Enter Username:</label>
                <br/>
                <div className={styles.centre}>
                    <input className={styles.input} type='text' id='username' name='username' maxLength='10' placeholder='Username' onChange={onChangeName}/>
                </div>
                <br/>
                <div className={styles.centre}>
                    <button className={styles.startButton} onClick={()=>{onStartClick(name)}}>
                        Start Game
                    </button>
                </div>
                    
            </form>
        </div>
    
    );
};

export default Start;
// export default class Start extends React.Component{
// constructor (props){
//     super(props);
//     this.state = {
//         name:""
//     }
// };

// onStartClick = () => {
//     this.props.onStartClick(this.state.name);
// }

// onChangeName = (event) =>{
//     this.setState({name: event.target.value});
// }
// render(){
// return (
//     <div className={styles.main}>
//         <img className={styles.logo} src={logo} alt='pokemonlogo'/>
//         <br/>
//         <form>
//             <label className={styles.centre}>Enter Username:</label>
//             <br/>
//             <div className={styles.centre}>
//                 <input className={styles.input} type='text' id='username' name='username' maxLength='10' placeholder='Username' onChange={this.onChangeName}/>
//             </div>
//             <br/>
//             <div className={styles.centre}>
//                 <button className={styles.startButton} onClick={this.onStartClick}>
//                     Start Game
//                 </button>
//             </div>
                
//         </form>
//     </div>

// );
// };
// };
