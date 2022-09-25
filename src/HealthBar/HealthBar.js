import React from "react";
import styles from "./styles.module.css";

export default class HealthBar extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div className={styles.main}>
                <div className={styles.label}>{this.props.label}</div>
                <div className={styles.max}>
                    <div className={styles.value} style={{width: `${(this.props.health/this.props.maxHealth)* 100}%`}}></div>
                </div>
            </div>
        )
    }
}