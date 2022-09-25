import styles from './styles.module.css';
import React from 'react';

export default class ChoiceMenu extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div className={styles.main}>
                <div onClick={this.props.onAttack} className={styles.option}>Attack</div>
                <div onClick={this.props.onSwitch} className={styles.option}>Swap</div>
            </div>
        )
    }
}